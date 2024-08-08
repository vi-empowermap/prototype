import { useState } from "react";
import { ICON_SIZE, ICON_STROKE_SIZE } from "../../constant/iconSize";
import Add from "/public/assets/icons/add.svg";
import Close from "/public/assets/icons/close.svg";

const FilterAddBtn = ({ onActiveFilter, activeFilter, keyName }) => {
  const [strokeColor, setStrokeColor] = useState("#000");
  const [strokeColor2, setStrokeColor2] = useState("#000");
  return (
    <div onMouseEnter={() => setStrokeColor("#fff")} onMouseLeave={() => setStrokeColor("#000")} onClick={() => onActiveFilter(keyName)} className="filter_btn">
      {activeFilter[keyName] ? (
        <div>
        <Close style={{ strokeWidth: ICON_STROKE_SIZE, stroke: strokeColor, width: ICON_SIZE, height: ICON_SIZE, transitionProperty: "all", transitionIimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)", transitionDuration: "150ms" }} />
          {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg> */}
        </div>
      ) : (
        <div>
          <Add style={{ strokeWidth: ICON_STROKE_SIZE, stroke: strokeColor, width: ICON_SIZE, height: ICON_SIZE, transitionProperty: "all", transitionIimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)", transitionDuration: "150ms" }} />
          {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg> */}
        </div>
      )}
    </div>
  );
};

export default FilterAddBtn;
