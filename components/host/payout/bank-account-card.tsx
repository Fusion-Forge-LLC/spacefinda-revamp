"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import type { HostBank } from "@/lib/dummy";
import SectionCard from "../section-card";
import BankChangeModal from "./bank-change-modal";
import RequestSubmittedModal from "./request-submitted-modal";

// No API yet, so the request reference is a fixed placeholder
const REQUEST_REFERENCE = "BCR-2026-00042";

export default function BankAccountCard({ bank }: { bank: HostBank }) {
  const [isChangeOpen, setIsChangeOpen] = useState(false);
  const [isSubmittedOpen, setIsSubmittedOpen] = useState(false);
  const { accountName, bankName, last4 } = bank;

  return (
    <SectionCard
      title="Bank account"
      action={
        <Button onClick={() => setIsChangeOpen(true)} className="h-9 rounded-md px-4">
          Request change
        </Button>
      }
    >
      <div className="mt-3 flex items-center justify-between gap-3 rounded-lg bg-navy px-4 py-4 text-white">
        <div>
          <p className="text-sm font-medium">{accountName}</p>
          <p className="mt-1 text-xs text-white/70">{bankName} · Paystack verified account</p>
        </div>
        <p className="shrink-0 whitespace-nowrap text-sm tracking-widest">•••• •••• {last4}</p>
      </div>
      <p className="mt-4 text-xs md:text-sm leading-5 text-Text-body-text">
        Bank account changes are handled by SpaceFinda support to protect against fraud. Contact support@spacefinda.com with your account email and a
        valid ID to request a change.
      </p>

      <BankChangeModal open={isChangeOpen} onOpenChange={setIsChangeOpen} onSubmitted={() => setIsSubmittedOpen(true)} />
      <RequestSubmittedModal open={isSubmittedOpen} onOpenChange={setIsSubmittedOpen} reference={REQUEST_REFERENCE} bankName={bankName} />
    </SectionCard>
  );
}
