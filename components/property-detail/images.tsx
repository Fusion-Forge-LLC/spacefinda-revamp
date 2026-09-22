"use client"

import React from 'react'
import Wrapper from '../wrapper/wrapper'
import Image from 'next/image'
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { ArrowLeft, Export, ExportCircle, ExportCurve } from 'iconsax-reactjs';
import { Heart } from 'lucide-react';
import Link from 'next/link';

const images = ["/images/listings/cozy-living-room.jpg", "/images/listings/sunlit-lounge.jpg", "/images/listings/cozy-bedroom.jpg", ]

function PropertyGallery() {
  if (!images || images.length === 0) return null;

  const count = images.length;

  return (
    <Wrapper>
        <div className="md:grid grid-cols-3 gap-2 overflow-hidden relative">
            {/* {mobile navigation start} */}
            <div className='absolute top-5 left-0 px-4 flex md:hidden gap-4 items-center w-full'>
                <Link href={"/listings"} className='h-7 w-7 rounded-full bg-white grid place-content-center'>
                    <ArrowLeft color='#111' size={14} />
                </Link>
                <button className='h-7 w-7 rounded-full bg-white grid place-content-center ml-auto'>
                    <ExportCurve color='#111' size={14} />
                </button>
                <button className='h-7 w-7 rounded-full bg-white grid place-content-center'>
                    <Heart color='#111' size={14} />
                </button>
            </div>
            {/* {mobile navigation} */}
            <div className={cn("overflow-hidden", count === 1 ? "col-span-3 h-full md:rounded-xl" : "col-span-2 h-full md:rounded-l-xl")}>
                <img
                    src={images[0]}
                    alt="Photo 1"
                    className="w-full h-full object-cover"
                />
            </div>

        {/* Right side stacked images - only render if more than 1 image */}
        {count > 1 && (
        <div
                className="hidden md:grid gap-2 h-full"
                style={{ gridTemplateRows: `repeat(${Math.min(count - 1, 2)}, 1fr)` }}
            >
            {images.slice(1, 3).map((url, i) => {
                const isLast = i === 1; 
                return (
                <div key={i} className="relative rounded-r-xl overflow-hidden">
                    <Image
                        src={url}
                        alt={`Photo ${i + 2}`}
                        className="w-full h-full object-cover"
                        fill
                    />
                    {isLast && (
                        <Button
                            onClick={() => console.log("open full gallery")}
                            className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-primary hover:bg-blue-700 text-white text-sm font-medium shadow"
                        >
                            <span>Show all photos</span>
                            <span className="text-xs opacity-80">+{count - 3}</span>
                        </Button>
                    )}
                </div>
                );
            })}
            </div>
        )}
        </div>
    </Wrapper>
  );
}

export default PropertyGallery