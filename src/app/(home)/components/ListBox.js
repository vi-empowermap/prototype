import { clickedItemsListAtom, clikedMarkerAtom } from "@/app/utils/state";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

const ListBox = ({index, value}) => {
  const clickedItemsListset = useSetRecoilState(clickedItemsListAtom);
  const router = useRouter();
    const getClikedMarkerAtom = useRecoilValue(clikedMarkerAtom)
    const onClick = (value) => {
        clickedItemsListset([value.id]);
        router.push(`?organisation=${value.id}`);
      };
  return (
    <div className={`w-full relative px-8 z-[${index}]`}>
      {value.visible && (
        <>
          <div onClick={() => onClick(value)} style={{ color: `${value.bgColor}` }} className=" min-h-52 border-2 border-black cursor-pointer p-2 rounded-r-3xl bg-white -mt-8 relative">
            <div style={{ backgroundColor: `${getClikedMarkerAtom === value.id ? value.bgColor: "white"}` }} className="absolute top-0 left-0 w-24 h-24 border-2 border-black rounded-l-3xl -translate-x-full"></div>
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
};

export default ListBox;
