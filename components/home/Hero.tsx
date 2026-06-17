import React from "react";
import Image from "next/image";
import Wrapper from "@/components/wrapper/wrapper";
import { SearchIcon } from "../icons/icons";
import { MobileSearch } from "./mobileSearch";

export default function Hero() {
  return (
    <section className="pt-12 md:pt-20 pb-16 bg-[#FEFEFE]">
      <Wrapper>
        <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-6 mb-10 md:mb-12 px-4">
          <h1 className="text-center justify-start text-Text-Dark text-2xl md:text-5xl font-semibold font-['Inter'] ">
            <span className="">Find a shortlet you can </span>
            <span className="text-primary">trust</span>
          </h1>
          <p className="text-sm md:text-lg text-[#666666] max-w-2xl mx-auto">
            Book verified shortlet apartments in Ibadan with confidence. We're starting here and bringing trusted stays to more cities soon.
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-4">
          {/* Desktop Search Bar */}
          <div className="hidden md:flex bg-white rounded-full shadow-[0px_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 p-2 pl-8 items-center justify-between">
            <div className="flex-1 grid grid-cols-4 divide-x divide-gray-100">
              <button className="px-4 py-2 flex flex-col justify-center text-left hover:bg-gray-50 transition-colors rounded-l-full">
                <span className="text-[11px] font-bold text-[#333333] uppercase tracking-wider mb-1">Space Type</span>
                <div className="flex items-center justify-between group">
                  <span className="text-sm text-[#9D9D9D]">Choose space type</span>
                  <Image src="/icons/chevron-down.svg" alt="Arrow" width={12} height={12} className="opacity-40" />
                </div>
              </button>
              
              <div className="px-6 py-2 flex flex-col justify-center">
                <span className="text-[11px] font-bold text-[#333333] uppercase tracking-wider mb-1">Location</span>
                <input 
                  type="text" 
                  placeholder="Enter city or state" 
                  className="text-sm text-[#9D9D9D] bg-transparent outline-none placeholder:text-[#9D9D9D] w-full"
                />
              </div>

              <button className="px-6 py-2 flex flex-col justify-center text-left hover:bg-gray-50 transition-colors">
                <span className="text-[11px] font-bold text-[#333333] uppercase tracking-wider mb-1">Check in - Check out</span>
                <div className="text-sm text-[#9D9D9D]">Add dates</div>
              </button>

              <button className="px-6 py-2 flex flex-col justify-center text-left hover:bg-gray-50 transition-colors border-none">
                <span className="text-[11px] font-bold text-[#333333] uppercase tracking-wider mb-1">Guest</span>
                <div className="text-sm text-[#9D9D9D]">Add guests</div>
              </button>
            </div>

            <button className="h-14 w-14 bg-blue rounded-full flex items-center justify-center hover:bg-blue/90 transition-all shadow-lg shadow-blue/20 shrink-0">
              <Image src="/icons/search.svg" alt="Search" width={24} height={24} className="brightness-0 invert" />
            </button>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden">
            <MobileSearch />  
          </div>


          <div className="hidden space-y-4">
            <div className="bg-white rounded-2xl shadow-[0px_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 p-4 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1 text-left">
                  <span className="text-[10px] font-bold text-[#333333] uppercase tracking-wider">Space Type</span>
                  <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                    <span className="text-sm text-[#9D9D9D]">Choose space type</span>
                    <Image src="/icons/chevron-down.svg" alt="Arrow" width={10} height={10} className="opacity-40" />
                  </div>
                </div>
                <div className="space-y-1 text-left">
                  <span className="text-[10px] font-bold text-[#333333] uppercase tracking-wider">Location</span>
                  <input 
                    type="text" 
                    placeholder="Enter city or state" 
                    className="text-sm text-[#9D9D9D] bg-transparent outline-none placeholder:text-[#9D9D9D] w-full border-b border-gray-50 pb-2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#333333] uppercase tracking-wider">Check in/out</span>
                    <div className="text-sm text-[#9D9D9D] border-b border-gray-50 pb-2">Add dates</div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#333333] uppercase tracking-wider">Guest</span>
                    <div className="text-sm text-[#9D9D9D] border-b border-gray-50 pb-2">Add guests</div>
                  </div>
                </div>
              </div>
              <button className="w-full bg-blue py-4 rounded-xl text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue/10">
                <Image src="/icons/search.svg" alt="Search" width={18} height={18} className="brightness-0 invert" />
                Search Spaces
              </button>
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
}
