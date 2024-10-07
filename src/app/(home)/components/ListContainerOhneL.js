import {useEffect} from "react"
import ListBoxOhneL from "./ListBoxOhneL";

const ListContainerOhneL = ({ getData }) => {
 
  return (
    <div className={`w-full h-fit grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 auto-rows-auto p-2 gap-x-4 gap-y-4 pb-52`}>
      {/* {getData.length <= 0 && <div className="w-full text-center absolute left-0 top-1/2 -translate-y-1/2">No Data</div>} */}
      {getData.map((value, index) => {
        if(value.filterVisible){
        return <ListBoxOhneL key={index} value={value} />
        }
      })}
    </div>
  );
};

export default ListContainerOhneL;
