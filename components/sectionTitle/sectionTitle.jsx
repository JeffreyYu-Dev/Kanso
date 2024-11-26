import React from "react";
import Link from "next/link";

import { ChevronRight } from "lucide-react";

function SectionTitle({ title, className, link, hoverColour, textSize }) {
  if (title == "" || title == null) {
    throw new Error("Must enter title for section title component");
  }

  if (hoverColour == "" || hoverColour == null) {
    throw new Error("Must enter hover colour for section title component");
  }

  // if (textSize == "" || textSize == null) {
  //   throw new Error("Must enter hover font size for section title component");
  // }

  // TODO: add more colours
  const hoverColourMap = {
    blue: "hover:text-sky-400/90",
  };

  let setHoverColour = hoverColourMap[hoverColour];

  const textSizeMap = {
    "text-xs": "text-xs",
    "text-sm": "text-sm",
    "text-base": "text-base",
    "text-lg": "text-lg",
    "text-xl": "text-xl",
    "text-2xl": "text-2xl",
    "text-3xl": "text-3xl",
    "text-4xl": "text-4xl",
    "text-5xl": "text-5xl",
  };

  return (
    <div className={`${className} flex`}>
      <Link href={`${link}`}>
        <div
          className={`inline-flex items-center hover:ml-2 duration-200 ease-in-out ${setHoverColour}`}
        >
          <ChevronRight size={24} strokeWidth={4} />
          <h1
            className={`font-generalSans font-semibold ${textSizeMap[textSize]}`}
          >
            {title}
          </h1>
        </div>
      </Link>
    </div>
  );
}

export default SectionTitle;
