import React from "react";
import Rating from "@/components/property-detail/rating";

// Average score plus a bar per star level. `distribution` holds the counts from 5 stars down to 1
export default function RatingSummary({ distribution, caption }: { distribution: number[]; caption: string }) {
  const total = distribution.reduce((sum, n) => sum + n, 0);
  const average = total ? distribution.reduce((sum, n, i) => sum + n * (5 - i), 0) / total : 0;

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-10">
      <div className="shrink-0">
        <p className="text-3xl md:text-4xl font-semibold text-Text-dark">{average.toFixed(1)}</p>
        <Rating rating={average} size={22} showNumber={false} showReviews={false} className="mt-1" />
        <p className="mt-1 text-xs text-Text-body-text">{caption}</p>
      </div>

      <dl className="flex flex-1 flex-col gap-1.5">
        {distribution.map((count, i) => (
          <div key={i} className="flex items-center gap-3 text-xs text-Text-body-text">
            <dt className="w-2 shrink-0">{5 - i}</dt>
            <dd className="h-2 flex-1 overflow-hidden rounded-full bg-text-Grey-Muted">
              <span className="block h-full rounded-full bg-[#9A8452]" style={{ width: total ? `${(count / total) * 100}%` : 0 }} />
            </dd>
            <dd className="w-6 shrink-0 text-right tabular-nums">{count}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
