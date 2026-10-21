import React from "react";
import { cn } from "@/lib/utils";
import type { HostInsights } from "@/lib/dummy";
import SectionCard from "../section-card";

const BUCKETS = [
  { label: "0% booked", max: 0, className: "border border-gray-200 bg-white" },
  { label: "1–24%", max: 24, className: "bg-[#E1EAFD]" },
  { label: "25–49%", max: 49, className: "bg-[#C3D6FB]" },
  { label: "50–74%", max: 74, className: "bg-primary" },
  { label: "75–100%", max: 100, className: "bg-navy" },
];

const bucketFor = (occupancy: number) => BUCKETS.find((b) => occupancy <= b.max) ?? BUCKETS[BUCKETS.length - 1];

export default function OccupancyHeatmap({
  listing,
  range,
  months,
  note,
}: {
  listing: string;
  range: string;
  months: HostInsights["occupancy"];
  note: string;
}) {
  const weeks = months[0]?.weeks.length ?? 0;

  return (
    <SectionCard>
      <h2 className="text-base md:text-lg font-medium text-Text-dark">Occupancy heatmap</h2>
      <p className="mt-1 text-xs md:text-sm text-Text-body-text">
        {listing} · {range} · Each cell = one week
      </p>

      <div className="mt-6 overflow-x-auto pb-1">
        <table className="w-full table-fixed border-separate border-spacing-1.5 text-xs text-Text-body-text" style={{ minWidth: months.length * 56 + 60 }}>
          <thead>
            <tr>
              <th className="w-14" />
              {months.map(({ month }) => (
                <th key={month} scope="col" className="pb-1 font-normal">
                  {month}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: weeks }, (_, week) => (
              <tr key={week}>
                <th scope="row" className="pr-1 text-left font-normal whitespace-nowrap">
                  Week {week + 1}
                </th>
                {months.map(({ month, weeks: values }) => {
                  const bucket = bucketFor(values[week]);
                  return (
                    <td key={month} className="relative p-0">
                      <div
                        title={`${month}, week ${week + 1}: ${values[week]}% booked`}
                        className={cn("h-9 rounded-md md:h-12", bucket.className)}
                      />
                      <span className="sr-only">{values[week]}% booked</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-Text-body-text">
        {BUCKETS.map((b) => (
          <li key={b.label} className="flex items-center gap-1.5">
            <span className={cn("size-4 rounded", b.className)} />
            {b.label}
          </li>
        ))}
      </ul>

      <p className="mt-4 rounded-lg bg-text-Grey-Muted px-3 py-2.5 text-xs leading-5 text-Text-body-text">
        <span className="font-medium text-Text-dark">Pattern spotted:</span> {note}
      </p>
    </SectionCard>
  );
}
