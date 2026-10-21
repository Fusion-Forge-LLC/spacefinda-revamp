"use client";

import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DUMMY_HOST_LISTINGS } from "@/lib/dummy";

const LIVE_LISTINGS = DUMMY_HOST_LISTINGS.filter((l) => l.status === "live");

export default function ListingSelect() {
  return (
    <Select defaultValue={LIVE_LISTINGS[0]?.id}>
      <SelectTrigger aria-label="Listing" className="h-11! w-full md:w-64 rounded-lg border-gray-200 bg-white">
        <SelectValue />
      </SelectTrigger>
      <SelectContent position="popper" align="end">
        {LIVE_LISTINGS.map((listing) => (
          <SelectItem key={listing.id} value={listing.id}>
            {listing.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
