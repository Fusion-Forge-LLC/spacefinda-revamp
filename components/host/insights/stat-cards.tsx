import React from "react";
import { Banknote, Eye, Heart, SquareCheckBig, TrendingUp } from "lucide-react";
import { cn, formatCount, formatNaira } from "@/lib/utils";
import type { HostInsights } from "@/lib/dummy";

export default function InsightStatCards({ stats, revenueLabel }: { stats: HostInsights["stats"]; revenueLabel: string }) {
  const cards = [
    { label: "Total listing views", value: formatCount(stats.views, false), trend: `+${stats.viewsChange} vs last period`, icon: Eye, tone: "bg-primary-containers text-primary" },
    { label: "Total saves", value: formatCount(stats.saves, false), trend: `+${stats.savesChange} vs last period`, icon: Heart, tone: "bg-amber-50 text-amber-700" },
    { label: "Booking conversion", value: `${stats.conversion}%`, trend: "Views that became bookings", icon: SquareCheckBig, tone: "bg-text-Grey-Muted text-Text-dark" },
    { label: revenueLabel, value: formatNaira(stats.revenue), trend: `+ ${formatNaira(stats.revenueChange)} vs last period`, icon: Banknote, tone: "bg-green-50 text-green-600" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
      {cards.map(({ label, value, trend, icon: Icon, tone }) => (
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
