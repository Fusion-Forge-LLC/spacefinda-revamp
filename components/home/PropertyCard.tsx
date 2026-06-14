import React from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import Link from "next/link";

interface PropertyCardProps {
  image: string;
  title: string;
  location: string;
  amenities: { icon: string; label: string }[];
  price: string;
  rating: number;
  reviews: number;
  isVerified?: boolean;
}

export default function PropertyCard({
  image,
  title,
  location,
  amenities,
  price,
  rating,
  reviews,
  isVerified = true,
}: PropertyCardProps) {
  return (
    <li className="group cursor-pointer md:w-1/3 lg:w-1/4 md:px-2">
      <div className="relative aspect-308/160 rounded-t-lg overflow-hidden mb-4">
        <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
        
        {isVerified && (
          <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <Image src="/icons/verify.svg" alt="Verified" width={14} height={14} className="brightness-0" />
            <span className="text-[11px] font-semibold text-[#333333]">Verified</span>
          </div>
        )}
        
        <button className="absolute top-2.5 right-2.5 h-8 w-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/40 transition-colors">
          <Heart className="text-white" size={18} />
        </button>
      </div>
      
      <div className="space-y-2">
        <Link className="hover:underline hover:bg-primary" href={`/listings/${title.toLowerCase().replace(/\s+/g, "-")}`}>
          <h3 className="font-semibold text-lg text-[#333333] truncate">{title}</h3>
        </Link>
        <p className="text-sm text-[#666666] truncate">{location}</p>
        
        <div className="flex items-center gap-4 py-1">
          {amenities.map((item, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <Image src={item.icon} alt={item.label} width={16} height={16} className="opacity-60" />
              <span className="text-xs text-[#666666]">{item.label}</span>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-1 text-[#333333]">
            <span className="font-bold lg:text-lg">{price}</span>
            <span className="text-xs md:text-[10px] lg:text-xs opacity-60">/ night</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <Image src="/icons/star.svg" alt="Rating" width={14} height={14} />
            <span className="font-semibold text-sm">{rating}</span>
            <span className="text-xs md:text-[10px] lg:text-xs text-[#666666]">({reviews} reviews)</span>
          </div>
        </div>
      </div>
    </li>
  );
}
