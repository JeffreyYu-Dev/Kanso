"use client";
import React, { useState, useRef } from "react";
import HorizontalCard from "@/components/animeCard/horizontalCard";
import SectionTitle from "@/components/sectionTitle/sectionTitle";
import { ChevronDown } from "lucide-react";

function SideContentCard({ data, setOpen, setOpenStatus, title }) {
  const containerRef = useRef(null);
  const [translateY, setTranslateY] = useState("");

  const returnToTop = () => {
    // Scroll container to top
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleClick = () => {
    if (setOpenStatus) {
      returnToTop();
    }
    setOpen(!setOpenStatus);
  };

  return (
    <div className="bg-zinc-900/60 rounded-lg p-2">
      <SectionTitle
        title={title}
        hoverColour={"blue"}
        textSize={"text-xl"}
        className={"mb-2 mt-1"}
      />
      <div
        ref={containerRef}
        className="gap-2 flex flex-col h-[32rem] py-1 overflow-y-auto overflow-x-hidden rounded duration-300 ease-in-out "
        style={{
          overflowY: setOpenStatus ? "auto" : "hidden",
          height: setOpenStatus ? "40rem" : "32rem",
        }}
      >
        {data.map((show, index) => (
          <HorizontalCard
            index={index}
            key={index}
            details={show}
            className={"z-10"}
          />
        ))}
      </div>
      <button
        className={` w-full bg-zinc-900/60 py-1 px-2 flex items-center justify-center hover:bg-zinc-950 duration-100 ease-in-out mt-2`}
        onMouseOver={() => setTranslateY("2px")}
        onMouseLeave={() => setTranslateY("0px")}
        onClick={() => {
          handleClick();
        }}
      >
        <h3
          style={{ transform: ` translateY(${translateY})` }}
          className="duration-100  ease-in-out"
        >
          <ChevronDown
            className={`${
              setOpenStatus && "rotate-180"
            } duration-500 ease-in-out`}
          />
        </h3>
      </button>
    </div>
  );
}

export default SideContentCard;
