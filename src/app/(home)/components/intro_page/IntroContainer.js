import Logo from "../Logo";

const IntroCotainer = ({webtitle, introbtn, introtext, ready, onClickReady}) => {
  
  return(
    <div id="anitext" className={`px-8 fixed top-0 left-0 font-semibold w-screen h-screen z-[1800] ${ready ? "opacity-0 pointer-events-none" : "opacity-100"} flex flex-col bg-white`}>
      <div className="py-8">
        <Logo text={webtitle} />
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-10 w-full h-full mb-8">
        <div className="w-full h-full border border-black overflow-hidden flex justify-center items-center">
          <div className=" border border-black rounded-full flex justify-center items-center"> Map Image</div>
        </div>
        <div className="w-full lg:text-4xl lg:leading-10 font-jetBrainsMono font-normal">{introtext}</div>
      </div>
      <div className="flex justify-center mb-4">
        <div id="anibtn" onClick={onClickReady} className={`relative font-semibold cursor-pointer ${ready ? "opacity-0 pointer-events-none" : "opacity-100"} font-jetBrainsMono font-normal`}>
          {introbtn}
        </div>
      </div>
    </div>
  );
};

export default IntroCotainer;
