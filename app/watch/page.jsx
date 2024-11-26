"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

// components
import Player from "@/components/player/playerContainer";
import Provider from "@/components/watch/provider";
import { Skeleton } from "@/components/ui/skeleton";
import EpisodeContainer from "@/components/player/episodesContainer";

import {
  getGogoAnimeMap,
  getAnimeInfo,
  getStreamingLinks,
} from "@/components/videoServers/gogo";

function WatchLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState({});
  const [streamLinks, setStreamLinks] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  const show = {
    id: searchParams.get("id"),
    episode: searchParams.get("episode") || "1",
  };

  const getStream = useCallback(async (episodeList, episodeNumber) => {
    if (!episodeList?.length) return;

    const episodeIndex = Math.max(0, parseInt(episodeNumber) - 1);
    const episodeId = episodeList[episodeIndex]?.id;

    if (episodeId) {
      try {
        const result = await getStreamingLinks(episodeId);
        if (result) {
          setStreamLinks(result);
        }
      } catch (error) {
        console.error("Error fetching stream links:", error);
      }
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!show.id) return;

      try {
        setIsLoading(true);
        const showData = await getGogoAnimeMap(show.id);
        console.log(showData);

        if (!isMounted) return;

        const [subbedShow, dubbedShow] = Object.values(showData);
        const info = await getAnimeInfo(subbedShow.id);
        console.log(info);

        if (!isMounted) return;

        const newDetails = {
          title: info.title,
          totalEpisodes: info.episodes,
          episodeList: info.episodes,
        };

        setDetails(newDetails);
        await getStream(newDetails.episodeList, show.episode);
      } catch (error) {
        console.error("Error fetching show data:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [show.id, show.episode, getStream]);

  function changeEpisodes(number) {
    // Update URL with new episode number
    const params = new URLSearchParams(searchParams);
    params.set("episode", number);
    router.push(`/watch?${params.toString()}`);

    // Update stream
    getStream(details.episodeList, number);
  }

  return (
    <div className="w-full h-full mt-4 flex gap-4">
      <div className="basis-9/12 relative">
        <div className="aspect-video w-full">
          {isLoading ? (
            <Skeleton className="absolute inset-0" />
          ) : (
            <Player
              key={`${show.id}-${show.episode}`}
              className="absolute inset-0"
              streamLinks={streamLinks}
            />
          )}
        </div>
      </div>
      <div className="flex-grow relative bg-zinc-900/60 rounded-lg">
        {isLoading ? (
          <Skeleton className="absolute inset-0" />
        ) : (
          <EpisodeContainer
            className="inset-0 absolute"
            changeEpisodes={changeEpisodes}
          />
        )}
      </div>
    </div>
  );
}

export default WatchLayout;
