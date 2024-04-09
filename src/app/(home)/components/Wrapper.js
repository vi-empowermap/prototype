"use client"

import { useEffect } from "react";
import LeafletMap from "./map";
import { useRecoilValue } from "recoil";
import { nameState } from "@/app/utils/state";

/* CSR: NO SSR */


const Wrapper = () => {
    const value = useRecoilValue(nameState)
    useEffect(() => {
        console.log(value)
    },[])
  return (
    <main className="flex w-screen h-screen bg-slate-300">
      <div className="flex flex-col flex-1 bg-red-400 h-full">
        <nav className="w-full bg-green-400 h-36 flex">
          <h1 className="bg-blue-300 text-4xl md:text-6xl lg:text-7xl font-bold flex items-center px-4 border-r-2 border-black">
            <span>EMPOWER MAP</span>
          </h1>
          <div className="flex flex-col text-2xl font-semibold bg-blue-300 flex-grow">
            <div className="flex-1 w-full flex items-center border-b-2 border-black px-4">
              <span>Suchen</span>
            </div>
            <div className="flex-1 w-full flex items-center px-4">
              <span>Filtern</span>
            </div>
          </div>
        </nav>
        <div className="flex-1 bg-violet-500 flex justify-center items-center overflow-hidden">
          <LeafletMap />
        </div>
      </div>
      <div className="w-[calc(350px+4vw)] h-full border-l-2 border-black">
        <div>List</div>
      </div>
    </main>
  );
};

export default Wrapper;