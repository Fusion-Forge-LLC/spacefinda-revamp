"use client";

import React, { useState } from "react";
import { isSameDay } from "date-fns";
import { X } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/modal/dialog";
import { Button } from "@/components/ui/button";
import AvailabilityGrid, { AvailabilityActions, getBlockedDates } from "../availability/availability-grid";

const sameDates = (a: Date[], b: Date[]) => a.length === b.length && a.every((d) => b.some((x) => isSameDay(d, x)));

export default function ManageAvailabilityModal({
  open,
  onOpenChange,
  listingTitle,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listingTitle: string;
}) {
  // No API yet, so every listing starts from the same dummy calendar
  const [saved, setSaved] = useState<Date[]>(getBlockedDates);
  const [draft, setDraft] = useState<Date[]>(saved);
  const hasChanges = !sameDates(draft, saved);

  const handleOpenChange = (next: boolean) => {
    if (!next) setDraft(saved);
    onOpenChange(next);
  };

  const save = () => {
    setSaved(draft);
    onOpenChange(false);
    toast("Availability updated");
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-3xl max-h-[90dvh] gap-0 overflow-y-auto p-0">
        <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-4 py-4 md:px-5">
          <div>
            <DialogTitle className="text-base md:text-lg font-medium text-Text-dark">Manage Availability for {listingTitle}</DialogTitle>
            <DialogDescription className="mt-1 text-xs md:text-sm text-Text-body-text">
              Block dates, set availability, or view upcoming bookings
            </DialogDescription>
          </div>
          <DialogClose className="flex size-7 shrink-0 items-center justify-center rounded-full bg-text-Grey-Muted text-Text-body-text">
            <X className="size-3.5" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>

        <div className="px-4 py-5 md:px-5">
          <div className="mb-6">
            <AvailabilityActions pill rulesHref="/host/availability#rules" />
          </div>
          <AvailabilityGrid blocked={draft} onBlockedChange={setDraft} compact />
        </div>

        <p className="border-t border-gray-100 px-4 py-4 md:px-5 text-xs md:text-sm text-Text-body-text">
          Tap any date to block it. Tap again to unblock. You can always adjust from your owner dashboard.
        </p>

        <div className="flex items-center justify-between gap-3 border-t border-gray-100 px-4 py-4 md:px-5">
          <p className="text-xs md:text-sm text-Text-body-text">
            {draft.length ? `${draft.length} ${draft.length === 1 ? "date" : "dates"} blocked` : "Select dates on the calendar above"}
          </p>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => setDraft([])} disabled={!draft.length} className="h-10 bg-text-Grey-Muted px-4">
              Clear
            </Button>
            <Button onClick={save} disabled={!hasChanges} className="h-10 px-4">
              Block dates
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
