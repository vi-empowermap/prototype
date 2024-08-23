import { useEffect, useRef, useState } from "react";
import IntroMap from "../intromap";
import gsap from "gsap";
import Karte from "/public/assets/icons/zurkarte.svg";

const IntroCotainer = ({pushIntroToAbout, webtitle, introbtn, introtext, ready, onClickReady, totalCountOfInstitution }) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const zurKarteBtnRef = useRef();
  useEffect(() => {
    if (zurKarteBtnRef.current && !ready) {
      // after 1 minute the zur karte button will be clicked automatically
      setTimeout(() => {
        zurKarteBtnRef.current.click();
      }, 60000);
    }
  }, [mapLoaded]);

  useEffect(() => {
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const totalCountAnimation = () => {
      const items = document.querySelector(".totalCount");
      if (items) {
        gsap.from(items, {
          textContent: 0,
          duration: 7,
          ease: "power1.in",
          snap: { textContent: 1 },
          stagger: {
            each: 1.0,
            onUpdate: function () {
              this.targets()[0].innerHTML = numberWithCommas(Math.ceil(this.targets()[0].textContent));
            },
          },
        });
      }
    };
    totalCountAnimation();
  }, [mapLoaded]);
  return (
    <div id="anitext" className={`fixed top-0 left-0 font-semibold w-screen h-screen max-h-screen min-h-screen overflow-y-scroll z-[1800] ${ready ? "opacity-0 pointer-events-none" : "opacity-100"} flex flex-col bg-white`}>
      <IntroLoadingPage mapLoaded={mapLoaded} />
      <IntroBackgroundMap mapLoaded={mapLoaded} setMapLoaded={setMapLoaded} />
      {mapLoaded && (
        <>
          <div className="w-screen h-screen max-h-screen min-h-screen flex flex-col lg:flex-row items-center lg:items-start justify-center px-4 py-4 lg:px-16 gap-4 overflow-hidden z-[1803]">
            <div className="w-full h-full flex flex-col justify-center gap-4">
              <IntroLogo webtitle={webtitle} />
              <IntroText introtext={introtext} />
              <ButtonWrapper pushIntroToAbout={pushIntroToAbout} zurKarteBtnRef={zurKarteBtnRef} onClickReady={onClickReady} ready={ready} introbtn={introbtn} />
            </div>
            <div className="w-full h-full flex justify-center items-center font-jetBrainsMono">
              <TotalCountWrapper onClickReady={onClickReady} totalCountOfInstitution={totalCountOfInstitution} introbtn={introbtn} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const TotalCountWrapper = ({ onClickReady, totalCountOfInstitution, introbtn }) => {
  const [getCurrentDate, setCurrentDate] = useState("")
  useEffect(() => {
    const currentDate = new Date();
    setCurrentDate(String(currentDate.toLocaleDateString()))

  },[])
  return (
    <div onClick={onClickReady} className="group w-1/2 max-w-full cursor-pointer hover:w-2/3 transition-all duration-500 rounded-full bg-opacity-80 aspect-square overflow-hidden flex flex-col justify-center items-center text-sm text-black bg-white z-[1805] p-1">
      <div className="w-full h-full rounded-full overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:translate-x-0 group-hover:left-full transition-all duration-500 flex flex-col justify-center items-center">
          <span className="totalCount text-3xl md:text-5xl lg:text-8xl">{totalCountOfInstitution}</span>
          <span className="text-center text-xs md:text-sm lg:text-base">Gesamtzahl der Institutionen</span>
          <span className="text-center text-xs mt-2">Stand: {getCurrentDate}</span>
        </div>
        <div className="absolute top-1/2 -left-full translate-x-0 -translate-y-1/2 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-500 flex flex-col justify-center items-center gap-2">
          <Karte style={{ strokeWidth: "30px", stroke: "#000", width: "100px", height: "100px" }} />
          <span className="text-center text-xs md:text-sm lg:text-base">{introbtn}</span>
        </div>
      </div>
    </div>
  );
};

const ButtonWrapper = ({pushIntroToAbout, zurKarteBtnRef, onClickReady, ready, introbtn }) => {
  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
      <div
        ref={zurKarteBtnRef}
        id="anibtn"
        onClick={onClickReady}
        className={`stroke-black hover:stroke-white flex flex-col justify-center items-center gap-2 font-jetBrainsMono rounded-lg relative font-bold cursor-pointer w-full lg:w-fit bg-white text-black hover:bg-black hover:text-white select-none p-2 ${
          ready ? "opacity-0 pointer-events-none" : "opacity-100"
        } transition-all duration-300 bg-opacity-80`}
      >
        {/* <div>
          <Karte style={{ strokeWidth: "30px", width: "40px", height: "40px" }} />
        </div> */}
        <div>{introbtn}</div>
      </div>
      <div
        onClick={pushIntroToAbout}
        className={`stroke-black hover:stroke-white flex flex-col justify-center items-center gap-2 font-jetBrainsMono rounded-lg relative font-bold cursor-pointer w-full lg:w-fit bg-white text-black hover:bg-black hover:text-white select-none p-2 ${
          ready ? "opacity-0 pointer-events-none" : "opacity-100"
        } transition-all duration-300 bg-opacity-80`}
      >
        <div>Mehr über das Projekt</div>
      </div>
    </div>
  );
};

const IntroText = ({ introtext }) => {
  return <div className="lg:w-4/5 text-black bg-white bg-opacity-80 text-lg md:text-xl lg:text-2xl p-2 rounded-lg font-jetBrainsMono">{introtext}</div>;
};

const IntroLogo = ({ webtitle }) => {
  return (
    <div className="min-w-fit max-w-fit w-auto flex justify-start items-center text-black bg-white bg-opacity-80 rounded-lg mb-0 lg:mb-8">
      <span className="text-5xl md:text-9xl lg:text-9xl font-bespokeStencil">{String(webtitle).toUpperCase().slice(0, 3)}</span>
      <span className="text-5xl md:text-9xl lg:text-9xl font-britney pr-4 lg:pr-8">{String(webtitle).toUpperCase().slice(3)}</span>
    </div>
  );
};

const IntroLoadingPage = ({ mapLoaded }) => {
  return (
    <>
      {!mapLoaded && (
        <div className="fixed top-0 left-0 font-normal w-screen h-screen max-h-screen min-h-screen flex justify-center items-center bg-white">
          <div>Loading...</div>
        </div>
      )}
    </>
  );
};

const IntroBackgroundMap = ({ mapLoaded, setMapLoaded }) => {
  return (
    <>
      {mapLoaded && <div className="fixed top-0 left-0 w-screen h-screen max-h-screen min-h-screen bg-black bg-opacity-40 z-[1802] select-none pointer-events-none"></div>}
      <div className="fixed top-0 left-0 w-screen h-screen max-h-screen min-h-screen z-[1801] select-none pointer-events-none">
        <IntroMap setMapLoaded={setMapLoaded} />
      </div>
    </>
  );
};
export default IntroCotainer;
