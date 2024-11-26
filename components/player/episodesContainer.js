"use client";
import React, { useState } from "react";
import { Separator } from "../ui/separator";

function EpisodeContainer({ className, changeEpisodes }) {
  const [hoverIndex, setHoverIndex] = useState(null);

  const array = Array.from({ length: 100 }, (_, index) => index);

  const episodeButtonColours = {
    filler: "bg-purple-900/30",
    cannon: "bg-zinc-900",
    currentlyWatching: "",
    hover: "hover:bg-sky-500",
  };

  return (
    <div className={`${className} p-2 rounded flex flex-col gap-1.5`}>
      <div className="col-span-5 bg-zinc-900 rounded h-8"></div>
      <Separator className="w-full" />
      <div className="grid xl:grid-cols-5 grid-cols-4 gap-y-1 gap-x-1.5 w-full h-full overflow-x-hidden overflow-y-auto">
        {array.map((element, index) => (
          <button
            key={index}
            className={`${episodeButtonColours.cannon} ${episodeButtonColours.hover} duration-75 ease-in-out rounded flex items-center justify-center`}
            onMouseOver={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            onClick={() => changeEpisodes(index + 1)}
          >
            <h4
              className={`text-sm font-generalSans font-medium text-muted-foreground duration-75 ease-in-out ${
                hoverIndex === index && "text-white"
              }`}
            >
              {element + 1}
            </h4>
          </button>
        ))}
      </div>
    </div>
  );
}

export default EpisodeContainer;
