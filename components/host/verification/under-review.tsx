import React from "react";
import Link from "next/link";
import { ClipboardList, Clock, LockOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NEXT_STEPS = [
  {
    icon: ClipboardList,
    title: "Our team reviews your documents",
    description: "Manual review by SpaceFinda staff. Usually takes up to 24 hours.",
    className: "bg-primary-containers text-primary",
  },
  {
    icon: Clock,
    title: "You receive a decision",
    description: "We notify you by email and SMS when confirmed or if we need more information.",
    className: "bg-[#F7F4EC] text-[#9A7B3F]",
  },
  {
    icon: LockOpen,
    title: "Your account unlocks",
    description: "Listings are automatically submitted for review. Booking limits are removed. Verification is done once for life.",
    className: "bg-green-50 text-green-600",
  },
];

// Shown in place of the renter's "Verification submitted" screen once a host submits their documents
export default function UnderReview() {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-[#F1EEDF] text-[#9A7B3F]">
        <Clock className="size-7" strokeWidth={1.75} />
      </div>
      <h1 className="mt-5 text-xl md:text-2xl font-semibold text-Text-dark">Verification under review</h1>
      <p className="mt-2 max-w-136 text-sm md:text-base text-Text-body-text leading-relaxed">
        Thank you for submitting your identity documents. Our verification team will review your submission and notify you by email or SMS within
        24 hours.
      </p>

      <div className="mt-6 w-full max-w-136 rounded-2xl border border-gray-100 bg-white p-4 text-left md:p-5">
        <h2 className="text-base md:text-lg font-medium text-Text-dark">What happens next</h2>
        <ol className="mt-2">
          {NEXT_STEPS.map(({ icon: Icon, title, description, className }) => (
            <li key={title} className="flex gap-3 border-b border-gray-100 py-3 last:border-b-0 last:pb-0">
              <span className={cn("flex size-7 shrink-0 items-center justify-center rounded-md", className)}>
                <Icon className="size-3.5" />
              </span>
              <div>
                <p className="text-sm font-medium text-Text-dark">{title}</p>
                <p className="mt-1 text-xs md:text-sm text-Text-body-text">{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <Button asChild className="mt-8 h-11 px-6 text-base">
        <Link href="/host/account-settings">Back to account settings</Link>
      </Button>
    </div>
  );
}
