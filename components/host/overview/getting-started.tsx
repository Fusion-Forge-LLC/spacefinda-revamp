import React from "react";
import Link from "next/link";
import { CreditCard, House, ImageIcon, MessageSquareMore, Tag, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { DUMMY_HOST } from "@/lib/dummy";
import SectionCard from "../section-card";

// Overview pieces shown to a host whose first listing isn't live yet

const { listingTitle, stepsComplete, totalSteps } = DUMMY_HOST.setup;
const setupPercent = Math.round((stepsComplete / totalSteps) * 100);

export function ListingProgressBanner() {
  return (
    <div className="rounded-2xl bg-navy p-4 md:p-5 text-white">
      <div className="flex items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-navy">
          <House className="size-4.5" strokeWidth={1.5} />
        </div>
        <div>
          <p className="text-sm md:text-base font-medium">Your listing isn&apos;t live yet, renters can&apos;t find you</p>
          <p className="mt-1 text-xs md:text-sm text-white/70">
            {listingTitle} is {setupPercent}% complete. Finish the remaining steps to start receiving bookings from renters in Ibadan.
          </p>
        </div>
      </div>

      <div className="mt-5 flex justify-between text-xs md:text-sm text-white/70">
        <span>Setup progress</span>
        <span>
          {stepsComplete} of {totalSteps} steps complete
        </span>
      </div>
      <Progress value={setupPercent} className="mt-2 h-1.5 bg-white/15 *:data-[slot=progress-indicator]:bg-primary" />

      <Button asChild className="mt-5 h-10 rounded-lg px-5">
        <Link href="/host/create-listing">Continue setup</Link>
      </Button>
    </div>
  );
}

const SETUP_TASKS = [
  {
    key: "listing",
    icon: House,
    tone: "bg-primary-containers text-primary",
    title: "Complete your listing",
    description: `${listingTitle} is ${setupPercent}% complete. Finish the remaining steps to start receiving bookings from renters in Ibadan.`,
    action: { label: "Continue setup", href: "/host/create-listing" },
  },
  {
    key: "verify",
    icon: TriangleAlert,
    tone: "bg-red-50 text-red-600",
    title: "Verify identity",
    description: "SpaceFinda requires all owners to verify before listings go live. Upload your NIN, passport, or driver's licence. Takes less than 3 minutes.",
    action: { label: "Get verified", href: "/host/verification" },
  },
  {
    key: "bank",
    icon: CreditCard,
    tone: "bg-text-Grey-Muted text-Text-dark",
    title: "Set up payout",
    description: "Add your bank details so SpaceFinda can release your payout automatically on the day your guest checks in.",
    action: { label: "Add bank", href: "/host/payout" },
  },
];

// The listing card is left out once the progress banner is showing
export function SetupTasks({ includeListing, isVerified, hasBank }: { includeListing: boolean; isVerified: boolean; hasBank: boolean }) {
  const done = { listing: !includeListing, verify: isVerified, bank: hasBank };
  const tasks = SETUP_TASKS.filter((t) => !done[t.key as keyof typeof done]);
  if (tasks.length === 0) return null;

  return (
    <div className={cn("grid gap-3 md:gap-4", includeListing ? "md:grid-cols-3" : "md:grid-cols-2 lg:max-w-[66%]")}>
      {tasks.map(({ key, icon: Icon, tone, title, description, action }) => (
        <div key={key} className="rounded-2xl border border-gray-100 bg-white p-4 md:p-5">
          <div className={cn("flex size-8 items-center justify-center rounded-lg", tone)}>
            <Icon className="size-4" strokeWidth={1.5} />
          </div>
          <p className="mt-3 text-sm font-medium text-Text-dark">{title}</p>
          <p className="mt-1 text-xs leading-5 text-Text-body-text">{description}</p>
          <Link href={action.href} className="mt-3 inline-block text-sm text-primary underline underline-offset-2">
            {action.label}
          </Link>
        </div>
      ))}
    </div>
  );
}

const TIPS = [
  {
    icon: ImageIcon,
    tone: "bg-primary-containers text-primary",
    title: "Upload at least 10 photos",
    description: "Listings with 10 or more photos in Ibadan convert 38% better. Include the living room, bedroom, kitchen, bathroom, and compound.",
  },
  {
    icon: MessageSquareMore,
    tone: "bg-amber-50 text-amber-700",
    title: "Respond to messages quickly",
    description: "Owners who respond within 2 hours get 60% more bookings. Renters feel more confident booking when the host is clearly responsive.",
  },
  {
    icon: Tag,
    tone: "bg-green-50 text-green-600",
    title: "Price at or below market to start",
    description: "New listings without reviews convert better when priced slightly below similar listings. Once you collect your first 3 reviews, you can raise your price confidently.",
  },
];

export function TipsCard() {
  return (
    <SectionCard title="SpaceFinda tips">
      <ul className="divide-y divide-gray-100">
        {TIPS.map(({ icon: Icon, tone, title, description }) => (
          <li key={title} className="flex gap-3 py-4">
            <div className={cn("flex size-8 shrink-0 items-center justify-center rounded-lg", tone)}>
              <Icon className="size-4" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm text-Text-dark">{title}</p>
              <p className="mt-1 text-xs leading-5 text-Text-body-text">{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
