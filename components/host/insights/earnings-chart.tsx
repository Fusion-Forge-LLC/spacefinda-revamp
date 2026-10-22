import React from "react";
import { formatNaira } from "@/lib/utils";
import type { HostInsights } from "@/lib/dummy";
import SectionCard from "../section-card";

const STEP = 100000;

// 400000 -> "400k"
const shortNaira = (n: number) => (n ? `${n / 1000}k` : "0k");

export default function EarningsChart({ earnings, label }: { earnings: HostInsights["earnings"]; label: string }) {
  const highest = Math.max(...earnings.map((e) => e.amount ?? 0));
  const top = Math.max(STEP, Math.ceil(highest / STEP) * STEP);
  const ticks = Array.from({ length: top / STEP + 1 }, (_, i) => top - i * STEP);

  return (
    <SectionCard
      title="Earnings trend"
      action={<span className="rounded-md border border-gray-100 px-2.5 py-1 text-xs text-Text-dark">{label}</span>}
    >
      <div className="flex gap-3 pt-5">
        {/* The bottom 24px of the plot holds the month labels */}
        <div className="h-52 pb-6 text-[10px] md:text-xs text-Text-body-text">
          <div className="relative h-full">
            {ticks.map((tick, i) => (
              <span key={tick} className="absolute -translate-y-1/2 leading-none" style={{ top: `${(i / (ticks.length - 1)) * 100}%` }}>
                {shortNaira(tick)}
              </span>
            ))}
            {/* Sizes the column to the widest label */}
            <span className="invisible leading-none">{shortNaira(top)}</span>
          </div>
        </div>

        <ul className="flex h-52 flex-1 justify-around gap-1.5 md:gap-3">
          {earnings.map(({ month, amount }) => (
            <li key={month} className="flex max-w-16 flex-1 flex-col items-center gap-2">
              <div
                className="relative w-full flex-1 overflow-hidden rounded-md bg-text-Grey-Muted"
                title={amount === null ? `${month}: no data yet` : `${month}: ${formatNaira(amount)}`}
              >
                {!!amount && <span className="absolute inset-x-0 bottom-0 rounded-md bg-primary" style={{ height: `${(amount / top) * 100}%` }} />}
              </div>
              <span className="h-4 text-[10px] md:text-xs text-Text-body-text">{month}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-4 border-t border-gray-100 pt-4 text-xs md:text-sm text-Text-body-text">
        Any amount you see here is based on your 90% payout after SpaceFinda&apos;s 10%
      </p>
    </SectionCard>
  );
}
