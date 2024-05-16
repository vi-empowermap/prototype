import { clickedItemsListAtom, onOrgaFilterAtom, onSearchFilterAtom } from "@/app/utils/state";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { themenschwerpunktBP } from "../constant/blueprintOptionData";

const Filtern = ({ turnOnMap, getData, categories, placeholdertext }) => {
  const { register, handleSubmit, watch, setValue, getValues } = useForm();
  const [openFilter, setOpenFilter] = useState(false);
  const filterContainer = useRef(null);
  const [fHeight, setFHeight] = useState(0);
  const [getOrgaFilter, setOrgaFilter] = useRecoilState(onOrgaFilterAtom);
  const [getOnSearchFilter, setOnSearchFilter] = useRecoilState(onSearchFilterAtom);

  const onClick = () => {
    if (!getOrgaFilter) {
      setOrgaFilter(true);
      if (filterContainer.current) {
        setFHeight(filterContainer.current.clientHeight * 2);
      }
    } else {
      setOrgaFilter(false);
    }
  };
  /* Get Height */
  useEffect(() => {}, []);

  /* Reset */
  useEffect(() => {
    //reset
  }, [turnOnMap]);

  useEffect(() => {
    if (getOnSearchFilter) {
      //reset
    }
  }, [getOnSearchFilter]);
  return (
    <div ref={filterContainer} className="lg:flex-1 aspect-square lg:aspect-auto h-full w-full flex items-center lg:px-4 border-l-2 border-black lg:border-l-0 relative hover:bg-black hover:text-white transition-all z-[1300]">
      {
        <div onClick={onClick} className="hidden lg:flex gap-2 cursor-pointer w-full h-full items-center">
          <span>{placeholdertext}</span>
          <span className={`${!getOrgaFilter ? "rotate-0" : "rotate-180"} transition-transform duration-500`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </span>
        </div>
      }
      {getOrgaFilter && (
        <div
          style={{ maxHeight: `calc(100vh - ${fHeight}px)` }}
          className="absolute px-2 py-2 top-full left-full -translate-x-full lg:translate-x-0 lg:left-[-2px] text-black w-screen lg:w-[calc(100%+2px)] bg-white h-fit overflow-y-scroll border-b-2 border-l-0 lg:border-l-2 border-black border-t-2 border-r-0"
        >
          <div className="border-b-2 last:border-b-0 border-black py-2 mb-2">
            <div className="mb-4">
              <div>Nach Themenschwerpunkt</div>
              <div className="text-sm flex gap-4 flex-wrap mt-4">
                {Object.values(themenschwerpunktBP).map((value, idx) => {
                  return (
                    <div key={idx} className="border-2 border-black px-2 py-1 hover:bg-black hover:text-white transition-all cursor-pointer">
                      {value}
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <div>Nach Themenschwerpunkt</div>
              <div className="text-sm flex gap-4 flex-wrap mt-4">
                {Object.values(themenschwerpunktBP).map((value, idx) => {
                  return <div key={idx}>{value}</div>;
                })}
              </div>
            </div>
          </div>
          <div className="border-b-2 last:border-b-0 border-black py-2 mb-2">
            <div className="mb-4">
              <div>Nach Themenschwerpunkt</div>
              <div className="text-sm flex gap-4 flex-wrap mt-4">
                {Object.values(themenschwerpunktBP).map((value, idx) => {
                  return (
                    <div key={idx} className="border-2 border-black px-2 py-1 hover:bg-black hover:text-white transition-all cursor-pointer">
                      {value}
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <div>Nach Themenschwerpunkt</div>
              <div className="text-sm flex gap-4 flex-wrap mt-4">
                {Object.values(themenschwerpunktBP).map((value, idx) => {
                  return <div key={idx}>{value}</div>;
                })}
              </div>
            </div>
          </div>
          <div className="border-b-2 last:border-b-0 border-black py-2 mb-2">
            <div className="mb-4">
              <div>Nach Themenschwerpunkt</div>
              <div className="text-sm flex gap-4 flex-wrap mt-4">
                {Object.values(themenschwerpunktBP).map((value, idx) => {
                  return (
                    <div key={idx} className="border-2 border-black px-2 py-1 hover:bg-black hover:text-white transition-all cursor-pointer">
                      {value}
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <div>Nach Themenschwerpunkt</div>
              <div className="text-sm flex gap-4 flex-wrap mt-4">
                {Object.values(themenschwerpunktBP).map((value, idx) => {
                  return <div key={idx}>{value}</div>;
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filtern;
