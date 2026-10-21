import React from "react";
import { cn, formatCount } from "@/lib/utils";
import type { HostInsights } from "@/lib/dummy";
import SectionCard from "../section-card";

// Whole-number share of `part` in `whole`
const percent = (part: number, whole: number) => (whole ? Math.round((part / whole) * 100) : 0);

export default function BookingFunnel({ funnel }: { funnel: HostInsights["funnel"] }) {
  const { impressions, pageViews, bookings, note } = funnel;
  const steps = [
    { label: "Search impressions", value: impressions, rate: "Starting point", width: 100, bar: "bg-primary", hint: "Times your listing appeared in Ibadan search results" },
    { label: "Listing page views", value: pageViews, rate: `${percent(pageViews, impressions)}% clicked through`, width: percent(pageViews, impressions), bar: "bg-navy", hint: "Renters who clicked through to read your full listing" },
    { label: "Confirmed bookings", value: bookings, rate: `${percent(bookings, pageViews)}% went on to book`, width: percent(bookings, impressions), bar: "bg-green-600", hint: "Paid, confirmed stays in this period" },
  ];

  return (
    <SectionCard className="flex flex-col">
      <h2 className="text-base md:text-lg font-medium text-Text-dark">Booking funnel</h2>
      <p className="mt-1 text-xs md:text-sm text-Text-body-text">Where potential guests are dropping off · All live listings</p>

      <ol className="mt-5 flex flex-col gap-4">
        {steps.map((step) => (
          <li key={step.label}>
            <div className="flex items-center justify-between gap-3 text-xs md:text-sm">
              <span className="text-Text-body-text">{step.label}</span>
              <span className="shrink-0 font-medium text-Text-dark">
                {formatCount(step.value, false)}
                <span className="ml-2">{step.rate}</span>
              </span>
            </div>
            <div className="mt-2 h-4 overflow-hidden rounded bg-text-Grey-Muted">
              {/* Keep tiny steps visible as a sliver */}
              <span className={cn("block h-full rounded", step.bar)} style={{ width: `${Math.max(step.width, step.value ? 4 : 0)}%` }} />
            </div>
            <p className="mt-1.5 text-xs text-Text-body-text">{step.hint}</p>
          </li>
        ))}
      </ol>

      <p className="mt-5 rounded-lg bg-text-Grey-Muted px-3 py-2.5 text-xs leading-5 text-Text-body-text">{note}</p>
    </SectionCard>
  );
}
