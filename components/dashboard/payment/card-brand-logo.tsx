import React from "react";
import { CardBrand } from "@/lib/dummy";
import { cn } from "@/lib/utils";

export function MastercardLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 26" className={cn("h-6 w-auto", className)} aria-label="Mastercard" role="img">
      <circle cx="14" cy="13" r="11" fill="#EB001B" />
      <circle cx="26" cy="13" r="11" fill="#F79E1B" />
      <path d="M20 3.8a11 11 0 0 1 0 18.4 11 11 0 0 1 0-18.4Z" fill="#FF5F00" />
    </svg>
  );
}

export function VisaLogo({ className }: { className?: string }) {
  return <span aria-label="Visa" className={cn("font-extrabold italic tracking-tight text-[#1A1F71]", className)}>VISA</span>;
}

export function VerveLogo({ className }: { className?: string }) {
  return (
    <span aria-label="Verve" className={cn("font-bold italic text-[#00425F]", className)}>
      <span className="text-[#E3272D]">V</span>erve
    </span>
  );
}

export default function CardBrandLogo({ brand, className }: { brand: CardBrand; className?: string }) {
  if (brand === "visa") return <VisaLogo className={className} />;
  if (brand === "verve") return <VerveLogo className={className} />;
  return <MastercardLogo className={className} />;
}

export const CARD_BRAND_NAME: Record<CardBrand, string> = {
  mastercard: "MasterCard",
  visa: "Visa",
  verve: "Verve",
};

// Rough BIN ranges, good enough to show the right logo in the UI
export function detectCardBrand(number: string): CardBrand {
  const digits = number.replace(/\D/g, "");
  if (/^4/.test(digits)) return "visa";
  if (/^(506[01]|507[89]|6500)/.test(digits)) return "verve";
  return "mastercard";
}
