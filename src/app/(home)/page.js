import { Suspense } from "react";
import Wrapper from "./components/Wrapper";

export default async function Home() {
  // Loading page testing
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Wrapper />
    </Suspense>
  );
}
