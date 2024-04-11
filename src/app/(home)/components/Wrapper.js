"use client";

import { useEffect, useRef, useState } from "react";
import LeafletMap from "./map";
import { useRecoilState, useRecoilValue } from "recoil";
import { clickedItemsListAtom, readyAniAtom, } from "@/app/utils/state";
import DynamicMiniMap from "./minimap";
import ListContainer from "./ListContainer";
import Search from "./Search";
import Filtern from "./Filtern";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useSearchParams } from "next/navigation";


/* CSR: NO SSR */

const Wrapper = ({data, categories, kqlDataResult}) => {
  gsap.registerPlugin(useGSAP);
  const container = useRef();
  const [ready, setReady] = useRecoilState(readyAniAtom);
  const [getData, setData] = useState([...kqlDataResult,...data])
  const [getDataForMarker, setDataForMarker] = useState([...kqlDataResult,...data])
  const clickedItemsList = useRecoilValue(clickedItemsListAtom)

  const searchParams = useSearchParams()
  const search = searchParams.get('organisation')
  
  const {contextSafe} = useGSAP({ scope: container }); 

  const onClickReady = contextSafe(() => {
    if(Boolean(search)){
      setReady(true)
    }
    
    if(!ready && !Boolean(search)){
      gsap.to("#filterContainer", {opacity: 1, duration: 0.7}); 
      gsap.to("#mapCotainer", {opacity: 1, duration: 0.7}); 
      gsap.to("#listContainer", {transform: "translateY(0)", duration: 0.7}); 
      gsap.to("#navContainer", {css: {"border-bottom": "2px solid black"}, duration: 0.7}); 

    }
    setReady(true)
  
  })
  useEffect(() => {
    console.log(search)
    console.log(kqlDataResult)
  
   
  }, []);
  return (
    <main ref={container} className="flex w-screen h-screen bg-white overflow-hidden relative">
      
      <div onClick={onClickReady} className={`fixed bottom-10 left-1/2 -translate-x-1/2 font-semibold cursor-pointer z-[1000] ${Boolean(search) ? "opacity-0 pointer-events-none" : "opacity-100"}`}>Zur Karte</div>
      <div className="flex flex-col flex-1 bg-white h-full">
        <nav id="navContainer" className="w-full bg-white h-36 flex border-b-2 border-white">
          <h1 className="bg-white text-4xl md:text-6xl lg:text-7xl font-bold flex items-center px-4 ">
            <span>EMPOWER MAP</span>
          </h1>
          <div id="filterContainer" className="flex flex-col text-2xl font-semibold bg-white flex-grow opacity-0 border-l-2 border-black">
            <Search getData={getData} />
            <Filtern getData={getData} categories={categories} />
          </div>
        </nav>
        <div id="mapCotainer" className={`flex-1 bg-white flex justify-center items-center overflow-hidden relative ${!Boolean(search) ? "opacity-0" : "opacity-100"}`}>
          <LeafletMap data={getData} getDataForMarker={getDataForMarker} setData={setData}  />
          <div className="absolute bottom-4 left-4 w-80 aspect-square bg-white rounded-2xl border-2 border-black z-[1000] overflow-hidden">
            <DynamicMiniMap />
          </div>
        </div>
      </div>
      <span className="">
        <ListContainer getData={getData} clickedItemsList={clickedItemsList} />
      </span>
    </main>
  );
};

export default Wrapper;
