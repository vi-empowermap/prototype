"use client";
/* CSR: NO SSR */

import { useEffect, useRef, useState } from "react";
import LeafletMap from "./map";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { clickedItemsListAtom, clikedGoogleAtom, currentBundesLand, readyAniAtom, setViewAtom } from "@/app/utils/state";
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

const Wrapper = ({
  data,
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
  const clickedItemsList = useRecoilValue(clickedItemsListAtom);
  const [doubleScreenTouched, setDoubleScreenTouched] = useState(false);
  const getOrgaLocation = useRecoilValue(clikedGoogleAtom);
  const getCurrentBundesLand = useRecoilValue(currentBundesLand);
  const [openMiniMap, setOpenMiniMap] = useState(true);
  const [openVerotung, setOpenVerortung] = useState(true);
  const [openCenter, setOpenCenter] = useState(true);
  const setSetViewAtom = useSetRecoilState(setViewAtom);

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
    /* If the user comes on this website by url?query then turn off the animation */
    if (Boolean(search)) {
      setReady(true);
    }
  }, []);

  const { contextSafe } = useGSAP({ scope: container });
  const onClickReady = contextSafe(() => {
    if (!ready && !Boolean(search) && turnOnMap) {
      gsap.to("#filterContainer", { opacity: 1, duration: 0.7 });
      gsap.to("#mapCotainer", { opacity: 1, duration: 0.7 });
      gsap.to("#listContainer", { transform: "translateY(0)", duration: 0.7 });
      gsap.to("#navContainer", { css: { "border-bottom": "2px solid black" }, duration: 0.7 });
    }
    setTimeout(() => {
      setReady(true);
    }, 1000);
  });

  /* Switch Orga types */
  useEffect(() => {
    if (!turnOnMap) {
      setData([...kqlDataResultNoLocation]);
      setDataForMarker([...kqlDataResultNoLocation]);
    } else {
      setData([...kqlDataResult, ...data]);
      setDataForMarker([...kqlDataResult, ...data]);
    }
  }, [turnOnMap]);

  return (
    <main ref={container} className="flex flex-col lg:flex-row w-screen h-screen bg-white overflow-hidden relative">
      {/* Animation Button */}
      <div onClick={onClickReady} className={`fixed bottom-10 left-1/2 -translate-x-1/2 font-semibold cursor-pointer z-[1000] ${ready ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        Zur Karte
      </div>

      <div className="flex flex-col w-full h-full lg:w-[calc(100vw-(450px+4vw))] bg-white ">
        {/* Navigation BAR */}
        <nav id="navContainer" className={`w-full bg-white h-36 flex border-b-2  ${!ready ? "border-white" : "border-black"}`}>
          <Logo />
          <div id="filterContainer" className={`flex lg:flex-col text-2xl font-semibold bg-white flex-grow border-l-2 border-black ${!ready ? "opacity-0" : "opacity-100"}`}>
            <Search getData={getData} />
            <Filtern getData={getData} categories={categories} />
          </div>
        </nav>
        <div id="mapCotainer" className={`flex-1 bg-white flex justify-start items-center overflow-hidden relative ${!ready ? "opacity-0" : "opacity-100"}`}>
          <div onClick={() => setTurnOnMap((pre) => !pre)} className={`absolute top-4 right-4 z-[1000] cursor-pointer bg-black text-white p-1 rounded-lg ${turnOnMap ? "opacity-100" : "opacity-50"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-8 h-8">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
              />
            </svg>
          </div>
          {/* Orga who has location info */}
          {turnOnMap && (
            <div key={doubleScreenTouched + Boolean(search)} onDoubleClick={onDoubleTouch} onTouchEnd={handleDoubleTap} className="w-full h-full flex justify-start">
              <LeafletMap data={getData} getDataForMarker={getDataForMarker} setData={setData} />
              {!Boolean(search) && (
                <div id="leaflet_minimap_container" className={`absolute pt-10 hidden lg:block bottom-8 left-8 w-[calc(3vw+310px)] ${openMiniMap ? "aspect-square" : "h-fit"} bg-white rounded-2xl border-2 border-black z-[1000] overflow-hidden`}>
                  {openMiniMap && <div className="absolute w-24 top-0 left-0 py-4 px-3 z-[1000] text-xl leading-5 font-semibold">{panelDatas.minimaptitle}</div>}
                  {getCurrentBundesLand !== "" && (
                    <div className="absolute flex justify-center items-center w-10 h-10 rounded-full top-4 right-3 z-[1000] text-2xl leading-5 font-semibold bg-black text-white">{Boolean(totalCountOfBundesland[getCurrentBundesLand]) ? totalCountOfBundesland[getCurrentBundesLand] : 0}</div>
                  )}
                  {openMiniMap && <DynamicMiniMap />}
                  <div onClick={() => setOpenMiniMap((prev) => !prev)} className="cursor-pointer absolute w-fit bottom-0 left-0 py-2 px-3 z-[1000] text-xl leading-5 font-semibold">
                    {openMiniMap && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                      </svg>
                    )}
                    {!openMiniMap && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              )}
              {!Boolean(search) && (
                <div className={`absolute justify-center items-center hidden pt-10 lg:flex bottom-8 left-[calc(3vw+270px+2rem)] w-[calc(3vw+130px)] ${openVerotung ? "aspect-square" : "h-fit"} bg-white rounded-2xl border-2 border-black z-[1000] overflow-hidden`}>
                  {openVerotung && <div className="absolute w-24 top-0 left-0 py-4 px-3 z-[1000] text-xl leading-5 font-semibold">{panelDatas.verortungbtntext}</div>}
                  {openVerotung && <div onClick={() => setTurnOnMap((pre) => !pre)} className="cursor-pointer w-1/2 aspect-square bg-white hover:bg-black rounded-full border-2 border-black"></div>}

                  <div onClick={() => setOpenVerortung((prev) => !prev)} className="cursor-pointer absolute w-fit bottom-0 left-0 py-2 px-3 z-[1000] text-xl leading-5 font-semibold">
                    {openVerotung && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                      </svg>
                    )}
                    {!openVerotung && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              )}
              {!Boolean(search) && (
                <div className={`absolute justify-center items-center hidden pt-7 pb-3 lg:flex bottom-8 left-[calc(3vw+270px+2rem+(3vw+100px))] w-[calc(3vw+70px)] ${openCenter ? "aspect-square" : "h-fit"} bg-white rounded-2xl border-2 border-black z-[1000] overflow-hidden`}>
                  {openCenter && <div className="absolute w-24 top-0 left-0 py-4 px-3 z-[1000] text-xl leading-5 font-semibold">{panelDatas.centerbtntext}</div>}
                  {openCenter && (
                    <div onClick={() => setSetViewAtom({pos: [51.1657, 10.4515], name: "start"})} className="cursor-pointer w-1/3 aspect-square flex justify-center items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" />
                      </svg>
                    </div>
                  )}

                  <div onClick={() => setOpenCenter((prev) => !prev)} className="cursor-pointer absolute w-fit bottom-0 left-0 py-2 px-3 z-[1000] text-xl leading-5 font-semibold">
                    {openCenter && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                      </svg>
                    )}
                    {!openCenter && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              )}
              {Boolean(search) && <GoogleMapTag lat={getOrgaLocation[0]} long={getOrgaLocation[1]} />}
            </div>
          )}
          {/* Orga who doesn't have location info */}
          {!turnOnMap && (
            <>
              <div className="w-full h-full grid grid-cols-4 relative">
                {getData.length === 0 && <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">no Data</div>}
                {!Boolean(search) && (
                  <div className={`absolute justify-center items-center hidden pt-10 lg:flex bottom-8 left-8 w-[calc(3vw+130px)] ${openVerotung ? "aspect-square" : "h-fit"} bg-white rounded-2xl border-2 border-black z-[1000] overflow-hidden`}>
                    {openVerotung && <div className="absolute w-24 top-0 left-0 py-4 px-3 z-[1000] text-xl leading-5 font-semibold">{panelDatas.verortungbtntext}</div>}
                    {openVerotung && <div onClick={() => setTurnOnMap((pre) => !pre)} className="cursor-pointer w-1/2 aspect-square bg-white hover:bg-black rounded-full border-2 border-black"></div>}

                    <div onClick={() => setOpenVerortung((prev) => !prev)} className="cursor-pointer absolute w-fit bottom-0 left-0 py-2 px-3 z-[1000] text-xl leading-5 font-semibold">
                      {openVerotung && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                          <path fillRule="evenodd" d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                        </svg>
                      )}
                      {!openVerotung && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                          <path fillRule="evenodd" d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <ListContainer doubleScreenTouched={doubleScreenTouched} getData={getData} clickedItemsList={clickedItemsList} />
      {/* Orga page */}
      <OrgaPage getData={getData} turnOnMap={turnOnMap} />
    </main>
  );
};

export default Wrapper;
