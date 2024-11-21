"use client";

import React from "react";
import SectionTitle from "@/components/sectionTitle/SectionTitle";
import VerticalAnimeCard from "@/components/animeCard/VerticalAnimeCard";

function Display({ latestAiredData }) {
  return (
    <section className="mt-4 w-full">
      <SectionTitle
        title="Browse"
        link="/"
        hoverColour="blue"
        textSize={"text-2xl"}
      />

      {/* bg-zinc-900/60 */}
      <div className="flex gap-x-6">
        <div className=" bg-zinc-900/60 shadow-2xl ring-1 ring-black/10 rounded-lg p-2 w-full xl:w-9/12">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-2 gap-y-6 min-w-fit">
            {latestAiredData?.map((show, index) => (
              <VerticalAnimeCard key={index} data={show.media} />
            ))}
          </div>
        </div>

        {/* SIDE */}
        <div className="bg-sky-500 rounded-lg p-2 flex-grow lg:block hidden min-w-72">
          <SectionTitle
            title={"Top Airing"}
            link={"/"}
            hoverColour={"blue"}
            textSize={"text-xl"}
          ></SectionTitle>
        </div>
      </div>
    </section>
  );
}

export default Display;
