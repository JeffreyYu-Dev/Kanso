"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Plus, Captions, Mic, Star } from "lucide-react";

import urlBuild from "@/components/urlBuilder/urlBuild";

function formatEpisode([episodeCount, episodeAiringCount]) {
  if (episodeCount == null && episodeAiringCount == null) return null;

  if (episodeAiringCount == null) return `${episodeCount}`;

  if (episodeCount == null) return `${episodeAiringCount - 1}`;

  return `${episodeAiringCount - 1} / ${episodeCount}`;
}

function VerticalAnimeCard({ details, className }) {
  const [titleColour, setTitleColour] = useState("#fff");

  let title =
    details?.title?.english || details?.title?.romaji || details?.title?.native;
  let seasonYear = details.seasonYear;
  let rating = details.averageScore;
  let format = details.format.replace("_", " ");
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

  // BUILD url
  let showUrl = urlBuild("/watch", { id: id, episode: 1 });

  return (
    // TODO: if you want a ring around the card (maybe add it in settings? )
    //hover:ring-1 hover:ring-white duration-300 ease-in-out rounded <- the tailwind classes
    <Link href={showUrl}>
      <div
        className={`w-full overflow-hidden transform-gpu p-2  ${className}`}
        onMouseOver={() => setTitleColour(colour)}
        onMouseLeave={() => setTitleColour("#fff")}
      >
        {/* Image */}
        <div className="relative w-full aspect-[2/3] rounded overflow-hidden group will-change-transform">
          {/* Image */}
          <Image
            src={coverImage}
            alt={title}
            quality={75}
            className="object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            width={0}
            height={0}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
          {/* year */}
          {seasonYear && (
            <div className="bg-zinc-900 rounded px-1 inline-flex items-center absolute top-1 left-1 h-6">
              <h4 className="font-generalSans text-xs font-semibold text-muted-foreground whitespace-nowrap">
                {seasonYear}
              </h4>
            </div>
          )}

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-zinc-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            {/* PLAY BUTTON */}
            <Play fill="#fff" size={32} />

            {/* ADD BUTTON */}
            <div className="absolute top-1 right-1">
              <Plus
                size={20}
                className="bg-zinc-900/60 backdrop-blur-sm text-white/50 hover:ring-white hover:text-white duration-300 p-0.5 ring-1 ring-zinc-900/20 shadow rounded"
              />
            </div>
          </div>
        </div>
        {/* title */}
        <div className="flex items-center gap-1 mt-1 hover:bg-zinc-800/50 py-1 px-1 rounded duration-300 ease-in-out">
          <span
            className={`inline-block rounded-full ${showStatusColourMap[status]} size-2 flex-shrink-0`}
          ></span>
          <h3
            className="font-generalSans text-xs font-semibold text-nowrap text-ellipsis overflow-hidden whitespace-nowrap"
            style={{ color: titleColour }}
          >
            {title}
          </h3>
        </div>

        {/* details */}
        <div className="flex items-center gap-x-1 mt-1 h-5 px-1 overflow-hidden">
          {/* format */}
          {format && (
            <div className="bg-zinc-800/70 rounded h-full flex px-1 items-center">
              <h4 className="font-generalSans text-xs font-semibold text-muted-foreground hover:text-white duration-300 ease-in-out whitespace-nowrap">
                {format}
              </h4>
            </div>
          )}

          {/* episodes */}
          <div className="bg-zinc-800/70 rounded h-full flex px-1 items-center">
            <div className="text-muted-foreground  duration-300 ease-in-out flex items-center gap-x-0.5 hover:text-white">
              <h4 className="font-generalSans text-xs font-semibold text-muted-foreground hover:text-white duration-300 ease-in-out whitespace-nowrap flex items-center gap-0.5">
                <Captions size={12} />
                {isDubbed && <Mic size={12} />}

                {formattedEpisode}
              </h4>
            </div>
          </div>
          {/* RATING */}
          {/* TODO: add v1 or v2 */}
          <div className="h-full rounded flex px-1 items-center  bg-zinc-800/70">
            <h4 className="font-generalSans text-xs font-semibold flex items-center gap-0.5 text-muted-foreground hover:text-white duration-300 ease-in-out whitespace-nowrap">
              <Star size={12} />
              {rating}%
            </h4>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default VerticalAnimeCard;
