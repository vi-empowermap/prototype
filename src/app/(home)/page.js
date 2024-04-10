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
      tagpool: true
    },
  };

  /* kql */
  const kirbyApiDraft = `${kirbyOriginAPI}`;
  const data = await fetchDataOriginAPI({ url: kirbyApiDraft, userInfo: { authEmail, authPassword }, method: "POST", bodyData });
  data.result = data.result.filter((value) => value.role_title === "Orga");

  return data;
};

export default async function Home() {
  // Loading page testing
  // await new Promise((resolve) => setTimeout(resolve, 1000))
  const data = await fakeData();
  let categories = [];
  const kqlData = await getKirbyData();
  const kqlDataResult = kqlData.result.map((value) => {
    const a = value.location.replaceAll("\n", ",").split(",");
    console.log(a)
    const newLocation = {
      lat: parseFloat(a[0].split(":")[1].trim()),
      lon: parseFloat(a[1].split(":")[1].trim()),
      // ...(a[2] && {city: a[2].split(":")[1].trim()}),
      // ...(a[3] && {country: a[3].split(":")[1].trim()}),
      // ...(a[4] && {countryCode: a[4].split(":")[1].trim()}),
      // ...(a[5] && {osm: a[5].split(":")[1].trim()}),
    };
    value.location = newLocation;
    
    value.visible = true
    value.categories = Array.from(new Set([...value.tags.split(",").map((v) => v.trim()), ...value.tagpool.split(",").map((v) => v.trim())])).filter((v) => v !== "")
    categories = Array.from(new Set([...value.categories, ...categories]))
    return value;
  });


  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Wrapper data={data} categories={categories} kqlDataResult={kqlDataResult} />
    </Suspense>
  );
}
