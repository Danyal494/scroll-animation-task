import Image from "next/image";
import PageOne from "./components/PageOne/page";
import PageTwo from "./components/PageTwo/page";
import PageThree from "./components/PageThree/page";
import PageZero from "./components/PageZero/page";
import PageFour from "./components/pageFour/page";

export default function Home() {
  return (
    <>
    <PageZero/>
 <PageOne/>
 <PageTwo/>
 <PageThree/>
 <PageFour/>
    </>
  );
}
