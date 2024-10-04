import { redirect } from "next/navigation";

const authEmail = process.env.KB_USER;
const authPassword = process.env.KB_PASS;
const kirbyOriginAPI = process.env.KB_API_ORIGIN;
const kirbyAPI = process.env.KB_API_API;


const ResetPage = async (props) => {
    

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
 
  if(findUser.status === "error"){
    return <div>Error</div>
  }else{
    if(findUser.data.content.infopassword !== props.searchParams.question){
        return <div>Error</div>
    }else{
        const passwordData = {
            password: props.searchParams.newpassword
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

          if(resetPasswordStatus.status = "ok"){
            const redirecting = `${kirbyAPI}/panel`
            redirect(redirecting)
          }
    }
  }



}
export default ResetPage