import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import { User, UserRoundPen } from "lucide-react";

function truncatedUsername(username) {
  const length = 15;

  if (username.length < length) return username;

  return username.substring(0, length) + "...";
}

function truncateTag(tag) {
  const length = 15;

  if (tag.length < length) return tag;

  return tag.substring(0, length) + "...";
}

function UserProfile({ className }) {
  const isLoggedIn = true;

  const test = {
    name: "Jeffrey Yu",
    profilePicture: "https://github.com/shadcn.png",
    //  fix this up to make it like discord sorta
    status: "watching the 7th prince",
  };

  const tag = truncateTag(test.status);
  const username = truncatedUsername(test.name);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={`${className} bg-zinc-900 w-44 h-12 rounded-md flex items-center justify-between border max-w-52 hover:bg-zinc-800 ease-in-out duration-200 `}
        >
          {/* Is logged in? display avatar */}
          <div className="mx-2 flex justify-between w-full items-center flex-row-reverse">
            {isLoggedIn ? (
              <Avatar className="size-10">
                <AvatarImage src={test.profilePicture} />
                <AvatarFallback>{test.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
            ) : (
              <div className="size-10 rounded-full flex items-center justify-center bg-zinc-950 border">
                <User size={16} />
              </div>
            )}

            {/* TODO: ADD IS LOGGED IN LOGIC */}
            {/* is logged in? display name and other info */}

            <div className="flex flex-col justify-center h-8 w-28">
              <h3 className="font-generalSans text-xs font-normal overflow-hidden text-nowrap tracking-wider">
                {username}
              </h3>
              <p className="text-xs text-muted-foreground overflow-hidden text-nowrap`">
                {tag}
              </p>
            </div>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44 bg-zinc-950">
        <DropdownMenuLabel className="" asChild>
          <div className="flex items-center gap-2">
            <UserRoundPen size={16} />
            <h3 className="text-sm">Account</h3>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserProfile;
