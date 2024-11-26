import React from "react";
import Link from "next/link";

// icons
import { Star, Captions, Clock, Play } from "lucide-react";

// components
import { Separator } from "@/components/ui/separator";

import urlBuild from "@/components/urlBuilder/urlBuild";

const ShowDetails = ({ symbol, info, className, text, ...rest }) => {
  if (info == null) {
    return null;
  }

  if (!symbol) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-zinc-800 px-2 rounded h-5 text-muted-foreground`}
      >
        <h4 className="font-generalSans font-semibold text-xs text-nowrap">
          {info} {text}
        </h4>
      </div>
    );
  }

  return (
    <div
      className={`${className} flex items-center justify-center bg-zinc-800 px-2 rounded h-5 text-muted-foreground`}
    >
      <div className="flex items-center justify-center -mt-px">
        {symbol}
        <h4 className="font-generalSans font-semibold text-xs ml-1 text-nowrap">
          {info} {text}
        </h4>
      </div>
    </div>
  );
};

function numberOfEpisodes(episodeCount, airingEpisodeCount) {
  if (episodeCount == null && airingEpisodeCount == null) return null;
  if (episodeCount == null) return airingEpisodeCount - 1;
  return episodeCount;
}

function removeStuff(string) {
  const remove = ["<i>", "<br>", "</br>", "</i>"];

  return remove.reduce((str, tag) => str.replaceAll(tag, ""), string);
}

// FIXME: what happens when the anime finishes? youll need to check if the anime is finished airing and just apply the # of episodes?
// idk if i hve to actually
function Info({ className, animeInfo, scrollNext, scrollPrev }) {
  const title = animeInfo.title?.english;
  const avgScore = animeInfo.averageScore;
  const format = animeInfo.format;
  const seasonYear = animeInfo.seasonYear;
  const avgDuration = animeInfo.duration;
  let description = removeStuff(animeInfo.description);

  const id = animeInfo.id;

  const episodes = numberOfEpisodes(
    animeInfo.episodes,
    animeInfo?.nextAiringEpisode?.episode
  );

  let showUrl = urlBuild("/watch", { id: id, episode: 1 });
  let detailsPage = urlBuild("/details");

  return (
    <div
      className={`${className} h-full relative`}
      style={{
        background:
          "radial-gradient(at center 100px ,transparent 0%,rgba(0,0,0,1) 100%",
      }}
    >
      {/* data */}
      <div className="w-full absolute bottom-0">
        <div className="w-1/2 ml-4">
          <h1
            className="font-generalSans font-bold text-2xl text-pretty leading-7"
            style={{
              background: `linear-gradient(135deg, ${
                animeInfo.coverImage?.color || "white"
              },white)`,
              color: "transparent",
              backgroundClip: "text",
            }}
          >
            {title}
          </h1>

          <div className="inline-flex items-center py-1 px-1 my-1 ring-1 ring-black/10 shadow-lg rounded bg-zinc-900">
            <div className="flex items-center gap-1">
              <ShowDetails info={seasonYear} />
              <ShowDetails info={format} />
              <Separator orientation="vertical" className="h-4 mx-1" />
              <ShowDetails
                symbol={<Star size={14} strokeWidth={2} />}
                info={avgScore}
              />
              <ShowDetails
                symbol={<Captions size={14} strokeWidth={2} />}
                info={episodes}
              />
              <ShowDetails
                symbol={<Clock size={14} strokeWidth={2} />}
                info={avgDuration}
                text={"mins"}
              />
            </div>
          </div>

          <p className="text-xs mb-2 font-generalSans font-medium text-muted-foreground line-clamp-3 text-pretty">
            {description}
          </p>
          <div className="flex mb-2">
            <Link href={showUrl}>
              <div className="py-1.5 px-4 bg-white rounded inline-block hover:scale-110 duration-300 ease-in-out will-change-transform shadow">
                <h2 className="font-semibold text-zinc-800 font-generalSans text-sm flex items-center gap-1 ">
                  <Play size={24} fill="text-zinc-800" />
                  Watch Now
                </h2>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
