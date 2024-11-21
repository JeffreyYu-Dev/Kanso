import React from "react";

// icons
import { Star, Captions, Clock, ChevronLeft, ChevronRight } from "lucide-react";

// components
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

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

function numberOfEpisodes([episodeCount, airingEpisodeCount]) {
  if (episodeCount == null && airingEpisodeCount == null) return null;
  if (episodeCount == null) return airingEpisodeCount - 1;
  return episodeCount;
}

// FIXME: what happens when the anime finishes? youll need to check if the anime is finished airing and just apply the # of episodes?
// idk if i hve to actually
function Info({ className, animeInfo, scrollNext, scrollPrev, ...rest }) {
  const title = animeInfo.title?.english;
  const avgScore = animeInfo.averageScore;
  const format = animeInfo.format;
  const seasonYear = animeInfo.seasonYear;
  const avgDuration = animeInfo.duration;
  const description = animeInfo.description;

  const episodes = numberOfEpisodes([
    animeInfo.episodes,
    animeInfo?.nextAiringEpisode?.episode,
  ]);

  return (
    <div
      className={`${className} h-full relative`}
      style={{
        background:
          "radial-gradient(at center 100px ,transparent 0%,rgba(0,0,0,1) 100%",
      }}
    >
      {/* buttons */}
      <div className="absolute right-2 top-2 p-1 rounded-md inline-flex gap-1 bg-zinc-900 ring-1 shadow-md ring-black/5">
        <Button variant="outline" size="icon" onClick={scrollPrev}>
          <ChevronLeft size={12} />
        </Button>
        <Button variant="outline" size="icon" onClick={scrollNext}>
          <ChevronRight size={12} />
        </Button>
      </div>

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
        </div>
      </div>
    </div>
  );
}

export default Info;
