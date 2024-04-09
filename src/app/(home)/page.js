import { Suspense } from "react";
import Wrapper from "./components/Wrapper";
import { fakeData } from "./constant/fakeData";

export default async function Home() {
  // Loading page testing
  // await new Promise((resolve) => setTimeout(resolve, 1000))
  const data = await fakeData();


  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Wrapper data={data} />
    </Suspense>
  );
}
