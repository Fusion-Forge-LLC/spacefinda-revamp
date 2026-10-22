"use client";

import React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/modal/dialog";
import { Button } from "@/components/ui/button";
import { cn, formatNaira } from "@/lib/utils";
import type { HostConversation } from "@/lib/dummy";
import { BOOKING_STATUS } from "../bookings/booking-status";

function DetailGroup({ label, rows }: { label: string; rows: [string, React.ReactNode][] }) {
  return (
    <div>
      <p className="mb-2 text-xs md:text-sm text-Text-body-text">{label}</p>
      <dl className="divide-y divide-gray-200/70 rounded-lg bg-text-Grey-Muted px-3">
        {rows.map(([term, value]) => (
          <div key={term} className="flex items-center justify-between gap-4 py-2.5 text-xs md:text-sm">
            <dt className="text-Text-body-text">{term}</dt>
            <dd className="text-right text-Text-dark">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function BookingDetailsModal({
  open,
  onOpenChange,
  conversation,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  conversation: HostConversation;
}) {
  const { renter, booking } = conversation;
  const status = BOOKING_STATUS[booking.status];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-sm md:max-w-md gap-0 p-0">
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4 md:px-5">
          <DialogTitle className="text-lg md:text-xl font-semibold text-Text-dark">Booking details</DialogTitle>
          <DialogClose className="flex size-7 items-center justify-center rounded-full bg-text-Grey-Muted text-Text-body-text">
            <X className="size-3.5" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>
        <DialogDescription className="sr-only">
          Booking {booking.ref} for {renter.name}
        </DialogDescription>

        <div className="flex flex-col gap-4 px-4 py-4 md:px-5">
          <DetailGroup
            label="Renter"
            rows={[
              ["Name", renter.name],
              ["Phone", renter.phone],
            ]}
          />
          <DetailGroup
            label="Booking"
            rows={[
              ["Reference", booking.ref],
              ["Listing", booking.listingTitle],
              ["Dates", `${booking.dateRange} · ${booking.nights} ${booking.nights === 1 ? "night" : "nights"}`],
              ["Amount", formatNaira(booking.amount)],
              [
                "Status",
                <span key="status" className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs", status.pill)}>
                  <span className="size-1.5 rounded-full bg-current" />
                  {status.label}
                </span>,
              ],
            ]}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 px-4 pb-4 md:px-5 md:pb-5">
          <DialogClose asChild>
            <Button variant="ghost" className="h-10 bg-text-Grey-Muted">
              Close
            </Button>
          </DialogClose>
          <Button asChild className="h-10">
            <Link href={`/host/bookings/${booking.ref}`}>Go to booking</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
