"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { DUMMY_HOST_ACTIVITY, HostActivityType } from "@/lib/dummy";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ACTIVITY_ICONS } from "./overview/recent-activity";

const ACTIVITY_HREFS: Record<HostActivityType, string> = {
  booking: "/host/bookings",
  payout: "/host/payout",
  review: "/host/reviews",
  message: "/host/messages",
};

export default function NotificationsPopover() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger aria-label="Notifications" className="btn-rounded">
        <Bell className="size-4" strokeWidth={1.5} />
      </PopoverTrigger>
      <PopoverContent align="end" collisionPadding={16} className="w-80 max-w-[calc(100vw-2rem)] p-0">
        <p className="border-b border-gray-100 px-4 py-3 text-sm font-medium text-Text-dark">Notifications</p>
        <ul className="max-h-96 divide-y divide-gray-100 overflow-y-auto">
          {DUMMY_HOST_ACTIVITY.map(({ id, type, title, time }) => {
            const { icon: Icon, tone } = ACTIVITY_ICONS[type];
            return (
              <li key={id}>
                <Link href={ACTIVITY_HREFS[type]} onClick={() => setIsOpen(false)} className="flex gap-3 px-4 py-3 hover:bg-gray-50">
                  <div className={cn("flex size-8 shrink-0 items-center justify-center rounded-lg", tone)}>
                    <Icon className="size-4" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm text-Text-dark">{title}</p>
                    <p className="mt-1 text-xs text-Text-body-text">{time}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
