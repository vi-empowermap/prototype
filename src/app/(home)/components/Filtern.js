import { clickedItemsListAtom } from "@/app/utils/state";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

const Filtern = ({getData, categories}) => {
  const { register, handleSubmit, watch, setValue, getValues } = useForm();
  const clickedItemsList = useSetRecoilState(clickedItemsListAtom)
  const watchFilter = watch("myFilter")

  useEffect(() => {
    const foundIdList = [];
    console.log(watchFilter)
    for (let i = 0; i < getData.length; i++) {
      
      if (getData[i].categories.some((v) => v === watchFilter)) {
        foundIdList.push(getData[i].id);
      } else {
        console.log("No words found.");
      }
    }
    clickedItemsList([...foundIdList]);
  },[watchFilter])
  

  return (
    <div className="flex-1 w-full flex items-center px-4">
      <select defaultValue={"none"} {...register("myFilter")} className="bg-white w-full border-black rounded-xl focus:outline-none">
        <option value={"none"}>None</option>
        {
          categories.map((value, index) => {
            return <option key={index} value={value}>{String(value.slice(0,1)).toLocaleUpperCase()}{String(value.slice(1))}</option>
          })
        }
      </select>
    </div>
  );
};

export default Filtern;
