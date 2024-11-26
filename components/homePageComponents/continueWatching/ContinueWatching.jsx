"use client";
import React from "react";
import { Embla, EmblaContainer, EmblaSlide } from "@/components/carousel/embla";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import Image from "next/image";

//components
import SectionTitle from "@/components/sectionTitle/sectionTitle";

// TODO: do this another time
function ContinueWatching() {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  let watchList = [];
  let displayList = true;

  // if there are no anime in current watchlist
  if (watchList.length == 0) {
    displayList = false;
  }

  const image = "";
  const length = "";
  const progress = "";
  const episodeLength = "";
  const title = "";
  const episodeNumber = "";

  return (
    <div className="h-52 mt-4 flex flex-col ">
      {/* TODO: work on continue watcching page */}
      {/* Continue watching title */}
      <SectionTitle
        title="Continue Watching"
        link={`/watch-history`}
        hoverColour={"blue"}
        textSize={"text-2xl"}
        className="mb-2"
      />

      {/* watch some anime stupid :D */}
      {!displayList && (
        <div className="flex justify-center flex-grow items-center shadow-2xl ring-1 ring-black/10 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 rounded-lg min-w-2">
          <h1 className="font-generalSans text-xl font-semibold">
            Nothing to see...{" "}
            <Link href="/explore">
              <span className="underline animate-shimmer hover:text-white/60 duration-500 ease-in-out">
                Explore
              </span>
            </Link>
          </h1>
        </div>
      )}

      {/* carousel only display if there are any at all*/}
      {displayList && (
        <Embla
          className="h-full shadow-2xl ring-1 ring-black/10 bg-sky-500 rounded-lg"
          ref={emblaRef}
        >
          <EmblaContainer>
            {/* MUST PASS BASIS INTO EMBLA SLIDE */}
            <EmblaSlide className="bg-green-500 basis-1/3 flex-grow">
              <Image
                src="https://cdn.noitatnemucod.net/thumbnail/300x400/100/a8b56a7589ff9edb6c86977c31e27a06.jpg"
                alt="hello"
                width={300}
                height={150}
              />
            </EmblaSlide>
          </EmblaContainer>
        </Embla>
      )}
    </div>
  );
}

export default ContinueWatching;
