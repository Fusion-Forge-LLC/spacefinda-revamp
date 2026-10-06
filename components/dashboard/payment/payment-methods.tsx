"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import Wrapper from "@/components/wrapper/wrapper";
import BackButton from "../back-button";
import AddCardModal from "./add-card-modal";
import RemoveCardModal from "./remove-card-modal";
import CardBrandLogo, { CARD_BRAND_NAME } from "./card-brand-logo";
import { DUMMY_SAVED_CARDS, SavedCard } from "@/lib/dummy";

export default function PaymentMethods() {
  const [cards, setCards] = useState<SavedCard[]>(DUMMY_SAVED_CARDS);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [cardToRemove, setCardToRemove] = useState<SavedCard | null>(null);

  // One card at a time: "To use a different card, remove this one and add a new one"
  const card = cards[0];

  const addCard = (newCard: SavedCard) => {
    setCards([newCard]);
    setIsAddOpen(false);
    toast("Card added successfully");
  };

  const removeCard = () => {
    setCards((prev) => prev.filter((c) => c.id !== cardToRemove?.id));
    setCardToRemove(null);
    toast("Card removed successfully");
  };

  return (
    <Wrapper className="py-6 md:py-8 max-md:px-4">
      <div className="flex flex-col md:flex-row gap-4 md:gap-24">
        <BackButton href="/dashboard/payment-info" className="shrink-0 self-start" />

        <div className="flex-1 max-w-215">
          <h1 className="text-xl md:text-2xl font-semibold text-Text-dark">Payment methods</h1>
          <p className="mt-2 text-sm md:text-base text-Text-body-text">
            Saved cards are used for booking payments. Refunds are always returned to the original card used at the time of
            booking.
          </p>

          <div className="mt-6 rounded-2xl border border-light-Grey p-3 md:p-4">
            <h2 className="text-base md:text-lg font-medium text-Text-dark">Saved cards</h2>
            <p className="mt-1 text-xs md:text-sm text-Text-body-text">
              This card will be charged at checkout. To use a different card, remove this one and add a new one.
            </p>

            {card ? (
              <div className="mt-4 flex items-center gap-3 rounded-lg bg-text-Grey-Muted p-3">
                <CardBrandLogo brand={card.brand} className="h-8 text-lg shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="flex flex-wrap items-center gap-x-3 text-sm md:text-base text-Text-dark">
                    {CARD_BRAND_NAME[card.brand]} ending {card.last4}
                    <span className="text-xs text-primary">Active</span>
                  </p>
                  <p className="mt-1 text-xs md:text-sm text-Text-body-text truncate">
                    Expires {card.expiry} · {card.name}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCardToRemove(card)}
                  className="text-sm text-red-600 underline underline-offset-2 shrink-0"
                >
                  Remove
                </button>
              </div>
            ) : (
              <p className="mt-4 rounded-lg bg-text-Grey-Muted px-3 py-3 text-center text-xs md:text-sm text-Text-body-text">
                No saved card. Add a card below to pay for bookings quickly.
              </p>
            )}

            <button
              type="button"
              onClick={() => setIsAddOpen(true)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-light-Grey py-2.5 text-sm text-Text-body-text hover:bg-text-Grey-Muted"
            >
              <Plus className="size-4" />
              Add a card
            </button>
          </div>
        </div>
      </div>

      <AddCardModal open={isAddOpen} onOpenChange={setIsAddOpen} onSave={addCard} />
      <RemoveCardModal card={cardToRemove} onOpenChange={(open) => !open && setCardToRemove(null)} onConfirm={removeCard} />
    </Wrapper>
  );
}
