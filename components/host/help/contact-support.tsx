"use client";

import React, { useState } from "react";
import { ChevronRight, Mail, MessageSquareText, PhoneCall, Siren } from "lucide-react";
import { Button } from "@/components/ui/button";
import SendMessageModal from "@/components/dashboard/help-support/send-message-modal";

const HOST_CATEGORIES = ["Payout", "Booking or renter", "Damage claim", "Listing", "Identity verification", "Account and login", "Something else"];

// Placeholder contact details until the team confirms them
const SUPPORT_PHONE = "+234 800 000 0000";
const SUPPORT_EMAIL = "support@spacefinda.com";

const rowClass = "group flex w-full items-center gap-3 border-b border-light-Grey py-4 text-left last:border-b-0";

export default function ContactSupport() {
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  return (
    <div>
      <h2 className="text-lg md:text-xl font-medium text-Text-dark">Contact us</h2>
      <p className="mt-1 text-sm text-Text-body-text">Our host support team is available every day, 7am to 10pm.</p>

      <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <p className="flex items-center gap-2 text-sm md:text-base font-medium text-Text-dark">
          <Siren className="size-4 text-amber-700" />
          Problem with a stay happening now?
        </p>
        <p className="mt-1 text-xs md:text-sm text-amber-800">
          If a renter can&apos;t get in, there&apos;s a safety issue or something urgent with a current stay, call us and we&apos;ll help straight
          away.
        </p>
        <Button asChild className="mt-3 h-10 px-4 max-md:w-full">
          <a href={`tel:${SUPPORT_PHONE.replace(/\s/g, "")}`}>
            <PhoneCall className="size-4" />
            Call {SUPPORT_PHONE}
          </a>
        </Button>
      </div>

      <div className="mt-4">
        <button type="button" onClick={() => setIsMessageOpen(true)} className={rowClass}>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-containers text-primary">
            <MessageSquareText className="size-4.5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm md:text-base font-medium text-Text-dark">Send a message</span>
            <span className="mt-1 block text-xs md:text-sm text-Text-body-text">
              Tell us what&apos;s wrong and we&apos;ll reply within a few hours. You can track it under My requests.
            </span>
          </span>
          <ChevronRight className="size-4 shrink-0 text-Text-body-text transition-transform group-hover:translate-x-0.5" />
        </button>
        <a href={`mailto:${SUPPORT_EMAIL}`} className={rowClass}>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-containers text-primary">
            <Mail className="size-4.5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm md:text-base font-medium text-Text-dark">Email us</span>
            <span className="mt-1 block text-xs md:text-sm text-Text-body-text">{SUPPORT_EMAIL} · We reply within 24 hours.</span>
          </span>
          <ChevronRight className="size-4 shrink-0 text-Text-body-text transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>

      <SendMessageModal open={isMessageOpen} onOpenChange={setIsMessageOpen} categories={HOST_CATEGORIES} />
    </div>
  );
}
