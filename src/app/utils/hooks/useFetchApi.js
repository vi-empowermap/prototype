
/* Kirby Headless + original API */
/* Kirby Headless + custom API */
export const fetchDataApi = async ({url, userInfo, method, bodyData={}}) => {
    try {
        // await new Promise((resolve) => setTimeout(resolve, 2000))
      const encodedAuthString = Buffer.from(`${userInfo.authEmail}:${userInfo.authPassword}`).toString("base64");
      const headerAuthString = `Basic ${encodedAuthString}`;

      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: headerAuthString,
          "Content-Type": "application/json",
        },
        cache: "no-store",
        ...(method === "POST" && {body: JSON.stringify(bodyData)})
      });

      const dataKirby = await response.json();
      
      return dataKirby;
    } catch (error) {
      
      
    }
  };

