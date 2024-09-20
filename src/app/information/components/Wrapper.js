"use client";

import MenuNav from "@/app/components/MenuNav";
import yaml from "js-yaml";
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
            <div className="text-2xl font-medium mb-4">{data.about_title}</div>
            <div dangerouslySetInnerHTML={{__html: `${marked.parse(parseKirbyTags(data.about_text))}`}} className="markdown_text lg:columns-2 gap-10 font-jetBrainsMonoLight whitespace-break-spaces"></div>
          </div>
          <div className="w-full h-fit">
            <div className="text-2xl font-medium mb-4">{data.contributors_title}</div>
            <div className="flex w-full flex-wrap gap-14">
              {data["contributors"].map((v) => {
                {
                  /* return <div key={v} style={{ backgroundImage: `url(${process.env.KB_FOR_FILE}/@/file/${String(yaml.load(v))})` }} className="w-32 aspect-square bg-cover bg-center bg-no-repeat bg-emerald-400"></div> */
                }
                return <img key={v} src={`${process.env.KB_FOR_FILE}/@/file/${String(yaml.load(v))}`} className="w-auto max-w-full h-40 object-contain bg-white"></img>;
              })}
            </div>
          </div>
          <div className="w-full h-fit">
            <div className="text-2xl font-medium mb-4">{data.contact_title}</div>
            <div className="font-jetBrainsMonoLight grid lg:grid-cols-2 gap-3">
              <div>
                <div className="flex gap-3">
                  <span>Email:</span>
                  <span>{data.contact_email}</span>
                </div>
                <div className="flex gap-3">
                  <span>Phone:</span>
                  <span>{data.contact_phone}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <span>{data.contact_street},</span>
                <span>{data.contact_zip}</span>
                <span>{data.contact_city}</span>
              </div>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
