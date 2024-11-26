import React from "react";

// components
import SectionTitle from "@/components/sectionTitle/sectionTitle";
import VerticalAnimeCard from "@/components/animeCard/verticalCard";

import { Separator } from "@/components/ui/separator";

import Link from "next/link";
import SideContentContainer from "./sideContentContainer";

function BrowseContent({ latestAiredData, topAiring, upComing }) {
  const categories = ["Recent", "Popular", "Top Rated"];

  const buttons = categories.map((category, index) => {
    return (
      <React.Fragment key={index}>
        {/* TODO: fix up categories */}
        <Link
          href="/"
          className="py-2 px-4 hover:text-sky-500 duration-300 ease-in-out"
        >
          <h2 className="font-generalSans font-medium tracking-wide text-sm ">
            {category}
          </h2>
        </Link>
        {index != categories.length - 1 && (
          <Separator orientation="vertical" className="h-10 bg-zinc-800" />
        )}
      </React.Fragment>
    );
  });

  return (
    <section className="mt-6 w-full">
      <SectionTitle
        title="Browse"
        link="/Browse"
        hoverColour="blue"
        textSize={"text-4xl"}
      />

      <div className="my-2 ml-4 inline-flex items-center bg-zinc-900/60 ring-1 ring-zinc-800/50 shadow-md rounded">
        {buttons}
      </div>

      {/* grid columns must be a multiple of 24  */}
      <div className="flex gap-x-6">
        <div className=" bg-zinc-900/60 shadow-2xl ring-1 ring-black/10 rounded-lg p-2 w-full xl:w-9/12">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-4 2xl:grid-cols-6 gap-x-2 gap-y- min-w-fit">
            {latestAiredData.map((show, index) => (
              <VerticalAnimeCard key={index} details={show.media} />
            ))}
          </div>
          {/* TODO: ADD PAGINATION */}
          <div className="p-2 h-20 flex justify-center items-center">
            <h1>PAGINATION</h1>
          </div>
        </div>

        {/* SIDE content*/}
        <SideContentContainer topAiring={topAiring} upComing={upComing} />
      </div>
    </section>
  );
}

export default BrowseContent;
