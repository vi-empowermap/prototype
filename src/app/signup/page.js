import { Suspense } from "react";
import { fetchDataApi } from "../utils/hooks/useFetchApi";
import { fetchDataOriginAPI } from "../utils/hooks/useFetchData";
import "./assets/style.css"
import Wrapper from "./components/Wrapper";
const authEmail = process.env.KB_USER;
const authPassword = process.env.KB_PASS;
const kirbyOriginAPI = process.env.KB_API_ORIGIN;
const kirbyAPI = process.env.KB_API_API;


const getKirbyPanelData = async () => {
    /* KQL Selection BODY */
    const bodyData = {
      query: "page('user')",
      select: {
        content:{
          select: {
            passwordconfirmation: true,
            notexistemail: true,
            existemail: true,
            wronganswer: true,
            globalerror: true,
            fullcapacity: true,
            wrongkey: true,
            signupservice: true,
          }
        }
      },
    };
  
  
    const kirbyApiDraft = `${kirbyOriginAPI}`;
    const data = await fetchDataOriginAPI({ url: kirbyApiDraft, userInfo: { authEmail, authPassword }, method: "POST", bodyData });
  
    return data;
  };

const getKirbyAPI = async() => {
    console.log(kirbyAPI)
    const kirbyApiDraft = `${kirbyAPI}/api/site`;
    const data = await fetchDataApi({ url: kirbyApiDraft, userInfo: { authEmail, authPassword }, method: "GET" });
  
    return data;
}
const Page = async () => {
    const t = await getKirbyAPI()
    console.log(t)
   
    const bodyData = {
        query: "page('user')",
        select: {
          content:{
            select: {
              passwordconfirmation: true,
              notexistemail: true,
              existemail: true,
              wronganswer: true,
              globalerror: true,
              fullcapacity: true,
              wrongkey: true,
              signupservice: true,
            }
          }
        },
      };
    
      const kirbyApiDraft = `${kirbyOriginAPI}`;
      const kirbydata = await fetchDataOriginAPI({ url: kirbyApiDraft, userInfo: { authEmail, authPassword }, method: "POST", bodyData });
    
      const errorMessageList = {
        passwordConfirmation: kirbydata.result.content.passwordconfirmation,
        notFoundEmail: kirbydata.result.content.notexistemail,
        existEmail: kirbydata.result.content.existemail,
        wrongAnswer: kirbydata.result.content.wronganswer,
        globalError: kirbydata.result.content.globalerror,
        fullcapacity: kirbydata.result.content.fullcapacity,
        wrongkey: kirbydata.result.content.wrongkey,
        signupservice: kirbydata.result.content.signupservice,
      }

    //   console.log(errorMessageList)
      
    return (
      
        <Wrapper />

     
    )
}

export default Page;