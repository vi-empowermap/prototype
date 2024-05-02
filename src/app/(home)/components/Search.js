import { clickedItemsListAtom } from "@/app/utils/state";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

const Search = ({ getData }) => {
  const { register, handleSubmit, watch, setValue, getValues } = useForm();
  const clickedItemsList = useSetRecoilState(clickedItemsListAtom);
  const onSearchRegex = () => {
    const value = getValues("search");

    const pattern = new RegExp(value, "gi");

    const foundIdList = [];
    for (let i = 0; i < getData.length; i++) {
      const matches = String(getData[i].aboutorga + " " + getData[i].organame).match(pattern);
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
    onSearchRegex();
  };

  return (
    <div className="lg:flex-1 aspect-square h-full lg:aspect-auto lg:w-full flex items-center lg:border-b-2 border-black lg:px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full hidden lg:block">
        <input type="text" {...register("search")} placeholder="write search query" className="bg-white w-full border-black rounded-xl focus:outline-none" />
      </form>
      <div className="flex-1 flex h-full lg:hidden justify-center items-center cursor-pointer active:bg-black active:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </div>
    </div>
  );
};

export default Search;
