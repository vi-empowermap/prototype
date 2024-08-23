"use client";

import { useEffect, useRef, useState } from "react";
import LeafletMap from "./map";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { clickedItemsListAtom, clikedGoogleAtom, clikedMarkerAtom, closeOrgaAtom, currentBundesLand, geoLocationPermissionError, readyAniAtom, setViewAtom } from "@/app/utils/state";
import DynamicMiniMap from "./minimap";
import ListContainer from "./ListContainer";
import Search from "./Search";
import Filtern from "./Filtern";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRouter, useSearchParams } from "next/navigation";
import OrgaPage from "./OrgaPage";
import GoogleMapTag from "./GoogleMap";
import ListContainerOhneL from "./ListContainerOhneL";
import IntroCotainer from "./intro_page/IntroContainer";
import MapContainerHome from "./MapContainer";
import NavContainer from "./NavContainer";
import MapSubContainer from "./MapSubContainer";
import ControllerBtn from "./buttons/ControllerBtn";
import { ICON_SIZE, ICON_STROKE_SIZE } from "../constant/iconSize";
import CenterIcon from "/public/assets/icons/center.svg";
import { useForm } from "react-hook-form";
import GeolocationAlert from "./geoLocationPermissionWrapper";
const Wrapper = ({
  // data,
  // dataN,
  categories,
  kqlDataResult,
  kqlDataResultNoLocation,
  panelData: {
    result: { content: panelDatas },
  },
  totalCountOfBundesland,
}) => {
  gsap.registerPlugin(useGSAP);
  // const [getData, setData] = useState([...kqlDataResult, ...data]);
  // const [getDataForMarker, setDataForMarker] = useState([...kqlDataResult, ...data]);
  const container = useRef();
  const router = useRouter();
  const [ready, setReady] = useRecoilState(readyAniAtom);
  const [getData, setData] = useState([...kqlDataResult]);
  const [getDataForMarker, setDataForMarker] = useState([...kqlDataResult]);
  const [turnOnMap, setTurnOnMap] = useState(true);
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
      // gsap.to("#filterContainer", { delay: 1.5, opacity: 1, duration: aniDuration });
      gsap.to("#mapCotainer", { delay: 1.5, opacity: 1, duration: aniDuration });
      gsap.to("#listContainer", { delay: 1.5, opacity: 1, duration: aniDuration });
      // gsap.to("#listContainer2", { delay: 1.5, opacity: 1, transform: "translateX(0px)", duration: aniDuration });
      gsap.to("#navContainer", { delay: 1.5, opacity: 1, duration: aniDuration });
      gsap.to(".listbox", {
        delay: 1.5,
        opacity: 1,
        stagger: {
          each: 0.1,
          from: 0,
        },
        transform: "translateY(0px)",
      });
    }

    setTimeout(() => {
      setReady(true);
    }, 2500);
  });

  const pushIntroToAbout = () => {
    router.push("/about");
  };

  /* Switch Orga types */
  useEffect(() => {
    if (!turnOnMap) {
      setData([...kqlDataResultNoLocation]);
      setDataForMarker([...kqlDataResultNoLocation]);
      // setData([...kqlDataResultNoLocation, ...dataN]);
      // setDataForMarker([...kqlDataResultNoLocation, ...dataN]);
    } else {
      setData([...kqlDataResult]);
      setDataForMarker([...kqlDataResult]);
      // setData([...kqlDataResult, ...data]);
      // setDataForMarker([...kqlDataResult, ...data]);
    }
  }, [turnOnMap]);

  const onTurOnMap = () => {
    setTurnOnMap((pre) => !pre);
    setClickedMarkerAtom(-1);
    setClickedItemsList([]);
    setSetViewAtom({
      pos: [51.1657, 10.4515],
      name: "start",
    });
  };
  useEffect(() => {
    if(ready){
      setSetViewAtom({ pos: [51.1657, 10.4515], name: "start" });
    }
  },[ready])

  return (
    <main ref={container} className="flex flex-col lg:flex-row w-screen h-screen bg-white overflow-hidden relative">
      {/* Intro Page */}
      <IntroCotainer pushIntroToAbout={pushIntroToAbout} webtitle={panelDatas.webtitle} introbtn={panelDatas.introbtn} introtext={panelDatas.introtext} ready={ready} onClickReady={onClickReady} totalCountOfInstitution={kqlDataResult.length + kqlDataResultNoLocation.length} />
      {/* <GeolocationAlert ready={ready} /> */}
      <MapContainerHome>
        {/* Navigation BAR */}
        <NavContainer webtitle={panelDatas.webtitle} ready={ready}>
          <div className={`flex flex-row lg:flex-col text-2xl font-semibold bg-white w-fit flex-grow-0 lg:flex-grow border-l border-black `}>
            {/* <div className="w-[44px] h-[44px] border">t</div>
            <div className="w-[44px] h-[44px] border">t</div> */}
            <Search turnOnMap={turnOnMap} getData={getData} setData={setData} setDataForMarker={setDataForMarker} placeholdertext={panelDatas.placeholdersearch} resetText={panelDatas.freset} />
            <Filtern ready={ready} onTurOnMap={onTurOnMap} turnOnMap={turnOnMap} getData={getData} setData={setData} categories={categories} placeholdertext={panelDatas.placeholderfilter} panelTexts={panelDatas} resetText={panelDatas.freset} />
          </div>
        </NavContainer>
        <MapSubContainer search={search} turnOnMap={turnOnMap} orgaMapSize={orgaMapSize} ready={ready}>
          {/* Orga who has location info */}
          {turnOnMap && (
            <div onDoubleClick={onDoubleTouch} onTouchEnd={handleDoubleTap} className="w-full h-full lg:h-full flex justify-start border-b border-black">
              <LeafletMap doubleScreenTouched={doubleScreenTouched} data={getData} getDataForMarker={getDataForMarker} setData={setData} />
              {!Boolean(search) && (
                <div className="absolute bottom-6 left-4 flex items-end select-none pointer-events-none">
                  <div id="leaflet_minimap_container" className={`relative ${openMiniMap ? "pt-10" : "pt-10"} hidden lg:block w-[calc(3vw+310px)] ${openMiniMap ? "h-[calc(3vw+440px)]" : "h-fit"} bg-white rounded-2xl border border-black z-[1000] overflow-hidden pointer-events-auto`}>
                    {openMiniMap && <div className="absolute w-24 top-0 left-0 py-4 px-3 z-[1000] text-xl leading-5 font-semibold">{panelDatas.minimaptitle}</div>}
                    {openMiniMap && (
                      <>
                        {getCurrentBundesLand !== "" ? (
                          <div className="absolute flex justify-center items-center min-w-10 h-10 px-2 rounded-full top-4 right-3 z-[1000] text-2xl font-semibold bg-black text-white">{Boolean(totalCountOfBundesland[getCurrentBundesLand]) ? totalCountOfBundesland[getCurrentBundesLand] : 0}</div>
                        ) : (
                          <div className="absolute flex justify-center items-center min-w-10 h-10 px-2 rounded-full top-4 right-3 z-[1000] text-2xl font-semibold bg-black text-white">{kqlDataResult.length + kqlDataResultNoLocation.length}</div>
                        )}
                      </>
                    )}
                    {openMiniMap && <DynamicMiniMap />}
                    {openMiniMap && <GeolocationAlert ready={ready} />}
                    <ControllerBtn open={openMiniMap} setOpen={setOpenMiniMap} text={panelDatas.minimaptitle} />
                  </div>
                  <div className={`relative justify-center items-center hidden pt-10 lg:flex w-[calc(3vw+130px)] ${openVerotung ? "aspect-square" : "h-fit"} bg-white rounded-2xl border border-black z-[1000] overflow-hidden -ml-10 pointer-events-auto`}>
                    {openVerotung && <div className="absolute w-24 top-0 left-0 py-4 px-3 z-[1000] text-xl leading-5 font-semibold">{panelDatas.verortungbtntext}</div>}
                    {openVerotung && <div onClick={onTurOnMap} className="cursor-pointer w-1/2 aspect-square bg-white hover:bg-black rounded-full border border-black"></div>}
                    <ControllerBtn open={openVerotung} setOpen={setOpenVerortung} text={panelDatas.verortungbtntext} />
                  </div>
                  <div className={`relative justify-center items-center hidden pt-7 pb-3 lg:flex w-[calc(3vw+70px)] ${openCenter ? "aspect-square" : "h-fit"} bg-white rounded-2xl border border-black z-[1000] overflow-hidden -ml-6 pointer-events-auto`}>
                    {openCenter && <div className="absolute w-24 top-0 left-0 py-4 px-3 z-[1000] text-xl leading-5 font-semibold">{panelDatas.centerbtntext}</div>}
                    {openCenter && (
                      <div onClick={() => setSetViewAtom({ pos: [51.1657, 10.4515], name: "start" })} className="cursor-pointer w-1/3 aspect-square flex justify-center items-center stroke-black">
                        <CenterIcon style={{ strokeWidth: ICON_STROKE_SIZE, width: ICON_SIZE, height: ICON_SIZE }} />
                      </div>
                    )}
                    <ControllerBtn open={openCenter} setOpen={setOpenCenter} text={panelDatas.centerbtntext} />
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
                <ListContainerOhneL getData={getData} />
                {!Boolean(search) && (
                  <div className="fixed bottom-6 left-4 flex items-end">
                    <div className={`relative justify-center items-center hidden pt-10 lg:flex w-[calc(3vw+130px)] ${openVerotung ? "aspect-square" : "h-fit"} bg-white rounded-2xl border border-black z-[1000] overflow-hidden`}>
                      {openVerotung && <div className="absolute w-24 top-0 left-0 py-4 px-3 z-[1000] text-xl leading-5 font-semibold">{panelDatas.verortungbtntext}</div>}
                      {openVerotung && <div onClick={onTurOnMap} className="cursor-pointer w-1/2 aspect-square bg-white hover:bg-black rounded-full border border-black"></div>}
                      <ControllerBtn open={openVerotung} setOpen={setOpenVerortung} text={panelDatas.verortungbtntext} />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </MapSubContainer>
      </MapContainerHome>
      <ListContainer onTurOnMap={onTurOnMap} stadtText={panelDatas.stadtinfo} bundeslandtext={panelDatas.bundeslandinfo} turnOnMap={turnOnMap} doubleScreenTouched={doubleScreenTouched} getData={getData} clickedItemsList={clickedItemsList} noLGetData={[...kqlDataResultNoLocation]} />
      {/* Orga page */}
      <OrgaPage getData={getData} noLGetData={[...kqlDataResultNoLocation]} turnOnMap={turnOnMap} setTurnOnMap={setTurnOnMap} panelDatas={panelDatas} />
      {/* <OrgaPage getData={getData} noLGetData={[...kqlDataResultNoLocation, ...dataN]} turnOnMap={turnOnMap} setTurnOnMap={setTurnOnMap} panelDatas={panelDatas} /> */}
    </main>
  );
};

export default Wrapper;
