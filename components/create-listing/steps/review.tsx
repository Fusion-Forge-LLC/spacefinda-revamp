import React from "react";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { cn, formatNaira } from "@/lib/utils";
import StepHeading from "../step-heading";
import { getPayout } from "./pricing";
import {
  AMENITIES,
  AVAILABILITY_OPTIONS,
  CANCELLATION_POLICIES,
  CAUTION_FEE,
  formatTime,
  ListingDraft,
  ProgressStep,
  RULES,
  SPACE_TYPES,
} from "../types";

const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? "" : "s"}`;

const formatDate = (date: Date) => date.toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });

function ReviewSection({ title, step, onEdit, children }: { title: string; step: ProgressStep; onEdit: (step: ProgressStep) => void; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base md:text-lg font-medium text-Text-dark">{title}</h2>
        <button type="button" onClick={() => onEdit(step)} className="text-sm text-primary underline underline-offset-2">
          Edit<span className="sr-only"> {title.toLowerCase()}</span>
        </button>
      </div>
      <div className="divide-y divide-light-Grey rounded-lg border border-light-Grey">{children}</div>
    </section>
  );
}

function Row({ label, value, valueClassName }: { label: string; value: React.ReactNode; valueClassName?: string }) {
  return (
    <div className="flex items-start justify-between gap-6 px-3 py-3 text-sm">
      <span className="shrink-0 text-Text-body-text">{label}</span>
      <span className={cn("text-right text-Text-dark", valueClassName)}>{value}</span>
    </div>
  );
}

const availabilitySummary = (draft: ListingDraft) => {
  if (draft.availability === "from-date" && draft.availableFrom) return `From ${formatDate(draft.availableFrom)}`;
  if (draft.availability === "block-dates") return `${plural(draft.blockedDates.length, "date")} blocked`;
  return AVAILABILITY_OPTIONS.find((o) => o.value === draft.availability)?.summary ?? "—";
};

export default function ReviewStep({ draft, onEdit }: { draft: ListingDraft; onEdit: (step: ProgressStep) => void }) {
  const price = draft.price ?? 0;
  const { payout } = getPayout(price);
  const amenities = AMENITIES.filter((a) => draft.amenities.includes(a.value));

  return (
    <>
      <StepHeading title="Review your listing">
        Check everything below before submitting. Use the Edit links to go back. Our team reviews within 24 hours.
      </StepHeading>

      <div className="space-y-6">
        <ReviewSection title="Your space" step="space-type" onEdit={onEdit}>
          <Row label="Type" value={SPACE_TYPES.find((t) => t.value === draft.spaceType)?.label ?? "—"} />
          <Row label="Title" value={draft.title || "—"} />
          <Row label="Location" value={[draft.neighbourhood, draft.city].filter(Boolean).join(", ") || "—"} />
          <Row
            label="Capacity"
            value={[plural(draft.guests, "guest"), plural(draft.bedrooms, "bedroom"), plural(draft.beds, "bed"), plural(draft.bathrooms, "bathroom")].join(" • ")}
          />
        </ReviewSection>

        <ReviewSection title="Photos" step="photos" onEdit={onEdit}>
          <div className="flex flex-wrap gap-1.5 px-3 py-3">
            {draft.photos.map((photo, index) => (
              <div key={photo.id} className="relative size-10 overflow-hidden rounded">
                <Image src={photo.url} alt={`Listing photo ${index + 1}`} fill unoptimized className="object-cover" />
              </div>
            ))}
          </div>
          <Row label="Total photos" value={`${plural(draft.photos.length, "photo")} uploaded`} />
        </ReviewSection>

        <ReviewSection title="House rules" step="rules" onEdit={onEdit}>
          <Row label="Check-in" value={`From ${formatTime(draft.checkIn)}`} />
          <Row label="Check-out" value={`By ${formatTime(draft.checkOut)}`} />
          {RULES.map(({ key, shortLabel }) => (
            <Row
              key={key}
              label={shortLabel}
              value={draft.rules[key] ? "Allowed" : "Not allowed"}
              valueClassName={draft.rules[key] ? "text-green-600" : "text-red-600"}
            />
          ))}
          {draft.additionalRules && <Row label="Additional rules" value={draft.additionalRules} valueClassName="whitespace-pre-line" />}
        </ReviewSection>

        <ReviewSection title="Amenities" step="amenities" onEdit={onEdit}>
          <div className="flex flex-wrap gap-2 px-3 py-3">
            {amenities.length ? (
              amenities.map(({ value, label }) => (
                <span key={value} className="rounded-md bg-text-Grey-Muted px-2.5 py-1 text-sm text-Text-body-text">
                  {label}
                </span>
              ))
            ) : (
              <span className="text-sm text-Text-body-text">No amenities selected</span>
            )}
          </div>
        </ReviewSection>

        <ReviewSection title="Availability" step="availability" onEdit={onEdit}>
          <Row label="Availability" value={availabilitySummary(draft)} />
        </ReviewSection>

        <ReviewSection title="Pricing & policy" step="pricing" onEdit={onEdit}>
          <Row label="Nightly price" value={`${formatNaira(price)} per night`} />
          <Row label="Your payout" value={formatNaira(payout)} valueClassName="text-green-600" />
          <Row label="Launch offer" value={draft.launchOffer ? `${draft.launchDiscount}% launch offer activated` : "Not activated"} />
          <Row label="Caution fee" value={`${formatNaira(CAUTION_FEE)} (set by SpaceFinda)`} />
          <Row label="Cancellation policy" value={CANCELLATION_POLICIES.find((p) => p.value === draft.cancellationPolicy)?.title} />
        </ReviewSection>

        <p className="flex items-start gap-2 rounded-lg border border-primary/10 bg-primary-containers p-3 text-sm text-primary">
          <ShieldCheck className="mt-0.5 size-4 shrink-0" />
          By submitting this listing you confirm that all information is accurate, photos are genuine images of your
          property, and you commit to maintaining accurate availability and responding to guest messages promptly.
        </p>
      </div>
    </>
  );
}
