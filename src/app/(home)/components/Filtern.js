import { clickedItemsListAtom } from "@/app/utils/state";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

const Filtern = ({ getData, categories }) => {
  const { register, handleSubmit, watch, setValue, getValues } = useForm();
  const clickedItemsList = useSetRecoilState(clickedItemsListAtom);
  const watchFilter = watch("myFilter");

  useEffect(() => {
    const foundIdList = [];

    for (let i = 0; i < getData.length; i++) {
      if (getData[i].categories.some((v) => v === watchFilter)) {
        foundIdList.push(getData[i].id);
      } else {
        // console.log("No words found.");
      }
    }
    clickedItemsList([...foundIdList]);
  }, [watchFilter]);

  return (
    <div className="lg:flex-1 aspect-square lg:aspect-auto h-full w-full flex items-center lg:px-4 border-l-2 border-black lg:border-l-0">
      <select defaultValue={"none"} {...register("myFilter")} className="bg-white w-full border-black rounded-xl focus:outline-none hidden lg:block ">
        <option value={"none"}>None</option>
        {categories.map((value, index) => {
          return (
            <option key={index} value={value}>
              {String(value.slice(0, 1)).toLocaleUpperCase()}
              {String(value.slice(1))}
            </option>
          );
        })}
      </select>
      <div className="flex-1 h-full aspect-square lg:hidden flex justify-center items-center cursor-pointer active:bg-black active:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
        </svg>
      </div>
    </div>
  );
};

export default Filtern;
