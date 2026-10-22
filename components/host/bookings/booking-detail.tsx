import React from "react";
import Link from "next/link";
import { CircleCheck, CircleX, Clock, Info, Lock, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import BackButton from "@/components/dashboard/back-button";
import { cn, formatNaira } from "@/lib/utils";
import type { HostBooking } from "@/lib/dummy";
import SectionCard from "../section-card";
import { BOOKING_STATUS } from "./booking-status";
import { COMMISSION_RATE, getBookingAmounts } from "./booking-utils";

const POLICY_COPY: Record<HostBooking["policy"], string> = {
  Flexible:
    "The renter can cancel up to 24 hours before check-in for a full refund. If they cancel less than 24 hours before, no refund is issued and your payout is released immediately. The caution fee is always returned to the renter on any pre-checkin cancellation.",
  Moderate: "The renter can cancel up to 5 days before check-in for a full refund. After that, they receive 50% back.",
  Strict: "The renter receives a 50% refund if they cancel at least 7 days before check-in. No refund after that.",
};

function ReferenceHeader({ booking }: { booking: HostBooking }) {
  const status = BOOKING_STATUS[booking.status];
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-3 rounded-2xl px-4 py-5 text-white md:px-5", status.header)}>
      <div>
        <p className="text-xs md:text-sm text-white/80">Booking reference</p>
        <p className="mt-1 text-lg md:text-xl font-medium">{booking.ref}</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <span className={cn("rounded-full px-2.5 py-0.5 text-xs", status.badge)}>{status.label}</span>
        <p className="text-xs md:text-sm">{booking.headerNote}</p>
      </div>
    </div>
  );
}

function RenterInfo({ booking }: { booking: HostBooking }) {
  const { renter } = booking;
  const canMessage = booking.status === "upcoming" || booking.status === "active";
  return (
    <SectionCard title="Renter info">
      <div className="flex flex-wrap items-center gap-3 pt-3">
        <Avatar className="size-10">
          <AvatarImage src={renter.avatar} alt={renter.name} />
          <AvatarFallback>{renter.name[0]}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="text-sm md:text-base font-medium text-Text-dark">{renter.name}</p>
          <p className="mt-0.5 flex flex-wrap items-center gap-x-1 text-xs md:text-sm text-Text-body-text">
            <span>Verified account · {renter.completedStays} completed stays</span>
            <span className="max-md:hidden">·</span>
            {/* The rating gets its own line on mobile so the separator never dangles */}
            <span className="flex items-center gap-1 max-md:basis-full">
              <Star className="size-3.5 fill-amber-400 text-amber-400" />
              {renter.rating.toFixed(1)} from hosts
            </span>
          </p>
        </div>
        {canMessage && (
          <Button asChild variant="ghost" className="h-9 bg-primary-containers text-primary hover:bg-primary-containers/80 max-md:w-full">
            <Link href="/host/messages">Message renter</Link>
          </Button>
        )}
      </div>
    </SectionCard>
  );
}

function StayProgress({ progress }: { progress: NonNullable<HostBooking["progress"]> }) {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-4 md:p-5 text-xs md:text-sm text-Text-body-text">
      <div className="flex justify-between">
        <span className="text-Text-dark">Stay in progress</span>
        <span className="text-Text-dark">
          Day {progress.day} of {progress.totalDays}
        </span>
      </div>
      <Progress value={(progress.day / (progress.totalDays + 1)) * 100} className="my-3 h-2 bg-primary-containers" />
      <div className="flex justify-between gap-3">
        <span>Checked in {progress.checkedIn}</span>
        <span className="text-right">Checks out {progress.checksOut}</span>
      </div>
    </section>
  );
}

function DetailTile({ label, value, wide }: { label: string; value: React.ReactNode; wide?: boolean }) {
  return (
    <div className={cn("rounded-lg bg-text-Grey-Muted px-3 py-3", wide && "col-span-full")}>
      <p className="text-xs md:text-sm text-Text-body-text">{label}</p>
      <p className="mt-1.5 text-xs md:text-sm font-medium text-Text-dark">{value}</p>
    </div>
  );
}

function StayDetails({ booking }: { booking: HostBooking }) {
  const base = [
    { label: "Check-in", value: booking.checkIn },
    { label: "Check-out", value: booking.checkOut },
    { label: "Duration", value: `${booking.nights} nights` },
    { label: "Guests", value: `${booking.guests} guests` },
  ];

  const extra = {
    upcoming: [
      { label: "Property", value: booking.propertyName },
      { label: "Location", value: booking.location },
      { label: "Booked on", value: booking.bookedOn },
      { label: "Booking type", value: booking.bookingType },
    ],
    active: [{ label: "Property address (confirmed)", value: booking.address, wide: true }],
    completed: [
      { label: "Property", value: booking.propertyName },
      { label: "Booked on", value: booking.bookedOn },
      { label: "Policy applied", value: booking.policy },
      { label: "Booking type", value: booking.bookingType },
    ],
    cancelled: [
      { label: "Property", value: booking.propertyName },
      { label: "Originally booked", value: booking.bookedOn },
      { label: "Cancelled on", value: booking.cancellation?.on },
      { label: "Hours before check-in", value: `~${booking.cancellation?.hoursBefore} hours` },
    ],
  }[booking.status];

  return (
    <SectionCard title={booking.status === "cancelled" ? "Original booking details" : "Stay details"}>
      <div className="grid grid-cols-2 gap-2 pt-3 lg:grid-cols-4">
        {[...base, ...extra].map((tile) => (
          <DetailTile key={tile.label} {...tile} />
        ))}
      </div>
    </SectionCard>
  );
}

function Row({ label, value, className }: { label: React.ReactNode; value: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center justify-between gap-4 py-3 text-xs md:text-sm text-Text-body-text", className)}>
      <span>{label}</span>
      <span className="shrink-0 text-Text-dark">{value}</span>
    </div>
  );
}

function Note({ tone, icon: Icon, children }: { tone: "blue" | "green" | "grey"; icon: React.ElementType; children: React.ReactNode }) {
  const tones = {
    blue: "border-blue-100 bg-primary-containers text-primary",
    green: "border-green-100 bg-green-50 text-green-700",
    grey: "border-gray-200 bg-text-Grey-Muted text-Text-body-text",
  };
  return (
    <p className={cn("mt-3 flex gap-2 rounded-lg border px-3 py-2.5 text-xs md:text-sm leading-5", tones[tone])}>
      <Icon className="mt-0.5 size-3.5 shrink-0" />
      <span>{children}</span>
    </p>
  );
}

function EarningsBreakdown({ booking }: { booking: HostBooking }) {
  const { subtotal, commission, payout } = getBookingAmounts(booking);
  const isPaid = booking.status !== "upcoming";

  return (
    <SectionCard title="Earnings breakdown">
      <div className="divide-y divide-gray-100">
        <Row label={`${formatNaira(booking.pricePerNight)} × ${booking.nights} nights`} value={formatNaira(subtotal)} />
        <Row label={`SpaceFinda commission (${COMMISSION_RATE * 100}%)`} value={`– ${formatNaira(commission)}`} />
        {!isPaid && (
          <Row
            label="Caution fee (held and returned to renter 48 hours after checkout if no damage claim)"
            value={<span className="text-amber-700">{formatNaira(booking.cautionFee)} (held)</span>}
          />
        )}
        <Row
          label={<span className="text-base md:text-lg font-medium text-Text-dark">Your payout {isPaid ? "(paid)" : "(on check-in day)"}</span>}
          value={<span className="text-base md:text-lg font-medium text-green-600">{formatNaira(payout)}</span>}
        />
      </div>
      {isPaid ? (
        <Note tone="green" icon={CircleCheck}>
          {formatNaira(payout)} released to your {booking.payout.bank} account on check-in day, {booking.payout.date} · Paystack reference:{" "}
          {booking.payout.reference}
        </Note>
      ) : (
        <Note tone="blue" icon={Clock}>
          {formatNaira(payout)} will be automatically released to your {booking.payout.bank} account on check-in day, {booking.payout.date}, via
          Paystack.
        </Note>
      )}
    </SectionCard>
  );
}

function FinancialOutcome({ booking }: { booking: HostBooking }) {
  const { subtotal, commission } = getBookingAmounts(booking);
  return (
    <SectionCard title="Financial outcome">
      <div className="divide-y divide-gray-100">
        <Row label={`${formatNaira(booking.pricePerNight)} × ${booking.nights} nights (original value)`} value={<s>{formatNaira(subtotal)}</s>} />
        <Row label="SpaceFinda commission (not applied)" value={<s>{formatNaira(commission)}</s>} />
        <Row
          label="Cancellation policy"
          value={<span className="rounded bg-primary-containers px-1.5 py-0.5 text-xs text-primary">{booking.policy}</span>}
        />
        <Row label="Rent refunded to renter" value={formatNaira(subtotal)} />
        <Row label="Caution fee returned to renter" value={formatNaira(booking.cautionFee)} />
        <Row
          label={<span className="text-base md:text-lg font-medium text-Text-dark">Your payout</span>}
          value={<span className="text-base md:text-lg font-medium">{formatNaira(0)}</span>}
        />
      </div>
      <Note tone="grey" icon={Info}>
        Under the {booking.policy} policy, cancellations more than 24 hours before check-in result in a full refund to the renter. The{" "}
        {COMMISSION_RATE * 100}% SpaceFinda commission did not apply. Consider switching to Moderate or Strict on future listings to protect
        your earnings.
      </Note>
    </SectionCard>
  );
}

function CautionFeeStatus({ booking }: { booking: HostBooking }) {
  const fee = formatNaira(booking.cautionFee);
  const content = {
    active: {
      title: `${fee} currently held by SpaceFinda`,
      body: `After ${booking.renter.name.split(" ")[0]} checks out, a 48-hour damage claim window opens. If you raise no claim, the ${fee} is automatically returned to the renter. If you raise a valid claim with photo evidence, SpaceFinda will review and mediate.`,
      footer: { icon: Info, text: "You can raise a damage claim from the Damage claims section within 48 hours of checkout." },
    },
    completed: {
      title: `${fee} returned to renter`,
      body: `No damage claim raised within 48 hours. Returned automatically on ${booking.cautionReturnedOn}.`,
      footer: {
        icon: Lock,
        text: `The 48-hour damage claim window for this booking closed on ${booking.claimWindowClosedOn}. No claim can be raised for this stay.`,
      },
    },
    cancelled: {
      title: `${fee} returned to renter`,
      body: "The caution fee was returned immediately to the renter. No stay occurred so no damage claim was possible.",
      footer: null,
    },
    upcoming: null,
  }[booking.status];

  if (!content) return null;

  return (
    <SectionCard title="Caution fee status">
      <div className="mt-3 rounded-lg bg-primary-containers px-4 py-3">
        <p className="text-sm text-primary">{content.title}</p>
        <p className="mt-1 text-xs md:text-sm leading-5 text-Text-body-text">{content.body}</p>
      </div>
      {content.footer && (
        <p className="mt-3 flex items-start gap-2 text-xs md:text-sm text-Text-body-text">
          <content.footer.icon className="mt-0.5 size-3.5 shrink-0" />
          {content.footer.text}
        </p>
      )}
    </SectionCard>
  );
}

function CancellationPolicy({ policy }: { policy: HostBooking["policy"] }) {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-4 md:p-5">
      <h2 className="flex items-center gap-2 text-sm md:text-base font-medium text-Text-dark">
        Cancellation policy
        <span className="rounded bg-primary-containers px-1.5 py-0.5 text-xs font-normal text-primary">{policy}</span>
      </h2>
      <p className="mt-2 text-xs md:text-sm leading-5 text-Text-body-text">{POLICY_COPY[policy]}</p>
    </section>
  );
}

function RenterReview({ booking }: { booking: HostBooking }) {
  const { review, renter } = booking;
  if (!review) return null;
  return (
    <SectionCard title="Review from renter">
      <div className="flex items-center gap-3 pt-3">
        <Avatar className="size-9">
          <AvatarImage src={renter.avatar} alt={renter.name} />
          <AvatarFallback>{renter.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="text-sm font-medium text-Text-dark">{renter.name}</p>
          <p className="text-xs text-Text-body-text">{review.date}</p>
        </div>
        <div className="flex gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className={cn("size-4", i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-200")} />
          ))}
        </div>
      </div>
      <p className="mt-3 text-xs md:text-sm leading-5 text-Text-body-text">{review.comment}</p>
    </SectionCard>
  );
}

export default function BookingDetail({ booking }: { booking: HostBooking }) {
  const { status, cancellation } = booking;

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <BackButton href={`/host/bookings?tab=${status}`} label="Back to bookings" className="text-sm" />
      <ReferenceHeader booking={booking} />

      {status === "cancelled" && cancellation && (
        <div className="rounded-2xl border border-red-100 bg-red-50 p-4 md:p-5">
          <p className="flex items-center gap-2 text-sm md:text-base text-red-600">
            <CircleX className="size-4" />
            Renter cancelled {cancellation.daysBefore} days before check-in
          </p>
          <p className="mt-1 text-xs md:text-sm leading-5 text-Text-dark">
            Under the {booking.policy} policy, the renter cancelled more than 24 hours before check-in and received a full refund. You received no
            payout for this booking.
          </p>
        </div>
      )}

      <RenterInfo booking={booking} />
      {booking.progress && <StayProgress progress={booking.progress} />}
      <StayDetails booking={booking} />
      {status === "cancelled" ? <FinancialOutcome booking={booking} /> : <EarningsBreakdown booking={booking} />}
      <CautionFeeStatus booking={booking} />
      {(status === "upcoming" || status === "active") && <CancellationPolicy policy={booking.policy} />}
      <RenterReview booking={booking} />
    </div>
  );
}
