"use client";

import React from "react";
import { Check } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/modal/dialog";
import { Button } from "@/components/ui/button";

export default function BankAddedModal({
  account,
  onOpenChange,
}: {
  // The account just added, or null when the modal is closed
  account: { bank: string; last4: string } | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={!!account} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-sm gap-0 p-5 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-green-50 ring-8 ring-green-50/50">
          <Check className="size-6 text-green-600" />
        </div>
        <DialogTitle className="mt-5 text-base md:text-lg font-medium text-Text-dark">Bank account added!</DialogTitle>
        <DialogDescription className="mt-2 text-xs md:text-sm leading-5 text-Text-body-text">
          {account?.bank} ending in {account?.last4} has been added and is ready to receive payouts.
        </DialogDescription>
        <DialogClose asChild>
          <Button className="mx-auto mt-5 h-10 w-full max-w-48">Done</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
