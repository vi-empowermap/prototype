import { useRouter } from "next/navigation";
import Translator from "./menu/Translator";
import MenuIcon from "/public/assets/icons/menu.svg";
import { ICON_SIZE, ICON_STROKE_SIZE } from "../constant/iconSize";
import { useState } from "react";
const Menu = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const router = useRouter();
  const onPush = (path) => {
    router.push(path);
  };

  const toggleMenu = () => {
    setOpenMobileMenu(prev => !prev)
  }

  return (
    <>
      <div className="h-full px-2 hidden lg:flex justify-center items-center cursor-pointer lg:hover:bg-black lg:hover:text-white active:bg-black active:text-white transition-all relative z-[1300] group select-none font-jetBrainsMono font-medium border-none border-black stroke-black active:stroke-white lg:hover:stroke-white">
        <MenuIcon style={{ strokeWidth: ICON_STROKE_SIZE, width: ICON_SIZE, height: ICON_SIZE }} />
        <div className="hidden lg:group-hover:flex flex-col absolute top-full left-0 h-fit bg-white border-y lg:border border-black text-black w-screen lg:w-fit">
          <div onClick={() => onPush("/about")} className="font-medium text-xl border-b border-black px-2 py-2 hover:bg-black hover:text-white transition-all whitespace-nowrap text-center lg:text-start">
            Information
          </div>
          <div onClick={() => onPush("/faq")} className="font-medium text-xl border-b border-black px-2 py-2 last:border-b-0 hover:bg-black hover:text-white transition-all whitespace-nowrap text-center lg:text-start">FAQ</div>
          {/* <div className="font-medium text-xl border-b border-black px-2 py-2 last:border-b-0 hover:bg-black hover:text-white transition-all whitespace-nowrap text-center lg:text-start">
            <Translator />
          </div> */}
        </div>
      </div>
      <div onClick={toggleMenu} className="h-full px-2 flex lg:hidden justify-center items-center cursor-pointer lg:hover:bg-black lg:hover:text-white active:bg-black active:text-white transition-all relative z-[1300] group select-none font-jetBrainsMono font-medium border-none border-black stroke-black active:stroke-white lg:hover:stroke-white">
        <MenuIcon style={{ strokeWidth: ICON_STROKE_SIZE, width: ICON_SIZE, height: ICON_SIZE }} />
        {openMobileMenu && (
          <div className="flex flex-col absolute top-full left-0 h-fit bg-white border-y lg:border border-black text-black w-screen lg:w-fit">
            <div onClick={() => onPush("/about")} className="font-medium text-xl border-b border-black px-2 py-2 hover:bg-black hover:text-white transition-all whitespace-nowrap text-center lg:text-start">
              Information
            </div>
            <div onClick={() => onPush("/faq")} className="font-medium text-xl border-b border-black px-2 py-2 last:border-b-0 hover:bg-black hover:text-white transition-all whitespace-nowrap text-center lg:text-start">FAQ</div>
            {/* <div className="font-medium text-xl border-b border-black px-2 py-2 last:border-b-0 hover:bg-black hover:text-white transition-all whitespace-nowrap text-center lg:text-start">
              <Translator />
            </div> */}
          </div>
        )}
      </div>
    </>
  );
};

export default Menu;
