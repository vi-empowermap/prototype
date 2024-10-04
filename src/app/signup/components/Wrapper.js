"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Wrapper = ({pageTextList, errorMessageList, kirbyAPI, userList, data, currentKeyOraCounts}) => {
  const {register, setValue, getValues, handleSubmit, setError, formState: { errors }} = useForm()
  const router = useRouter();
  
  const onSubmit = () => {
    const inputData = getValues()
  

    const checkKey = data["data"]["content"]["randomcode"] !== inputData["key"]
    const passwordConfirmation = (inputData["password"] !== inputData["password2"])
    const emailCheck = userList.data.some((v) => v.email === inputData["email"])

    // check secret key 
    if(checkKey){
      setError("key",{
        type: "manual",
        message: errorMessageList["wrongkey"]
      })
      
    }

    if(passwordConfirmation){
      // show error message confirmation
        setError("password",{
          type: "manual",
          message: errorMessageList["passwordConfirmation"]
        })
    }

    if(emailCheck){
      // show error message email
      setError("email",{
        type: "manual",
        message: errorMessageList["existEmail"]
      })
    }

    const checkKeyOk = data["data"]["content"]["randomcode"] === inputData["key"]
    const passwordConfirmationOk = (inputData["password"] === inputData["password2"])
    const emailCheckOk = userList.data.some((v) => v.email !== inputData["email"])
      if(checkKeyOk && passwordConfirmationOk && emailCheckOk){
        router.push(`/signup/create?email=${inputData["email"]}&password=${inputData["password"]}&key=${inputData["key"]}`)
      }
  }

  return (
    <div className="user_container">
      {!data.data["content"]["signupon"] && <div className="p-4 bg-white rounded-lg">{errorMessageList["signupservice"]}</div> }
      {data.data["content"]["signupon"] && data.data["content"]["limitcount"] <= currentKeyOraCounts ? <div className="p-4 bg-white rounded-lg">{errorMessageList["fullcapacity"]}</div>  :
        <div className="user_wrapper default_wrapper">
        <div className="title">{pageTextList.titlename}</div>
        <div id="disabled_message" className="disabled_message"></div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="user_form">
            <div>
              <input
                {...register("key", {required: true})}
                className="user_input user_text"
                type="text"
                placeholder="Secret Key"
              />
              <div className="text-red-500 text-sm">{errors.key && errors.key.message}</div>
            </div>
            <div>
              <input
                {...register("email", {required: true})}
                className="user_input user_text"
                type="email"
                placeholder="Email"
              />
              <div className="text-red-500 text-sm">{errors.email && errors.email.message}</div>
            </div>
            <div>
              <input
                {...register("password", {required: true})}
                className="user_input user_text"
                minLength="8"
                type="password"
                placeholder="Password"
              />
            </div>
            <div>
              <input
                {...register("password2", {required: true})}
                className="user_input user_text"
                minLength="8"
                type="password"
                placeholder="Confirm Password"
              />
              <div className="text-red-500 text-sm">{errors.password && errors.password.message}</div>
            </div>
            <button id="signPBtn" className="user_input user_createuser_btn">
              {pageTextList["createuserbtn"]}
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
      </div>
      
      }
    </div>
  );
};

export default Wrapper;
