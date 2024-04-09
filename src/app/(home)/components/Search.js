import { clickedItemsListAtom } from "@/app/utils/state";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

const Search = ({getData}) => {
  const { register, handleSubmit, watch, setValue, getValues } = useForm();
  const clickedItemsList = useSetRecoilState(clickedItemsListAtom)
  const onSearchRegex = () => {
   
    const value = getValues("search");

    const pattern = new RegExp(value, "gi");

    const foundIdList = [];
    for (let i = 0; i < getData.length; i++) {
      const matches = String(getData[i].description + " " + getData[i].name).match(pattern);
      if (matches) {
        foundIdList.push(getData[i].id);
      } else {
        console.log("No words found.");
      }
    }
    clickedItemsList([...foundIdList]);

    // done
    setValue("search", "");
  };

  const onSubmit = () => {
    onSearchRegex()
  }

  return (
    <div className="flex-1 w-full flex items-center border-b-2 border-black px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <input type="text" {...register("search")} placeholder="write search query" className="bg-white w-full border-black rounded-xl focus:outline-none" />
      </form>
    </div>
  );
};

export default Search;
