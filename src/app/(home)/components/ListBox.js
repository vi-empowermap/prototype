import { clickedItemsListAtom, clikedMarkerAtom, highLightWordAtom, onSearchFilterAtom, readyAniAtom } from "@/app/utils/state";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import ListBoxIcon from "./ListBoxIcon";
import { RANDOM_FONT_LIST_SIZE } from "../constant/fontList";
import { bundeslandBP, themenschwerpunktBP } from "../constant/blueprintOptionData";

const ListBox = ({ index, value, bundeslandtext, stadtText }) => {
  const [getClickedItemList, clickedItemsListset] = useRecoilState(clickedItemsListAtom);
  const router = useRouter();
  const ready = useRecoilValue(readyAniAtom);
  const [getHBodyText, setGetHBodyText] = useState("");
  const getHighLightWordAtom = useRecoilValue(highLightWordAtom);

  const [getOnSearchFilter, setOnSearchFilter] = useRecoilState(onSearchFilterAtom);
  const getClikedMarkerAtom = useRecoilValue(clikedMarkerAtom);
  // const [randomIcon, setRandomIcon] = useState(0)
  const onClick = (value) => {
    clickedItemsListset([value.id]);
    router.push(`?organisation=${value.id}`);
  };
  // useEffect(() => {
  //   console.log(value.themenschwerpunkt)
  //   console.log(value.themenschwerpunkt_list_icon)
  //   setRandomIcon(value.themenschwerpunkt_list_icon)
  // },[getClikedMarkerAtom])
  useEffect(() => {
    if (value.filterVisible && getOnSearchFilter) {
      function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
      const pattern = new RegExp(escapeRegExp(getHighLightWordAtom), "gi");
      const matches = String(value.aboutorga).match(pattern);

      let text = String(value.aboutorga);

      let newText = "";
      let indexOfStartPoint = 0;
      if (Boolean(matches)) {
        for (let i = 0; i < matches.length; i++) {
          const indexN = text.indexOf(matches[i], indexOfStartPoint);
          indexOfStartPoint += indexN + 1;
          const before = text.slice(indexN - 30 <= 0 ? 0 : indexN - 30, indexN);
          const markerText = text.slice(indexN, indexN + matches[i].length);

          const after = text.slice(indexN + matches[i].length, indexN + matches[i].length + 30);
          newText = `${newText}${before}${`<span class="highlight">${markerText}</span>`}${after}${i !== matches.length - 1 && "..."}`;
        }
      } else {
        newText = text;
      }

      setGetHBodyText(newText);
    }
  }, [getHighLightWordAtom]);

  return (
    <div onClick={() => onClick(value)} className={`listbox w-full relative z-[${index}] group flex items-start justify-start ${ready ? "translate-y-0 opacity-100 " : "translate-y-[150%] opacity-0"} font-jetBrainsMono font-medium cursor-pointer`}>
      {value.visible && value.filterVisible && (
        <>
          <div style={{ backgroundColor: `${getClikedMarkerAtom === value.id ? value.bgColor : "white"}`, borderColor: `${value.bgColor}` }} className="w-fit h-fit flex flex-col gap-4 justify-center items-center border border-r-0 p-1 -mt-14 group-hover:-translate-y-6 transition-all duration-300">
            {/* {value.themenschwerpunkt &&
              value.themenschwerpunkt.slice(0, 1).map((val2, idx) => {
                return <ListBoxIcon key={idx} thema={val2} />;
              })} */}
            {value.themenschwerpunkt && <ListBoxIcon thema={value.themenschwerpunkt[value.themenschwerpunkt_list_icon]} color={getClikedMarkerAtom === value.id ? "white" : value.bgColor} />}
          </div>
          <div style={{ color: `${value.bgColor}`, borderColor: `${value.bgColor}` }} className="flex-1 min-h-44 max-h-44 lg:min-h-64 lg:max-h-64 overflow-hidden border cursor-pointer p-2 rounded-r-3xl rounded-b-3xl bg-white -mt-14 relative group-hover:-translate-y-6 transition-all group duration-300">
            <div
              style={{
                background: `linear-gradient(0deg, rgba(${value.bgColor.slice(4, value.bgColor.length - 1)},0.7) 0%, rgba(${value.bgColor.slice(4, value.bgColor.length - 1)},0.4) 10%, rgba(${value.bgColor.slice(4, value.bgColor.length - 1)},0.1) 20%, rgba(${value.bgColor.slice(
                  4,
                  value.bgColor.length - 1
                )},0.05) 25%, rgba(${value.bgColor.slice(4, value.bgColor.length - 1)},0.01) 28%, rgba(255,255,255,0) 30%)`,
              }}
              className="absolute top-0 left-0 pointer-events-none select-none bg-black w-full h-full translate-y-1/4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
            ></div>
            <div style={{ fontSize: `${RANDOM_FONT_LIST_SIZE[value.font]}px` }} className={`mb-4 ${value.font} flex items-center h-16`}>
              <div className="leading-none">
                {String(value.organameshortform).slice(0, 6)}
                {String(value.organameshortform).length > 6 && "..."}
              </div>
            </div>
            <div className="flex gap-2">
            {!getOnSearchFilter && (
              <div className="text-stone-950 font-medium text-sm">
                {/* {String(bundeslandtext).slice(0, 1).toUpperCase()}
                {String(bundeslandtext).slice(1).toLocaleLowerCase()}:  */}
                {String(bundeslandBP[value.bundesland]).slice(0, 1).toUpperCase() + String(bundeslandBP[value.bundesland]).slice(1).toLocaleLowerCase()},
              </div>
            )}
            {!getOnSearchFilter && (
              <div className="text-stone-950 font-medium text-sm">
                {/* {String(stadtText).slice(0, 1).toUpperCase()}
                {String(stadtText).slice(1)}:  */}
                {String(value.city).slice(0, 1).toUpperCase() + String(value.city).slice(1).toLocaleLowerCase()}
              </div>
            )}
            </div>
            {!getOnSearchFilter && <div className="text-stone-950 mt-2 hidden lg:flex flex-col flex-wrap font-medium text-sm">{value.themenschwerpunkt.map((v,idx) => {
              return <div key={idx} className="mr-1">{themenschwerpunktBP[v]}{(idx + 1) === value.themenschwerpunkt.length ? "" : ","}</div>
            })}</div>}
            {getOnSearchFilter && <div className="text-stone-950 font-medium text-sm" dangerouslySetInnerHTML={{ __html: `...${String(getHBodyText).slice(0, 300)}...` }}></div>}
          </div>
        </>
      )}
    </div>
  );
};

export default ListBox;
