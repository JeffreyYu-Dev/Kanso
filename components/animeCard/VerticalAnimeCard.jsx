import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Plus, Captions, Mic, Star } from "lucide-react";

function VerticalAnimeCard({ data }) {
  let title =
    data?.title?.english || data?.title?.romaji || data?.title?.native;
  let seasonYear = data?.seasonYear;
  let rating = data?.averageScore;
  let format = data?.format.replace("_", " ");
  let coverImage = data?.coverImage?.large;
  let status = data?.status || "unknown";

  if (format == "NOVEL" || format == "MANGA" || format == "ONE_SHOT") {
    return null;
  }

  if (title == null) {
    return null;
  }

  if (rating == null) {
    return null;
  }

  const showStatusColourMap = {
    NOT_YET_RELEASED: "bg-orange-500",
    RELEASING: "bg-sky-500",
    FINISHED: "bg-lime-500",
    HIATUS: "bg-yellow-500",
    CANCELLED: "bg-red-500",
    unknown: "bg-fuchsia-500",
  };

  return (
    <Link href="/">
      <div className="w-full overflow-hidden transform-gpu p-2">
        {/* Image */}
        <div className="w-full relative aspect-[2/3] rounded will-change-transform overflow-hidden hover:-translate-y-1 duration-300 ease-in-out ">
          <div className="w-full h-full">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover rounded-md w-full"
              priority
            />
            {/* OVERLAY */}
            <div className="opacity-0 bg-zinc-900/80 w-full h-full rounded hover:opacity-100 duration-300 ease-in-out inset-0 absolute">
              {/* PLAY BUTTON */}
              <div className="flex justify-center items-center h-full">
                <Play fill="#fff" size={32} />
              </div>
              {/* add button */}
              <div className="absolute inset-0 justify-end flex mt-1 mr-1">
                <Plus
                  size={20}
                  className="bg-zinc-900/20 text-white/50 hover:ring-white hover:text-white duration-300 p-0.5 ring-1 ring-zinc-900/20 shadow rounded"
                ></Plus>
              </div>
            </div>
          </div>
        </div>
        {/* title */}
        <div className="flex items-center gap-1 mt-1 hover:bg-zinc-950/80 py-1 px-1 rounded duration-300 ease-in-out">
          <span
            className={`inline-block rounded-full ${showStatusColourMap[status]} size-2 flex-shrink-0`}
          ></span>
          <h3 className="font-generalSans text-xs font-semibold text-nowrap text-ellipsis overflow-hidden whitespace-nowrap">
            {title}
          </h3>
        </div>

        {/* details */}
        <div className="flex items-center gap-x-1 mt-1 h-5 px-1 overflow-hidden">
          {/* year */}
          {seasonYear && (
            <div className="bg-zinc-800/70 rounded px-1 h-full flex items-center">
              <h4 className="font-generalSans text-[0.65rem] leading-3 font-semibold text-muted-foreground hover:text-white duration-300 ease-in-out whitespace-nowrap">
                {seasonYear}
              </h4>
            </div>
          )}

          {/* format */}
          {format && (
            <div className="bg-zinc-800/70 rounded h-full flex px-1 items-center">
              <h4 className="font-generalSans text-[0.65rem] leading-3 font-semibold text-muted-foreground hover:text-white duration-300 ease-in-out whitespace-nowrap">
                {format}
              </h4>
            </div>
          )}

          {/* episodes */}
          <div className="bg-zinc-800/70 rounded h-full flex px-1 items-center">
            <div className="text-muted-foreground hover:text-white duration-300 ease-in-out flex items-center gap-x-0.5">
              <Mic size={12} />
              <Captions size={12} />
              <h4 className="font-generalSans text-[0.65rem] leading-3 font-semibold text-muted-foreground hover:text-white duration-300 ease-in-out whitespace-nowrap">
                11/24
              </h4>
            </div>
          </div>
          {/* RATING */}
          <div className="bg-zinc-800/70 rounded h-full flex px-1 items-center gap-0.5">
            <Star size={12} />
            <h4 className="font-generalSans text-[0.65rem] leading-3 font-semibold text-muted-foreground hover:text-white duration-300 ease-in-out whitespace-nowrap">
              {rating}%
            </h4>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default VerticalAnimeCard;
