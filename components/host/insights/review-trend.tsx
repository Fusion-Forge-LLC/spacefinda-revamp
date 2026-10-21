import React from "react";
import Rating from "@/components/property-detail/rating";
import { cn } from "@/lib/utils";
import type { HostInsights } from "@/lib/dummy";
import SectionCard from "../section-card";

// The latest month is highlighted
export default function ReviewTrend({ months }: { months: HostInsights["reviewTrend"] }) {
  return (
    <SectionCard>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base md:text-lg font-medium text-Text-dark">Review score trend</h2>
        <span className="text-xs md:text-sm text-Text-body-text">Average rating per month</span>
      </div>

      <ul className="mt-5 flex gap-2 overflow-x-auto">
        {months.map(({ month, rating }, i) => {
          const isLatest = i === months.length - 1;
          return (
            <li
              key={month}
              className={cn("flex min-w-28 flex-1 flex-col items-center gap-2 rounded-xl px-3 py-4", isLatest && "bg-primary-containers")}
            >
              <p className={cn("text-lg font-medium", isLatest ? "text-primary" : "text-Text-dark")}>{rating.toFixed(1)}</p>
              <Rating rating={rating} size={16} showNumber={false} showReviews={false} />
              <p className={cn("text-xs", isLatest ? "text-primary" : "text-Text-body-text")}>{month}</p>
            </li>
          );
        })}
      </ul>
    </SectionCard>
  );
}
