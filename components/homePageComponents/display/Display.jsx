import React from "react";
import SectionTitle from "@/components/sectionTitle/SectionTitle";
import VerticalAnimeCard from "@/components/animeCard/VerticalAnimeCard";

function Display() {
  const object = {
    title: "Blue box",
    format: "ONA",
    year: "2024",
    rating: 81,
    coverImage:
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx170942-B77wUSM1jQTu.jpg",
    status: "airing",
  };

  return (
    <section className="mt-4">
      <SectionTitle title="Browse" link="/" hoverColour="blue" />
      <div className="bg-zinc-800/20 shadow-2xl ring-1 ring-black/10 rounded-lg p-2 overflow-x-auto scrollbar-gutter-stable">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 min-w-fit">
          {[...Array(10)].map((_, index) => (
            <VerticalAnimeCard
              key={index}
              title={object.title}
              format={object.format}
              seasonYear={object.year}
              coverImage={object.coverImage}
              status={object.status}
              rating={object.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Display;
