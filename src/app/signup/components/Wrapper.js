"use client";

import { useEffect } from "react";


const Wrapper = ({errorMessageList :errorMessageListP, pageTextList}) => {
  const authEmail = process.env.KB_USER;
  const authPassword = process.env.KB_PASS;
  const kirbyAPI = process.env.KB_API_API;



useEffect(() => {
 (async () => {
 /* ---- You need to use Fetch to handle KIRBY API ---- */
  /* Fetch Header Info */
  const userInfo = {
      authEmail: authEmail,
      authPassword:authPassword
  }

  /* Buffer is for NODEJS so PHP have to use btoa to handle Binary data */
  const encodedAuthString = Buffer.from(`${userInfo.authEmail}:${userInfo.authPassword}`).toString("base64");
  const headerAuthString = `Basic ${encodedAuthString}`;

  /* Error Messages List: Panel->Site->user */
  const errorMessageList = errorMessageListP
 

  const FPBtn = document.querySelector(".user_password")
  const userWraapper = document.querySelector(".user_wrapper")
  const passwordWraapper = document.querySelector(".password_wrapper")
  const passwordWraapper2 = document.querySelector(".password_wrapper2")
  const resetWraapper = document.querySelector(".reset_wrapper")
  const createUserBtn = document.querySelectorAll(".createUserBtn_c")

  // Create User 
  const createForm = document.querySelector("#createForm")
  const forgotPasswordForm = document.querySelector("#forgotPasswordForm")

  /* Sign-Up Page */
  const secretKey = document.querySelector("#secretKey")
  const userEmail = document.querySelector("#userEmail")
  const userPassword = document.querySelector("#userPassword")
  const userPassword2 = document.querySelector("#userPasswordC")

  /* Forget Paassword Page */
  const fUserEmail = document.querySelector("#fUserEmail")
  const pQuestion = document.querySelector("#pQuestion")
  const forgotPasswordForm2 = document.querySelector("#forgotPasswordForm2")

  /* Reset Page */
  const r_password = document.querySelector("#r_password")
  const r_password2 = document.querySelector("#r_password2")

  /* Error Messages */
  // sign-up
  const secretKeyErrorM = document.querySelector("#secretKeyErrorM")
  const userEmailErrorM = document.querySelector("#userEmailErrorM")
  const passwordErrorM = document.querySelector("#passwordErrorM")
  // forget password
  const fUserEmailErrorM = document.querySelector("#fUserEmailErrorM")
  const pQuestionErrorM = document.querySelector("#pQuestionErrorM")
  // reset
  const r_password2ErrorM = document.querySelector("#r_password2ErrorM")

  /* Open Forget Password Page */
  FPBtn.addEventListener("click", () => {
    userWraapper.style.display = "none"
    passwordWraapper.style.display = "block"
    passwordWraapper2.style.display = "none"
  })
  /* Open Sign-Up Page: in Forget Password page1 and page2 */
  createUserBtn.forEach((element, index) => {
    element.addEventListener("click", () => {
      userWraapper.style.display = "block"
      passwordWraapper.style.display = "none"
      passwordWraapper2.style.display = "none"
    })
  })

  /* Sign up page close Errormessage */
  const onFocus = () => {
    secretKeyErrorM.style.display = "none"
    secretKeyErrorM.innerHTML = ""
    userEmailErrorM.style.display = "none"
    userEmailErrorM.innerHTML = ""
    passwordErrorM.style.display = "none"
    passwordErrorM.innerHTML = ""
    fUserEmailErrorM.style.display = "none"
    fUserEmailErrorM.innerHTML = ""
    pQuestionErrorM.style.display = "none"
    pQuestionErrorM.innerHTML = ""
    r_password2ErrorM.style.display = "none"
    r_password2ErrorM.innerHTML = ""
  }
  secretKey.addEventListener("focus", onFocus)
  userEmail.addEventListener("focus", onFocus)
  userPassword.addEventListener("focus", onFocus)
  userPassword2.addEventListener("focus", onFocus)
  fUserEmail.addEventListener("focus", onFocus)
  pQuestion.addEventListener("focus", onFocus)
  r_password.addEventListener("focus", onFocus)
  r_password2.addEventListener("focus", onFocus)

  // ------------------------------------------------------------------------------------------------

  /* Sign-Up Page */
  const updateSignUpPage = async (end = false) => {
    try {
      const signPBtn = document.querySelector("#signPBtn")
      const disabled_message = document.querySelector("#disabled_message")

      const res = await fetch(`${kirbyAPI}/api/site`, {
        method: "GET",
        headers: {
          "Authorization": headerAuthString,
          "Content-Type": "application/json",
        },
        cache: "no-store",
     
      })

      const data = await res.json()
   
      if (data.status === "ok") {
        if (data.data.content.signupon) {
          signPBtn.disabled = false
          disabled_message.style.block = "none"

          const resUsers = await fetch(`${kirbyAPI}/api/users?select=content,role`, {
            method: "GET",
            headers: {
              "Authorization": headerAuthString,
              "Content-Type": "application/json",
            },
            cache: "no-store",
          })
          const usersList = await resUsers.json()
          
          const currentOgaCounts = usersList.data.filter((v) => v.role.name === "orga")
        
          const currentKeyOraCounts = currentOgaCounts.filter((v) => v.content.secret_key ===
            data.data.content.randomcode)
         



          // update current length 
          const bodyData = {
            infototalcount: currentKeyOraCounts.length,
          }
          const updateSite = await fetch(`${kirbyAPI}/api/site`, {
            method: "PATCH",
            headers: {
              "Authorization": headerAuthString,
              "Content-Type": "application/json",
            },
            cache: "no-store",
            body: JSON.stringify(bodyData)
          })

          // if already voll then disabled again 
          if (currentKeyOraCounts.length >= data.data.content.limitcount) {
            if (!end) {
              signPBtn.disabled = true
              disabled_message.style.display = "block"
              disabled_message.innerText = errorMessageList.fullcapacity
            }

          } else {
            signPBtn.disabled = false
            disabled_message.style.block = "none"
          }
        } else {
          // show message
          signPBtn.disabled = true
          disabled_message.style.display = "block"
          disabled_message.innerText = errorMessageList.signupservice

        }
      }

      return data
    } catch (error) {
      window.alert(errorMessageList.globalError)
    }

  }
  /* When user open the sign-up page then update the current information of sign-up config first */
  updateSignUpPage()


  /* SignUp Page */
  const onHandleSubmit = async (e) => {
    e.preventDefault()

    try {
      // ⭐️ check site toggle first
      // ⭐️ update current count for site page and save current users count
      // ⭐️ change user info to secret key 
      // ⭐️ update again current count

      const sitedata = await updateSignUpPage()

      // Check Password Confirmation
      if (userPassword.value === userPassword2.value) {
        if (secretKey.value === sitedata.data.content.randomcode) {
          // Get Users
          const bodyData = {
            email: userEmail.value,
            password: userPassword.value,
            role: "Orga",
            language: "en",
            content: {
              secret_key: sitedata.data.content.randomcode
            }

          }
          const res = await fetch(`${kirbyAPI}/api/users`, {
            method: "POST",
            headers: {
              "Authorization": headerAuthString,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyData),
            cache: "no-store",

          })

          const jsonData = await res.json()


          if (jsonData.status === "error") {
            // ErrorMessage 01: if the Email is already taken, or password 
            userEmailErrorM.style.display = "block"
            userEmailErrorM.innerHTML = errorMessageList.existEmail
          } else {
            // then create a User and then redirect to Panel.
            await updateSignUpPage(true)
            const redirecting = `${kirbyAPI}/panel`
            window.location.href = redirecting
          }
        } else {
          // error message wrong secret key
          secretKeyErrorM.style.display = "block"
          secretKeyErrorM.innerHTML = errorMessageList.wrongkey
        }

      } else {
        // password confirmation doesn't work
        passwordErrorM.style.display = "block"
        passwordErrorM.innerHTML = errorMessageList.passwordConfirmation
      }
    } catch (error) {
      
      window.alert(error)
      window.alert(errorMessageList.globalError)
    }
  }
  createForm.addEventListener("submit", onHandleSubmit)


  /* Password Forget Page */
  const onHandleSubmitP = async (e) => {
    e.preventDefault()
    try {
      /* Get userList */
      const res = await fetch(`${kirbyAPI}/api/users`, {
        method: "GET",
        headers: {
          "Authorization": headerAuthString,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      })
      const userList = await res.json()


      // check the email is exist.
      const foundUser = userList.data.find((v) => v.email === fUserEmail.value)
      // if the email is not exist
      if (!Boolean(foundUser)) {
        // show error message
        fUserEmailErrorM.style.display = "block"
        fUserEmailErrorM.innerHTML = errorMessageList.notFoundEmail
      } else {

        // find the user
        const res2 = await fetch(`${kirbyAPI}/api/users/${foundUser.id}`, {
          method: "GET",
          headers: {
            "Authorization": headerAuthString,
            "Content-Type": "application/json",
          },
          cache: "no-store",
        })
        const findUser = await res2.json()
        passwordWraapper.style.display = "none"
        passwordWraapper2.style.display = "block"
        const pQuestion2 = document.querySelector("#pQuestion2")
        pQuestion2.innerText = `Question:${findUser.data.content.customquestion}`

        const onHandleSubmitPP = (ee) => {
          ee.preventDefault()

          // compare your answer and user answer
          if (findUser.data.content.infopassword === pQuestion.value) {

            // open reset password page
            passwordWraapper2.style.display = "none"
            resetWraapper.style.display = "block"


            const resetForm = document.querySelector("#resetForm")


            const onHandleResetSubmit = async (e) => {
              e.preventDefault()

              // check password confirmation
              if (r_password.value === r_password2.value) {
                // reset
                const passwordData = {
                  password: r_password.value
                }
                const res3 = await fetch(`${kirbyAPI}/api/users/${findUser.data.id}/password`, {
                  method: "PATCH",
                  headers: {
                    "Authorization": headerAuthString,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(passwordData),
                  cache: "no-store",
                })

                const resetPasswordStatus = await res3.json()
                //  after reset
                if (resetPasswordStatus.status = "ok") {
                  const redirecting = `${kirbyAPI}/panel`
                  window.location.href = redirecting
                } else {
                  window.alert(errorMessageList.globalError)
                }


              } else {
                r_password2ErrorM.style.display = "block"
                r_password2ErrorM.innerHTML = errorMessageList.passwordConfirmation
              }

            }
            resetForm.addEventListener("submit", onHandleResetSubmit)
          } else {
            // wrong answer
            pQuestionErrorM.style.display = "block"
            pQuestionErrorM.innerHTML = errorMessageList.wrongAnswer
          }
        }

        forgotPasswordForm2.addEventListener("submit", onHandleSubmitPP)


      }



    } catch (error) {
      window.alert(errorMessageList.globalError)
    }
  }
  forgotPasswordForm.addEventListener("submit", onHandleSubmitP)
 })()
}, []);

  return (
    <div className="user_container">
      <div className="user_wrapper default_wrapper">
          <div className="title">{pageTextList.titlename}</div>
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
              <button id="signPBtn" className="user_input user_createuser_btn">{pageTextList.createuserbtn}</button>
            </form>
            <div className="user_login">
              <div>{pageTextList.loginbtn2}</div>
              <a href={`${kirbyAPI}/panel`}>{pageTextList.loginbtn}</a>
            </div>
            <div className="user_login">
              <div>{pageTextList.forgetpasswordbtn2}</div>
              <div className="user_password">{pageTextList.forgetpasswordbtn}</div>
            </div>
      
          </div>
        </div>
       
        <div className="password_wrapper default_wrapper">
          <div className="title">{pageTextList.forgetpagename}</div>
          <div>
            <form id="forgotPasswordForm" className="user_form">
              <div>
                <input id="fUserEmail" className="user_input user_text" type="email" name="email" placeholder="Email" />
                <div id="fUserEmailErrorM" className="error_message"></div>
              </div>
      
              <button className="user_input user_createuser_btn">{pageTextList.forgetpasswordbtn3}</button>
            </form>
            <div className="user_login">
              <div id="createUserBtn" className="createUserBtn_c user_btn">&larr; {pageTextList.createuserbtn}</div>
            </div>
          </div>
        </div>
       
        <div className="password_wrapper2 default_wrapper">
          <div className="title">{pageTextList.forgetpagenam}</div>
          <div>
            <form id="forgotPasswordForm2" className="user_form">
              <div id="pQuestion2"></div>
              <div>
                <input id="pQuestion" className="user_input user_text" type="text" name="question" placeholder="Answer" />
                <div id="pQuestionErrorM" className="error_message"></div>
              </div>
              <button className="user_input user_createuser_btn">{pageTextList.forgetpasswordbtn3}</button>
            </form>
            <div className="user_login">
              <div id="createUserBtn2" className="createUserBtn_c user_btn">&larr; {pageTextList.createuserbtn}</div>
            </div>
          </div>
        </div>
      
        <div className="reset_wrapper default_wrapper">
          <div className="title">{pageTextList.resetpagename}</div>
          <div>
            <form id="resetForm" className="user_form">
              <div>
                <input id="r_password" className="user_input user_text" minLength="8" type="password" name="password" placeholder="Password" />
              </div>
              <div>
                <input id="r_password2" className="user_input user_text" minLength="8" type="password" name="password2" placeholder="Confirm Password" />
                <div id="r_password2ErrorM" className="error_message"></div>
              </div>
              <button className="user_input user_createuser_btn">{pageTextList.resetbtn}</button>
            </form>
          </div>
        </div>
    </div>
  );
};

export default Wrapper;
