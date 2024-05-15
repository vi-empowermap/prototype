import { clickedItemsListAtom, clikedMarkerAtom, onSearchFilterAtom, readyAniAtom } from "@/app/utils/state";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import ListBoxIcon from "./ListBoxIcon";
import gsap from "gsap";
import { RANDOM_FONT_LIST } from "../constant/fontList";

const ListBox = ({ index, value, bundeslandtext }) => {
  const [getClickedItemList, clickedItemsListset] = useRecoilState(clickedItemsListAtom);
  const router = useRouter();
  const ready = useRecoilValue(readyAniAtom);

  const [getOnSearchFilter, setOnSearchFilter] = useRecoilState(onSearchFilterAtom)
  const getClikedMarkerAtom = useRecoilValue(clikedMarkerAtom);
  const onClick = (value) => {
    clickedItemsListset([value.id]);
    router.push(`?organisation=${value.id}`);
  };
 

  return (
    <div className={`listbox w-full relative z-[${index}] group flex items-start justify-start ${ready ? "translate-y-0 opacity-100 " : "translate-y-[150%] opacity-0"}`}>
      {value.visible && value.filterVisible && (
        <>
          <div style={{ backgroundColor: `${getClikedMarkerAtom === value.id ? value.bgColor : "white"}`, borderColor: `${value.bgColor}` }} className="w-24 h-40 flex flex-col gap-4 justify-center items-center border-2 border-r-0 rounded-l-3xl -mt-14 group-hover:-translate-y-6 transition-all">
            {value.themenschwerpunkt &&
              value.themenschwerpunkt.slice(0, 3).map((val2, idx) => {
                return <ListBoxIcon key={idx} thema={val2} />;
              })}
          </div>
          <div onClick={() => onClick(value)} style={{ color: `${value.bgColor}`, borderColor: `${value.bgColor}` }} className="flex-1 min-h-64 border-2 cursor-pointer p-2 rounded-r-3xl rounded-b-3xl bg-white -mt-14 relative group-hover:-translate-y-6 transition-all">
            {/* <div style={{ backgroundColor: `${getClikedMarkerAtom === value.id ? value.bgColor : "white"}` }} className="absolute top-0 left-0 w-24 h-24 border-2 border-black rounded-l-3xl -translate-x-full"></div> */}
            <div className={`text-3xl mb-8 ${value.font}`}>{value.organame}</div>
            {/* <div className="text-lg">{value.email}</div> */}
            {!getOnSearchFilter && <div className="text-stone-950 font-semibold text-sm">
              {String(bundeslandtext).slice(0, 1).toUpperCase()}
              {String(bundeslandtext).slice(1)}: {value.bundesland}
            </div>}
            {
              getOnSearchFilter && <div className="text-black">{String(value.aboutorga).slice(0, 200)}{String(value.aboutorga).length > 200 && "..."}</div>
            }
            {/* {clickedItemsList.some((v) => v === value.id) && <div>{value.aboutorga}</div>}
                  {clickedItemsList.some((v) => v === value.id) && <div>Category: {value.categories[0]}</div>} */}
          </div>
        </>
      )}
    </div>
  );
};

export default ListBox;
