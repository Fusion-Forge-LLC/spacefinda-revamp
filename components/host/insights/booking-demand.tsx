import React from "react";
import { cn } from "@/lib/utils";
import type { DemandLevel } from "@/lib/dummy";
import SectionCard from "../section-card";

const BARS = 24;

const LEVELS: Record<DemandLevel, { label: string; filled: number }> = {
  low: { label: "Low demand", filled: 10 },
  medium: { label: "Medium demand", filled: 14 },
  high: { label: "High demand", filled: 18 },
  peak: { label: "Peak demand", filled: 22 },
};

export default function BookingDemand({ months }: { months: { month: string; level: DemandLevel }[] }) {
  return (
    <SectionCard>
      <h2 className="text-base md:text-lg font-medium text-Text-dark">Booking demand in Ibadan</h2>
      <p className="mt-1 text-xs md:text-sm text-Text-body-text">When renters in your city are most likely to book</p>

      <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {months.map(({ month, level }) => {
          const { label, filled } = LEVELS[level];
          return (
            <li key={month} className="rounded-xl border border-gray-100 p-3">
              <p className="text-sm font-medium text-Text-dark">{month}</p>
              <div className="mt-2 flex h-5 gap-0.5" aria-hidden>
                {Array.from({ length: BARS }, (_, i) => (
                  <span key={i} className={cn("flex-1 rounded-sm", i < filled ? "bg-primary" : "bg-text-Grey-Muted")} />
                ))}
              </div>
              <p className="mt-2 text-xs text-Text-body-text">{label}</p>
            </li>
          );
        })}
      </ul>

      <p className="mt-4 rounded-lg bg-text-Grey-Muted px-3 py-2.5 text-xs leading-5 text-Text-body-text">
        Prices in Ibadan typically rise 15–25% during August and December. SpaceFinda will notify you before each peak season.
      </p>
    </SectionCard>
  );
}
