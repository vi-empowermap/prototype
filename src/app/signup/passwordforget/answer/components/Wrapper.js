"use client"

import { useRouter } from "next/navigation"
import {useEffect, useState} from "react"
import { useForm } from "react-hook-form"

const AnswerWrapper = ({pageTextList,errorMessageList, userData}) => {
    const router = useRouter();
    const [resetInfo, setResetInfo] = useState({})
    const {register, handleSubmit, getValues, setError, formState: {errors}} = useForm();
    const {register : register2, handleSubmit: handleSubmit2, getValues: getValues2, setError: setError2, formState: {errors: errors2}} = useForm();
    const [resetOn, setResetOn] = useState(false)
    useEffect(() => {
        setResetInfo({
            userId: userData.data.id
        })
      
    },[]) 

    const onSubmit = () => {
        const inputData = getValues();
      
        if(inputData.question === userData.data.content.infopassword){
            setResetInfo({
                userId: userData.data.id,
                question: userData.data.content.infopassword,
            })
            setResetOn(true)
            
        }else{
            setError("question", {
                type: "manual",
                message: errorMessageList["wrongAnswer"]
            })
            
        }

    }
    const onSubmit2 = () => {
        const inputData = getValues2();
        

        if(inputData["password"] !== inputData["password2"]){
            setError2("password", {
                message: errorMessageList["passwordConfirmation"]
            })
        }else{
            setResetInfo({
                userId: userData.data.id,
                question: userData.data.content.infopassword,
                newpassword: inputData["password"]
            })

            router.push(`/signup/passwordforget/answer/reset?userid=${userData.data.id}&question=${userData.data.content.infopassword}&newpassword=${inputData["password"]}`)
        }
       

    }

    return <div className="user_container">
        {!resetOn && <div className="flex flex-col bg-white rounded-lg p-4 min-w-96">
        <div className="text-lg font-semibold">Question: {userData.data.content.customquestion}</div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)} id="forgotPasswordForm2" className="user_form">
              <div id="pQuestion2"></div>
              <div>
                <input {...register("question")} className="user_input user_text" type="text" placeholder="Answer" />
                <div className="text-red-500 text-sm">{errors.question && errors.question.message}</div>
              </div>
              <button className="user_input user_createuser_btn">{pageTextList.forgetpasswordbtn3}</button>
            </form>
            <div className="user_login">
              <div onClick={() => router.push(`/signup`)} id="createUserBtn2" className="createUserBtn_c user_btn">&larr; {pageTextList.createuserbtn}</div>
            </div>
          </div>
        </div>}
        {resetOn && <div className="flex flex-col bg-white rounded-lg p-4 min-w-96">
          <div className="title">{pageTextList.resetpagename}</div>
          <div>
            <form onSubmit={handleSubmit2(onSubmit2)} id="resetForm" className="user_form">
              <div>
                <input {...register2("password")} className="user_input user_text" minLength="8" type="password" placeholder="Password" />
              </div>
              <div>
                <input {...register2("password2")}  id="r_password2" className="user_input user_text" minLength="8" type="password" placeholder="Confirm Password" />
                <div className="text-red-500 text-sm">{errors2.password && errors2.password.message}</div>
              </div>
              <button className="user_input user_createuser_btn">{pageTextList.resetbtn}</button>
            </form>
          </div>
        </div>}
    </div>
}

export default AnswerWrapper