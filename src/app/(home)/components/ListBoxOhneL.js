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
    <div onClick={() => onClick(value)} className="w-full aspect-square relative group">
      <div
        style={{ backgroundColor: `${value.bgColor}`, transformStyle: "preserve-3d" }}
        className={`absolute top-0 left-0 flex flex-col py-4 px-2 gap-4 w-full aspect-square  cursor-pointer rounded-2xl [transform:rotateY(180deg)] group-hover:[transform:rotateY(0deg)] transition-all origin-center duration-700`}
      >
        <div className="flex flex-1 items-center justify-center gap-4">
          <div className="w-8 h-8 bg-white rounded-full"></div>
        </div>
        <div className="flex flex-wrap gap-2 justify-center items-center">
          <div style={{}} className={`text-2xl font-semibold ${value.font} text-white`}>
            {value.organame}
          </div>
        </div>
      </div>
      <div style={{ borderColor: `${value.bgColor}`, backfaceVisibility: "hidden" }} className={`absolute top-0 left-0 flex flex-col py-2 px-2 gap-4 w-full aspect-square border-2 border-black cursor-pointer rounded-2xl group-hover:[transform:rotateY(180deg)] transition-all bg-white duration-700`}>
        <div className="flex flex-wrap gap-2 justify-center items-center">
          <div style={{ color: `${value.bgColor}` }} className={`text-2xl font-semibold ${value.font}`}>
            {value.organame}
          </div>
        </div>
        <div className="flex flex-grow items-center justify-center gap-4">
          {value.themenschwerpunkt &&
            value.themenschwerpunkt.slice(0, 3).map((val2, idx) => {
              return <ListBoxIcon key={idx} thema={val2} size={"big"} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default ListBoxOhneL;
