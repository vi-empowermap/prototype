import { fetchDataOriginAPI } from "../utils/hooks/useFetchData";
import Wrapper from "./components/Wrapper";
import yaml from "js-yaml";
const authEmail = process.env.KB_USER;
const authPassword = process.env.KB_PASS;
const kirbyOriginAPI = process.env.KB_API_ORIGIN;

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
      query: "page('information')",
      select: {
        content:{
          select: {
            about_title:true,
            about_text: true,
            contributors: true,
            contributors_title: true,
            contact_title: true,
            contact_email: true,
            contact_phone: true,
            contact_street: true,
            contact_zip: true,
            contact_city: true,
             
          }
        }
      },
    };
  
  
    const kirbyApiDraft = `${kirbyOriginAPI}`;
    const data = await fetchDataOriginAPI({ url: kirbyApiDraft, userInfo: { authEmail, authPassword }, method: "POST", bodyData });
    data["result"]["content"]["contributors"] = yaml.load( data["result"]["content"]["contributors"])
    
 
    return data
  };

const getKirbyUsersData = async () => {
  const bodyData = {
    query: "kirby.users",
    select: {
      id: true,
      orgaimage: true,
      name: true,
      email: true,
      location: true,
      city: true,
      street: true,
      zip: true,
      contactnummber: true,
      website: true,
      social: true,
      role_title: "user.role.title",
      organame: true,
      organameshortform: true,
      aboutorga: true,
      tags: true,
      tagpool: true,
      publicbtn: true,
      lokalorga: true,
      themenschwerpunkt: true,
      artderorganisation: true,
      zielgruppe: true,
      onlineresourcen: true,
      sprachunterstutzung: true,
      angebote:true,
      archivoraktiv: true,
      bundesland: true,
    },
  };

  /* KQL Fetch and get Data */
  const kirbyApiDraft = `${kirbyOriginAPI}`;
  const data = await fetchDataOriginAPI({ url: kirbyApiDraft, userInfo: { authEmail, authPassword }, method: "POST", bodyData });
  
 

  return data

}
const Page = async () => {
    const kirbyPanelData = await getKirbyPanelData();
    const kirbyPanelHomeData = await getKirbyPanelHomeData();
    const kirbyUsersList = await getKirbyUsersData()

 
    
    
    return (
        <Wrapper kirbyPanelData={kirbyPanelData} kirbyPanelHomeData={kirbyPanelHomeData} />
    )
}

export default Page;