import { Suspense } from "react";
import Wrapper from "./components/Wrapper";
import { fakeData } from "./constant/fakeData";
import { fetchDataOriginAPI } from "../utils/hooks/useFetchData";
import { RANDOMCOLOR_LIST } from "./constant/colors";
import { bundeslandBP } from "./constant/blueprintOptionData";
import yaml from "js-yaml";
import { RANDOM_FONT_LIST } from "./constant/fontList";
const authEmail = process.env.KB_USER;
const authPassword = process.env.KB_PASS;
const kirbyOriginAPI = process.env.KB_API_ORIGIN;

let categories = [];
const getKirbyPanelData = async () => {
  /* KQL Selection BODY */
  const bodyData = {
    query: "page('home')",
    select: {
      content:{
        select: {
          webtitle: true,
          introtext: true,
          introbtn: true,
          opengooglemap: true,
          placeholdersearch: true,
          placeholderfilter: true,
          // list info
          bundeslandinfo: true,
          stadtinfo: true,
          // minimap navigation info
          minimaptitle: true,
          verortungbtntext: true,
          centerbtntext: true,
          // orga page
          languagesupporttext: true,
          angebotetext: true,
          tagstext: true,
          locationtext: true,
          kontakttext: true,
          socialmediatext: true,
          bundeslabeltext: true,
          stadtlabeltext: true,
          // filter text
          fbundesland: true,
          fthemenschwerpunkt: true,
          ftag: true,
          fzielgroup: true,
          fangebote: true,
          fsprache: true,
          fartderorganisation: true,
          fzeige: true,
          // filter Btn Text
          fsearch: true,
          freset: true,
         

        }
      }
    },
  };


  const kirbyApiDraft = `${kirbyOriginAPI}`;
  const data = await fetchDataOriginAPI({ url: kirbyApiDraft, userInfo: { authEmail, authPassword }, method: "POST", bodyData });

  return data;
};

const getKirbyData = async () => {
  /* Random Color List */
  const randomColorList = RANDOMCOLOR_LIST;
  /* KQL Selection BODY */
  const bodyData = {
    query: "kirby.users",
    select: {
      id: true,
      orgaimage: true,
      name: true,
      email: true,
      location: true,
      city: true,
      street: true,
      zip: true,
      contactnummber: true,
      website: true,
      social: true,
      role_title: "user.role.title",
      organame: true,
      aboutorga: true,
      tags: true,
      tagpool: true,
      publicbtn: true,
      lokalorga: true,
      themenschwerpunkt: true,
      artderorganisation: true,
      zielgruppe: true,
      onlineresourcen: true,
      sprachunterstutzung: true,
      angebote:true,
      archivoraktiv: true,
      bundesland: true,
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
  
  data.result.map((value) => {
    // That is for dragging event for CustomMarker
    value.visible = true;
    value.filterVisible = true;
    // Get a Random Color
     value.bgColor = randomColorList[Math.floor(Math.random() * randomColorList.length)];
     value.font = RANDOM_FONT_LIST[Math.floor(Math.random() * RANDOM_FONT_LIST.length)];
     value.categories = Array.from(new Set([...value.tags.split(",").map((v) => v.replace(/\s+/g, ' ').trim().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').toLowerCase()), ...value.tagpool.split(",").map((v) => v.replace(/\s+/g, ' ').trim().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').toLowerCase())])).filter((v) => v !== "");
     categories = Array.from(new Set([...value.categories, ...categories])).sort();

     /* Filteroptionen Mapping */
     value.social = yaml.load(value.social)
     value.themenschwerpunkt = value.themenschwerpunkt.split(",").map((val2) => val2.trim())  
     value.zielgruppe = value.zielgruppe.split(",").map((val2) => val2.trim())  
    //  value.zielgruppe = zielgruppeBP[value.zielgruppe]
    
    //  value.sprachunterstutzung = sprachunterstutzungBP[value.sprachunterstutzung]
     value.sprachunterstutzung = value.sprachunterstutzung.split(",").map((val2) => val2.trim()) 
     value.angebote = value.angebote.split(",").map((val2) => val2.trim()) 
   
     return value
  })
  
  return data;
};

export default async function Home() {
  let totalCountOfBundesland = {}
// kirby Panel data
  const panelData = await getKirbyPanelData();

  // Loading page testing
  // await new Promise((resolve) => setTimeout(resolve, 1000))
  /* ❌That Code is just for Development. It is fake Data for Production you don't need have it */
  // const data = await fakeData();
  // const dataNoL = data.filter((v) => {
  //   if(v.lokalorga === "true"){
  //     return v
  //   }
  // })
  // const dataL = data.filter((v) => {
  //   if(v.lokalorga === "false"){
  //      // Counting Bundesland
  //      if(totalCountOfBundesland[bundeslandBP[v.bundesland].toLowerCase()]){
  //       totalCountOfBundesland[bundeslandBP[v.bundesland].toLowerCase()] += 1
  //     }else {
  //       if(v.bundesland !== ''){
  //         totalCountOfBundesland[bundeslandBP[v.bundesland].toLowerCase()] = 1
  //       }
  //     }
  //     return v
  //   }
  // })

  /* Organisations have some categories. To make Categories List you need to collect here the categoires */

 
 

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
      value.location = toObj;
      
     
      // Counting Bundesland
      if(totalCountOfBundesland[bundeslandBP[value.bundesland]]){
        totalCountOfBundesland[bundeslandBP[value.bundesland].toLowerCase()] += 1
      }else {
        if(value.bundesland !== ''){
          totalCountOfBundesland[bundeslandBP[value.bundesland].toLowerCase()] = 1
        }
      }
      return value;

    });
   

  return (
    
    <Wrapper categories={categories} kqlDataResult={kqlDataResult} kqlDataResultNoLocation={kqlDataResultNoLocation} panelData={panelData} totalCountOfBundesland={totalCountOfBundesland} />
  
  );
}
