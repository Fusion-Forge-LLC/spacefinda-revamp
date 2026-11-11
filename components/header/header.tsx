"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Wrapper from "@/components/wrapper/wrapper";
import Logo from "@/public/icons/logo.svg";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { AvatarDropdown } from "../home/homeavatar";
import AuthFlow from "../authentication/auth-flow";
import { useAuth } from "../authentication/auth-provider";

export default function HomeHeader({className, authenticated = false}:{className?: string; authenticated?: boolean}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const { user } = useAuth();
  // Existing hosts go to their dashboard; everyone else starts a listing (it asks them to sign in first)
  const isHost = !!user?.roles?.includes("vendor");
  const hostHref = isHost ? "/host" : "/host/create-listing";
  const isAuthenticated = authenticated || !!user;

  return (
    <header className={cn(className, "py-4  border-b border-gray-100 bg-[#FEFEFE] sticky top-0 z-50")}>
      <AuthFlow showModal={openAuthModal} setShowModal={setOpenAuthModal} />
      <Wrapper className="max-md:px-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src={Logo} alt="Logo" className="text-primary w-10 md:w-15 h-auto" />
          </Link>          
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Button variant={"ghost"} asChild><Link href={hostHref}>{isHost ? "Host dashboard" : "Become a host"}</Link></Button>
                <AvatarDropdown />
              </>
            ) : (
            <>  
            <Button variant={"ghost"} onClick={() => setOpenAuthModal(true)}>Sign in</Button>
              <Link href="/host/create-listing">
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
                <Button variant={"ghost"} asChild><Link href={hostHref}>{isHost ? "Host dashboard" : "Become a host"}</Link></Button>
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
            <Link
              href="/host/create-listing"
              className="text-lg font-medium text-[#333333] block text-center py-4 border-b border-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Become a host
            </Link>
          </div>
        </div>
      </Wrapper>
    </header>
  );
}
