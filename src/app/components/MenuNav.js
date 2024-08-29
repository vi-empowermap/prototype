"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Translator from "../(home)/components/menu/Translator";

const MenuNav = ({kirbyPanelHomeData: {result: {content: data}}}) => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => {
    setOpenMobileMenu(prev => !prev)
  }

  const onClick = (path) => {
    router.push(path);
  };
  return (
    <nav className="fixed top-0 left-0 flex justify-center items-center w-screen h-[44px] bg-white">
      <div className="absolute top-0 left-0 h-full px-2 hidden lg:flex justify-center items-center cursor-pointer hover:bg-black hover:text-white transition-all z-[1300] group">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
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
          {pathname !== "/faq" && <div onClick={() => onClick("/faq")} className="font-medium text-xl border-b border-black px-2 py-2 last:border-b-0 hover:bg-black hover:text-white transition-all whitespace-nowrap text-center lg:text-start">FAQ</div>}
          {/* <div className="font-medium text-xl border-b border-black px-2 py-2 last:border-b-0 hover:bg-black hover:text-white transition-all whitespace-nowrap text-center lg:text-start">
            <Translator />
          </div> */}
        </div>
      </div>
      <div onClick={toggleMenu} className="absolute top-0 left-0 h-full px-2 flex lg:hidden justify-center items-center cursor-pointer active:bg-black active:text-white transition-all z-[1300]">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        {openMobileMenu && <div className="flex-col absolute top-full left-0 h-fit bg-white border-y lg:border border-black text-black w-screen lg:w-fit">
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
          {pathname !== "/faq" && <div onClick={() => onClick("/faq")} className="font-medium text-xl border-b border-black px-2 py-2 last:border-b-0 hover:bg-black hover:text-white transition-all whitespace-nowrap text-center lg:text-start">FAQ</div>}
          {/* <div className="font-medium text-xl border-b border-black px-2 py-2 last:border-b-0 hover:bg-black hover:text-white transition-all whitespace-nowrap text-center lg:text-start">
            <Translator />
          </div> */}
        </div>}
      </div>
      <h1 onClick={() => onClick("/")} className="`w-fit bg-white text-xl md:text-4xl px-4 font-bold flex h-full items-center cursor-pointer hover:bg-black hover:text-white transition-all">
        <span className="font-bespokeStencil">{String(data.webtitle).toUpperCase().slice(0, 3)}</span>
        <span className="font-britney">{String(data.webtitle).toUpperCase().slice(3)}</span>
      </h1>
    </nav>
  );
};

export default MenuNav;
