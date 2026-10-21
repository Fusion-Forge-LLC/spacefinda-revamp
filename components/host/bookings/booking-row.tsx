import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, formatNaira } from "@/lib/utils";
import type { HostBooking } from "@/lib/dummy";
import { BOOKING_STATUS } from "./booking-status";
import { getBookingAmounts } from "./booking-utils";

export default function BookingRow({ booking }: { booking: HostBooking }) {
  const { renter, status } = booking;
  const amount = status === "cancelled" ? 0 : getBookingAmounts(booking).total;

  return (
    <Link href={`/host/bookings/${booking.ref}`} className="flex gap-3 py-5 first:pt-0 last:pb-0 hover:opacity-80">
      <Avatar className="size-10 md:size-11">
        <AvatarImage src={renter.avatar} alt={renter.name} />
        <AvatarFallback>{renter.name[0]}</AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1 space-y-1 text-xs md:text-sm text-Text-body-text">
        <p className="text-sm md:text-base font-medium text-Text-dark">{renter.name}</p>
        <p>{booking.listingTitle}</p>
        <p>
          {booking.dateRange} · {booking.nights} nights
        </p>
        <p>{booking.ref}</p>
      </div>

      <div className="flex flex-col items-end gap-1.5">
        <p className={cn("text-base md:text-xl font-medium text-Text-dark", status === "cancelled" && "line-through")}>{formatNaira(amount)}</p>
        <span className={cn("rounded-full px-2 py-0.5 text-[11px] md:text-xs whitespace-nowrap", BOOKING_STATUS[status].pill)}>
          {booking.statusNote}
        </span>
      </div>

      <ChevronRight className="size-5 shrink-0 self-center text-Text-body-text" />
    </Link>
  );
}
