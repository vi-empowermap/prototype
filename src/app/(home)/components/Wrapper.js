"use client";
/* CSR: NO SSR */

import { useEffect, useRef, useState } from "react";
import LeafletMap from "./map";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { clickedItemsListAtom, clikedGoogleAtom, clikedMarkerAtom, closeOrgaAtom, currentBundesLand, readyAniAtom, setViewAtom } from "@/app/utils/state";
import DynamicMiniMap from "./minimap";
import ListContainer from "./ListContainer";
import Search from "./Search";
import Filtern from "./Filtern";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useSearchParams } from "next/navigation";
import OrgaPage from "./OrgaPage";
import Logo from "./Logo";
import GoogleMapTag from "./GoogleMap";
import ListContainerOhneL from "./ListContainerOhneL";
import Menu from "./Menu";

const Wrapper = ({
  data,
  dataN,
  categories,
  kqlDataResult,
  kqlDataResultNoLocation,
  panelData: {
    result: { content: panelDatas },
  },
  totalCountOfBundesland,
}) => {
  gsap.registerPlugin(useGSAP);
  const container = useRef();
  const [ready, setReady] = useRecoilState(readyAniAtom);
  const [getData, setData] = useState([...kqlDataResult, ...data]);
  const [turnOnMap, setTurnOnMap] = useState(true);
  const [getDataForMarker, setDataForMarker] = useState([...kqlDataResult, ...data]);
  const [findMobile, setFindMobile] = useState(false);
  const [clickedItemsList, setClickedItemsList] = useRecoilState(clickedItemsListAtom);
  const [doubleScreenTouched, setDoubleScreenTouched] = useState(false);
  const getOrgaLocation = useRecoilValue(clikedGoogleAtom);
  const getCurrentBundesLand = useRecoilValue(currentBundesLand);
  const [openMiniMap, setOpenMiniMap] = useState(false);
  const [openVerotung, setOpenVerortung] = useState(false);
  const [openCenter, setOpenCenter] = useState(false);
  const [orgaMapSize, setOrgaMapSize] = useState(0);
  const setSetViewAtom = useSetRecoilState(setViewAtom);
  const setClickedMarkerAtom = useSetRecoilState(clikedMarkerAtom);
  const getCloseOrgaAtom = useRecoilValue(closeOrgaAtom);

  /* Double touch map for Mobile */
  const [lastTap, setLastTap] = useState(null);
  const doubleTapDelay = 300; // milliseconds
  // Double Tap Event
  const handleDoubleTap = (event) => {
    if (window.innerWidth < 1024 && findMobile) {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;
      if (lastTap && tapLength < doubleTapDelay && tapLength > 0) {
        setDoubleScreenTouched((pre) => !pre);
      }
      setLastTap(currentTime);
    }
  };
  /* Detection Mobile Device and Tablet */
  useEffect(() => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      // true for mobile device
      setFindMobile(true);
    } else {
      // false for not mobile device
      setFindMobile(false);
    }
  }, []);
  /* Mobile Size event but it works also on Desktop */
  const onDoubleTouch = () => {
    if (window.innerWidth < 1025 && !findMobile) {
      setDoubleScreenTouched((pre) => !pre);
    }
  };

  /* If u open this website by url with params then don't need to activate the Animation */
  const searchParams = useSearchParams();
  const search = searchParams.get("organisation");
  useEffect(() => {
    // setOrgaMapSize(window.innerWidth / 3);
    if (!getCloseOrgaAtom) {
      setOrgaMapSize(window.innerWidth / 3);
    } else {
      setOrgaMapSize("100%");
    }
  }, [getCloseOrgaAtom]);

  useEffect(() => {
    /* If the user comes on this website by url?query then turn off the animation */
    if (Boolean(search)) {
      setReady(true);
    }
  }, []);
  const aniDuration = 1;
  const { contextSafe } = useGSAP({ scope: container });
  const onClickReady = contextSafe(() => {
    if (!ready && !Boolean(search) && turnOnMap) {
      gsap.to("#anibtn", { opacity: 0, duration: aniDuration });
      gsap.to("#anitext", { opacity: 0, duration: aniDuration });
      gsap.to("#filterContainer", { delay: 1.5, opacity: 1, duration: aniDuration });
      gsap.to("#mapCotainer", { delay: 1.5, opacity: 1, duration: aniDuration });
      gsap.to("#listContainer", { delay: 1.5, opacity: 1, duration: aniDuration });
      // gsap.to("#listContainer2", { delay: 1.5, opacity: 1, transform: "translateX(0px)", duration: aniDuration });
      gsap.to(".listbox", {
        delay: 1.5,
        opacity: 1,
        stagger: {
          each: 0.1,
          from: 0,
        },
        transform: "translateY(0px)",
      });
      gsap.to("#navContainer", { delay: 1.5, css: { "border-bottom": "2px solid black", opacity: 1 }, duration: aniDuration });
    }

    setTimeout(() => {
      setReady(true);
    }, 2500);
  });

  /* Switch Orga types */
  useEffect(() => {
    if (!turnOnMap) {
      setData([...kqlDataResultNoLocation, ...dataN]);
      setDataForMarker([...kqlDataResultNoLocation, ...dataN]);
    } else {
      setData([...kqlDataResult, ...data]);
      setDataForMarker([...kqlDataResult, ...data]);
    }
  }, [turnOnMap]);

  const onTurOnMap = () => {
    console.log("reset all");
    setTurnOnMap((pre) => !pre);
    setClickedMarkerAtom(-1);
    setClickedItemsList([]);
    setSetViewAtom({
      pos: [51.1657, 10.4515],
      name: "start",
    });
  };

  return (
    <main ref={container} className="flex flex-col lg:flex-row w-screen h-screen bg-white overflow-hidden relative">
      {/* Animation Button */}

      <div id="anitext" className={`px-8 fixed top-0 left-0 font-semibold w-screen h-screen z-[1800] ${ready ? "opacity-0 pointer-events-none" : "opacity-100"} flex flex-col bg-white`}>
        
        <div className="py-8">
          <Logo text={panelDatas.webtitle} />
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-10 w-full h-full mb-8">
          <div className="w-full h-full border-2 border-black overflow-hidden flex justify-center items-center">
            <div className=" border-2 border-black rounded-full flex justify-center items-center"> Map Image</div>
          </div>
          <div className="w-full lg:text-4xl font-medium lg:leading-10">{panelDatas.introtext}</div>
        </div>
        <div className="flex justify-center mb-4">
          <div id="anibtn" onClick={onClickReady} className={`relative font-semibold cursor-pointer ${ready ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
          {panelDatas.introbtn} 
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full h-full bg-white">
        {/* Navigation BAR */}
        <nav id="navContainer" className={`w-full bg-white lg:h-36 flex justify-between border-b-2  ${!ready ? "border-white opacity-0" : "border-black opacity-100"} overflow-y-visible`}>
          <Menu />
          <Logo text={panelDatas.webtitle} />
          <div id="filterContainer" className={`flex lg:flex-col text-2xl font-semibold bg-white w-fit flex-grow-0 lg:flex-grow border-l-2 border-black ${!ready ? "opacity-0" : "opacity-100"}`}>
            <Search turnOnMap={turnOnMap} getData={getData} setData={setData} setDataForMarker={setDataForMarker} placeholdertext={panelDatas.placeholdersearch} />
            <Filtern turnOnMap={turnOnMap} getData={getData} categories={categories} placeholdertext={panelDatas.placeholderfilter} />
          </div>
        </nav>
        <div id="mapCotainer" style={{ width: Boolean(search) ? (turnOnMap ? `${orgaMapSize}px` : "100%") : "100%" }} className={`flex-1 bg-white flex overflow-hidden relative ${!ready ? "opacity-0" : "opacity-100"}`}>
          {/* Orga who has location info */}
          {turnOnMap && (
            <div onDoubleClick={onDoubleTouch} onTouchEnd={handleDoubleTap} className="w-full h-full lg:h-full flex justify-start border-b-2 border-black">
              <LeafletMap doubleScreenTouched={doubleScreenTouched} data={getData} getDataForMarker={getDataForMarker} setData={setData} />
              {!Boolean(search) && (
                <div className="absolute bottom-2 left-2 flex items-end">
                  <div id="leaflet_minimap_container" className={`relative pt-10 hidden lg:block w-[calc(3vw+310px)] ${openMiniMap ? "aspect-square" : "h-fit"} bg-white rounded-2xl border-2 border-black z-[1000] overflow-hidden`}>
                    {openMiniMap && <div className="absolute w-24 top-0 left-0 py-4 px-3 z-[1000] text-xl leading-5 font-semibold">{panelDatas.minimaptitle}</div>}
                    {getCurrentBundesLand !== "" && (
                      <div className="absolute flex justify-center items-center w-10 h-10 rounded-full top-4 right-3 z-[1000] text-2xl leading-5 font-semibold bg-black text-white">{Boolean(totalCountOfBundesland[getCurrentBundesLand]) ? totalCountOfBundesland[getCurrentBundesLand] : 0}</div>
                    )}
                    {openMiniMap && <DynamicMiniMap />}
                    <div onClick={() => setOpenMiniMap((prev) => !prev)} className={`cursor-pointer absolute ${openMiniMap ? "w-fit" : "w-full"} bottom-0 left-0 py-2 px-3 z-[1000] text-xl leading-5 font-semibold`}>
                      {openMiniMap && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                          <path fillRule="evenodd" d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                        </svg>
                      )}
                      {!openMiniMap && (
                        <span className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z" clipRule="evenodd" />
                          </svg>
                          <div className="text-xs">{panelDatas.minimaptitle}</div>
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={`relative justify-center items-center hidden pt-10 lg:flex w-[calc(3vw+130px)] ${openVerotung ? "aspect-square" : "h-fit"} bg-white rounded-2xl border-2 border-black z-[1000] overflow-hidden -ml-10`}>
                    {openVerotung && <div className="absolute w-24 top-0 left-0 py-4 px-3 z-[1000] text-xl leading-5 font-semibold">{panelDatas.verortungbtntext}</div>}
                    {openVerotung && <div onClick={onTurOnMap} className="cursor-pointer w-1/2 aspect-square bg-white hover:bg-black rounded-full border-2 border-black"></div>}

                    <div onClick={() => setOpenVerortung((prev) => !prev)} className={`cursor-pointer absolute ${openVerotung ? "w-fit" : "w-full"} bottom-0 left-0 py-2 px-3 z-[1000] text-xl leading-5 font-semibold`}>
                      {openVerotung && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                          <path fillRule="evenodd" d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                        </svg>
                      )}
                      {!openVerotung && (
                        <span className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z" clipRule="evenodd" />
                          </svg>
                          <div className="text-xs">{panelDatas.verortungbtntext}</div>
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={`relative justify-center items-center hidden pt-7 pb-3 lg:flex w-[calc(3vw+70px)] ${openCenter ? "aspect-square" : "h-fit"} bg-white rounded-2xl border-2 border-black z-[1000] overflow-hidden -ml-8`}>
                    {openCenter && <div className="absolute w-24 top-0 left-0 py-4 px-3 z-[1000] text-xl leading-5 font-semibold">{panelDatas.centerbtntext}</div>}
                    {openCenter && (
                      <div onClick={() => setSetViewAtom({ pos: [51.1657, 10.4515], name: "start" })} className="cursor-pointer w-1/3 aspect-square flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" />
                        </svg>
                      </div>
                    )}

                    <div onClick={() => setOpenCenter((prev) => !prev)} className={`cursor-pointer absolute ${openCenter ? "w-fit" : "w-full"} bottom-0 left-0 py-2 px-3 z-[1000] text-xl leading-5 font-semibold`}>
                      {openCenter && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                          <path fillRule="evenodd" d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                        </svg>
                      )}
                      {!openCenter && (
                        <span className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z" clipRule="evenodd" />
                          </svg>
                          <div className="text-xs">{panelDatas.centerbtntext}</div>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {Boolean(search) && <GoogleMapTag lat={getOrgaLocation[0]} long={getOrgaLocation[1]} text={panelDatas.opengooglemap} />}
            </div>
          )}
          {/* Orga who doesn't have location info */}
          {!turnOnMap && (
            <>
              <div className="w-full h-full overflow-y-scroll relative">
                {!turnOnMap && <ListContainerOhneL getData={getData} />}
                {!Boolean(search) && (
                  <div className="fixed bottom-2 left-2 flex items-end">
                    <div className={`relative justify-center items-center hidden pt-10 lg:flex w-[calc(3vw+130px)] ${openVerotung ? "aspect-square" : "h-fit"} bg-white rounded-2xl border-2 border-black z-[1000] overflow-hidden`}>
                      {openVerotung && <div className="absolute w-24 top-0 left-0 py-4 px-3 z-[1000] text-xl leading-5 font-semibold">{panelDatas.verortungbtntext}</div>}
                      {openVerotung && <div onClick={onTurOnMap} className="cursor-pointer w-1/2 aspect-square bg-white hover:bg-black rounded-full border-2 border-black"></div>}

                      <div onClick={() => setOpenVerortung((prev) => !prev)} className={`cursor-pointer absolute ${openVerotung ? "w-fit" : "w-full"} bottom-0 left-0 py-2 px-3 z-[1000] text-xl leading-5 font-semibold`}>
                        {openVerotung && (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                          </svg>
                        )}
                        {!openVerotung && (
                          <span className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                              <path fillRule="evenodd" d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z" clipRule="evenodd" />
                            </svg>
                            <div className="text-xs">{panelDatas.verortungbtntext}</div>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <ListContainer bundeslandtext={panelDatas.bundeslandinfo} turnOnMap={turnOnMap} doubleScreenTouched={doubleScreenTouched} getData={getData} clickedItemsList={clickedItemsList} />
      {/* Orga page */}
      <OrgaPage getData={getData} noLGetData={[...kqlDataResultNoLocation, ...dataN]} turnOnMap={turnOnMap} setTurnOnMap={setTurnOnMap} panelDatas={panelDatas} />
    </main>
  );
};

export default Wrapper;
