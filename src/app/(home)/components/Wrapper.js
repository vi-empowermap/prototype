"use client";

import { useEffect, useState } from "react";
import LeafletMap from "./map";
import { useRecoilState, useRecoilValue } from "recoil";
import { clickedItemsListAtom, dataAtom, nameState } from "@/app/utils/state";
import DynamicMiniMap from "./minimap";
import ListContainer from "./ListContainer";
import Search from "./Search";
import Filtern from "./Filtern";

/* CSR: NO SSR */

const Wrapper = ({data, categories}) => {
  const value = useRecoilValue(nameState);
  const [getData, setData] = useState(data)
  const [getDataForMarker, setDataForMarker] = useState(data)
  const clickedItemsList = useRecoilValue(clickedItemsListAtom)
  useEffect(() => {
    console.log(data)
   
  }, []);
  return (
    <main className="flex w-screen h-screen bg-white overflow-hidden">
      <div className="flex flex-col flex-1 bg-white h-full">
        <nav className="w-full bg-white h-36 flex border-b-2 border-black">
          <h1 className="bg-white text-4xl md:text-6xl lg:text-7xl font-bold flex items-center px-4 border-r-2 border-black">
            <span>EMPOWER MAP</span>
          </h1>
          <div className="flex flex-col text-2xl font-semibold bg-white flex-grow">
            <Search getData={getData} />
            <Filtern getData={getData} categories={categories} />
          </div>
        </nav>
        <div className="flex-1 bg-white flex justify-center items-center overflow-hidden relative">
          <LeafletMap data={getData} getDataForMarker={getDataForMarker} setData={setData}  />
          <div className="absolute bottom-4 left-4 w-80 aspect-square bg-white rounded-2xl border-2 border-black z-[1000] overflow-hidden">
            <DynamicMiniMap />
          </div>
        </div>
      </div>
      <ListContainer getData={getData} clickedItemsList={clickedItemsList} />
    </main>
  );
};

export default Wrapper;
