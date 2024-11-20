import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, SquarePlus } from "lucide-react";

function VerticalAnimeCard({
  title,
  seasonYear,
  rating,
  format,
  coverImage,
  status,
}) {
  const showStatusColourMap = {
    upcoming: "bg-orange-500",
    airing: "bg-sky-500",
    completed: "bg-lime-500",
  };

  return (
    <div className="w-full">
      <Link href="/" className="block">
        <div className="p-1 rounded-md ring-black/10 shadow-lg bg-zinc-900/20">
          {/* Image Container */}
          <div className="relative aspect-[2/3] group">
            <div className="absolute inset-0 transition-transform duration-300 ease-in-out group-hover:-translate-y-1">
              <Image
                src={coverImage}
                alt={title}
                fill
                className="rounded object-cover"
                priority
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-zinc-950/70 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-2 right-2">
                  <SquarePlus className="hover:opacity-50 transition-colors duration-300 hover:text-green-300" />
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <Play
                    size={32}
                    fill="white"
                    className="hover:opacity-80 transition-transform duration-300 hover:scale-110"
                  />
                </div>

                <div className="absolute bottom-2 left-2 right-2">
                  <div className="text-xs font-semibold bg-zinc-900 ring-1 ring-black/5 rounded px-2 py-2 text-center">
                    {format}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Container */}
          <div className="space-y-1 mt-1">
            {/* Title */}
            <div className="h-7 flex items-center gap-1 px-2 py-1 hover:bg-zinc-900/80 rounded transition-colors duration-300">
              <span
                className={`${showStatusColourMap[status]} size-1.5 rounded-full flex-shrink-0`}
              />
              <h3 className="font-generalSans font-semibold text-xs truncate">
                {title}
              </h3>
            </div>

            {/* Details */}
            <div className="h-5 grid grid-cols-3 gap-0.5 px-0.5">
              <div className="rounded bg-zinc-900 flex items-center justify-center">
                <h4 className="text-muted-foreground font-generalSans font-semibold text-[10px] px-1">
                  {seasonYear}
                </h4>
              </div>
              <div className="rounded bg-zinc-900 flex items-center justify-center">
                <h4 className="text-muted-foreground font-generalSans font-semibold text-[10px] px-1">
                  EPISODE
                </h4>
              </div>
              <div className="rounded bg-zinc-900 flex items-center justify-center">
                <h4 className="text-muted-foreground font-generalSans font-semibold text-[10px] px-1">
                  {rating}%
                </h4>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default VerticalAnimeCard;
