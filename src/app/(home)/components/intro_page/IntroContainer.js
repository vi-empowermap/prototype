import Logo from "../Logo";

const IntroCotainer = ({ webtitle, introbtn, introtext, ready, onClickReady }) => {
  return (
    <div id="anitext" className={`fixed top-0 left-0 font-semibold w-screen h-screen max-h-screen min-h-screen overflow-y-scroll z-[1800] ${ready ? "opacity-0 pointer-events-none" : "opacity-100"} flex flex-col bg-white`}>
      <div className="w-screen h-screen max-h-screen min-h-screen px-4 lg:px-8 lg:py-4 flex flex-col">
        <div className="mb-2 lg:mb-4">
          <Logo text={webtitle} />
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-10 w-full flex-grow">
          <div className="flex-1 w-full h-full border border-black overflow-hidden flex justify-center items-center"></div>
          <div className="flex-1 lg:text-4xl lg:leading-10 font-jetBrainsMono font-normal">{introtext}</div>
        </div>
      </div>
      <div className="w-screen h-fit px-8 py-4 flex flex-col relative">
        <div className="lg:text-4xl lg:leading-10 font-jetBrainsMono font-normal">About</div>
        <p className="lg:text-xl font-jetBrainsMono font-normal columns-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi viverra mi id quam tincidunt placerat. Praesent tortor felis, lacinia ut ligula eu, pulvinar consectetur massa. Suspendisse a eros convallis, lacinia odio a, mollis diam. Aliquam vitae sapien dapibus ex imperdiet eleifend. Sed
          cursus blandit pulvinar. Donec scelerisque dui ac magna ornare tincidunt. Curabitur vel condimentum diam. Suspendisse gravida tellus non enim molestie lobortis. Nunc et ullamcorper nisi. Mauris viverra condimentum lectus vel faucibus. Mauris vel libero nisl. Praesent non orci maximus,
          ultrices purus quis, bibendum mi. In tempor diam fringilla, accumsan leo et, posuere lectus. Donec ac augue pellentesque, ultricies lorem ut, auctor eros. Fusce ex dolor, lacinia a urna sed, aliquam cursus dui. Ut molestie varius lectus ut dapibus. Aenean faucibus purus nisi, id bibendum
          leo dapibus id. Phasellus ut condimentum erat. Aliquam tristique interdum risus et auctor. Sed nisi tortor, pretium et eros non, viverra volutpat eros. Sed aliquam, felis id molestie dapibus, augue nisl tristique enim, nec sodales urna ligula eget nulla. Nunc in elit ac eros convallis
          fringilla. Proin vel felis sit amet ex eleifend facilisis. Sed commodo lobortis nibh vitae volutpat. Integer viverra arcu et elementum fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent a pharetra felis, quis consequat ante. Integer
          vitae risus nisl. Vivamus dictum velit et vestibulum gravida. Sed pulvinar dolor quis turpis iaculis venenatis. Nunc scelerisque, tortor nec porta dignissim, libero orci bibendum metus, ac ornare magna felis id quam. Proin congue et sapien id rhoncus. Suspendisse laoreet risus non eros
          volutpat pharetra. Ut blandit facilisis lectus. Morbi sit amet nisi vel nisl dictum rhoncus a vitae tortor. Quisque rhoncus purus sed metus fringilla feugiat. Donec semper congue arcu sit amet consectetur. Morbi maximus congue tristique. Nullam euismod facilisis dui eu accumsan. Curabitur
          venenatis augue eget metus laoreet, ut hendrerit sapien suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras euismod sapien suscipit ullamcorper blandit. Fusce metus dui, ornare ut rutrum eget, scelerisque vel elit. Etiam ut augue
          efficitur, porta ligula fringilla, bibendum nulla. Praesent posuere sed velit non sagittis. Vestibulum bibendum dictum neque non sagittis. Vivamus ut finibus elit. Donec at tortor sed mi suscipit ultrices. Cras varius ex sem, ut auctor leo molestie a. Nam venenatis sapien vitae massa
          blandit, quis vulputate ex ultricies. Donec nisl ante, luctus non enim sed, placerat viverra mi.
        </p>
        <div className="flex justify-center mt-8">
          <div id="anibtn" onClick={onClickReady} className={`relative font-semibold cursor-pointer ${ready ? "opacity-0 pointer-events-none" : "opacity-100"} font-jetBrainsMono font-normal`}>
            {introbtn}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroCotainer;
