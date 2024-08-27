import { ICON_SIZE_2, ICON_STROKE_SIZE_3 } from "../../constant/iconSize";
import ResetIcon from "/public/assets/icons/reset.svg"


const SectionResetBtn = ({activeFilter, onResetSection, setSection, setRef, keyName }) => {
  return (
    <div onClick={() => onResetSection(setSection, setRef)} className={`${activeFilter[keyName] ? "flex" : "hidden"} filter_btn stroke-black hover:stroke-white`}>
      <ResetIcon style={{strokeWidth: ICON_STROKE_SIZE_3 ,width: ICON_SIZE_2, height: ICON_SIZE_2}} />
    </div>
  );
};

export default SectionResetBtn;
