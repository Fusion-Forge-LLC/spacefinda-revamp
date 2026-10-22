"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DUMMY_HOST } from "@/lib/dummy";
import ConfirmModal from "../confirm-modal";
import EmptyState from "../empty-state";

const BENEFITS = [
  { value: "+38%", label: "More views with 10+ quality photos compared to listings with fewer" },
  { value: "2× faster", label: "First booking with instant booking enabled vs manual approval" },
  // TODO: copy repeats the tile above in the design; confirm the real stat
  { value: "188k", label: "First booking with instant booking enabled vs manual approval" },
];

// My listings for a host whose only listing is an unfinished draft
export default function DraftSetup() {
  const { draftTitle, listingTitle, location, stepsComplete, totalSteps } = DUMMY_HOST.setup;
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);

  if (deleted) {
    return (
      <EmptyState
        icon={MapPin}
        className="py-16"
        title="No listings yet"
        description="List your space to start receiving bookings from renters across Ibadan."
        action={{ label: "Add a new listing", href: "/host/create-listing" }}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-gray-100 bg-white p-4 md:p-5">
        <div className="flex items-center gap-2">
          <h2 className="text-sm md:text-base font-medium text-Text-dark">{draftTitle}</h2>
          <span className="rounded-full bg-text-Grey-Muted px-2 py-0.5 text-xs text-Text-body-text">Draft</span>
        </div>
        <p className="mt-2 flex items-center gap-1 text-xs md:text-sm text-Text-body-text">
          <MapPin className="size-3.5" />
          {location}
        </p>

        <div className="mt-4 flex justify-between text-xs md:text-sm text-Text-body-text">
          <span>Setup progress</span>
          <span className="text-Text-dark">
            {stepsComplete} of {totalSteps} steps complete
          </span>
        </div>
        <Progress value={(stepsComplete / totalSteps) * 100} className="mt-2 h-2 bg-primary-containers" />

        <div className="mt-5 flex gap-2">
          <Button asChild className="h-10 rounded-lg px-4">
            <Link href="/host/create-listing">Continue setup</Link>
          </Button>
          <Button variant="ghost" onClick={() => setIsDeleteOpen(true)} className="h-10 rounded-lg bg-text-Grey-Muted px-4">
            Delete draft
          </Button>
        </div>
      </section>

      <section className="rounded-2xl bg-white p-4 md:p-5">
        <h2 className="text-sm md:text-base font-medium text-Text-dark">Why complete your listing?</h2>
        <p className="mt-1 text-xs md:text-sm text-Text-body-text">What you unlock when {listingTitle} goes live</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {BENEFITS.map(({ value, label }) => (
            <div key={value} className="rounded-lg border border-gray-200 bg-text-Grey-Muted p-3">
              <p className="text-sm md:text-base font-medium text-Text-dark">{value}</p>
              <p className="mt-1 text-xs md:text-sm leading-5 text-Text-body-text">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <ConfirmModal
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        icon={Trash2}
        tone="danger"
        title="Delete this draft?"
        description={`${draftTitle} and everything you've added to it will be permanently deleted. This can't be undone.`}
        confirmLabel="Yes, delete draft"
        onConfirm={() => {
          setDeleted(true);
          toast("Draft deleted");
        }}
      />
    </div>
  );
}
