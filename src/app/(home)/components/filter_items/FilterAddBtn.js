import { useState } from "react";
import { ICON_SIZE, ICON_STROKE_SIZE } from "../../constant/iconSize";
import Add from "/public/assets/icons/add.svg";
import Close from "/public/assets/icons/close.svg";

const FilterAddBtn = ({ onActiveFilter, activeFilter, keyName }) => {
  const [strokeColor, setStrokeColor] = useState("#000");
  return (
    <div onMouseEnter={() => setStrokeColor("#fff")} onMouseLeave={() => setStrokeColor("#000")} onClick={() => onActiveFilter(keyName)} className="filter_btn">
      {activeFilter[keyName] ? (
        <div>
        <Close style={{ strokeWidth: ICON_STROKE_SIZE, stroke: strokeColor, width: ICON_SIZE, height: ICON_SIZE, transitionProperty: "all", transitionIimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)", transitionDuration: "150ms" }} />
        </div>
      ) : (
        <div>
          <Add style={{ strokeWidth: ICON_STROKE_SIZE, stroke: strokeColor, width: ICON_SIZE, height: ICON_SIZE, transitionProperty: "all", transitionIimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)", transitionDuration: "150ms" }} />
        </div>
      )}
    </div>
  );
};

export default FilterAddBtn;
