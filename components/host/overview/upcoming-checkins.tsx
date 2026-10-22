import React from "react";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatNaira } from "@/lib/utils";
import { DUMMY_HOST_BOOKINGS } from "@/lib/dummy";
import SectionCard from "../section-card";
import EmptyState from "../empty-state";
import { getBookingAmounts } from "../bookings/booking-utils";

export default function UpcomingCheckins({ empty = false }: { empty?: boolean }) {
  const bookings = empty ? [] : DUMMY_HOST_BOOKINGS.filter((b) => b.status === "upcoming");

  return (
    <SectionCard
      title="Upcoming check-ins"
      action={
        bookings.length > 0 && (
          <Link href="/host/bookings" className="text-sm text-primary underline underline-offset-2">
            View all
          </Link>
        )
      }
    >
      {bookings.length === 0 ? (
        <EmptyState
          icon={CalendarDays}
          title="No bookings yet"
          description="Once your listing is live, bookings and renter activity will appear here in real-time."
        />
      ) : (
        <ul className="divide-y divide-gray-100">
          {bookings.map((b) => (
            <li key={b.ref}>
              <Link href={`/host/bookings/${b.ref}`} className="flex gap-3 py-4 hover:opacity-80">
                <Avatar className="size-10 md:size-11">
                  <AvatarImage src={b.renter.avatar} alt={b.renter.name} />
                  <AvatarFallback>{b.renter.name[0]}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1 text-xs md:text-sm text-Text-body-text">
                  <p className="text-sm md:text-base font-medium text-Text-dark">{b.renter.name}</p>
                  <p className="mt-1">{b.listingTitle}</p>
                  <p className="mt-1">
                    {b.dateRange} <span className="whitespace-nowrap">· {b.nights} nights</span>
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <p className="text-sm md:text-base font-medium text-Text-dark">{formatNaira(getBookingAmounts(b).total)}</p>
                  <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs text-green-600">
                    Check-in {b.checkIn.split(" ")[0]}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  );
}
