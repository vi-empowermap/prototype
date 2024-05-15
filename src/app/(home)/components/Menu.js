import { useRouter } from "next/navigation";

const Menu = () => {
    const router = useRouter();
    const onPush = (path) => {
        router.push(path)
    }
  return (
    <div className="h-full px-2 flex justify-center items-center cursor-pointer hover:bg-black hover:text-white transition-all relative z-[1300] group">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
      <div className="hidden group-hover:flex flex-col absolute top-full left-0 h-fit bg-white border-y-2 lg:border-2 border-black text-black w-screen lg:w-fit">
        <div onClick={() => onPush("/about")} className="font-medium text-xl border-b-2 border-black px-2 py-2 hover:bg-black hover:text-white transition-all whitespace-nowrap text-center lg:text-start">About & Contact</div>
        <div className="font-medium text-xl border-b-2 border-black px-2 py-2 last:border-b-0 hover:bg-black hover:text-white transition-all whitespace-nowrap text-center lg:text-start">Imprint</div>
        <div className="font-medium text-xl border-b-2 border-black px-2 py-2 last:border-b-0 hover:bg-black hover:text-white transition-all whitespace-nowrap text-center lg:text-start">FAQ</div>
      </div>
    </div>
  );
};

export default Menu;