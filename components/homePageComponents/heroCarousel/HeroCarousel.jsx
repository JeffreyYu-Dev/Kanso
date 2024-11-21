"use client";

// nextjs / react imports
import React, { useCallback } from "react";
import Image from "next/image";

// carousel imports
import { Embla, EmblaContainer, EmblaSlide } from "@/components/carousel/embla";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// component imports
import Info from "./Info";

function HeroCarousel({ carouselData }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="mt-4">
      <Embla ref={emblaRef} className="rounded-lg h-[350px] select-none ">
        <EmblaContainer className="w-full h-full">
          {/* only render anime with banner image links */}
          {carouselData?.map((data, index) => {
            if (data?.bannerImage == null) {
              return null;
            }
            // render anime
            return (
              // MUST PASS BASIS KIND into embla slide
              <EmblaSlide
                className="w-full h-full mr-4 relative basis-full"
                key={index}
              >
                <Image
                  src={data?.bannerImage || "/"}
                  alt={data?.title?.romaji || ""}
                  width={1440}
                  height={400}
                  priority
                  className="object-cover h-full w-full -z-10 rounded-lg"
                />
                <div className="absolute top-0 w-full h-full">
                  <Info
                    animeInfo={data}
                    scrollNext={scrollNext}
                    scrollPrev={scrollPrev}
                  />
                </div>
              </EmblaSlide>
            );
          })}
        </EmblaContainer>
      </Embla>
    </section>
  );
}

export default HeroCarousel;
