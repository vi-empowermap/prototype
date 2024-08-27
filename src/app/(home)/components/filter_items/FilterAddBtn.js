import { ICON_SIZE } from "../../constant/iconSize";
import Add from "/public/assets/icons/add.svg";
import Close from "/public/assets/icons/close.svg";

const FilterAddBtn = ({ onActiveFilter, activeFilter, keyName }) => {
  return (
    <div onClick={() => onActiveFilter(keyName)} className={`filter_btn ${activeFilter[keyName] ? "flex flex-col": "hidden"} stroke-black hover:stroke-white`}>
      {activeFilter[keyName] ? (
        <div>
        <Close style={{ strokeWidth: "20px", width: ICON_SIZE, height: ICON_SIZE, transitionProperty: "all", transitionIimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)", transitionDuration: "150ms" }} />
        </div>
      ) : (
        <div>
        <Add style={{ strokeWidth: "20px", width: ICON_SIZE, height: ICON_SIZE, transitionProperty: "all", transitionIimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)", transitionDuration: "150ms" }} />
        </div>
      )}
    </div>
  );
};

export default FilterAddBtn;
