"use client";

import React from "react";
import { CreditCard, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import SettingsDialog, { SettingsDialogFooter } from "./settings-dialog";

export default function RemoveBankModal({
  last4,
  isPrimary,
  onOpenChange,
  onConfirm,
}: {
  // The account being removed, or null when the modal is closed
  last4: string | null;
  isPrimary: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}) {
  const accountLabel = isPrimary ? "Primary payout account" : "Payout account";

  return (
    <SettingsDialog
      open={!!last4}
      onOpenChange={onOpenChange}
      title="Remove bank account?"
      description={`You're about to remove your ${accountLabel.toLowerCase()}.`}
    >
      <div className="space-y-2 px-4 py-5 md:px-5">
        {isPrimary && (
          <>
            <p className="flex gap-2 rounded-lg border border-gray-100 px-3 py-2.5 text-xs md:text-sm text-Text-body-text">
              <Info className="mt-0.5 size-3.5 shrink-0" />
              <span>
                Any <span className="font-medium text-Text-dark">pending payouts</span> will be held until you add a new bank account.
              </span>
            </p>
            <p className="flex gap-2 rounded-lg border border-gray-100 px-3 py-2.5 text-xs md:text-sm text-Text-body-text">
              <Info className="mt-0.5 size-3.5 shrink-0" />
              <span>
                Your listing will show as <span className="font-medium text-Text-dark">payout unverified</span> to SpaceFinda until a new account is
                added.
              </span>
            </p>
          </>
        )}
        <div className="flex gap-2 rounded-lg bg-text-Grey-Muted px-3 py-3">
          <CreditCard className="mt-0.5 size-4 shrink-0 text-Text-body-text" />
          <div>
            <p className="text-sm text-Text-dark">**** **** {last4}</p>
            <p className="mt-1 text-xs md:text-sm text-Text-body-text">{accountLabel}</p>
          </div>
        </div>
      </div>
      <SettingsDialogFooter cancelLabel="Keep bank">
        <Button
          onClick={() => {
            onOpenChange(false);
            onConfirm();
          }}
          className="h-10 px-4"
        >
          Yes, remove it
        </Button>
      </SettingsDialogFooter>
    </SettingsDialog>
  );
}
