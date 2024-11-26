"use client";
import React, { useState } from "react";
import Image from "next/image";

import { CalendarRange, Captions, Mic, Star } from "lucide-react";
import Link from "next/link";

import urlBuild from "../urlBuilder/urlBuild";

function formatEpisode([episodeCount, episodeAiringCount]) {
  if (episodeCount == null && episodeAiringCount == null) return null;

  if (episodeAiringCount == null) return `${episodeCount}`;

  if (episodeCount == null) return `${episodeAiringCount - 1}`;

  return `${episodeAiringCount - 1} / ${episodeCount}`;
}

function HorizontalCard({ details, className, index }) {
  const [textColour, setTextColour] = useState("#fff");
  const [mouseOver, setMouseOver] = useState(false);

  let title =
    details.title?.english || details.title?.romaji || details.title?.native;
  let seasonYear = details.seasonYear;
  let rating = details.averageScore;
  let format = details.format;
  let coverImage = details.coverImage?.large;
  let status = details.status || "unknown";
  let episodeCount = details.episodes;
  let episodeAiringCount = details.nextAiringEpisode?.episode;
  let id = details.id;
  let colour = details?.coverImage?.color;

  let formattedEpisode = formatEpisode([episodeCount, episodeAiringCount]);

  let voiceActors = details.characters.edges[0]?.voiceActors;

  let isDubbed = voiceActors?.some((actor) => actor.languageV2 === "English");

  const showStatusColourMap = {
    NOT_YET_RELEASED: "bg-orange-500",
    RELEASING: "bg-sky-500",
    FINISHED: "bg-lime-500",
    HIATUS: "bg-yellow-500",
    CANCELLED: "bg-red-500",
    unknown: "bg-fuchsia-500",
  };

  // TODO: build details page
  if (status == showStatusColourMap.NOT_YET_RELEASED) {
  }
  // build url

  let showUrl = urlBuild("/watch", { id: id, episode: 1 });

  return (
    <Link href={showUrl}>
      <div
        className={`relative ${
          mouseOver && "bg-zinc-900"
        } rounded-lg duration-300 ease-in-out`}
        onMouseOver={() => {
          setTextColour(colour);
          setMouseOver(true);
        }}
        onMouseLeave={() => {
          setTextColour("#fff");
          setMouseOver(false);
        }}
      >
        <div className="absolute flex h-full items-center text-muted-foreground">
          <h3
            className={`font-generalSans text-5xl font-bold italic duration-300 ease-in-out translate-x-2`}
            style={{ color: textColour }}
          >
            #{index < 9 ? `0${index + 1}` : index + 1}
          </h3>
        </div>
        <div
          className={`${className} w-full h-24 rounded-lg gap-1 flex items-center bg-zinc-900 ${
            mouseOver && "translate-x-28"
          } duration-500 ease-in-out will-change-transform`}
        >
          <div className=" h-full aspect-[2/3] flex relative">
            <Image
              src={coverImage}
              alt={title}
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="h-full object-cover rounded-lg w-full"
            />
          </div>

          <div>
            {/* title */}

            <div className="flex items-center gap-2 mt-1 py-1 px-1 rounded duration-300 ease-in-out">
              <span
                className={`inline-block rounded-full ${showStatusColourMap[status]} size-2 flex-shrink-0`}
              ></span>
              <h3
                className="font-generalSans text-xs font-semibold line-clamp-2 text-ellipsis overflow-hidden text-wrap w-11/12  duration-300 ease-in-out"
                style={{ color: textColour }}
              >
                {title}
              </h3>
            </div>

            {/* details */}
            <div className="flex items-center gap-x-1 mt-1 h-5 px-1 overflow-hidden ">
              {/* YEAR */}
              {seasonYear && (
                <div className="bg-zinc-800/70 rounded h-full flex px-1 items-center">
                  <h4 className="font-generalSans text-xs font-semibold text-muted-foreground hover:text-white duration-300 ease-in-out whitespace-nowrap flex items-center gap-0.5">
                    <CalendarRange size={12} />
                    {seasonYear}
                  </h4>
                </div>
              )}

              {/* format */}
              {format && (
                <div className="bg-zinc-800/70 rounded h-full flex px-1 items-center">
                  <h4 className="font-generalSans text-xs font-semibold text-muted-foreground hover:text-white duration-300 ease-in-out whitespace-nowrap">
                    {format}
                  </h4>
                </div>
              )}

              {/* episodes */}
              {episodeCount && (
                <div className="bg-zinc-800/70 rounded h-full flex px-1 items-center">
                  <div className="text-muted-foreground  duration-300 ease-in-out flex items-center gap-x-0.5 hover:text-white">
                    <h4 className="font-generalSans text-xs font-semibold text-muted-foreground hover:text-white duration-300 ease-in-out whitespace-nowrap flex items-center gap-0.5 will-change-transform">
                      <Captions size={12} />
                      {isDubbed && <Mic size={12} />}

                      {formattedEpisode}
                    </h4>
                  </div>
                </div>
              )}

              {/* RATING */}
              {rating && (
                <div className="h-full rounded flex px-1 items-center  bg-zinc-800/70">
                  <h4 className="font-generalSans text-xs font-semibold flex items-center gap-0.5 text-muted-foreground hover:text-white duration-300 ease-in-out whitespace-nowrap">
                    <Star size={12} />
                    {rating}%
                  </h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default HorizontalCard;
