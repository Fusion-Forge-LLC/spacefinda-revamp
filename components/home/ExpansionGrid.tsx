import React from "react";
import Image from "next/image";
import Wrapper from "@/components/wrapper/wrapper";
import abuja from "@/public/images/city-abuja.png";
import asaba from "@/public/images/city-asaba.png";
import cross from "@/public/images/city-cross.png";
import ibadan from "@/public/images/city-ibadan.png";
import lagos from "@/public/images/city-lagos.png";
import { cn } from "@/lib/utils";

const CITIES = [
{city: "abuja", image: abuja, status: "COMING SOON"},
{city: "ibadan", image: ibadan, status: "LIVE NOW"},
{city: "asaba", image: asaba, status: "COMING SOON"},
{city: "cross", image: cross, status: "COMING SOON"},
{city: "lagos", image: lagos, status: "COMING SOON"},
]

export default function ExpansionGrid() {
  return (
    <section className="sm:py-24 bg-[#FEFEFE]">
      <Wrapper>
        <div className="max-w-2xl mb-12">
          <div className="inline-block px-3 py-1 bg-[#F7F7EF] border border-[#9E8549] rounded-full text-[#9E8549] text-[10px] font-bold tracking-widest uppercase mb-4">
            Expanding across Nigeria
          </div>
          <h2 className="text-4xl font-bricolage font-bold text-[#333333] mb-4">Where we're headed</h2>
          <p className="text-[#666666]">SpaceFinda is growing city by city. Ibadan is home, the rest of Nigeria is next.</p>
        </div>

        <div className="">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {CITIES.map((city, index) => {
              return(
              <div 
                key={index} 
                data-property-1={city.city} 
                className={
                  cn("relative rounded-2xl flex text-white capitalize justify-center items-center gap-2.5 overflow-hidden", 
                     city.city === "ibadan" ? "row-span-2" : "row-span-1",
                    city.city === "asaba" ? "lg:order-2" : city.city === "ibadan" ? "lg:order-3" : city.city === "cross" ? "lg:order-4" : city.city === "lagos" ? "lg:order-5" : "lg:order-1"
                  )}
              >
                <Image className="flex-1" src={city.image} alt={city.city} />
                <div
                  className="left-3 bottom-3 absolute"
                >
                  <span className="justify-start text-Text-Pure-White text-2xl sm:text-3xl font-medium sm:font-semibold font-['Inter'] leading-10">
                    {city.city}
                  </span>                    
                  <span
                      className={cn("block rounded-full max-sm:px-2 p-1.5 text-center text-sm font-medium font-['Geist'] leading-5",
                      city.status === "LIVE NOW" ? "bg-primary" : "bg-Grey-Pure-White"
                    ) }
                  >
                    {city.status}
                  </span>
                </div>
            </div>
            )})}
          </div>
        </div>
      </Wrapper>
    </section>
  );
}

