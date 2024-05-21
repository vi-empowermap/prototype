import { useRouter } from "next/navigation";
const Logo = ({ text }) => {
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
    <h1 onClick={onClick} className="w-fit bg-white text-xl md:text-4xl lg:text-6xl font-bold flex items-center lg:px-4 pr-2 py-2 lg:py-0 cursor-pointer hover:bg-black hover:text-white transition-all">
      <span className="font-bespokeStencil">{String(text).toUpperCase().slice(0, 7)}</span>
      <span className="font-britney">{String(text).toUpperCase().slice(7)}</span>
    </h1>
  );
};
export default Logo;
