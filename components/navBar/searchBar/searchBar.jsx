import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// TODO: maybe turn this into a button to open the command line
function SearchBar({ className }) {
  return (
    <div className={`w-96 ${className}`}>
      <Input type="email" placeholder="Search" className="h-8 bg-zinc-900" />
    </div>
  );
}

export default SearchBar;
