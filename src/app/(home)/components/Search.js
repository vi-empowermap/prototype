import { clickedItemsListAtom, highLightWordAtom, onFilterMobileOpenAtom, onOrgaFilterAtom, onSearchFilterAtom, onSearchMobileOpenAtom } from "@/app/utils/state";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import SearchIcon from "/public/assets/icons/search.svg";
import { ICON_SIZE_2, ICON_STROKE_SIZE_3 } from "../constant/iconSize";
const Search = ({ turnOnMap, getData, setData, setDataForMarker, placeholdertext, resetText }) => {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const clickedItemsList = useSetRecoilState(clickedItemsListAtom);
  const [getOnSearchFilter, setOnSearchFilter] = useRecoilState(onSearchFilterAtom);
  const [getOrgaFilter, setOrgaFilter] = useRecoilState(onOrgaFilterAtom);
  const [getFoundIdList, setFoundList] = useState(0);
  const setHighLightWordAtom = useSetRecoilState(highLightWordAtom);

  /* Mobile */
  const mobileDiv = useRef(null);
  const [onFilterMobileOpen, setOnFilterMobileOpen] = useRecoilState(onFilterMobileOpenAtom);
  const [onSearchMobileOpen, setOnSearchMobileOpen] = useRecoilState(onSearchMobileOpenAtom);
  const [leftSize, setLeftSize] = useState(0);
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
    setOnSearchMobileOpen(false);
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
    if (value !== "") {
      const pattern = new RegExp(escapeRegExp(value), "gi");

      const foundIdList = [];

      setHighLightWordAtom(value);
      const data = [...getData];
      for (let i = 0; i < data.length; i++) {
        data[i].filterVisible = true;
      }
      for (let i = 0; i < data.length; i++) {
        const matches = String(data[i].aboutorga + " " + data[i].organame + " " + data[i].categories.join(" ")).match(pattern);

        if (Boolean(matches)) {
          data[i].filterVisible = true;
          foundIdList.push(data[i].id);
        } else {
          data[i].filterVisible = false;
        }
      }

      setData(data);
      setDataForMarker(data);

      setFoundList(foundIdList.length);
      setOnSearchFilter(true);
      setOrgaFilter(false);

      setOnSearchMobileOpen(false);
    }
  };

  const onSubmit = () => {
    onSearchRegex();
  };

  const onOpenMobile = () => {
    if (!onSearchMobileOpen) {
      setOnSearchMobileOpen(true);
    } else {
      setOnSearchMobileOpen(false);
    }
  };
  useEffect(() => {
    if (mobileDiv.current) {
      const rect = mobileDiv.current.getBoundingClientRect();
      setLeftSize(rect.x);
    }
  }, []);
  useEffect(() => {
    if (onFilterMobileOpen) {
      setOnSearchMobileOpen(false);
    }
  }, [onFilterMobileOpen]);
  useEffect(() => {
    const resizeEvent = () => {
      if (mobileDiv.current) {
        const rect = mobileDiv.current.getBoundingClientRect();
        setLeftSize(rect.x);
      }
    };
    window.addEventListener("resize", resizeEvent);

    return () => {
      window.removeEventListener("resize", resizeEvent);
    };
  }, []);

  return (
    <div className="lg:flex-1 aspect-square h-full lg:aspect-auto lg:w-full flex items-center lg:border-b border-black lg:pl-4 relative select-none font-jetBrainsMono font-medium">
      <div className="w-full h-full hidden lg:flex items-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full flex items-center ">
          <input type="text" {...register("search")} placeholder={placeholdertext} className="bg-white w-full border-black rounded-xl focus:outline-none font-jetBrainsMono font-medium" />
        </form>
        {getOnSearchFilter && (
          <div className="px-8">
            <div className="bg-black text-white w-fit min-w-10 aspect-square flex items-center justify-center rounded-full">{getFoundIdList}</div>
          </div>
        )}
        {getOnSearchFilter && (
          <button onClick={onResetFilter} className={`cursor-pointer px-10 h-full flex items-center hover:bg-black text-white  bg-[rgb(140,11,35)] transition-all border-l border-black`}>
            {resetText}
          </button>
        )}
      </div>

      <div ref={mobileDiv} className="flex-1 flex h-full lg:hidden justify-center items-center  z-[1800]">
        {onSearchMobileOpen && (
          <div style={{ left: `-${leftSize}px` }} className="absolute top-full w-screen border-y border-black bg-white text-black">
            <div className="py-4 px-4 flex">
              <div onClick={onResetFilter} className="cursor-pointer border border-black px-2 py-1 hover:bg-black text-white bg-[rgb(140,11,35)] transition-all">
                {resetText}
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full flex items-center py-4 border-t border-black px-4">
              <input type="text" {...register("search")} placeholder={placeholdertext} className="bg-white w-full border-black rounded-xl focus:outline-none " />
            </form>
          </div>
        )}
        <div onClick={onOpenMobile} className="w-full h-full flex justify-center items-center cursor-pointer stroke-black active:bg-black active:text-white relative">
          <SearchIcon style={{ strokeWidth: ICON_STROKE_SIZE_3, width: ICON_SIZE_2, height: ICON_SIZE_2 }} />
          {getOnSearchFilter && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
              <span className="translate-x-1/2 -translate-y-1/2 bg-black text-white min-w-5 min-h-5 text-xs flex justify-center items-center border border-white rounded-full">{String(getFoundIdList).length > 5 ? String(getFoundIdList).slice(0, 5) : String(getFoundIdList)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
