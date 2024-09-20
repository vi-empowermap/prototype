"use client";

import MenuNav from "@/app/components/MenuNav";
import { useEffect } from "react";
import { marked } from "marked";
import { parseKirbyTags } from "@/app/utils/hooks/useParseKirbyTags";

const Wrapper = ({
  kirbyPanelData: {
    result: { content: data },
  },
  kirbyPanelHomeData,
}) => {
  useEffect(() => {
    
   
  },[])
  return (
    <div className="w-screen min-h-[100svh] lg:min-h-screen h-full bg-white relative pt-[44px] lg:pt-[86px] font-jetBrainsMonoLight">
      <MenuNav kirbyPanelHomeData={kirbyPanelHomeData} />
      <div className="flex justify-center max-w-screen-2xl m-auto">
        <div className="w-full h-fit px-4 lg:px-6 py-10 flex flex-col gap-10 lg:gap-20">
          <div className="w-full h-fit">
            <div className="text-2xl font-medium mb-4">{data["einfacher_title"]}</div>
            <div dangerouslySetInnerHTML={{__html: `${marked.parse(parseKirbyTags(data["einfacher_text"]))}`}} className="markdown_text lg:columns-2 gap-10 font-jetBrainsMonoLight whitespace-break-spaces"></div>
          </div>
          
          
         
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
