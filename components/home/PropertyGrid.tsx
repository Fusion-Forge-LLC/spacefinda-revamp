"use client"

import React, { useRef, useState } from "react";
import Image from "next/image";
import Wrapper from "@/components/wrapper/wrapper";
import PropertyCard from "./PropertyCard";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PROPERTIES = [
  {
    id: "1",
    image: "/images/listing-1.png",
    title: "Cosy 2-bed Apartment, Bodija...",
    location: "Bodija · 2 guests · Entire apartment",
    amenities: [
      { icon: "/icons/wifi.svg", label: "Wifi" },
      { icon: "/icons/power.svg", label: "Power" },
      { icon: "/icons/garage.svg", label: "Garage" },
    ],
    price: "₦120,000",
    rating: 4.5,
    reviews: 120,
  },
  {
    id: "2",
    image: "/images/listing-2.png",
    title: "Cosy 2-bed Apartment, Bodija...",
    location: "Bodija · 2 guests · Entire apartment",
    amenities: [
      { icon: "/icons/wifi.svg", label: "Wifi" },
      { icon: "/icons/power.svg", label: "Power" },
      { icon: "/icons/garage.svg", label: "Garage" },
    ],
    price: "₦120,000",
    rating: 4.5,
    reviews: 120,
  },
  {
    id: "3",
    image: "/images/listing-3.png",
    title: "Cosy 2-bed Apartment, Bodija...",
    location: "Bodija · 2 guests · Entire apartment",
    amenities: [
      { icon: "/icons/wifi.svg", label: "Wifi" },
      { icon: "/icons/power.svg", label: "Power" },
      { icon: "/icons/garage.svg", label: "Garage" },
    ],
    price: "₦120,000",
    rating: 4.5,
    reviews: 120,
  },
  {
    id: "4",
    image: "/images/listing-4.png",
    title: "Cosy 3-bed Apartment, Bodija...",
    location: "Bodija · 2 guests · Entire apartment",
    amenities: [
      { icon: "/icons/wifi.svg", label: "Wifi" },
      { icon: "/icons/power.svg", label: "Power" },
      { icon: "/icons/garage.svg", label: "Garage" },
    ],
    price: "₦120,000",
    rating: 4.5,
    reviews: 120,
  },
];

export default function PropertyGrid() {
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
    <section className="py-24 bg-white">
      <Wrapper>
        <div className="flex max-md:gap-6 items-center justify-between mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bricolage font-bold text-[#333333]">Spaces in Ibadan</h2>
            <p className="text-[#666666]">All listings are reviewed and verified by SpaceFinda before going live.</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="md:flex items-center gap-2 hidden">
              <button className="btn-rounded" onClick={() => handleScroll("left")} disabled={scrollPosition <= 1}>
                <ChevronLeft size={24} />
              </button>
              <button className="btn-rounded" onClick={() => handleScroll("right")} disabled={containerRef.current ? scrollPosition + containerRef.current.clientWidth >= containerRef.current.scrollWidth : false}>
                <ChevronRight size={24} />
              </button>
            </div>
            <Link href="/listings" className="flex items-center gap-2 text-primary whitespace-nowrap font-semibold hover:underline">
              View all <span className="hidden sm:inline">listings</span>
              <ChevronRight size={24} />
            </Link>
          </div>
        </div>

        <div className="overflow-x-scroll md:overflow-hidden" ref={containerRef}>
          <ul className="flex w-full max-md:gap-4">
            {[...PROPERTIES, ...PROPERTIES].map((prop, index) => (
              <PropertyCard key={`${prop.id}-${index}`} {...prop} />
            ))}
          </ul>
        </div>
      </Wrapper>
    </section>
  );
}
