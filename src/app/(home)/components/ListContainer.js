import { clickedItemsListAtom } from "@/app/utils/state";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import ListBox from "./ListBox";

const ListContainer = ({ doubleScreenTouched, getData, clickedItemsList }) => {
  
 

  return (
    <div id="listContainer" className={`w-full lg:w-[calc(550px+4vw)] ${!doubleScreenTouched ? "h-full" : "h-[200px]"} lg:h-screen border-l-2 border-black py-8 pt-16 relative overflow-y-scroll pl-24`}>
      {getData.map((value, index) => {
        return (
          <ListBox key={index} index={index} value={value} />
        );
      })}
    </div>
  );
};

export default ListContainer;
