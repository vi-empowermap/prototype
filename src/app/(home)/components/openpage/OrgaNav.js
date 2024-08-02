import { ICON_SIZE, ICON_STROKE_SIZE } from "../../constant/iconSize";
import Close from "/public/assets/icons/close.svg"
import Copy from "/public/assets/icons/copy.svg"

const OrgaNav = ({onClose}) => {
    const onCopyText = () => {
        navigator.clipboard.writeText(`${window.location.href}`);
        alert("Copied the Url: " + `${window.location.href}`);
      };
    return (
        <nav className="flex gap-4 justify-end p-4 lg:mb-2">
          
          <div onClick={onCopyText} className="cursor-pointer">
            <Copy style={{strokeWidth: ICON_STROKE_SIZE,stroke: "#000",width: ICON_SIZE, height: ICON_SIZE}} />
          </div>
          <div onClick={onClose} className="cursor-pointer">
            <Close style={{strokeWidth: ICON_STROKE_SIZE, stroke: "#000",width: ICON_SIZE, height: ICON_SIZE}} />
          </div>
          
        </nav>
    )
}

export default OrgaNav;