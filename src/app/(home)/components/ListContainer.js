import { clickedItemsListAtom } from "@/app/utils/state";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";

const ListContainer = ({ doubleScreenTouched, getData, clickedItemsList }) => {
  const clickedItemsListset = useSetRecoilState(clickedItemsListAtom);
  const router = useRouter();
  const onClick = (value) => {
    clickedItemsListset([value.id]);
    router.push(`?organisation=${value.id}`);
  };

  return (
    <div id="listContainer" className={`w-full lg:w-[calc(550px+4vw)] ${!doubleScreenTouched ? "h-full" : "h-[200px]"} lg:h-screen border-l-2 border-black py-8 pt-16 relative overflow-y-scroll pl-24`}>
      {getData.map((value, index) => {
        return (
          <div key={index} className={`w-full relative px-8 z-[${index}] `}>
            {value.visible && (
              <>
                <div onClick={() => onClick(value)} className=" min-h-52 border-2 border-black cursor-pointer p-2 rounded-r-3xl bg-white -mt-8 relative">
                  <div className="absolute top-0 left-0 w-24 h-24 border-2 border-black rounded-l-3xl -translate-x-full bg-white"></div>
                  <div className="font-bold text-3xl mb-8">{value.organame}</div>
                  <div className="text-lg">{value.email}</div>
                  {/* Error‼️ if turn off map */}
                  {/* {clickedItemsList.some((v) => v === value.id) && <div>{value.aboutorga}</div>}
                  {clickedItemsList.some((v) => v === value.id) && <div>Category: {value.categories[0]}</div>} */}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ListContainer;
