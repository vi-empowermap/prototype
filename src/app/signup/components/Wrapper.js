"use client";

import { fetchDataApi } from "@/app/utils/hooks/useFetchApi";
import { useEffect, useState } from "react";


const Wrapper = () => {
  const authEmail = process.env.KB_USER;
  const authPassword = process.env.KB_PASS;
  const kirbyOriginAPI = process.env.KB_API_ORIGIN;
  const kirbyAPI = process.env.KB_API_API;


  const getKirbyAPI = async () => {
    console.log(kirbyAPI);
    const kirbyApiDraft = `${kirbyAPI}/api/site`;
    const data = await fetchDataApi({ url: kirbyApiDraft, userInfo: { authEmail, authPassword }, method: "GET" });

    return data;
  };

  // useEffect( () => {
  //     (async () => {
  //         // const data = await getKirbyAPI()
  //         const bodyData = {
  //             infototalcount: 10,
  //           }
  //           const encodedAuthString = Buffer.from(`${authEmail}:${authPassword}`).toString("base64");
  //           const headerAuthString = `Basic ${encodedAuthString}`;

  //           const updateSite = await fetch(`${kirbyAPI}/api/site`, {
  //             method: "GET",
  //             headers: {
  //               "Authorization": headerAuthString,
  //               "Content-Type": "application/json",
  //             },
  //             // body: JSON.stringify(bodyData)
  //           })
  //           console.log(updateSite)
  //       })()

  // },[])

  const onClick = async () => {
    const t = await getKirbyAPI();
    console.log(t);

};
const [data, setData] = useState(null);
const [error, setError] = useState(null);

useEffect(() => {
 (async () => {
  const data = await getKirbyAPI()
 console.log(data)
   // update current length 
   const bodyData = {
    infototalcount: 20,
  }
  const encodedAuthString = Buffer.from(`${authEmail}:${authPassword}`).toString("base64");
  const headerAuthString = `Basic ${encodedAuthString}`;

  const updateSite = await fetch(`${kirbyAPI}/api/site`, {
    method: "PATCH",
    headers: {
      "Authorization": headerAuthString,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData)
  })
  console.log(updateSite)
 })()
}, []);

  return (
    <div className="user_container">
      <div onClick={onClick}>tst</div>

      {/* <div className="user_wrapper default_wrapper">
          <div className="title">titlename</div>
          <div id="disabled_message" className="disabled_message"></div>
          <div>
            <form id="createForm" className="user_form">
              <div>
                <input id="secretKey" className="user_input user_text" type="text" name="secret" placeholder="Secret Key" />
                <div id="secretKeyErrorM" className="error_message"></div>
              </div>
              <div>
                <input id="userEmail" className="user_input user_text" type="email" name="email" placeholder="Email" />
                <div id="userEmailErrorM" className="error_message"></div>
              </div>
              <div>
                <input id="userPassword" className="user_input user_text" minLength="8" type="password" name="password" placeholder="Password" />
              </div>
              <div>
                <input id="userPasswordC" className="user_input user_text" minLength="8" type="password" name="password2" placeholder="Confirm Password" />
                <div id="passwordErrorM" className="error_message"></div>
              </div>
              <button id="signPBtn" className="user_input user_createuser_btn">createuserbtn</button>
            </form>
            <div className="user_login">
              <div>loginbtn2</div>
              <a href="<?= $site->url() ?>/panel">loginbtn</a>
            </div>
            <div className="user_login">
              <div>forgetpasswordbtn2</div>
              <div className="user_password">forgetpasswordbtn</div>
            </div>
      
          </div>
        </div>
       
        <div className="password_wrapper default_wrapper">
          <div className="title">forgetpagename</div>
          <div>
            <form id="forgotPasswordForm" className="user_form">
              <div>
                <input id="fUserEmail" className="user_input user_text" type="email" name="email" placeholder="Email" />
                <div id="fUserEmailErrorM" className="error_message"></div>
              </div>
      
              <button className="user_input user_createuser_btn">forgetpasswordbtn3</button>
            </form>
            <div className="user_login">
              <div id="createUserBtn" className="createUserBtn_c user_btn">&larr; createuserbtn</div>
            </div>
          </div>
        </div>
       
        <div className="password_wrapper2 default_wrapper">
          <div className="title">forgetpagenam</div>
          <div>
            <form id="forgotPasswordForm2" className="user_form">
              <div id="pQuestion2"></div>
              <div>
                <input id="pQuestion" className="user_input user_text" type="text" name="question" placeholder="Answer" />
                <div id="pQuestionErrorM" className="error_message"></div>
              </div>
              <button className="user_input user_createuser_btn">forgetpasswordbtn3</button>
            </form>
            <div className="user_login">
              <div id="createUserBtn2" className="createUserBtn_c user_btn">&larr; createuserbtn</div>
            </div>
          </div>
        </div>
      
        <div className="reset_wrapper default_wrapper">
          <div className="title">resetpagename</div>
          <div>
            <form id="resetForm" className="user_form">
              <div>
                <input id="r_password" className="user_input user_text" minLength="8" type="password" name="password" placeholder="Password" />
              </div>
              <div>
                <input id="r_password2" className="user_input user_text" minLength="8" type="password" name="password2" placeholder="Confirm Password" />
                <div id="r_password2ErrorM" className="error_message"></div>
              </div>
              <button className="user_input user_createuser_btn">resetbtn</button>
            </form>
          </div>
        </div> */}
    </div>
  );
};

export default Wrapper;
