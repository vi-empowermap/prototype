import { Suspense } from "react";
import Wrapper from "./components/Wrapper";
import { fakeData } from "./constant/fakeData";
import { fetchDataOriginAPI } from "../utils/hooks/useFetchData";
import { RANDOMCOLOR_LIST } from "./constant/colors";

const authEmail = process.env.KB_USER;
const authPassword = process.env.KB_PASS;
const kirbyOriginAPI = process.env.KB_API_ORIGIN;
const getKirbyPanelData = async () => {
  /* KQL Selection BODY */
  const bodyData = {
    query: "page('home')",
    select: {
      content:{
        select: {
          minimaptitle: true
        }
      }
    },
  };


  const kirbyApiDraft = `${kirbyOriginAPI}`;
  const data = await fetchDataOriginAPI({ url: kirbyApiDraft, userInfo: { authEmail, authPassword }, method: "POST", bodyData });

 
  console.log(data);
  return data;
};
const getKirbyData = async () => {
  /* KQL Selection BODY */
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
      archivoraktiv: true,
      bundesland:true
    },
  };

  /* KQL Fetch and get Data */
  const kirbyApiDraft = `${kirbyOriginAPI}`;
  const data = await fetchDataOriginAPI({ url: kirbyApiDraft, userInfo: { authEmail, authPassword }, method: "POST", bodyData });

  // here you should bring only the Organisation users and who are ready
  data.result = data.result.filter((value) => {
    if (value.role_title === "Orga" && value.publicbtn === "true") {
      return value;
    }
  });
  console.log(data);
  return data;
};

export default async function Home() {
// kirby Panel data
const panelData = await getKirbyPanelData();


  /* Random Color List */
  const randomColorList = RANDOMCOLOR_LIST;

  // Loading page testing
  // await new Promise((resolve) => setTimeout(resolve, 1000))

  /* That Code is just for Development. It is fake Data for Production you don't need have it */
  const data = await fakeData();

  /* Organisations have some categories. To make Categories List you need to collect here the categoires */

  let categories = [];
  let totalCountOfBundesland = {}

  /* --- KQL Data: Organisation only --- */
  const kqlData = await getKirbyData();
  // But in this Data, there are two types of data. 1. Orga has a location info, 2. Orga doesn't have a location info.
  // ORGA2: doesn' have a Location Info
  const kqlDataResultNoLocation = kqlData.result
    .filter((value) => {
      if (value.lokalorga === "true") {
        return value;
      }
    })
    .map((value) => {
      // Get a Random Color
      value.visible = true;
      value.bgColor = randomColorList[Math.floor(Math.random() * randomColorList.length)];
      return value;
    });
  // ORGA1: has a Location Info
  const kqlDataResult = kqlData.result
    .filter((value) => {
      if (value.location !== "" && value.lokalorga === "false") {
        return value;
      }
    })
    .map((value) => {
      /* Location Data from Kirby looks XML Form so you need to change to Object Form */
      const a = value.location.replaceAll("\n", ",");
      const toObj = Object.fromEntries(a.split(",").map((i) => i.split(":")));
      const keys = Object.keys(toObj);
      for (let i = 0; i < keys.length; i++) {
        toObj[keys[i]] = toObj[keys[i]].trim().replaceAll('"', "");
        toObj[keys[i]] = toObj[keys[i]].trim().replaceAll("'", "");
      }

      toObj["lat"] = parseFloat(String(toObj["lat"]));
      toObj["lon"] = parseFloat(String(toObj["lon"]));

      value.bgColor = randomColorList[Math.floor(Math.random() * randomColorList.length)];
      value.location = toObj;
      // That is for dragging event for CustomMarker
      value.visible = true;
      value.categories = Array.from(new Set([...value.tags.split(",").map((v) => v.trim().replace(/ +/g, "").toLowerCase()), ...value.tagpool.split(",").map((v) => v.trim().replace(/ +/g, "").toLowerCase())])).filter((v) => v !== "");
      categories = Array.from(new Set([...value.categories, ...categories])).sort();
      // Count Bundesland
      if(totalCountOfBundesland[value.bundesland.toLowerCase()]){
        totalCountOfBundesland[value.bundesland.toLowerCase()] += 1
      }else {
        if(value.bundesland !== ''){
          totalCountOfBundesland[value.bundesland.toLowerCase()] = 1
        }
      }
      return value;
    });
    console.log(totalCountOfBundesland)

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Wrapper data={data} categories={categories} kqlDataResult={kqlDataResult} kqlDataResultNoLocation={kqlDataResultNoLocation} panelData={panelData} totalCountOfBundesland={totalCountOfBundesland} />
    </Suspense>
  );
}
