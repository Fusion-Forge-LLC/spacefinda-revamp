import React from "react";
import { CalendarDays, CreditCard, House, Star, TrendingDown, TrendingUp } from "lucide-react";
import { cn, formatNaira } from "@/lib/utils";
import type { BookingStats, EarningsSummary, OccupancyReport, RatingSummary } from "@/lib/api/types";

interface StatCardsProps {
  earnings: EarningsSummary | null;
  bookings: BookingStats | null;
  occupancy: OccupancyReport | null;
  ratings: RatingSummary | null;
}

const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? "" : "s"}`;

function occupancyTrend(occupancy: OccupancyReport | null) {
  const comparison = occupancy?.comparison;
  if (!comparison || comparison.direction === "no_change") return { text: "No change vs last month", down: false };
  // Both numbers are positive; direction gives the sign. changePercent is null when last month was 0%
  const change = comparison.changePercent ?? comparison.changePoints;
  const down = comparison.direction === "decrease";
  return { text: `${down ? "-" : "+"}${change}% vs last month`, down };
}

export default function StatCards({ earnings, bookings, occupancy, ratings }: StatCardsProps) {
  const trend = occupancyTrend(occupancy);
  const stats = [
    {
      label: "Total earned",
      value: formatNaira(earnings?.totalEarnings ?? 0),
      trend: `+ ${formatNaira(earnings?.thisMonth.earnings ?? 0)} this month`,
      icon: CreditCard,
      tone: "bg-green-50 text-green-600",
    },
    { label: "Total bookings", value: bookings?.total ?? 0, trend: `${bookings?.thisMonth ?? 0} this month`, icon: CalendarDays, tone: "bg-primary-containers text-primary" },
    {
      label: "Occupancy rate",
      value: `${occupancy?.current.occupancyRate ?? 0}%`,
      trend: trend.text,
      down: trend.down,
      icon: House,
      tone: "bg-amber-50 text-amber-700",
    },
    {
      label: "Average rating",
      value: ratings?.totalRatings ? ratings.averageRating.toFixed(1) : "–",
      trend: ratings?.totalRatings
        ? `From ${plural(ratings.totalRatings, "review")} across ${plural(ratings.totalPropertiesRated, "listing")}`
        : "No reviews yet",
      icon: Star,
      tone: "bg-text-Grey-Muted text-Text-dark",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
      {stats.map(({ label, value, trend, down, icon: Icon, tone }) => (
        <div key={label} className="rounded-2xl border border-gray-100 bg-white p-4 md:p-5">
          <div className={cn("flex size-8 items-center justify-center rounded-lg", tone)}>
            <Icon className="size-4" strokeWidth={1.5} />
          </div>
          <p className="mt-4 text-xs md:text-sm text-Text-body-text">{label}</p>
          <p className="mt-1 text-lg md:text-xl font-medium text-Text-dark">{value}</p>
          <p className={cn("mt-2 flex items-center gap-1 text-xs", down ? "text-red-600" : "text-green-600")}>
            {down ? <TrendingDown className="size-3 shrink-0" /> : <TrendingUp className="size-3 shrink-0" />}
            {trend}
          </p>
        </div>
      ))}
    </div>
  );
}
