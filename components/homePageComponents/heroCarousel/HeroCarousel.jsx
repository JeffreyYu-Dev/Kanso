"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import { Embla, EmblaContainer, EmblaSlide } from "@/components/carousel/embla";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Info from "./Info";
import { Button } from "@/components/ui/button";

function HeroCarousel({ carouselData }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      slidesToScroll: 1,
    },
    []
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="relative mt-4">
      <div className="absolute z-10 right-2 top-2 p-1 rounded-md inline-flex gap-1 bg-zinc-900 ring-1 shadow-md ring-black/5">
        <Button variant="outline" size="icon" onClick={scrollPrev}>
          <ChevronLeft size={12} />
        </Button>
        <Button variant="outline" size="icon" onClick={scrollNext}>
          <ChevronRight size={12} />
        </Button>
      </div>
      <Embla ref={emblaRef} className="rounded-lg h-[350px] select-none">
        <EmblaContainer className="w-full h-full">
          {carouselData
            ?.filter((data) => data?.bannerImage)
            ?.map((data, index) => (
              <EmblaSlide
                key={index}
                className="w-full h-full mr-4 relative basis-full flex-grow-0 flex-shrink-0"
              >
                <Image
                  src={data?.bannerImage || "/"}
                  alt={data?.title?.romaji || ""}
                  fill
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
            ))}
        </EmblaContainer>
      </Embla>
    </section>
  );
}

export default HeroCarousel;
