import { redirect } from "next/navigation";

const authEmail = process.env.KB_USER;
const authPassword = process.env.KB_PASS;
const kirbyOriginAPI = process.env.KB_API_ORIGIN;
const kirbyAPI = process.env.KB_API_API;


const CreatePage = async (props) => {

    const inputDatas = {
        userEmail: props["searchParams"]["email"],
        password: props["searchParams"]["password"],
        key: props["searchParams"]["key"]
    }
   
    const userInfo = {
        authEmail: authEmail,
        authPassword:authPassword
    }

    /* Buffer is for NODEJS so PHP have to use btoa to handle Binary data */
    const encodedAuthString = Buffer.from(`${userInfo.authEmail}:${userInfo.authPassword}`).toString("base64");
    const headerAuthString = `Basic ${encodedAuthString}`;
    console.log(props)

    // Site Data
    const res2 = await fetch(`${kirbyAPI}/api/site`, {
        method: "GET",
        headers: {
          "Authorization": headerAuthString,
          "Content-Type": "application/json",   
        },
        cache: "no-store",

    })
    const data = await res2.json();


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

    const bodyData = {
        email: inputDatas.userEmail,
        password: inputDatas.password,
        role: "Orga",
        language: "en",
        content: {
          secret_key: inputDatas.key
        }

    }
    const emailCheckOk = userList.data.some((v) => v.email !== inputDatas["email"])
   
    if(data["data"]["content"]["randomcode"] === inputDatas["key"] && emailCheckOk){
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
            return <div>Something wrong</div>
          } else {
            // then create a User and then redirect to Panel.
           
            const redirecting = `${kirbyAPI}/panel`
            redirect(redirecting)
          }
    }else{
      
        return <div>Wfff</div>
    }

    // const res = await fetch(`${kirbyAPI}/api/users`, {
    //   method: "POST",
    //   headers: {
    //     "Authorization": headerAuthString,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(bodyData),
    //   cache: "no-store"
    // })

    // const jsonData = await res.json()
    

      return (
          <div>

          </div>
      )
}

export default CreatePage;