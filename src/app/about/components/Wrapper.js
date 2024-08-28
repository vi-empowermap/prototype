"use client"

import MenuNav from "@/app/components/MenuNav";
import { useEffect } from "react";

const Wrapper = ({
  kirbyPanelData: {
    result: { content: data },
  },
  kirbyPanelHomeData,
}) => {
  useEffect(() => {
    console.log(data)
  },[])
  return (
    <div className="w-screen min-h-[100svh] lg:min-h-screen h-full bg-white relative pt-[44px]">
      <MenuNav kirbyPanelHomeData={kirbyPanelHomeData} />
      <div className="w-full h-fit px-4 lg:px-6 py-10 flex flex-col gap-10">
        <div className="w-full h-fit">
          <div className="text-2xl font-medium mb-4">{data.about_title}</div>
          <p className="lg:columns-2 gap-10 font-jetBrainsMonoLight">{data.about_text}</p>
        </div>
        <div className="w-full h-fit">
          <div className="text-2xl font-medium mb-4">{data.about_title}</div>
          <p className="lg:columns-2 gap-10 font-jetBrainsMonoLight">{data.about_text}</p>
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
