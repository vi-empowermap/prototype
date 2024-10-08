import useKirbyText from "@/app/utils/hooks/useKirbyText";
import Google from "/public/assets/icons/google.svg";
import { ICON_SIZE, ICON_STROKE_SIZE_2 } from "../constant/iconSize";
import { useState } from "react";
const GoogleMapTag = ({ lat, long, text }) => {
  const [strokeColor, setStrokeColor] = useState("#000");
  return (
    <a
      onMouseEnter={() => setStrokeColor("#fff")}
      onMouseLeave={() => setStrokeColor("#000")}
      target="_blank"
      href={`https://www.google.com/maps/search/?api=1&query=${lat},${long}`}
      className="absolute hidden lg:flex lg:items-center lg:gap-2 bottom-4 left-4 bg-slate-100 rounded-lg px-3 py-1 border border-black z-[1000] cursor-pointer hover:bg-black hover:text-white hover:stroke-white transition-all"
    >
      <span>{useKirbyText({ text: text })}</span>
      {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
        />
      </svg> */}
      <Google style={{ strokeWidth: ICON_STROKE_SIZE_2, stroke: strokeColor, width: ICON_SIZE, height: ICON_SIZE, transitionProperty: "all", transitionIimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)", transitionDuration: "150ms" }} />
    </a>
  );
};

export default GoogleMapTag;
