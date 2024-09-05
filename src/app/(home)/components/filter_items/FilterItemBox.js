import FilterAddBtn from "./FilterAddBtn";
import SectionResetBtn from "./SectionResetBtn";

const FilterItemBox = ({ 
    activeFilter, 
    onActiveFilter, 
    onResetSection, 
    setSection, 
    setRef, 
    keyName,
    arrayData,
    titleName,
    turnOnMap,
    locationBox,
    categoryName,
    onClickFilterItem,
    selectList,
    top=false,
    sTop=false
}) => {
  return (
    <>
    {(locationBox ? turnOnMap : true) && <div className="filter_item_box">
      <div className="filter_sub_item_box_wrapper">
        <div className={`filter_item_box_title ${top && "lg:border-t-0"} ${(!top && sTop && !turnOnMap) && "lg:border-t-0"} ${activeFilter[keyName] ? "border-b" : "border-b-0"}`}>
          <div className="filter_btn_wrapper ">
            <FilterAddBtn onActiveFilter={onActiveFilter} activeFilter={activeFilter} keyName={keyName} />
            <SectionResetBtn activeFilter={activeFilter} onResetSection={onResetSection} setSection={setSection} setRef={setRef} keyName={keyName} />
          </div>
          <div onClick={() => onActiveFilter(keyName)} className="filter_box_title w-full flex items-center gap-3">
            <div className={`${selectList.length > 0 ? "text-black" : "text-neutral-500"}`}>{titleName}</div>{selectList.length > 0 && <div className="min-w-[20px] max-w-[40px] overflow-hidden aspect-square bg-black text-white text-sm flex justify-center items-center rounded-full">{selectList.length > 9 ? "9+" : selectList.length}</div>}
          </div>
        </div>
        {activeFilter[keyName] && (
          <div className="filter_sub_item_box">
            {[...arrayData.sort()].map((value, idx) => {
              const ok = selectList.some((v) => v === value);
              return (
                <div key={idx} onClick={() => onClickFilterItem({ category: categoryName, value: value })} className={`filter_item ${ok ? "bg-black text-white" : "bg-white text-black"} break-all`}>
                  {value}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>}
    </>
  );
};

export default FilterItemBox;
