import Logo from "../Logo";

const IntroCotainer = ({ webtitle, introbtn, introtext, ready, onClickReady }) => {
  return (
    <div id="anitext" className={`fixed top-0 left-0 font-semibold w-screen h-screen max-h-screen min-h-screen overflow-y-scroll z-[1800] ${ready ? "opacity-0 pointer-events-none" : "opacity-100"} flex flex-col bg-white`}>
      <div className="w-screen h-screen max-h-screen min-h-screen px-4 lg:px-8 lg:py-4 flex flex-col">
        <div className="mb-2 lg:mb-4">
          <Logo text={webtitle} />
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-10 w-full flex-grow">
          <div className="flex-1 w-full h-full border border-black overflow-hidden flex justify-center items-center">
            
          </div>
          <div className="flex-1 lg:text-4xl lg:leading-10 font-jetBrainsMono font-normal">{introtext}</div>
        </div>
      </div>
      <div className="w-screen h-screen max-h-screen min-h-screen px-8 py-4 flex flex-col">
        <div className="flex justify-center">
          <div id="anibtn" onClick={onClickReady} className={`relative font-semibold cursor-pointer ${ready ? "opacity-0 pointer-events-none" : "opacity-100"} font-jetBrainsMono font-normal`}>
            {introbtn}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroCotainer;
