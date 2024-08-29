"use client";

import MenuNav from "@/app/components/MenuNav";
import { useEffect } from "react";
import yaml from "js-yaml";
const Wrapper = ({
  kirbyPanelData: {
    result: { content: data },
  },
  kirbyPanelHomeData,
}) => {
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <div className="w-screen min-h-[100svh] lg:min-h-screen h-full bg-white relative pt-[44px]">
      <MenuNav kirbyPanelHomeData={kirbyPanelHomeData} />
      <div className="flex justify-center max-w-screen-2xl m-auto">
        <div className="w-full h-fit px-4 lg:px-6 py-10 flex flex-col gap-10 lg:gap-20">
          <div className="w-full h-fit">
            <div className="text-2xl font-medium mb-4">{data.imprint_title}</div>
            <p className="lg:columns-2 gap-10 font-jetBrainsMonoLight">{data.imprint_text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
