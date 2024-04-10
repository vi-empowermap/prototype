import { Suspense } from "react";
import Wrapper from "./components/Wrapper";
import { category, fakeData } from "./constant/fakeData";

export default async function Home() {
  // Loading page testing
  // await new Promise((resolve) => setTimeout(resolve, 1000))
  const data = await fakeData();
  const categories = category;


  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Wrapper data={data} categories={categories} />
    </Suspense>
  );
}
