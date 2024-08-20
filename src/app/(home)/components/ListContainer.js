import { useRecoilValue } from "recoil";
import ListBox from "./ListBox";
import { clikedMarkerAtom, readyAniAtom } from "@/app/utils/state";
import { useEffect, useRef } from "react";

const ListContainer = ({onTurOnMap, turnOnMap, doubleScreenTouched, getData, bundeslandtext, stadtText, noLGetData }) => {
  const ready = useRecoilValue(readyAniAtom)
  const listContainerRef = useRef(null)
  const getClikedMarkerAtom = useRecoilValue(clikedMarkerAtom);
  useEffect(() => {
    if(listContainerRef.current){
      listContainerRef.current.scrollTop = 0;
    }
  },[getClikedMarkerAtom])
  return (
    <div id="listContainer" className={`relative w-full bg-white lg:border-l border-black lg:max-w-[calc(200px+20vw)] ${!doubleScreenTouched ? "h-1/2 min-h-[50vh]" : "h-[100px]"} lg:h-screen z-[1300] ${turnOnMap ? "block" : "hidden"}  ${ready ? "opacity-100": "opacity-0"}`}>
      <div id="listContainer2" ref={listContainerRef}  className={`absolute top-0 lg:-left-8 w-full lg:max-w-[calc(200px+20vw)] ${!doubleScreenTouched ? "h-full" : "h-[100px]"} lg:h-screen pt-20 px-2 lg:px-0 relative overflow-y-scroll z-[1300] no-scrollbar pb-8`}>
        {getData.length <= 0 && <div className="w-full text-center absolute left-0 top-1/2 -translate-y-1/2">No Data</div>}
        {getData.map((value, index) => {
          return <ListBox key={index} index={index} value={value} bundeslandtext={bundeslandtext} stadtText={stadtText} />;
        })}
        <div onClick={onTurOnMap} className="mt-4 w-full py-4 px-2 text-lg font-jetBrainsMono bg-white border round border-black rounded-lg select-none cursor-pointer hover:bg-black hover:text-white transition-all">Zeige Organisationen ohne Verortung</div>
      </div>
    </div>
  );
};

export default ListContainer;
