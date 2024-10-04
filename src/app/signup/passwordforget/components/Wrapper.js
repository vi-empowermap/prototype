"use client"

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const WrapperForget = ({pageTextList, userList, errorMessageList}) => {
    const {register, handleSubmit, getValues, formState: {errors}, setError} = useForm();
    const router = useRouter();

    const onSubmit = () => {
        const inputData = getValues();
        const checkEmailOk = userList.data.find((v) => v.email === inputData.email)

        if(!checkEmailOk){
            setError("email", {
                type:"manual",
                message: errorMessageList["notFoundEmail"]
            })
        }else{
            router.push(`/signup/passwordforget/answer?userid=${checkEmailOk["id"]}`)
        }
    }



    return <div className="user_container">
        <div className="flex flex-col bg-white p-4 rounded-lg min-w-96">
          <div className="title">{pageTextList.forgetpagename}</div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)} id="forgotPasswordForm flex" className="user_form">
              <div>
                <input {...register("email")} className="user_input user_text" type="email" placeholder="Email" />
                <div className="text-red-500 text-sm">{errors.email && errors.email.message}</div>
              </div>
              <button className="user_input user_createuser_btn">{pageTextList.forgetpasswordbtn3}</button>
            </form>
            <div className="user_login">
              <div id="createUserBtn" className="createUserBtn_c user_btn">&larr; {pageTextList.createuserbtn}</div>
            </div>
          </div>
        </div>
    </div>
}

export default WrapperForget;