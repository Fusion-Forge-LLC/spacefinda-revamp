import React from "react";
import { Banknote, CalendarDays, MessageSquareMore, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { DUMMY_HOST_ACTIVITY, HostActivityType } from "@/lib/dummy";
import SectionCard from "../section-card";

export const ACTIVITY_ICONS: Record<HostActivityType, { icon: React.ElementType; tone: string }> = {
  booking: { icon: CalendarDays, tone: "bg-primary-containers text-primary" },
  payout: { icon: Banknote, tone: "bg-green-50 text-green-600" },
  review: { icon: Star, tone: "bg-amber-50 text-amber-700" },
  message: { icon: MessageSquareMore, tone: "bg-text-Grey-Muted text-Text-dark" },
};

export default function RecentActivity() {
  return (
    <SectionCard title="Recent activity">
      <ul className="divide-y divide-gray-100">
        {DUMMY_HOST_ACTIVITY.map(({ id, type, title, time }) => {
          const { icon: Icon, tone } = ACTIVITY_ICONS[type];
          return (
            <li key={id} className="flex gap-3 py-4">
              <div className={cn("flex size-8 shrink-0 items-center justify-center rounded-lg", tone)}>
                <Icon className="size-4" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm text-Text-dark">{title}</p>
                <p className="mt-1 text-xs text-Text-body-text">{time}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </SectionCard>
  );
}
