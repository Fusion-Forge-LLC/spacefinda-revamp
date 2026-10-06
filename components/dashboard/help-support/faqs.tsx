import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import BackButton from "../back-button";
import PageHeading from "../page-heading";

// Placeholder answers until the team supplies the final copy
const FAQS = [
  {
    question: "How does SpaceFinda hold my payment?",
    answer:
      "When you book, your payment is processed securely by Paystack and held by SpaceFinda. It is only released to the host on your check-in day, so you are protected if something goes wrong before you arrive.",
  },
  {
    question: "When will I get my caution fee back?",
    answer:
      "Your caution fee is refunded to the original card after check-out, once the host confirms the space was left in good condition. Refunds usually reflect within a few working days, depending on your bank.",
  },
  {
    question: "Can I cancel my booking?",
    answer:
      "Yes. You can cancel from your booking details. Whether you get a full or partial refund depends on the cancellation policy shown on the listing at the time you booked.",
  },
  {
    question: "When can I message my host?",
    answer:
      "Messaging opens once your booking is confirmed. Until then, hosts only see your first name and public profile.",
  },
  {
    question: "How do I get my property address?",
    answer:
      "The full address and check-in instructions are shared with you after your booking is confirmed. You'll find them in your booking details and confirmation email.",
  },
];

export default function Faqs() {
  return (
    <div className="max-w-200">
      <BackButton href="/dashboard/help-support" className="mb-4 md:hidden" />
      <PageHeading title="FAQs" description="Get help with a booking, report an issue, or browse common questions." />

      <Accordion type="single" collapsible className="-mt-2">
        {FAQS.map((faq) => (
          <AccordionItem key={faq.question} value={faq.question} className="border-b border-light-Grey">
            <AccordionTrigger className="py-4 text-sm md:text-base font-normal text-Text-dark hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-sm md:text-base text-Text-body-text leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
