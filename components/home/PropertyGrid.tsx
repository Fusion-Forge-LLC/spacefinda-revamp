"use client"

import React, { useRef, useState } from "react";
import Wrapper from "@/components/wrapper/wrapper";
import PropertyCard from "./PropertyCard";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PropertyCardData } from "@/lib/apartments/mappers";
import { cn } from "@/lib/utils";

export default function PropertyGrid({title, subtitle, showListingLink, mb="mb-12", properties}: {title: string, subtitle: string, showListingLink?: boolean, mb?: string, properties: PropertyCardData[]}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const childWidth = containerRef.current.children[0].children[0].clientWidth;
      const scrollValue = containerWidth / Math.floor(containerWidth / childWidth);
        containerRef.current.scrollBy({
            left: direction === "left" ? -scrollValue : scrollValue,
            behavior: "smooth",
        });
      setScrollPosition(containerRef.current.scrollLeft + (direction === "left" ? -scrollValue : scrollValue));
    }
  }
  
  return (
    <section className="py-10 sm:py-24 bg-white max-md:px-4">
      <Wrapper>
        <div className={cn(mb, "flex max-md:gap-6 items-center justify-between")}>
          <div className="sm:space-y-2">
            <h2 className="text-xl sm:text-3xl font-bricolage font-bold text-[#333333]">{title}</h2>
            <p className="text-[#666666] max-sm:text-sm">{subtitle}</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <button className="btn-rounded" onClick={() => handleScroll("left")} disabled={scrollPosition <= 1}>
                <ChevronLeft size={24} />
              </button>
              <button className="btn-rounded" onClick={() => handleScroll("right")} disabled={containerRef.current ? scrollPosition + containerRef.current.clientWidth >= containerRef.current.scrollWidth : false}>
                <ChevronRight size={24} />
              </button>
            </div>
            {showListingLink && <Link href="/listings" className="flex items-center gap-2 text-primary whitespace-nowrap font-semibold hover:underline">
              View all <span className="hidden sm:inline">listings</span>
              <ChevronRight size={24} />
            </Link>}
          </div>
        </div>

        {properties.length === 0 ? (
          <p className="text-[#666666]">No spaces are live yet. Check back soon.</p>
        ) : (
          <div className="overflow-x-scroll md:overflow-hidden" ref={containerRef}>
            <ul className="flex w-full max-md:gap-4">
              {properties.map((prop) => (
                <PropertyCard key={prop.id} {...prop} />
              ))}
            </ul>
          </div>
        )}
      </Wrapper>
    </section>
  );
}
