"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";

const Wrapper = ({pageTextList, errorMessageList, kirbyAPI, userList, data}) => {
  const {register, setValue, getValues, handleSubmit} = useForm()
  
  useEffect(() => {
    console.log(errorMessageList)
  },[])

  const onSubmit = () => {
    const inputData = getValues()
    console.log(inputData)
    console.log(userList)
    console.log(data)

    const emailCheck = userList.data.some((v) => v.email === inputData["email"])

    if(inputData["password"] !== inputData["password2"]){
      // show error message confirmation
        console.log("wrong password")

    }
    if(emailCheck){
      // show error message email
      console.log("wrong email")
    }
  }

  return (
    <div className="user_container">
      {!data.data["content"]["signupon"] && <div className="p-4 bg-white rounded-lg">{errorMessageList["signupservice"]}</div> }
      {data.data["content"]["signupon"] && <div className="user_wrapper default_wrapper">
        <div className="title">{pageTextList.titlename}</div>
        <div id="disabled_message" className="disabled_message"></div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="user_form">
            <div>
              <input
                {...register("key")}
                className="user_input user_text"
                type="text"
                placeholder="Secret Key"
              />
              <div id="secretKeyErrorM" className="error_message"></div>
            </div>
            <div>
              <input
                {...register("email")}
                className="user_input user_text"
                type="email"
                placeholder="Email"
              />
              <div id="userEmailErrorM" className="error_message"></div>
            </div>
            <div>
              <input
                {...register("password")}
                className="user_input user_text"
                minLength="8"
                type="password"
                placeholder="Password"
              />
            </div>
            <div>
              <input
                {...register("password2")}
                className="user_input user_text"
                minLength="8"
                type="password"
                placeholder="Confirm Password"
              />
              <div id="passwordErrorM" className="error_message"></div>
            </div>
            <button id="signPBtn" className="user_input user_createuser_btn">
              Sign Up
            </button>
          </form>
          <div className="user_login">
            <div>{pageTextList.loginbtn2}</div>
            <a href={`${kirbyAPI}/panel`}>{pageTextList.loginbtn}</a>
          </div>
          <div id="forgetPasswordBtn" className="user_login">
            <div>{pageTextList.forgetpasswordbtn2}</div>
            <div className="user_password">
              {pageTextList.forgetpasswordbtn}
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
};

export default Wrapper;
