import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DUMMY_HOST_LISTINGS } from "@/lib/dummy";
import { LISTING_STATUS } from "../listings/listing-status";
import SectionCard from "../section-card";

export default function MyListings() {
  return (
    <SectionCard
      title="My listings"
      action={
        <Link href="/host/listings" className="text-sm text-primary underline underline-offset-2">
          Manage all
        </Link>
      }
    >
      <ul className="divide-y divide-gray-100">
        {DUMMY_HOST_LISTINGS.map((listing) => {
          const status = LISTING_STATUS[listing.status];
          return (
            <li key={listing.id} className="flex items-center gap-3 py-3">
              <Image src={listing.image} alt="" width={58} height={44} className="h-11 w-14.5 shrink-0 rounded-md object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm md:text-base text-Text-dark">{listing.title}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-Text-body-text">
                  {listing.meta}
                  {listing.stats && (
                    <>
                      {" · "}
                      <Star className="size-3 fill-amber-400 text-amber-400" />
                      {listing.stats.rating.toFixed(1)}
                    </>
                  )}
                </p>
              </div>
              <span className={cn("inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs max-md:hidden", status.className)}>
                <span className="size-1.5 rounded-full bg-current" />
                {status.label}
              </span>
              <Button asChild size="sm" className="h-8 rounded-md px-3">
                <Link href={listing.status === "draft" ? "/host/create-listing" : `/host/listings/${listing.id}/edit`}>Continue</Link>
              </Button>
            </li>
          );
        })}
      </ul>
    </SectionCard>
  );
}
