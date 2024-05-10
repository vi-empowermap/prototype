import { useRecoilValue } from "recoil";
import ListBox from "./ListBox";
import { readyAniAtom } from "@/app/utils/state";

const ListContainer = ({ doubleScreenTouched, getData }) => {
  const ready = useRecoilValue(readyAniAtom)
  return (
    <div id="listContainer" className={`relative w-full bg-white lg:border-l-2 border-black lg:max-w-[calc(200px+20vw)] ${!doubleScreenTouched ? "h-1/2" : "h-[100px]"} lg:h-screen z-[1300] ${ready ? "opacity-100": "opacity-0"}`}>
      <div id="listContainer2"  className={`absolute top-0 lg:-left-8 w-full lg:max-w-[calc(200px+20vw)] ${!doubleScreenTouched ? "h-full" : "h-[100px]"} lg:h-screen pt-20 relative overflow-y-scroll z-[1300] no-scrollbar `}>
        {getData.length <= 0 && <div className="w-full text-center absolute left-0 top-1/2 -translate-y-1/2">No Data</div>}
        {getData.map((value, index) => {
          return <ListBox key={index} index={index} value={value} />;
        })}
      </div>
    </div>
  );
};

export default ListContainer;
{
  /* <div id="listContainer" className={`w-full bg-blue-200 lg:max-w-[calc(200px+20vw)] ${!doubleScreenTouched ? "h-full" : "h-[200px]"} lg:h-screen border-l-2 border-black pt-16 relative overflow-y-scroll`}>
    <div className={`w-full bg-blue-200 lg:max-w-[calc(200px+20vw)] ${!doubleScreenTouched ? "h-full" : "h-[200px]"} lg:h-screen border-l-2 border-black pt-16 relative overflow-y-scroll`}>
      {getData.length <= 0 && <div className="w-full text-center absolute left-0 top-1/2 -translate-y-1/2">No Data</div>}
      {getData.map((value, index) => {
        return (
          <ListBox key={index} index={index} value={value} />
        );
      })}
    </div>
    </div> */
}
