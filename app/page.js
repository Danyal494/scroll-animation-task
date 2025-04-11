import Image from "next/image";
import PageOne from "./components/PageOne/page";
import PageTwo from "./components/PageTwo/page";
import PageThree from "./components/PageThree/page";
import PageZero from "./components/PageZero/page";
import PageFour from "./components/pageFour/page";
import PageNOne from "./components/PageNOne/page";
import GalleryComponent from "./components/MerqueeScroll/page";

export default function Home() {
  return (
    <>
    <PageNOne/>
    <GalleryComponent/>
    <PageZero/>
 <PageOne/>
 <PageTwo/>
 <PageThree/>
 <PageFour/>
    </>
  );
}
