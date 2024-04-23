"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import LeafletMap from "./map";
import { useRecoilState, useRecoilValue } from "recoil";
import { clickedItemsListAtom, clikedGoogleAtom, readyAniAtom } from "@/app/utils/state";
import DynamicMiniMap from "./minimap";
import ListContainer from "./ListContainer";
import Search from "./Search";
import Filtern from "./Filtern";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useSearchParams } from "next/navigation";
import OrgaPage from "./OrgaPage";

/* CSR: NO SSR */

const Wrapper = ({ data, categories, kqlDataResult, kqlDataResultNoLocation }) => {
  gsap.registerPlugin(useGSAP);
  const container = useRef();
  const [ready, setReady] = useRecoilState(readyAniAtom);
  const [getData, setData] = useState([...kqlDataResult, ...data]);
  const [turnOnMap, setTurnOnMap] = useState(true);
  const [getDataForMarker, setDataForMarker] = useState([...kqlDataResult, ...data]);
  const [findMobile, setFindMobile] = useState(false);
  const clickedItemsList = useRecoilValue(clickedItemsListAtom);
  const [doubleScreenTouched, setDoubleScreenTouched] = useState(false);
  const getOrgaLocation = useRecoilValue(clikedGoogleAtom)
  /* Double touch */
  const [lastTap, setLastTap] = useState(null);
  const doubleTapDelay = 300; // milliseconds

  const handleDoubleTap = (event) => {
    if (window.innerWidth < 1024 && findMobile) {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;
      if (lastTap && tapLength < doubleTapDelay && tapLength > 0) {
        console.log("mobile");

        console.log("dd");
        setDoubleScreenTouched((pre) => !pre);
      }
      setLastTap(currentTime);
    } else {
      console.log("desktop");
    }
  };

  /* If u open this website by url with params then don't need an Animation */
  const searchParams = useSearchParams();
  const search = searchParams.get("organisation");

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

  useEffect(() => {
    if (!turnOnMap) {
      setData([...kqlDataResultNoLocation]);
      setDataForMarker([...kqlDataResultNoLocation]);
    } else {
      setData([...kqlDataResult, ...data]);
      setDataForMarker([...kqlDataResult, ...data]);
    }
  }, [turnOnMap]);

  useEffect(() => {
    console.log(kqlDataResultNoLocation);
    if (Boolean(search)) {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      // true for mobile device
      setFindMobile(true);
    } else {
      // false for not mobile device
      setFindMobile(false);
    }
  }, []);

  const onDoubleTouch = () => {
    if (window.innerWidth < 1024 && !findMobile) {
      setDoubleScreenTouched((pre) => !pre);
    } else {
      console.log("desktop");
    }
  };

  return (
    <main ref={container} className="flex flex-col lg:flex-row w-screen h-screen bg-white overflow-hidden relative">
      <div onClick={onClickReady} className={`fixed bottom-10 left-1/2 -translate-x-1/2 font-semibold cursor-pointer z-[1000] ${ready ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        Zur Karte
      </div>

      <div className="flex flex-col w-full h-full lg:w-[calc(100vw-(450px+4vw))] bg-white ">
        <nav id="navContainer" className={`w-full bg-white h-36 flex border-b-2  ${!ready ? "border-white" : "border-black"}`}>
          <h1 className="bg-white text-4xl md:text-6xl lg:text-7xl font-bold flex items-center px-4">
            <span>EMPOWER MAP</span>
          </h1>
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
          {turnOnMap && (
            <div key={doubleScreenTouched + Boolean(search)} onDoubleClick={onDoubleTouch} onTouchEnd={handleDoubleTap} className="w-full h-full flex justify-start">
              <LeafletMap data={getData} getDataForMarker={getDataForMarker} setData={setData} />
              {!Boolean(search) && (
                <div className="absolute hidden lg:block bottom-4 left-4 w-80 aspect-square bg-white rounded-2xl border-2 border-black z-[1000] overflow-hidden">
                  <DynamicMiniMap />
                </div>
              )}
              {Boolean(search) && (
                <a target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${getOrgaLocation[0]},${getOrgaLocation[1]}`} className="absolute hidden lg:flex lg:items-center lg:gap-2 bottom-4 left-4 bg-slate-100 rounded-lg px-3 py-1 border-2 border-black z-[1000] cursor-pointer">
                  <span>Open in Google Maps</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                    />
                  </svg>
                </a>
              )}
            </div>
          )}
          {!turnOnMap && (
            <>
              {getData.length > 0 && <div className="w-full h-full grid grid-cols-4"></div>}
              {getData.length === 0 && (
                <div className="w-full h-full flex justify-center items-center">
                  <div>no Data</div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <ListContainer doubleScreenTouched={doubleScreenTouched} getData={getData} clickedItemsList={clickedItemsList} />

      <OrgaPage getData={getData} />
    </main>
  );
};

export default Wrapper;
