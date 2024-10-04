import { fetchDataOriginAPI } from "@/app/utils/hooks/useFetchData";
import "../../assets/style.css"
import { redirect } from "next/dist/server/api-utils";
import AnswerWrapper from "./components/Wrapper";
const authEmail = process.env.KB_USER;
const authPassword = process.env.KB_PASS;
const kirbyOriginAPI = process.env.KB_API_ORIGIN;
const kirbyAPI = process.env.KB_API_API;


const AnswerPage = async (props) => {

    console.log(props)
   
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
              // page text
              titlename: true,
              createuserbtn: true,
              loginbtn: true,
              loginbtn2: true,
              forgetpasswordbtn2: true,
              forgetpasswordbtn: true,
              forgetpagename: true,
              forgetpasswordbtn3: true,
              createuserbtn: true,
              forgetpagename: true,
              forgetpasswordbtn3: true,
              createuserbtn: true,
              resetpagename:true,
              resetbtn: true,
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

      const pageTextList = {
        titlename: kirbydata.result.content.titlename,
        createuserbtn: kirbydata.result.content.createuserbtn,
        loginbtn: kirbydata.result.content.loginbtn,
        loginbtn2: kirbydata.result.content.loginbtn2,
        forgetpasswordbtn2: kirbydata.result.content.forgetpasswordbtn2,
        forgetpasswordbtn: kirbydata.result.content.forgetpasswordbtn,
        forgetpagename: kirbydata.result.content.forgetpagename,
        forgetpasswordbtn3: kirbydata.result.content.forgetpasswordbtn3,
        forgetpagename: kirbydata.result.content.forgetpagename,
        forgetpasswordbtn3: kirbydata.result.content.forgetpasswordbtn3,
        resetpagename: kirbydata.result.content.resetpagename,
        resetbtn: kirbydata.result.content.resetbtn,
      }

      const userInfo = {
        authEmail: authEmail,
        authPassword:authPassword
    }
  
    /* Buffer is for NODEJS so PHP have to use btoa to handle Binary data */
    const encodedAuthString = Buffer.from(`${userInfo.authEmail}:${userInfo.authPassword}`).toString("base64");
    const headerAuthString = `Basic ${encodedAuthString}`;

    // find the user
    const res2 = await fetch(`${kirbyAPI}/api/users/${props.searchParams.userid}`, {
        method: "GET",
        headers: {
          "Authorization": headerAuthString,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      })
      const findUser = await res2.json()
      console.log(findUser)
      if(findUser.status === "error"){
        return <div>Error</div>
      }else{
        return <AnswerWrapper pageTextList={pageTextList} errorMessageList={errorMessageList} userData={findUser} />
      }
   
  
}

export default AnswerPage