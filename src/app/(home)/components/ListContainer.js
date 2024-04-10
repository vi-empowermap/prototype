import { clickedItemsListAtom } from "@/app/utils/state";
import { useRouter } from 'next/navigation'
import { useSetRecoilState } from "recoil";

const ListContainer = ({ getData, clickedItemsList }) => {
  const clickedItemsListset = useSetRecoilState(clickedItemsListAtom)
  const router = useRouter()
  const onClick = (value) => {
    clickedItemsListset([value.id])
    router.push(`/?organisation=${value.organame}`)
  
  }

  return (
    <div id="listContainer" className="w-[calc(350px+4vw)] h-full border-l-2 border-black overflow-scroll translate-y-full">
      {getData.map((value, index) => {
        return (
          <div key={index}>
            {value.visible && (
              <>
                <div onClick={() => onClick(value)} className="w-full border-b-2 border-black py-2 px-2 cursor-pointer">
                  <div>{value.organame}</div>
                  {clickedItemsList.some((v) => v === value.id) && <div>{value.aboutorga}</div>}
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
