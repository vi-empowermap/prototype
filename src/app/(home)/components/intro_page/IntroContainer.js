import { useEffect, useRef, useState } from "react";
import IntroMap from "../intromap";
import gsap from "gsap";
import Karte from "/public/assets/icons/zurkarte.svg";

const IntroCotainer = ({ turnOnMap, getData, getDataForMarker, pushIntroToAbout, webtitle, introbtn, introtext, ready, onClickReady, totalCountOfInstitution }) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const zurKarteBtnRef = useRef();
  // useEffect(() => {
  //   if (zurKarteBtnRef.current && !ready) {
  //     // after 1 minute the zur karte button will be clicked automatically
  //     setTimeout(() => {
  //       zurKarteBtnRef.current.click();
  //     }, 60000);
  //   }
  // }, [mapLoaded]);
 
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
    <div id="anitext" className={`fixed top-0 left-0 font-normal w-[100svw] h-[100svh] lg:h-screen max-h-[100svh] min-h-[100svh] lg:max-h-screen lg:min-h-screen z-[1800] ${ready ? "opacity-0 pointer-events-none" : "opacity-100"} flex flex-col bg-white`}>
      <IntroLoadingPage mapLoaded={mapLoaded} />
      {turnOnMap && <IntroBackgroundMap getData={getData} getDataForMarker={getDataForMarker} mapLoaded={mapLoaded} setMapLoaded={setMapLoaded} />}
      {mapLoaded && (
        <>
          <div className="w-screen h-[100svh] max-h-[100svh] min-h-[100svh] lg:h-screen lg:max-h-screen lg:min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 py-4 lg:px-16 gap-4 overflow-hidden z-[1803]">
            <div className="w-full h-full flex flex-col justify-center gap-4">
              <IntroLogo webtitle={webtitle} />
              <IntroText introtext={introtext} />
              <ButtonWrapper pushIntroToAbout={pushIntroToAbout} zurKarteBtnRef={zurKarteBtnRef} onClickReady={onClickReady} ready={ready} introbtn={introbtn} />
            </div>
            <div className="flex-grow w-full h-full hidden lg:flex justify-center items-center font-jetBrainsMono">
              <TotalCountWrapper onClickReady={onClickReady} totalCountOfInstitution={totalCountOfInstitution} introbtn={introbtn} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const TotalCountWrapper = ({ onClickReady, totalCountOfInstitution, introbtn }) => {
  const [getCurrentDate, setCurrentDate] = useState("");
  useEffect(() => {
    const currentDate = new Date();
    setCurrentDate(String(currentDate.toLocaleDateString()));
  }, []);
  return (
    <div onClick={onClickReady} className="group w-full lg:w-2/3 h-full lg:h-auto cursor-pointer lg:hover:w-full transition-all duration-500 rounded-full bg-opacity-80 aspect-auto lg:aspect-square overflow-hidden flex flex-col justify-center items-center text-sm text-black bg-white z-[1805] p-1">
      <div className="w-full h-full rounded-full overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:group-hover:translate-x-0 lg:group-hover:left-full transition-all duration-500 flex flex-col justify-center items-center">
          <span className="totalCount text-3xl md:text-5xl lg:text-8xl">{totalCountOfInstitution}</span>
          <span className="text-center text-xs md:text-sm lg:text-base">Gesamtzahl der Institutionen</span>
          <span className="text-center text-xs mt-2">Stand: {getCurrentDate}</span>
        </div>
        <div className="absolute top-1/2 -left-full translate-x-0 -translate-y-1/2 lg:group-hover:left-1/2 lg:group-hover:-translate-x-1/2 transition-all duration-500 flex flex-col justify-center items-center gap-2">
          <Karte style={{ strokeWidth: "30px", stroke: "#000", width: "100px", height: "100px" }} />
          <span className="text-center text-xs md:text-sm lg:text-base">{introbtn}</span>
        </div>
      </div>
    </div>
  );
};

const ButtonWrapper = ({ pushIntroToAbout, zurKarteBtnRef, onClickReady, ready, introbtn }) => {
  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
      <div
        ref={zurKarteBtnRef}
        id="anibtn"
        onClick={onClickReady}
        className={`stroke-black hover:stroke-white flex flex-col justify-center items-center gap-2 font-jetBrainsMono rounded-lg relative cursor-pointer w-full lg:w-fit bg-white text-black active:bg-black active:text-white lg:hover:bg-black lg:hover:text-white select-none p-2 ${
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
        className={`stroke-black hover:stroke-white flex flex-col justify-center items-center gap-2 font-jetBrainsMono rounded-lg relative cursor-pointer w-full lg:w-fit bg-white text-black active:bg-black active:text-white lg:hover:bg-black lg:hover:text-white select-none p-2 ${
          ready ? "opacity-0 pointer-events-none" : "opacity-100"
        } transition-all duration-300 bg-opacity-80`}
      >
        <div>Mehr über das Projekt</div>
      </div>
    </div>
  );
};

const IntroText = ({ introtext }) => {
  return <div className="lg:w-4/5 text-black bg-white bg-opacity-80 text-base md:text-xl lg:text-xl p-2 rounded-lg font-jetBrainsMono">{introtext.slice(0,500)}</div>;
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
        <div className="fixed top-0 left-0 font-normal w-screen h-screen max-h-screen min-h-screen flex flex-col justify-center items-center bg-white">
          <div className="min-w-fit max-w-fit w-auto flex justify-start items-center text-black bg-white bg-opacity-80 rounded-lg mb-0 lg:mb-8">
            <span className="text-5xl font-bespokeStencil">PAD</span>
            <span className="text-5xl font-britney pr-4 lg:pr-8">LAS</span>
          </div>
          <div>Setting the scene... Just a bit more patience.</div>
        </div>
      )}
    </>
  );
};

const IntroBackgroundMap = ({ getData, getDataForMarker, mapLoaded, setMapLoaded }) => {
  return (
    <>
      {mapLoaded && <div className="fixed top-0 left-0 w-screen h-screen max-h-screen min-h-screen bg-black bg-opacity-40 z-[1802] select-none pointer-events-none"></div>}
      <div className="fixed top-0 left-0 w-screen h-screen max-h-screen min-h-screen z-[1801] select-none pointer-events-none">
        <IntroMap data={getData} getDataForMarker={getDataForMarker} setMapLoaded={setMapLoaded} />
      </div>
    </>
  );
};
export default IntroCotainer;
