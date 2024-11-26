// import components
import HeroCarousel from "@/components/homePageComponents/heroCarousel/HeroCarousel";
import ContinueWatching from "@/components/homePageComponents/continueWatching/ContinueWatching";
import BrowseContent from "@/components/homePageComponents/BrowseContent/browseContent";

// hero carousel data
import getHeroCarouselData from "@/components/queries/HeroCarouselData";

// trending trending?

// popular?

// recent????????????????????/
// HOW TO GET DATA???????//
import getLatestAired from "@/components/queries/getLatestAired";
import getTopAiring from "@/components/queries/getTopAiring";
import getUpComing from "@/components/queries/getUpcoming";
import { Suspense } from "react";
// upcoming?

export default async function Home() {
  // get data for carousel

  const carouselData = await getHeroCarouselData();

  // Can work on pagination later or smt
  const latestAiredData = await getLatestAired(24);

  const topAiring = await getTopAiring(1);

  const upComing = await getUpComing(1);

  return (
    <main className="flex justify-center">
      <Suspense fallback={<h1>Loading</h1>}>
        <div>
          <HeroCarousel carouselData={carouselData} />
          <ContinueWatching />
          <BrowseContent
            latestAiredData={latestAiredData}
            topAiring={topAiring}
            upComing={upComing}
          />
        </div>
      </Suspense>
    </main>
  );
}
