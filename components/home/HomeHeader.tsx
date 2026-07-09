"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Wrapper from "@/components/wrapper/wrapper";
import Logo from "@/public/icons/logo.svg";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { AvatarDropdown } from "./homeavatar";
import AuthFlow from "../authentication/auth-flow";

export default function HomeHeader({isPastHero, heroRef}: {isPastHero: boolean; heroRef: React.RefObject<HTMLDivElement | null>}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Placeholder for auth state

  const scrollToSearch = () => {
    if(!heroRef.current) return;

    window.scrollTo({
      top: heroRef.current.offsetTop - (heroRef.current.clientHeight + 50),
      behavior: "smooth",
    });
  }

  return (
    <header className="py-4  border-b border-gray-100 bg-[#FEFEFE] sticky top-0 z-50">
      <AuthFlow showModal={openAuthModal} setShowModal={setOpenAuthModal} />
      <Wrapper>
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src={Logo} alt="Logo" className="text-primary w-10 md:w-15 h-auto" />
          </Link>

          
          <div 
            onClick={scrollToSearch}
            data-state="Default" 
            className={cn(
              "size- pl-2 py-1 cursor-pointer border text-Text-Dark border-Grey-Pure-White rounded-[999px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)] outline -outline-offset-1 outline-Border-Light hidden md:inline-flex justify-start items-center text-sm transition-opacity duration-300", 
              isPastHero ? "opacity-100" : "opacity-0"
            )}
          >
            <div className="border-r border-Grey-Pure-White py-0.5 px-2 lg:px-3">
              <span className="justify-start text-Text-Dark text-sm font-normal font-['Geist'] leading-5">
                Shortlets
              </span>
            </div>
            <div className="border-r border-Grey-Pure-White py-0.5 px-2 lg:px-3">
              <span className="justify-start text-Text-Dark text-sm font-normal font-['Geist'] leading-5">
                Location
              </span>
            </div>
            <div className="border-r border-Grey-Pure-White py-0.5 px-2 lg:px-3">
              <span className="justify-start text-Text-Dark text-nowrap text-sm font-normal font-['Geist'] leading-5">
                Check In - Check Out
              </span>
            </div>
            <div className=" py-0.5 px-2 lg:px-3 flex items-center gap-2 shrink-0">
              <span className="justify-start text-Text-Dark text-sm font-normal font-['Geist'] leading-5">
                Search
              </span>
              <button className="size- p-1.25 bg-blue shrink-0 rounded-full flex items-center justify-center ">
                <Image src="/icons/search.svg" alt="Search" width={8} height={8} className="brightness-0 invert" />
              </button>
            </div>
          </div>
          
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Button variant={"ghost"}>Become a host</Button>
                <AvatarDropdown />
              </>
            ) : (
            <>  
            <Button variant={"ghost"} onClick={() => setOpenAuthModal(true)}>Sign in</Button>
              <Link href="/auth/business">
                <Button className="" >
                  Become a host
                </Button>
              </Link>
            </> 
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Button variant={"ghost"}>Become a host</Button>
                <AvatarDropdown />
              </div>
            ) : (
            <button 
              className="p-2 text-[#333333]" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            )}
          </div>

        </div>

        {/* Mobile Nav Overlay */}
        <div className={cn(
          "fixed inset-0 top-16.25 bg-white z-40 md:hidden transition-transform duration-300 transform",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="flex flex-col p-6 gap-6">
            <button 
              className="text-lg font-medium text-[#333333] block text-center py-4 border-b border-gray-50"
              onClick={() => {
                setIsMenuOpen(false)
                setOpenAuthModal(true);
              }}
            >
              Sign in
            </button>
            <button 
              className="text-lg font-medium text-[#333333] block text-center py-4 border-b border-gray-50"
              onClick={() => {
                setIsMenuOpen(false);
                setOpenAuthModal(true);
              }}
            >
              Become a host
            </button>
          </div>
        </div>
      </Wrapper>
    </header>
  );
}
