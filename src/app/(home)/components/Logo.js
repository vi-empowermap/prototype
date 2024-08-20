import { useRouter } from "next/navigation";
const Logo = ({ text, first=false }) => {
  const router = useRouter();
 
  const onClick = () => {
    
    router.push("/")
    const onReset = () => {
      window.location.reload()
    }
    setTimeout(onReset,300)
    clearTimeout(onReset)
  };
  return (
    <h1 onClick={onClick} className={`w-fit bg-white text-xl md:text-4xl lg:text-6xl font-bold flex items-center border-l-0 ${first && "lg:px-4"} border-black pr-2 py-2 lg:py-0 cursor-pointer lg:hover:bg-black lg:hover:text-white transition-all select-none`}>
      <span className="font-bespokeStencil">{String(text).toUpperCase().slice(0, 3)}</span>
      <span className="font-britney">{String(text).toUpperCase().slice(3)}</span>
    </h1>
  );
};
export default Logo;
