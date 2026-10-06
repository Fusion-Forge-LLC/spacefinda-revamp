import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PageHeading from "../page-heading";

const SECTIONS = [
  { title: "Payment receipts", description: "Track all your payments and refunds in one place.", action: "Manage your payment", href: "/dashboard/payments" },
  { title: "Payment methods", description: "Add a payment method securely, then start planning your next trip.", action: "Add payment methods", href: "/dashboard/payment-methods" },
];

export default function PaymentInfo() {
  return (
    <div className="max-w-192">
      <PageHeading
        title="Payment details"
        description="Saved cards are used for booking payments. Refunds are always returned to the original card used at the time of booking."
      />

      <div className="space-y-10">
        {SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="text-lg font-medium text-Text-dark">{section.title}</h2>
            <p className="mt-2 text-sm md:text-base text-Text-body-text">{section.description}</p>
            <Button asChild className="mt-5 h-11 px-4 text-base">
              <Link href={section.href}>{section.action}</Link>
            </Button>
          </section>
        ))}
      </div>
    </div>
  );
}
