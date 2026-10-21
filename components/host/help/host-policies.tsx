import React from "react";
import Link from "next/link";
import { ChevronRight, CreditCard, FileText, RotateCcw, ShieldCheck } from "lucide-react";
import { LEGAL_DOCUMENTS } from "@/components/dashboard/legal/content";

const ICONS: Record<string, typeof FileText> = {
  "privacy-policy": ShieldCheck,
  "terms-of-service": FileText,
  "cancellation-policy": RotateCcw,
  "payment-security": CreditCard,
};

// Same documents as the renter Legal & privacy page, opened inside the host dashboard
export default function HostPolicies() {
  return (
    <div>
      <h2 className="text-lg md:text-xl font-medium text-Text-dark">Host policies</h2>
      <p className="mt-1 text-sm text-Text-body-text">The rules that cover your listings, bookings, payouts and data.</p>

      <ul className="mt-2">
        {LEGAL_DOCUMENTS.map((doc) => {
          const Icon = ICONS[doc.slug] ?? FileText;
          return (
            <li key={doc.slug} className="border-b border-light-Grey last:border-b-0">
              <Link href={`/host/help-support/${doc.slug}`} className="group flex items-center gap-3 py-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-containers text-primary">
                  <Icon className="size-4.5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm md:text-base font-medium text-Text-dark">{doc.title}</span>
                  <span className="mt-1 block text-xs md:text-sm text-Text-body-text">{doc.description}</span>
                </span>
                <ChevronRight className="size-4 shrink-0 text-Text-body-text transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
