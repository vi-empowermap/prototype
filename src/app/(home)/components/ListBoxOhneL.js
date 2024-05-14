import { clickedItemsListAtom, readyAniAtom } from "@/app/utils/state";
import { useRouter } from "next/navigation";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ListBoxIcon from "./ListBoxIcon";

const ListBoxOhneL = ({ index, value }) => {
  const clickedItemsListset = useSetRecoilState(clickedItemsListAtom);
  const router = useRouter();
  const ready = useRecoilValue(readyAniAtom);
  const onClick = (value) => {
    clickedItemsListset([value.id]);
    router.push(`?organisation=${value.id}`);
  };

  return (
    <div style={{ borderColor: `${value.bgColor}` }} onClick={() => onClick(value)} className={`flex flex-col py-2 px-2 gap-4 w-full aspect-square border-2 border-black cursor-pointer rounded-2xl`}>
      <div className="flex flex-wrap gap-2 justify-center items-center">
        <div style={{ backgroundColor: `${value.bgColor}` }} className="w-8 h-8 bg-red-400"></div>
        <div style={{ color: `${value.bgColor}` }} className="text-2xl font-semibold">{value.organame}</div>
      </div>
      <div className="flex flex-grow items-center justify-center gap-4">
        {value.themenschwerpunkt &&
          value.themenschwerpunkt.slice(0, 3).map((val2, idx) => {
            return <ListBoxIcon key={idx} thema={val2} size={"big"} />;
          })}
      </div>
    </div>
  );
};

export default ListBoxOhneL;
