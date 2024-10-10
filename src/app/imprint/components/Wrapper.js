"use client";
import { marked } from "marked";
import MenuNav from "@/app/components/MenuNav";
import { parseKirbyTags } from "@/app/utils/hooks/useParseKirbyTags";
import useSWR from "swr";
import { useEffect } from "react"
import { fetchDataOriginAPI } from "@/app/utils/hooks/useFetchData";

// Explore & Theme Page
export const TestData = () => {
const authEmail = process.env.KB_USER;
const authPassword = process.env.KB_PASS;
const kirbyOriginAPI = process.env.KB_API_ORIGIN;
  const bodyData = {
    query: "page('home')",
    select: {
      content:{
        select: {
          webtitle: true,
         
         

        }
      }
    },
   
 }
  const { data, error, isLoading } = useSWR(
    // The key array will be passed to the fetcher as the argument
    { url: kirbyOriginAPI, userInfo: { authEmail:authEmail, authPassword:authPassword }, method: "POST", bodyData:bodyData},  // This will be passed as the first argument to the fetcher
    fetchDataOriginAPI   // The fetcher function
  );

  return {
    data,
    error,
    isLoading
  }


}


const Wrapper = ({
  kirbyPanelData: {
    result: { content: data },
  },
  kirbyPanelHomeData,
}) => {

  const {isLoading, data:dataSWR} = TestData()
  useEffect(() => {
    if(!isLoading){
      console.log(dataSWR)
    }
  },[dataSWR])
 
  return (
    <div className="w-screen min-h-[100svh] lg:min-h-screen h-full bg-white relative pt-[44px] lg:pt-[86px] font-jetBrainsMonoLight">
      <MenuNav kirbyPanelHomeData={kirbyPanelHomeData} />
      <div className="flex justify-center max-w-screen-2xl m-auto">
        <div className="w-full h-fit px-4 lg:px-6 py-10 flex flex-col gap-10 lg:gap-20">
          <div className="w-full h-fit">
            <div className="text-2xl font-medium mb-4">{data.imprint_title}</div>
            <div dangerouslySetInnerHTML={{__html: `${marked.parse(parseKirbyTags(data.imprint_text))}`}} className="markdown_text lg:columns-2 gap-10 font-jetBrainsMonoLight whitespace-break-spaces"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
