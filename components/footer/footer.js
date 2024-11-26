import React from "react";
import { Separator } from "../ui/separator";
import Image from "next/image";

import kiss from "@/Assets/gifs/kiss.gif";

function Footer({ className }) {
  return (
    <div
      className={`${className} w-11/12  mt-10 flex flex-col items-center h-36 gap-2 mb-6`}
    >
      <div className=" flex items-center gap-2">
        <h1 className="font-generalSans text-2xl font-semibold">
          Made by joof | message
        </h1>
        {/* <Image src={kiss} alt="Kiss :D" width={128} height={128} /> */}
      </div>
      <Separator className="" />
      <div className="flex items-center">
        <h1>Inspired by miruro</h1>
      </div>
    </div>
  );
}

export default Footer;
