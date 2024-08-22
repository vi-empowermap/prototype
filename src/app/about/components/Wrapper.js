import MenuNav from "@/app/components/MenuNav";

const Wrapper = ({
  kirbyPanelData: {
    result: { content: data },
  },
  kirbyPanelHomeData
}) => {
  
  return (
    <div className="w-screen min-h-screen h-full bg-white">
      <MenuNav kirbyPanelHomeData={kirbyPanelHomeData} />
      <div className="w-full h-fit bg-blue-300 px-2">
        <div className="text-3xl font-medium">{data.about_title}</div>
      </div>
    </div>
  );
};

export default Wrapper;
