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
            <SectionResetBtn onResetSection={onResetSection} setSection={setSection} setRef={setRef} />
          </div>
          <div onClick={() => onActiveFilter(keyName)} className="filter_box_title w-full">
            {titleName}
          </div>
        </div>
        {activeFilter[keyName] && (
          <div className="filter_sub_item_box">
            {[...arrayData.sort()].map((value, idx) => {
              const ok = selectList.some((v) => v === value);
              return (
                <div key={idx} onClick={() => onClickFilterItem({ category: categoryName, value: value })} className={`filter_item ${ok ? "bg-black text-white" : "bg-white text-black"}`}>
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
