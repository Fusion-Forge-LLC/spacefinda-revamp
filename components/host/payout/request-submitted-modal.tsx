"use client";

import React from "react";
import { Check, CircleAlert } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/modal/dialog";
import { DUMMY_HOST } from "@/lib/dummy";

export default function RequestSubmittedModal({
  open,
  onOpenChange,
  reference,
  bankName,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reference: string;
  bankName: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm gap-0 p-5 text-center">
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-green-50 ring-8 ring-green-50/50">
          <Check className="size-9 text-green-600" />
        </div>
        <DialogTitle className="mt-5 text-lg font-semibold text-Text-dark">Request submitted</DialogTitle>
        <DialogDescription className="mt-2 text-xs leading-5 text-Text-body-text">
          Your bank account change request has been received. Our team will verify your details and update your payout account within 2 to 3
          business days. You will receive a confirmation email at {DUMMY_HOST.email} when the change is complete.
        </DialogDescription>

        <div className="mt-4 rounded-lg bg-text-Grey-Muted py-3">
          <p className="text-xs text-Text-body-text">Request reference</p>
          <p className="mt-1 text-lg font-semibold tracking-wide text-Text-dark">{reference}</p>
        </div>

        <p className="mt-3 flex gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-left text-xs leading-5 text-amber-800">
          <CircleAlert className="mt-0.5 size-3.5 shrink-0" />
          Your existing {bankName} account will continue to receive payouts until the change is verified and approved.
        </p>
      </DialogContent>
    </Dialog>
  );
}
