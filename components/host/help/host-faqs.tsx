"use client";

import React, { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

// Placeholder answers until the team supplies the final copy
const FAQS = [
  {
    topic: "Payouts",
    question: "When do I get paid for a booking?",
    answer:
      "SpaceFinda holds the renter's payment and releases your 90% share automatically on check-in day. It usually reaches your bank within 24 hours. Bookings that check in on a weekend are paid the following Monday.",
  },
  {
    topic: "Payouts",
    question: "Why is my payout on hold?",
    answer:
      "Payouts are held when you have no bank account added, when your identity is not yet verified, or while a bank account change is being reviewed. Add or confirm your bank under Settings → Payout and the held payouts are released.",
  },
  {
    topic: "Payouts",
    question: "Can I change the bank account my payouts go to?",
    answer:
      "Yes. Go to Settings → Payout to edit or add an account. Changes take effect from your next payout. For your protection, some changes are checked by our team before they go live.",
  },
  {
    topic: "Bookings",
    question: "What happens if a renter cancels?",
    answer:
      "The renter is refunded according to the cancellation policy on your listing at the time they booked. If any part of the booking is non-refundable under that policy, you still receive your share of it on the original check-in day.",
  },
  {
    topic: "Bookings",
    question: "How do I stop bookings on certain dates?",
    answer:
      "Open Availability, choose the listing and block the dates you need. Blocked dates can't be booked, and any existing bookings on those dates are not affected.",
  },
  {
    topic: "Damage claims",
    question: "How do I raise a damage claim?",
    answer:
      "Go to Damage claims and raise a claim within 48 hours of the renter checking out. Add photos of the damage and the cost of repair. Claims are paid from the renter's caution fee once our team approves them.",
  },
  {
    topic: "Damage claims",
    question: "What if the damage costs more than the caution fee?",
    answer:
      "Approved claims are paid up to the caution fee on the booking. For costs above that, contact us with your claim reference and our team will help you with next steps.",
  },
  {
    topic: "Listings",
    question: "Why is my listing under review?",
    answer:
      "Every new listing, and some edits, are checked by our team before they appear in search. Reviews usually take up to 24 hours. Listings from verified owners are reviewed first.",
  },
  {
    topic: "Listings",
    question: "How long does identity verification take?",
    answer:
      "Most verifications are reviewed within 24 hours. You'll get an email and SMS when it's done. You only need to verify once.",
  },
];

const TOPICS = ["All", ...new Set(FAQS.map((f) => f.topic))];

export default function HostFaqs() {
  const [topic, setTopic] = useState("All");
  const visible = topic === "All" ? FAQS : FAQS.filter((f) => f.topic === topic);

  return (
    <div>
      <h2 className="text-lg md:text-xl font-medium text-Text-dark">Frequently asked questions</h2>
      <p className="mt-1 text-sm text-Text-body-text">Quick answers about payouts, bookings, damage claims and your listings.</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {TOPICS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTopic(t)}
            aria-pressed={topic === t}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs md:text-sm transition-colors",
              topic === t ? "border-primary bg-primary-containers text-primary" : "border-gray-200 text-Text-body-text hover:bg-text-Grey-Muted"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <Accordion type="single" collapsible className="mt-2">
        {visible.map((faq) => (
          <AccordionItem key={faq.question} value={faq.question} className="border-b border-light-Grey">
            <AccordionTrigger className="py-4 text-sm md:text-base font-normal text-Text-dark hover:no-underline">{faq.question}</AccordionTrigger>
            <AccordionContent className="pb-4 text-sm text-Text-body-text leading-relaxed">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
