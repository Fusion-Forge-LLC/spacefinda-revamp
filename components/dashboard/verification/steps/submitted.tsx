import React from "react";
import Link from "next/link";
import { BadgeCheck, Check, Clock, Hourglass, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TIMELINE = [
  { icon: Check, title: "Documents submitted", description: "Just now", className: "bg-green-50 text-green-600" },
  { icon: Hourglass, title: "Under review", description: "SpaceFinda team reviewing · 24–48 hrs", className: "bg-[#F7F4EC] text-[#9A7B3F]" },
  { icon: Mail, title: "You'll be notified", description: "Email + push notification on completion", className: "bg-orange-50 text-orange-400" },
  { icon: BadgeCheck, title: "Account fully verified", description: "Unlock full booking access", className: "bg-primary-containers text-primary" },
];

export default function SubmittedStep() {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex size-28 items-center justify-center rounded-full bg-[#F7F4EC] text-[#9A7B3F]">
        <Clock className="size-10" strokeWidth={1.75} />
      </div>
      <h1 className="mt-14 text-xl md:text-2xl font-semibold text-Text-dark">Verification submitted!</h1>
      <p className="mt-3 max-w-132 text-sm md:text-base text-Text-body-text leading-relaxed">
        Your documents have been submitted. Our team will review and verify your identity within 24–48 hours.
      </p>

      <ol className="mt-8 w-full max-w-132 text-left">
        {TIMELINE.map(({ icon: Icon, title, description, className }, index) => (
          <li key={title} className="relative flex gap-3 pb-6 last:pb-0">
            {index < TIMELINE.length - 1 && (
              <span className="absolute left-5 top-10 bottom-0 w-px bg-light-Grey" aria-hidden />
            )}
            <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-full", className)}>
              <Icon className="size-4" />
            </span>
            <div>
              <p className="text-sm md:text-base font-medium text-Text-dark">{title}</p>
              <p className="mt-1 text-sm md:text-base text-Text-body-text">{description}</p>
            </div>
          </li>
        ))}
      </ol>

      <Button asChild className="mt-12 h-11 px-13 text-base">
        <Link href="/dashboard/profile">Return to profile</Link>
      </Button>
    </div>
  );
}
