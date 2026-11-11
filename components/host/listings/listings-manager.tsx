"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pause, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import type { HostListing } from "@/lib/dummy";
import { deleteListing, togglePauseListing, withdrawListing } from "@/lib/host/actions";
import ConfirmModal from "../confirm-modal";
import ListingCard, { ListingAction } from "./listing-card";
import ManageAvailabilityModal from "./manage-availability-modal";

type Pending = { action: Exclude<ListingAction, "resume" | "availability">; listing: HostListing } | null;

const CONFIRM = {
  pause: {
    icon: Pause,
    tone: "primary" as const,
    title: "Pause this listing?",
    description: (title: string) =>
      `${title} will be hidden from search results immediately. Renters with confirmed upcoming bookings will not be affected. You can resume your listing at any time from My Listings.`,
    confirmLabel: "Pause listing",
    cancelLabel: "Keep it live",
  },
  withdraw: {
    icon: X,
    tone: "danger" as const,
    title: "Withdraw from review?",
    description: (title: string) =>
      `This will pull ${title} out of SpaceFinda's review queue. You can edit and resubmit it at any time, but it will need to go through the full review process again before going live.`,
    confirmLabel: "Yes, withdraw listing",
    cancelLabel: "Cancel",
  },
  delete: {
    icon: Trash2,
    tone: "danger" as const,
    title: "Delete this draft?",
    description: (title: string) => `${title} and everything you've added to it will be permanently deleted. This can't be undone.`,
    confirmLabel: "Yes, delete draft",
    cancelLabel: "Cancel",
  },
};

// Runs a listing action and reports the outcome; returns whether it worked
async function run(action: Promise<{ ok: boolean; message?: string }>, success: string) {
  const res = await action;
  if (res.ok) toast(success);
  else toast.error(res.message ?? "Something went wrong. Please try again.");
  return res.ok;
}

function ListingsSummary({ listings }: { listings: HostListing[] }) {
  const count = (status: HostListing["status"]) => listings.filter((l) => l.status === status).length;
  const live = count("live") + count("paused");
  return (
    <p className="text-xs md:text-sm text-Text-body-text">
      {listings.length} listings total · <span className="text-primary">{live} live</span> ·{" "}
      <span className="text-[#9A7B3F]">{count("review")} under review</span> · <span className="text-Text-dark">{count("draft")} draft</span>
    </p>
  );
}

export function ListingsHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4 md:mb-8">
      <div>
        <h1 className="text-2xl font-semibold text-Text-dark">My listings</h1>
        <div className="mt-2">{children}</div>
      </div>
      <Button asChild className="h-10 md:h-11 rounded-lg px-4 md:px-5">
        <Link href="/host/create-listing">
          <Plus className="size-4" />
          Add a new listing
        </Link>
      </Button>
    </div>
  );
}

export default function ListingsManager({ initialListings }: { initialListings: HostListing[] }) {
  const router = useRouter();
  const [listings, setListings] = useState(initialListings);
  const [pending, setPending] = useState<Pending>(null);
  const [availabilityFor, setAvailabilityFor] = useState<HostListing | null>(null);

  const updateListing = (id: string, patch: Partial<HostListing>) =>
    setListings((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));

  const handleAction = async (listing: HostListing, action: ListingAction) => {
    if (action === "resume") {
      if (await run(togglePauseListing(listing.id), `${listing.title} is live again`)) {
        updateListing(listing.id, { status: "live" });
        router.refresh();
      }
    } else if (action === "availability") {
      setAvailabilityFor(listing);
    } else {
      setPending({ action, listing });
    }
  };

  const confirm = async () => {
    if (!pending) return;
    const { action, listing } = pending;
    if (action === "pause") {
      if (await run(togglePauseListing(listing.id), `${listing.title} paused`)) updateListing(listing.id, { status: "paused" });
    } else if (action === "withdraw") {
      // A withdrawn listing goes back to being a draft so it can be edited and resubmitted
      if (await run(withdrawListing(listing.id), "Listing withdrawn from review")) {
        updateListing(listing.id, { status: "draft", draft: { lastEdited: "today", step: 10, totalSteps: 10, stepName: "Review" } });
      }
    } else if (action === "delete") {
      if (await run(deleteListing(listing.id), "Draft deleted")) setListings((prev) => prev.filter((l) => l.id !== listing.id));
    }
    router.refresh();
  };

  const config = pending ? CONFIRM[pending.action] : null;

  return (
    <TooltipProvider>
      <ListingsHeader>
        <ListingsSummary listings={listings} />
      </ListingsHeader>

      <div className="flex flex-col gap-4">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} onAction={(action) => handleAction(listing, action)} />
        ))}
      </div>

      {config && pending && (
        <ConfirmModal
          open
          onOpenChange={(open) => !open && setPending(null)}
          icon={config.icon}
          tone={config.tone}
          title={config.title}
          description={config.description(pending.listing.title)}
          confirmLabel={config.confirmLabel}
          cancelLabel={config.cancelLabel}
          onConfirm={confirm}
        />
      )}

      {availabilityFor && (
        <ManageAvailabilityModal open onOpenChange={(open) => !open && setAvailabilityFor(null)} listingTitle={availabilityFor.title} />
      )}
    </TooltipProvider>
  );
}
