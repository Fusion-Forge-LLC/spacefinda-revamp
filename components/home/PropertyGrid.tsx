"use client"

import React, { useCallback, useEffect, useRef, useState } from "react";
import Wrapper from "@/components/wrapper/wrapper";
import PropertyCard from "./PropertyCard";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PropertyCardData } from "@/lib/apartments/mappers";
import { cn } from "@/lib/utils";

export default function PropertyGrid({title, subtitle, showListingLink, mb="mb-12", properties}: {title: string, subtitle: string, showListingLink?: boolean, mb?: string, properties: PropertyCardData[]}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const observer = new ResizeObserver(updateScrollState);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      observer.disconnect();
    };
  }, [updateScrollState, properties.length]);

  const handleScroll = (direction: "left" | "right") => {
    const el = containerRef.current;
    const firstCard = el?.querySelector("li");
    if (!el || !firstCard) return;
    const perView = Math.max(1, Math.floor(el.clientWidth / firstCard.clientWidth));
    const scrollValue = el.clientWidth / perView;
    el.scrollBy({
      left: direction === "left" ? -scrollValue : scrollValue,
      behavior: "smooth",
    });
  };

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
              <button className="btn-rounded" onClick={() => handleScroll("left")} disabled={!canScrollLeft} aria-label="Scroll left">
                <ChevronLeft size={24} />
              </button>
              <button className="btn-rounded" onClick={() => handleScroll("right")} disabled={!canScrollRight} aria-label="Scroll right">
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
