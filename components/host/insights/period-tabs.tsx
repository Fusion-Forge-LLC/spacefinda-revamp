import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { InsightPeriod } from "@/lib/dummy";

export const PERIOD_LABELS: Record<InsightPeriod, string> = {
  month: "This month",
  "3-months": "Last 3 months",
  "6-months": "Last 6 months",
  year: "This year",
};

// Segmented control where each option links to `?period=<value>`, so the choice survives refreshes
export default function PeriodTabs({ active }: { active: InsightPeriod }) {
  return (
    <nav aria-label="Period" className="flex max-w-full overflow-x-auto rounded-lg border border-gray-100 bg-white p-1">
      {(Object.keys(PERIOD_LABELS) as InsightPeriod[]).map((period) => {
        const isActive = period === active;
        return (
          <Link
            key={period}
            href={period === "month" ? "/host/insight" : `/host/insight?period=${period}`}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "shrink-0 rounded-md px-3 py-1.5 text-xs md:text-sm whitespace-nowrap outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/30",
              isActive ? "bg-primary text-white" : "text-Text-dark hover:bg-primary-containers hover:text-primary"
            )}
          >
            {PERIOD_LABELS[period]}
          </Link>
        );
      })}
    </nav>
  );
}
