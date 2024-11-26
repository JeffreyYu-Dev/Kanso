"use client";
import React, { useState } from "react";
import SideContentCard from "./sideContentCard";

function SideContentContainer({ topAiring, upComing }) {
  const [openContainer, setOpenContainer] = useState(null);

  const handleContainerToggle = (containerId) => {
    setOpenContainer(openContainer === containerId ? null : containerId);
  };

  return (
    <div className="flex-grow xl:block hidden min-w-72 w-3/12">
      <div className="flex flex-col gap-10 w-full">
        {/* top airing */}
        <SideContentCard
          data={topAiring}
          setOpen={() => handleContainerToggle("airing")}
          setOpenStatus={openContainer === "airing"}
          title={"TOP AIRING"}
        />
        <SideContentCard
          data={upComing}
          setOpen={() => handleContainerToggle("upcoming")}
          setOpenStatus={openContainer === "upcoming"}
          title={"UPCOMING"}
        />
      </div>
    </div>
  );
}

export default SideContentContainer;
