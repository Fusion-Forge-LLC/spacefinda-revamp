"use client";

import React from "react";
import { CreditCard } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/modal/dialog";
import { Button } from "@/components/ui/button";
import { SavedCard } from "@/lib/dummy";
import { CARD_BRAND_NAME } from "./card-brand-logo";

interface RemoveCardModalProps {
  card: SavedCard | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export default function RemoveCardModal({ card, onOpenChange, onConfirm }: RemoveCardModalProps) {
  return (
    <Dialog open={!!card} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-md gap-0 p-5 text-center">
        <div className="mx-auto flex size-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
          <CreditCard className="size-5" />
        </div>
        <DialogTitle className="mt-4 text-base md:text-lg font-medium text-Text-dark">Remove this card?</DialogTitle>
        <DialogDescription className="mt-2 text-xs md:text-sm text-Text-body-text">
          {card && `Your ${CARD_BRAND_NAME[card.brand]} ending ${card.last4} will be removed. `}
          You will need to add a new card before making your next booking.
        </DialogDescription>

        <Button onClick={onConfirm} className="mt-4 h-10 w-full bg-[#CD3A2F] hover:bg-[#CD3A2F]/90">Yes, remove card</Button>
        <DialogClose asChild>
          <Button variant="ghost" className="mt-2 h-10 w-full bg-text-Grey-Muted">Cancel</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
