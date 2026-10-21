import React from "react";
import { CalendarDays, CreditCard, House, Star, TrendingUp } from "lucide-react";
import { cn, formatNaira } from "@/lib/utils";
import { DUMMY_HOST_STATS } from "@/lib/dummy";

const s = DUMMY_HOST_STATS;

const STATS = [
  { label: "Total earned", value: formatNaira(s.totalEarned), trend: `+ ${formatNaira(s.earnedThisMonth)} this month`, icon: CreditCard, tone: "bg-green-50 text-green-600" },
  { label: "Total bookings", value: s.totalBookings, trend: `${s.bookingsThisMonth} this month`, icon: CalendarDays, tone: "bg-primary-containers text-primary" },
  { label: "Occupancy rate", value: `${s.occupancyRate}%`, trend: `+${s.occupancyChange}% vs last month`, icon: House, tone: "bg-amber-50 text-amber-700" },
  { label: "Average rating", value: s.averageRating, trend: `From ${s.reviewCount} reviews across ${s.listingCount} listings`, icon: Star, tone: "bg-text-Grey-Muted text-Text-dark" },
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
      {STATS.map(({ label, value, trend, icon: Icon, tone }) => (
        <div key={label} className="rounded-2xl border border-gray-100 bg-white p-4 md:p-5">
          <div className={cn("flex size-8 items-center justify-center rounded-lg", tone)}>
            <Icon className="size-4" strokeWidth={1.5} />
          </div>
          <p className="mt-4 text-xs md:text-sm text-Text-body-text">{label}</p>
          <p className="mt-1 text-lg md:text-xl font-medium text-Text-dark">{value}</p>
          <p className="mt-2 flex items-center gap-1 text-xs text-green-600">
            <TrendingUp className="size-3 shrink-0" />
            {trend}
          </p>
        </div>
      ))}
    </div>
  );
}
