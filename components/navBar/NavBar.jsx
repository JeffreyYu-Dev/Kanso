import React from "react";
import SearchBar from "./searchBar/SearchBar";
import Logo from "./logo/Logo";
import UserProfile from "./user/UserProfile";

// temporary
import { Projector } from "lucide-react";

function NavBar() {
  return (
    <nav className=" sticky top-0 h-14 border-b-[1px] border-b-zinc-800 z-20 bg-zinc-950 ">
      <div className="h-full flex items-center justify-between">
        <Logo className="ml-10" />
        <SearchBar className="mx-auto" />

        {/* maybe temporary also the icons gotta be bigger*/}
        <div className="mr-6 flex items-center gap-2">
          <UserProfile className="" />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
