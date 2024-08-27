import MenuNav from "@/app/components/MenuNav";

const Wrapper = ({
  kirbyPanelData: {
    result: { content: data },
  },
  kirbyPanelHomeData
}) => {
  
  return (
    <div className="w-screen min-h-[100svh] lg:min-h-screen h-full bg-white relative pt-[44px]">
      <MenuNav kirbyPanelHomeData={kirbyPanelHomeData} />
      <div className="w-full h-fit px-6 py-10">
        <div className="text-2xl font-medium mb-4">FAQ</div>
      
      </div>
    </div>
  );
};

export default Wrapper;
