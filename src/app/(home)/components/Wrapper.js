"use client";

import { useEffect, useState } from "react";
import LeafletMap from "./map";
import { useRecoilValue } from "recoil";
import { nameState } from "@/app/utils/state";
import DynamicMiniMap from "./minimap";

/* CSR: NO SSR */

const Wrapper = ({data}) => {
  const value = useRecoilValue(nameState);
  const [getData, setData] = useState([...data])
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <main className="flex w-screen h-screen bg-white">
      <div className="flex flex-col flex-1 bg-white h-full">
        <nav className="w-full bg-white h-36 flex border-b-2 border-black">
          <h1 className="bg-white text-4xl md:text-6xl lg:text-7xl font-bold flex items-center px-4 border-r-2 border-black">
            <span>EMPOWER MAP</span>
          </h1>
          <div className="flex flex-col text-2xl font-semibold bg-white flex-grow">
            <div className="flex-1 w-full flex items-center border-b-2 border-black px-4">
              <span>Suchen</span>
            </div>
            <div className="flex-1 w-full flex items-center px-4">
              <span>Filtern</span>
            </div>
          </div>
        </nav>
        <div className="flex-1 bg-white flex justify-center items-center overflow-hidden relative">
          <LeafletMap data={getData} />
          <div className="absolute bottom-4 left-4 w-80 aspect-square bg-white rounded-2xl border-2 border-black z-[1000] overflow-hidden">
            <DynamicMiniMap />
          </div>
        </div>
      </div>
      <div className="w-[calc(350px+4vw)] h-full border-l-2 border-black">
        <div>List</div>
      </div>
    </main>
  );
};

export default Wrapper;
