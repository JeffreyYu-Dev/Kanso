// import components
import HeroCarousel from "@/components/homePageComponents/heroCarousel/HeroCarousel";
import ContinueWatching from "@/components/homePageComponents/continueWatching/ContinueWatching";
import Display from "@/components/homePageComponents/display/Display";

// hero carousel data
import getHeroCarouselData from "@/components/homePageComponents/heroCarousel/HeroCarouselData";

// trending trending?

// popular?

// recent????????????????????/
// HOW TO GET DATA???????//
import getLatestAired from "@/components/homePageComponents/display/getLatestAired";

// upcoming?

//

export default async function Home() {
  // get data for carousel

  const carouselData = await getHeroCarouselData();
  const latestAiredData = await getLatestAired();

  return (
    <main className="flex justify-center">
      <div>
        <HeroCarousel carouselData={carouselData} />
        <ContinueWatching />
        <Display latestAiredData={latestAiredData} />
      </div>
    </main>
  );
}
