import { clickedItemsListAtom, onOrgaFilterAtom, onSearchFilterAtom } from "@/app/utils/state";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const Search = ({ turnOnMap, getData, setData, setDataForMarker, placeholdertext }) => {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const clickedItemsList = useSetRecoilState(clickedItemsListAtom);
  const [getOnSearchFilter, setOnSearchFilter] = useRecoilState(onSearchFilterAtom);
  const [getOrgaFilter, setOrgaFilter] = useRecoilState(onOrgaFilterAtom);
  const [getFoundIdList, setFoundList] = useState(0);
  // const getClikedMarkerAtom = useRecoilValue(clikedMarkerAtom);
  const onResetFilter = () => {
    const data = [...getData];
    for (let i = 0; i < data.length; i++) {
      data[i].filterVisible = true;
    }
    setData(data);
    setDataForMarker(data);
    setValue("search", "");
    setOnSearchFilter(false);
    setFoundList(0);
  };
  /* Reset: if click Verortung Btn, Reset Button and Filtern Btn */
  useEffect(() => {
    onResetFilter();
  }, [turnOnMap]);
  useEffect(() => {
    if (getOrgaFilter) {
      setValue("search", "");
      setOnSearchFilter(false);
      setFoundList(0);
    }
  }, [getOrgaFilter]);
  const onSearchRegex = () => {
    function escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    const value = getValues("search");

    const pattern = new RegExp(escapeRegExp(value), "gi");

    const foundIdList = [];

    const data = [...getData];
    for (let i = 0; i < data.length; i++) {
      data[i].filterVisible = true;
    }
    for (let i = 0; i < data.length; i++) {
      const matches = String(data[i].aboutorga + " " + data[i].organame).match(pattern);
      if (matches) {
        data[i].filterVisible = true;
        foundIdList.push(data[i].id);
      } else {
        data[i].filterVisible = false;
        console.log("No words found.");
      }
    }

    setData(data);
    setDataForMarker(data);
    console.log(foundIdList);
    setFoundList(foundIdList.length);
    setOnSearchFilter(true);
    setOrgaFilter(false);
    // clickedItemsList([...foundIdList]);

    // done
    // setValue("search", "");
  };

  const onSubmit = () => {
    onSearchRegex();
  };

  return (
    <div className="lg:flex-1 aspect-square h-full lg:aspect-auto lg:w-full flex items-center lg:border-b-2 border-black lg:pl-4">
      <div className="w-full h-full hidden lg:flex items-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full flex items-center ">
          <input type="text" {...register("search")} placeholder={placeholdertext} className="bg-white w-full border-black rounded-xl focus:outline-none " />
        </form>
        {getOnSearchFilter && (
          <div className="px-8">
            <div className="bg-black text-white w-fit min-w-10 aspect-square flex items-center justify-center rounded-full">{getFoundIdList}</div>
          </div>
        )}
        {getOnSearchFilter && (
          <button onClick={onResetFilter} className={`cursor-pointer px-10 h-full flex items-center hover:bg-black hover:text-white transition-all border-l-2 border-black`}>
            reset
          </button>
        )}
      </div>
      <div className="flex-1 flex h-full lg:hidden justify-center items-center cursor-pointer active:bg-black active:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </div>
    </div>
  );
};

export default Search;
