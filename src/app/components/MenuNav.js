"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Translator from "../(home)/components/menu/Translator";
import MenuIcon from "/public/assets/icons/menu.svg";
import { ICON_SIZE, ICON_STROKE_SIZE } from "../(home)/constant/iconSize";
import { useSetRecoilState } from "recoil";
import { readyAniAtom } from "../utils/state";

const MenuNav = ({
  kirbyPanelHomeData: {
    result: { content: data },
  },
}) => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const setReady = useSetRecoilState(readyAniAtom)

  const toggleMenu = () => {
    setOpenMobileMenu((prev) => !prev);
  };

  const onClick = (path) => {
    setReady(true)
    router.push(path);
  };

  const onPushHome = () => {
    router.push("/")
    const onReset = () => {
      window.location.reload()
    }
    setTimeout(onReset,300)
    clearTimeout(onReset)
 
 
  }
  return (
    <nav className="fixed top-0 left-0 flex justify-start items-center w-screen h-[44px] lg:h-[86px] border-b border-black bg-white z-[1800]">
      <div className="h-full px-2 hidden lg:flex justify-center items-center cursor-pointer hover:bg-black hover:text-white transition-all z-[1300] group  stroke-black active:stroke-white lg:hover:stroke-white">
        <MenuIcon style={{ strokeWidth: ICON_STROKE_SIZE, width: ICON_SIZE, height: ICON_SIZE }} />
        <div className="hidden group-hover:flex flex-col absolute top-full left-0 h-fit bg-white border-y lg:border border-black text-black w-screen lg:w-fit">
          {pathname !== "/" && (
            <div onClick={() => onClick("/")} className="font-medium text-xl border-b last:border-b-0 border-black px-2 py-2 hover:bg-black hover:text-white transition-all whitespace-nowrap text-center lg:text-start">
              Home
            </div>
          )}
          {pathname !== "/information" && (
            <div onClick={() => onClick("/information")} className="font-medium text-xl last:border-b-0 border-b border-black px-2 py-2 hover:bg-black hover:text-white transition-all whitespace-nowrap text-center lg:text-start">
              Information
            </div>
          )}
          {pathname !== "/imprint" && (
            <div onClick={() => onClick("/imprint")} className="font-medium text-xl border-b last:border-b-0 border-black px-2 py-2 hover:bg-black hover:text-white transition-all whitespace-nowrap text-center lg:text-start">
              Imprint
            </div>
          )}
          {pathname !== "/faq" && (
            <div onClick={() => onClick("/faq")} className="font-medium text-xl border-b border-black px-2 py-2 last:border-b-0 hover:bg-black hover:text-white transition-all whitespace-nowrap text-center lg:text-start">
              FAQ
            </div>
          )}
          {pathname !== "/einfache-sprache" && (
            <div onClick={() => onClick("/einfache-sprache")} className="font-medium text-xl border-b border-black px-2 py-2 last:border-b-0 hover:bg-black hover:text-white transition-all whitespace-nowrap text-center lg:text-start">
              Einfache Sprache
            </div>
          )}
          {/* <div className="font-medium text-xl border-b border-black px-2 py-2 last:border-b-0 hover:bg-black hover:text-white transition-all whitespace-nowrap text-center lg:text-start">
            <Translator />
          </div> */}
        </div>
      </div>
      <div onClick={toggleMenu} className="h-full px-2 flex lg:hidden justify-center items-center cursor-pointer active:bg-black active:text-white transition-all z-[1300] stroke-black active:stroke-white ">
        <MenuIcon style={{ strokeWidth: ICON_STROKE_SIZE, width: ICON_SIZE, height: ICON_SIZE }} />
        {openMobileMenu && (
          <div className="flex-col absolute top-full left-0 h-fit bg-white border-y lg:border border-black text-black w-screen lg:w-fit">
            {pathname !== "/" && (
              <div onClick={() => onClick("/")} className="font-medium text-xl border-b border-black last:border-b-0 px-2 py-2 hover:bg-black hover:text-white transition-all whitespace-nowrap text-center lg:text-start">
                Home
              </div>
            )}
            {pathname !== "/information" && (
              <div onClick={() => onClick("/information")} className="font-medium text-xl border-b last:border-b-0 border-black px-2 py-2 hover:bg-black hover:text-white transition-all whitespace-nowrap text-center lg:text-start">
                Information
              </div>
            )}
            {pathname !== "/imprint" && (
              <div onClick={() => onClick("/imprint")} className="font-medium text-xl border-b last:border-b-0 border-black px-2 py-2 hover:bg-black hover:text-white transition-all whitespace-nowrap text-center lg:text-start">
                Imprint
              </div>
            )}
            {pathname !== "/faq" && (
              <div onClick={() => onClick("/faq")} className="font-medium text-xl border-b border-black px-2 py-2 last:border-b-0 hover:bg-black hover:text-white transition-all whitespace-nowrap text-center lg:text-start">
                FAQ
              </div>
            )}
            {pathname !== "/einfache-sprache" && (
              <div onClick={() => onClick("/einfache-sprache")} className="font-medium text-xl border-b border-black px-2 py-2 last:border-b-0 hover:bg-black hover:text-white transition-all whitespace-nowrap text-center lg:text-start">
                Einfache Sprache
              </div>
            )}
            {/* <div className="font-medium text-xl border-b border-black px-2 py-2 last:border-b-0 hover:bg-black hover:text-white transition-all whitespace-nowrap text-center lg:text-start">
            <Translator />
          </div> */}
          </div>
        )}
      </div>
      <h1 onClick={onPushHome} className="`w-fit bg-white text-xl md:text-4xl lg:text-6xl px-4 font-bold flex h-full items-center cursor-pointer active:bg-black active:text-white lg:hover:bg-black lg:hover:text-white transition-all border-r border-black">
        <span className="font-bespokeStencil">{String(data.webtitle).toUpperCase().slice(0, 3)}</span>
        <span className="font-britney">{String(data.webtitle).toUpperCase().slice(3)}</span>
      </h1>
      <div onClick={() => onClick("/")} className="flex-grow px-2 h-full flex justify-center items-center cursor-pointer lg:text-2xl font-jetBrainsMonoMedium lg:hover:bg-black lg:hover:text-white transition-all duration-300">
        <div>Zur Karte</div>
      </div>
    </nav>
  );
};

export default MenuNav;
