import { useEffect, useState } from "react";
import { ICON_SIZE, ICON_STROKE_SIZE } from "../../constant/iconSize";
import Close from "/public/assets/icons/close.svg";
import Copy from "/public/assets/icons/copy.svg";

const OrgaNav = ({ onClose, color }) => {
  const [copied, setCopied] = useState(false);

  const onCopyText = () => {
    navigator.clipboard.writeText(`${window.location.href}`);
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    },800)
  };
  return (
    <nav className="flex gap-4 justify-end items-center p-4 lg:mb-2">
      {!copied && (
        <div onClick={onCopyText} className="cursor-pointer">
          <Copy style={{ strokeWidth: ICON_STROKE_SIZE, stroke: "#000", width: ICON_SIZE, height: ICON_SIZE }} />
        </div>
      )}
      {copied && <div style={{color: color}}>Link Copied!</div>}
      <div onClick={onClose} className="cursor-pointer">
        <Close style={{ strokeWidth: ICON_STROKE_SIZE, stroke: "#000", width: ICON_SIZE, height: ICON_SIZE }} />
      </div>
    </nav>
  );
};

export default OrgaNav;
