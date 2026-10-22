import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock, Eye, MapPin, Pause, Play, SquarePen, Star, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn, formatNaira } from "@/lib/utils";
import type { HostListing } from "@/lib/dummy";
import { LISTING_STATUS } from "./listing-status";

export type ListingAction = "pause" | "resume" | "availability" | "withdraw" | "delete";

const iconButtonClass = "flex size-9 items-center justify-center rounded-lg border border-gray-300 text-Text-dark hover:bg-gray-50";

function IconAction({ label, icon: Icon, href, onClick }: { label: string; icon: React.ElementType; href?: string; onClick?: () => void }) {
  const content = <Icon className="size-4" strokeWidth={1.5} />;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {href ? (
          <Link href={href} aria-label={label} className={iconButtonClass}>
            {content}
          </Link>
        ) : (
          <button type="button" aria-label={label} onClick={onClick} className={iconButtonClass}>
            {content}
          </button>
        )}
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

function Stat({ value, label, className }: { value: React.ReactNode; label: string; className?: string }) {
  return (
    <div className={cn("border-gray-200 px-3 first:pl-0 [&+&]:border-l", className)}>
      <p className="flex items-center gap-1 text-sm md:text-base text-Text-dark">{value}</p>
      <p className="text-xs text-Text-body-text">{label}</p>
    </div>
  );
}

export default function ListingCard({ listing, onAction }: { listing: HostListing; onAction: (action: ListingAction) => void }) {
  const status = LISTING_STATUS[listing.status];
  const editHref = `/host/listings/${listing.id}/edit`;
  const isPublished = listing.status === "live" || listing.status === "paused";

  return (
    <article className="relative flex flex-col gap-4 overflow-hidden rounded-r-2xl border border-l-0 border-gray-100 bg-white p-4 pl-5 md:flex-row md:p-5 md:pl-6">
      <span className={cn("absolute inset-y-0 left-0 w-1", status.accent)} />

      <Image src={listing.image} alt="" width={130} height={100} className="h-40 w-full shrink-0 rounded-lg object-cover md:h-25 md:w-32.5" />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-sm md:text-base font-medium text-Text-dark">{listing.title}</h2>
          <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs", status.className)}>
            {listing.status === "paused" ? <Pause className="size-3" /> : <span className="size-1.5 rounded-full bg-current" />}
            {status.label}
          </span>
        </div>
        <p className="mt-1.5 flex items-center gap-1 text-xs md:text-sm text-Text-body-text">
          <MapPin className="size-3.5" />
          {listing.location} · {listing.beds} beds · {listing.guests} guests
        </p>

        {isPublished && listing.stats && (
          <div className="mt-2.5 flex">
            <Stat
              value={
                <>
                  <Star className="size-3.5 text-[#9A7B3F]" />
                  <span className="text-[#9A7B3F]">{listing.stats.rating.toFixed(1)}</span>
                </>
              }
              label={`${listing.stats.reviews} reviews`}
            />
            <Stat value={listing.stats.bookings} label="Bookings" />
            <Stat value={listing.stats.views} label="Views" />
            <Stat value={listing.stats.saves} label="Saves" />
          </div>
        )}

        {listing.status === "review" && (
          <p className="mt-2.5 flex max-w-112 gap-2 rounded-lg border border-[#9A7B3F]/20 bg-[#F7F4EC] px-3 py-2 text-xs md:text-sm text-[#9A7B3F]">
            <Clock className="mt-0.5 size-3.5 shrink-0" />
            Submitted {listing.submittedOn} · SpaceFinda is reviewing your listing. Usually takes up to 24 hours.
          </p>
        )}

        {listing.status === "draft" && listing.draft && (
          <p className="mt-2.5 text-xs md:text-sm text-Text-body-text">
            Draft · Last edited {listing.draft.lastEdited} · Stopped at Step {listing.draft.step} of {listing.draft.totalSteps} —{" "}
            {listing.draft.stepName}
          </p>
        )}
      </div>

      <div className="flex shrink-0 flex-row-reverse items-center justify-between gap-3 md:flex-col md:items-end md:justify-start">
        <p className="text-base md:text-lg font-medium text-Text-dark">
          {formatNaira(listing.pricePerNight)} <span className="text-xs font-normal text-Text-body-text">/ night</span>
        </p>
        <div className="flex gap-2">
          {isPublished && (
            <>
              <IconAction label="View listing" icon={Eye} href="/listings" />
              <IconAction label="Edit listing" icon={SquarePen} href={editHref} />
              <IconAction label="Manage availability" icon={CalendarDays} onClick={() => onAction("availability")} />
              {listing.status === "live" ? (
                <IconAction label="Pause listing" icon={Pause} onClick={() => onAction("pause")} />
              ) : (
                <IconAction label="Resume listing" icon={Play} onClick={() => onAction("resume")} />
              )}
            </>
          )}
          {listing.status === "review" && (
            <>
              <IconAction label="Edit listing" icon={SquarePen} href={editHref} />
              <IconAction label="Withdraw from review" icon={X} onClick={() => onAction("withdraw")} />
            </>
          )}
          {listing.status === "draft" && (
            <>
              <IconAction label="Continue setup" icon={Play} href="/host/create-listing" />
              <IconAction label="Delete draft" icon={X} onClick={() => onAction("delete")} />
            </>
          )}
        </div>
      </div>
    </article>
  );
}
