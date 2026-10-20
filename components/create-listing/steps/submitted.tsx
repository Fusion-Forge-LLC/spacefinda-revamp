import React from "react";
import Link from "next/link";
import { Bell, Check, CircleCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const NEXT_STEPS = [
  {
    icon: Clock,
    title: "Our team reviews your listing",
    description: "We check your photos, details, and location. This takes up to 24 hours. You can edit your listing while it is under review.",
  },
  {
    icon: Bell,
    title: "You receive a notification",
    description: "We notify you by email and SMS when approved or if we need more information.",
  },
  {
    icon: CircleCheck,
    title: "Your listing goes live",
    description: "Once approved your listing appears in search results with the SpaceFinda Verified badge.",
  },
];

export default function SubmittedStep({ reference, onCreateAnother }: { reference: string; onCreateAnother: () => void }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex size-24 md:size-32 items-center justify-center rounded-full bg-[#F1FBF3]">
        <div className="flex size-20 md:size-27 items-center justify-center rounded-full bg-[#E4F7E8]">
          <Check className="size-9 md:size-12 text-[#3A9A4F]" strokeWidth={2.25} />
        </div>
      </div>
      <h1 className="mt-8 md:mt-12 text-2xl md:text-[32px] font-semibold text-Text-dark">Listing submitted</h1>
      <p className="mt-2 text-sm text-Text-body-text leading-6">
        Your listing is now under review. Our team will check your photos, details, and property information and get back
        to you within 24 hours by email and SMS.
      </p>

      <div className="mt-8 w-full rounded-lg bg-navy px-4 py-5 text-white">
        <p className="text-sm text-white/90">Listing reference</p>
        <p className="mt-1 text-2xl md:text-[32px] font-semibold tracking-wide">{reference}</p>
      </div>

      <ol className="mt-8 w-full space-y-7 text-left">
        {NEXT_STEPS.map(({ icon: Icon, title, description }) => (
          <li key={title}>
            <p className="flex items-center gap-2.5 text-base text-Text-dark">
              <Icon className="size-4 text-Text-body-text" />
              {title}
            </p>
            <p className="mt-2 pl-6.5 text-sm text-Text-body-text leading-6">{description}</p>
          </li>
        ))}
      </ol>

      <Button asChild className="mt-8 h-12 w-full rounded-lg text-sm md:text-base font-medium">
        <Link href="/host">Go to dashboard</Link>
      </Button>
      <Button variant="ghost" onClick={onCreateAnother} className="mt-3 h-12 w-full rounded-lg bg-text-Grey-Muted text-sm md:text-base text-Text-body-text">
        Create another listing
      </Button>
    </div>
  );
}
