import { fetchDataOriginAPI } from "../utils/hooks/useFetchData";
import Wrapper from "./components/Wrapper";
const authEmail = process.env.KB_USER;
const authPassword = process.env.KB_PASS;
const kirbyOriginAPI = process.env.KB_API_ORIGIN;
import yaml from "js-yaml"
const getKirbyPanelHomeData = async () => {
  /* KQL Selection BODY */
  const bodyData = {
    query: "page('home')",
    select: {
      content:{
        select: {
          webtitle: true,
         
         

        }
      }
    },
  };


  const kirbyApiDraft = `${kirbyOriginAPI}`;
  const data = await fetchDataOriginAPI({ url: kirbyApiDraft, userInfo: { authEmail, authPassword }, method: "POST", bodyData });

  return data;
};
const getKirbyPanelData = async () => {
    /* KQL Selection BODY */
    const bodyData = {
      query: "page('faq')",
      select: {
        content:{
          select: {
            faq_title:true,
            faq_list:true
          }
        }
      },
    };
  
  
    const kirbyApiDraft = `${kirbyOriginAPI}`;
    const data = await fetchDataOriginAPI({ url: kirbyApiDraft, userInfo: { authEmail, authPassword }, method: "POST", bodyData });
    data.result.content.faq_list = yaml.load(data.result.content.faq_list)

    return data;
  };
const Page = async () => {
    const kirbyPanelData = await getKirbyPanelData();
    const kirbyPanelHomeData = await getKirbyPanelHomeData();
    
    return (
        <Wrapper kirbyPanelData={kirbyPanelData} kirbyPanelHomeData={kirbyPanelHomeData} />
    )
}

export default Page;