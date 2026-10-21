"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, MessageSquareMore, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer/drawer";
import { DUMMY_HOST } from "@/lib/dummy";
import HostSidebar from "./sidebar";
import NotificationsPopover from "./notifications-popover";

export default function HostTopbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-gray-100 bg-[#FEFEFE] px-4 py-3 md:px-6">
      <button type="button" onClick={() => setIsMenuOpen(true)} aria-label="Open menu" className="btn-rounded md:hidden">
        <Menu className="size-4" />
      </button>

      <label className="flex h-10 w-full max-w-sm items-center gap-2 rounded-lg border border-gray-200 px-3 text-sm focus-within:border-primary">
        <Search className="size-4 shrink-0 text-Text-body-text" />
        <input type="search" placeholder="Search user, listings..." className="w-full bg-transparent outline-none placeholder:text-Grey-Pure-White" />
      </label>

      <div className="ml-auto flex items-center gap-2 md:gap-3">
        <Link href="/host/messages" aria-label="Messages" className="btn-rounded hover:bg-gray-50">
          <MessageSquareMore className="size-4" strokeWidth={1.5} />
        </Link>
        <NotificationsPopover />

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 rounded-full border border-gray-100 p-1 pr-2 outline-none">
            <Avatar className="size-6 md:size-7">
              <AvatarImage src={DUMMY_HOST.avatar} alt={DUMMY_HOST.name} />
              <AvatarFallback>{DUMMY_HOST.name[0]}</AvatarFallback>
            </Avatar>
            <ChevronDown className="size-4 text-Text-body-text" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/host/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/host/account-settings">Account settings</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Drawer direction="left" open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DrawerContent className="w-60! max-w-[80vw] p-0">
          <DrawerTitle className="sr-only">Menu</DrawerTitle>
          <HostSidebar className="border-r-0" onNavigate={() => setIsMenuOpen(false)} />
        </DrawerContent>
      </Drawer>
    </header>
  );
}
