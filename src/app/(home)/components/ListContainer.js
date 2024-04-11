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
    <div id="listContainer" className="w-[calc(450px+4vw)] h-full border-l-2 border-black overflow-scroll py-8 pt-16">
      {getData.map((value, index) => {
        return (
          <div key={index} className={`relative px-8 z-[${index}]`}>
            {value.visible && (
              <>
                <div onClick={() => onClick(value)} className="w-full border-2 border-black cursor-pointer p-2 rounded-3xl bg-white -mt-8">
                  <div className="font-bold text-3xl mb-8">{value.organame}</div>
                  <div className="text-lg">{value.aboutorga}</div>
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
