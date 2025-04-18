import Image from "next/image";
import PageOne from "./components/PageOne/page";
import PageTwo from "./components/PageTwo/page";
import PageThree from "./components/PageThree/page";
import PageZero from "./components/PageZero/page";
import PageFour from "./components/pageFour/page";
import PageNOne from "./components/PageNOne/page";
import GalleryComponent from "./components/MerqueeScroll/page";
import PageFive from "./components/PageFive/page";
import ScholarshipScroll from "./components/ScholarshipScroll/page";
import TempPage from "./components/temppage/page";

export default function Home() {
  return (
    <>
    <PageNOne/>
    <TempPage/>
    <ScholarshipScroll/>
    <PageFive/>
    <GalleryComponent/>
    <PageZero/>
 <PageOne/>
 <PageTwo/>
 <PageThree/>
 <PageFour/>
    </>
  );
}
