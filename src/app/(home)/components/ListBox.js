import { clickedItemsListAtom, clikedMarkerAtom } from "@/app/utils/state";
import { useRouter } from "next/navigation";
import { useRecoilValue, useSetRecoilState } from "recoil";

const ListBox = ({ index, value }) => {
  const clickedItemsListset = useSetRecoilState(clickedItemsListAtom);
  const router = useRouter();
  const getClikedMarkerAtom = useRecoilValue(clikedMarkerAtom);
  const onClick = (value) => {
    clickedItemsListset([value.id]);
    router.push(`?organisation=${value.id}`);
  };
  return (
    <div className={`w-full relative z-[${index}] flex items-start justify-start`}>
      {value.visible && (
        <>
          <div style={{ backgroundColor: `${getClikedMarkerAtom === value.id ? value.bgColor : "white"}`, borderColor: `${value.bgColor}` }} className="w-24 h-40 border-2 border-r-0 rounded-l-3xl -mt-14 "></div>
          <div onClick={() => onClick(value)} style={{ color: `${value.bgColor}`, borderColor: `${value.bgColor}` }} className="flex-1 min-h-64 border-2 cursor-pointer p-2 rounded-r-3xl rounded-b-3xl bg-white -mt-14 relative">
            {/* <div style={{ backgroundColor: `${getClikedMarkerAtom === value.id ? value.bgColor : "white"}` }} className="absolute top-0 left-0 w-24 h-24 border-2 border-black rounded-l-3xl -translate-x-full"></div> */}
            <div className="font-bold text-3xl mb-8">{value.organame}</div>
            {/* <div className="text-lg">{value.email}</div> */}
            <div className="text-stone-950 font-semibold text-sm">Bundesland: {value.bundesland}</div>
            {/* {clickedItemsList.some((v) => v === value.id) && <div>{value.aboutorga}</div>}
                  {clickedItemsList.some((v) => v === value.id) && <div>Category: {value.categories[0]}</div>} */}
          </div>
        </>
      )}
    </div>
  );
};

export default ListBox;
