import React from "react";
import Image from "next/image";
import { Banknote, CalendarDays, CircleCheck, CircleX, Clock, House, TriangleAlert } from "lucide-react";
import { cn, formatNaira } from "@/lib/utils";
import type { DamageClaim, DamageClaimStatus } from "@/lib/dummy";

const STATUS: Record<DamageClaimStatus, { label: string; icon: React.ElementType; iconBox: string; pill: string }> = {
  review: { label: "Under review", icon: TriangleAlert, iconBox: "bg-[#F7F4EC] text-[#9A7B3F]", pill: "bg-[#F7F4EC] text-[#9A7B3F]" },
  approved: { label: "Resolved", icon: CircleCheck, iconBox: "bg-green-50 text-green-600", pill: "bg-green-50 text-green-600" },
  rejected: { label: "Resolved", icon: CircleX, iconBox: "bg-red-50 text-red-600", pill: "bg-red-50 text-red-600" },
};

const VISIBLE_PHOTOS = 2;

export default function ClaimCard({ claim }: { claim: DamageClaim }) {
  const status = STATUS[claim.status];
  const extraPhotos = claim.photos.length - VISIBLE_PHOTOS;

  return (
    <article className="rounded-2xl border border-gray-100 bg-white p-4 md:p-5">
      <div className="flex items-start gap-3">
        <div className={cn("flex size-10 shrink-0 items-center justify-center rounded-lg", status.iconBox)}>
          <status.icon className="size-5" strokeWidth={1.5} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs md:text-sm text-Text-body-text">{claim.bookingRef}</p>
          <p className="mt-0.5 text-sm md:text-base font-medium text-Text-dark">{claim.renter}</p>
        </div>
        <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs", status.pill)}>
          <span className="size-1.5 rounded-full bg-current" />
          {status.label}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs md:text-sm text-Text-body-text">
        <span className="flex items-center gap-1.5">
          <House className="size-3.5" />
          {claim.property}
        </span>
        <span className="flex items-center gap-1.5">
          <CalendarDays className="size-3.5" />
          Checked out {claim.checkedOut}
        </span>
        <span className="flex items-center gap-1.5 font-medium text-Text-dark">
          <Banknote className="size-3.5 text-Text-body-text" />
          {formatNaira(claim.amount)}
        </span>
      </div>

      <p className="mt-3 text-xs md:text-sm text-Text-body-text">{claim.description}</p>

      <div className="mt-2 flex items-center gap-2">
        {claim.photos.slice(0, VISIBLE_PHOTOS).map((src) => (
          <Image key={src} src={src} alt="Damage photo" width={36} height={28} className="h-7 w-9 rounded object-cover" />
        ))}
        {extraPhotos > 0 && <span className="text-xs md:text-sm text-Text-body-text">+ {extraPhotos} more</span>}
      </div>

      <div className="mt-4 border-t border-gray-100 pt-4 text-xs md:text-sm">
        {claim.status === "review" ? (
          <p className="flex items-center gap-1.5 text-Text-body-text">
            <Clock className="size-3.5" />
            Submitted {claim.submittedOn} · Awaiting Admin review
          </p>
        ) : (
          <span className={cn("inline-flex items-center gap-1.5 rounded-md px-2 py-1", status.pill)}>
            <status.icon className="size-3.5" />
            {claim.outcome}
          </span>
        )}
      </div>
    </article>
  );
}
