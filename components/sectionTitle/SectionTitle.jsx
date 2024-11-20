import React from "react";
import Link from "next/link";

import { ChevronRight } from "lucide-react";

function SectionTitle({ title, className, link, hoverColour }) {
  if (link == null || link.trim() == "")
    throw new Error("Must enter link for section title component");

  // TODO: add more colours
  const hoverColourMap = {
    blue: "hover:text-sky-400/90",
  };

  let setHoverColour = hoverColourMap[hoverColour];

  return (
    <div className={`${className} flex`}>
      <Link href={`${link}`}>
        <div
          className={`inline-flex items-center hover:ml-2 duration-200 ease-in-out ${setHoverColour}`}
        >
          <ChevronRight size={24} strokeWidth={4} />
          <h1 className="font-generalSans font-semibold text-2xl">{title}</h1>
        </div>
      </Link>
    </div>
  );
}

export default SectionTitle;
