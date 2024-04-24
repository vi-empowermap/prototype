import { Suspense } from "react";
import Wrapper from "./components/Wrapper";
import { category, fakeData } from "./constant/fakeData";
import { fetchDataOriginAPI } from "../utils/hooks/useFetchData";

const getKirbyData = async () => {
  const authEmail = process.env.KB_USER;
  const authPassword = process.env.KB_PASS;
  const kirbyOriginAPI = process.env.KB_API_ORIGIN;

  /* kql */
  const bodyData = {
    query: "kirby.users",
    select: {
      id: true,
      name: true,
      email: true,
      location: true,
      role_title: "user.role.title",
      organame: true,
      aboutorga: true,
      tags: true,
      tagpool: true,
      publicbtn: true,
      lokalorga: true,
      artderorganisation: true,
    },
  };

  /* kql */
  const kirbyApiDraft = `${kirbyOriginAPI}`;
  const data = await fetchDataOriginAPI({ url: kirbyApiDraft, userInfo: { authEmail, authPassword }, method: "POST", bodyData });
 
  // here you should bring only the users who are ready and have location information
  data.result = data.result.filter((value) => {
    if (value.role_title === "Orga" && value.publicbtn === "true") {
      return value;
    }
  });

  return data;
};

export default async function Home() {
  const randomColorList = ["#8C0B23", "#D971AA", "#5D5ABF", "#0468BF", "#A66A21"]
  // Loading page testing
  // await new Promise((resolve) => setTimeout(resolve, 1000))
  const data = await fakeData();

  let categories = [];

  /* KQL Data: Users */
  const kqlData = await getKirbyData();
  const kqlDataResultNoLocation = kqlData.result
    .filter((value) => {
      if (value.lokalorga === "true") {
        
        return value;
      }
    })
    .map((value) => {
      value.bgColor = randomColorList[Math.floor(Math.random() * randomColorList.length)]
      return value;
    });
  const kqlDataResult = kqlData.result
    .filter((value) => {
      if (value.location !== "" && value.lokalorga === "false") {
        return value;
      }
    })
    .map((value) => {
      const a = value.location.replaceAll("\n", ",");
      const toObj = Object.fromEntries(a.split(",").map((i) => i.split(":")));

      const keys = Object.keys(toObj);
      for (let i = 0; i < keys.length; i++) {
        toObj[keys[i]] = toObj[keys[i]].trim().replaceAll('"', "");
        toObj[keys[i]] = toObj[keys[i]].trim().replaceAll("'", "");
      }

      toObj["lat"] = parseFloat(String(toObj["lat"]));
      toObj["lon"] = parseFloat(String(toObj["lon"]));

      const newLocation = toObj;
      value.bgColor = randomColorList[Math.floor(Math.random() * randomColorList.length)]
      value.location = newLocation;
      value.visible = true;
      value.categories = Array.from(new Set([...value.tags.split(",").map((v) => v.trim()), ...value.tagpool.split(",").map((v) => v.trim())])).filter((v) => v !== "");
      categories = Array.from(new Set([...value.categories, ...categories]));
      return value;
    });

    console.log(kqlDataResult)

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Wrapper data={data} categories={categories} kqlDataResult={kqlDataResult} kqlDataResultNoLocation={kqlDataResultNoLocation} />
    </Suspense>
  );
}
