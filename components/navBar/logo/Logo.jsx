import React from "react";
import Link from "next/link";

function Logo({ className }) {
  // maybe colour changing?
  // const colours = ["rose"];

  return (
    <div className={className}>
      <Link href="/">
        <h1
          className={`tracking-wide font-generalSans text-amber-50 font-bold text-4xl`}
        >
          {/* Kanso */}
        </h1>
      </Link>
    </div>
  );
}

export default Logo;
