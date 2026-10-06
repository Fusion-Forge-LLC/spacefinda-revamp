import React from "react";
import Link from "next/link";
import { ChevronRight, CreditCard, FileText, RotateCcw, ShieldCheck } from "lucide-react";
import PageHeading from "../page-heading";
import { LEGAL_DOCUMENTS } from "./content";

const ICONS = {
  "privacy-policy": ShieldCheck,
  "terms-of-service": FileText,
  "cancellation-policy": RotateCcw,
  "payment-security": CreditCard,
} as Record<string, typeof FileText>;

// No design for this index yet; it follows the Help & support list style
export default function LegalPrivacy() {
  return (
    <div className="max-w-200">
      <PageHeading
        title="Legal and privacy"
        description="Read the policies that explain how SpaceFinda works and how your data is protected."
      />

      <ul>
        {LEGAL_DOCUMENTS.map((doc) => {
          const Icon = ICONS[doc.slug] ?? FileText;
          return (
            <li key={doc.slug} className="border-b border-light-Grey last:border-b-0">
              <Link href={`/dashboard/legal/${doc.slug}`} className="group flex items-center gap-3 py-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-containers text-primary">
                  <Icon className="size-4.5" />
                </span>
                <span className="flex-1 min-w-0">
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
