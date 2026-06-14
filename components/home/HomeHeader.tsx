"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Wrapper from "@/components/wrapper/wrapper";
import Logo from "@/public/icons/logo.svg";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function HomeHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="py-4  border-b border-gray-100 bg-[#FEFEFE] sticky top-0 z-50">
      <Wrapper>
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src={Logo} alt="Logo" className="text-primary w-[40px] md:w-[60px] h-auto" />
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/auth/client/signin" className="text-[#333333] font-medium hover:text-primary transition-colors text-sm md:text-base">
              Sign in
            </Link>
            <Link href="/auth/business">
              <Button className="" >
                Become a host
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-[#333333]" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <div className={cn(
          "fixed inset-0 top-[65px] bg-white z-40 md:hidden transition-transform duration-300 transform",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="flex flex-col p-6 gap-6">
            <Link 
              href="/auth/client/signin" 
              className="text-lg font-medium text-[#333333] block text-center py-4 border-b border-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign in
            </Link>
            <Link href="/auth/business" onClick={() => setIsMenuOpen(false)}>
              <Button className="bg-blue hover:bg-blue/90 text-white w-full py-7 rounded-xl font-bold text-lg">
                Become a host
              </Button>
            </Link>
          </div>
        </div>
      </Wrapper>
    </header>
  );
}
