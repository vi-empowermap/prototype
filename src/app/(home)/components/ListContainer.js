import { clickedItemsListAtom } from "@/app/utils/state";
import { useSetRecoilState } from "recoil";

const ListContainer = ({ getData, clickedItemsList }) => {
    const clickedItemsListset = useSetRecoilState(clickedItemsListAtom)


  return (
    <div className="w-[calc(350px+4vw)] h-full border-l-2 border-black overflow-scroll">
      {getData.map((value, index) => {
        return (
          <div key={index}>
            {value.visible && (
              <>
                <div onClick={() => clickedItemsListset([value.id])} className="w-full border-b-2 border-black py-2 px-2 cursor-pointer">
                  <div>{value.name}</div>
                  {clickedItemsList.some((v) => v === value.id) && <div>{value.description}</div>}
                  {clickedItemsList.some((v) => v === value.id) && <div>Category: {value.categories[0]}</div>}
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
