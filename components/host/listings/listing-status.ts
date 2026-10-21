import type { HostListingStatus } from "@/lib/dummy";

export const LISTING_STATUS: Record<HostListingStatus, { label: string; className: string; accent: string }> = {
  live: { label: "Live", className: "bg-primary-containers text-primary", accent: "bg-primary" },
  paused: { label: "Paused", className: "bg-red-50 text-red-600", accent: "bg-primary" },
  review: { label: "Under review", className: "bg-amber-50 text-[#9A7B3F]", accent: "bg-[#9A7B3F]" },
  draft: { label: "Draft", className: "bg-text-Grey-Muted text-Text-body-text", accent: "bg-Text-body-text" },
};
