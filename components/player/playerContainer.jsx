"use client";

import React, { useEffect, useState } from "react";

import proxyLink from "./proxy/proxy";

// VIDSTACK STUFF
// Base styles for media player and provider (~400B).
import "@vidstack/react/player/styles/base.css";
import { MediaPlayer, MediaProvider } from "@vidstack/react";

function Player({ className, streamLinks }) {
  // NEEDS FIXING
  const proxiedLink = proxyLink(streamLinks.sources[4].url);

  return (
    <div className={`${className} rounded`}>
      <MediaPlayer
        aspectRatio="16/9"
        streamType="on-demand"
        title="klajsdl;kasl;dks"
        src={proxiedLink}
        className="rounded"
        controls={true}
      >
        <MediaProvider />
      </MediaPlayer>
    </div>
  );
}

export default Player;
