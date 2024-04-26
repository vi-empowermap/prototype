import ListBox from "./ListBox"

const ListContainer = ({ doubleScreenTouched, getData }) => {

  return (
    <div id="listContainer" className={`w-full lg:w-[calc(200px+20vw)] ${!doubleScreenTouched ? "h-full" : "h-[200px]"} lg:h-screen border-l-2 border-black py-8 pt-16 relative overflow-y-scroll pl-24`}>
      {getData.length <= 0 && <div className="w-full text-center absolute left-0 top-1/2 -translate-y-1/2">No Data</div>}
      {getData.map((value, index) => {
        return (
          <ListBox key={index} index={index} value={value} />
        );
      })}
    </div>
  );
};

export default ListContainer
