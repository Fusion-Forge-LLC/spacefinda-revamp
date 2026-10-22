"use client";

import React from "react";
import Link from "next/link";
import { addDays, format, isSameDay, startOfToday } from "date-fns";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DUMMY_AVAILABILITY } from "@/lib/dummy";

const calendarClassNames = {
  root: "w-full",
  months: "relative flex flex-col",
  month: "flex w-full flex-col gap-4",
  nav: "absolute inset-x-0 top-0 flex items-center justify-between",
  button_previous: "btn-rounded size-7! md:size-7!",
  button_next: "btn-rounded size-7! md:size-7!",
  month_caption: "flex h-7 items-center justify-center",
  caption_label: "text-sm md:text-base font-medium text-Text-dark",
  weekdays: "mt-4 flex",
  weekday: "flex-1 pb-2 text-xs md:text-sm font-normal text-Text-body-text",
  week: "mt-1.5 flex w-full gap-1.5",
  day: "flex-1 p-0",
  today: "[&_button]:border [&_button]:border-primary [&_button]:text-primary",
  disabled: "",
};

const LEGEND = [
  { label: "Booked by renters", className: "bg-primary" },
  { label: "Blocked by you", className: "bg-text-Grey-Muted border border-gray-200" },
  { label: "Available", className: "bg-white border border-gray-200" },
  { label: "Today", className: "border border-primary" },
];

export const getBookedDates = () =>
  DUMMY_AVAILABILITY.booked.map((b) => ({ date: addDays(startOfToday(), b.offset), renter: b.renter }));

export const getBlockedDates = () => DUMMY_AVAILABILITY.blocked.map((offset) => addDays(startOfToday(), offset));

export function AvailabilityActions({ pill, rulesHref = "#rules" }: { pill?: boolean; rulesHref?: string }) {
  const shape = pill ? "rounded-full" : "rounded-md";
  const outline = cn("h-9 md:h-10 px-3 md:px-4", shape, pill ? "border-gray-200 text-Text-dark" : "border-primary text-primary");
  return (
    <div className="flex flex-wrap gap-2 md:gap-3">
      <Button className={cn("h-9 md:h-10 px-3 md:px-4", shape)}>Block dates</Button>
      <Button asChild variant="outline" className={outline}>
        <Link href={rulesHref}>Set availability</Link>
      </Button>
      <Button asChild variant="outline" className={outline}>
        <Link href="/host/bookings">View bookings</Link>
      </Button>
    </div>
  );
}

// Month calendar where tapping a free date toggles it as blocked; booked dates show the renter and can't be changed
export default function AvailabilityGrid({
  blocked,
  onBlockedChange,
  showBookings = true,
  compact,
}: {
  blocked: Date[];
  onBlockedChange: (dates: Date[]) => void;
  showBookings?: boolean;
  compact?: boolean;
}) {
  const today = startOfToday();
  const booked = showBookings ? getBookedDates() : [];

  return (
    <>
      <Calendar
        mode="multiple"
        selected={blocked}
        onSelect={(dates) => onBlockedChange(dates ?? [])}
        startMonth={today}
        disabled={[{ before: today }, ...booked.map((b) => b.date)]}
        modifiers={{ booked: booked.map((b) => b.date) }}
        modifiersClassNames={{ booked: "[&_button]:bg-primary! [&_button]:text-white! [&_button]:opacity-100!" }}
        showOutsideDays={false}
        formatters={{ formatWeekdayName: (date) => format(date, "EEE") }}
        classNames={calendarClassNames}
        components={{
          DayButton: ({ className, ...props }) => {
            const renter = booked.find((b) => isSameDay(b.date, props.day.date))?.renter;
            return (
              <CalendarDayButton
                {...props}
                className={cn(
                  className,
                  "aspect-auto rounded-lg text-sm md:text-base text-Text-dark hover:bg-primary-containers disabled:opacity-40",
                  compact ? "h-10 md:h-12" : "h-12 md:h-16",
                  "data-[selected-single=true]:bg-text-Grey-Muted data-[selected-single=true]:text-Text-body-text data-[selected-single=true]:line-through"
                )}
              >
                {props.children}
                {renter && <span className="text-[10px]! opacity-90! max-md:hidden">{renter}</span>}
              </CalendarDayButton>
            );
          },
        }}
        className="w-full p-0"
      />

      <div className={cn("flex flex-wrap gap-x-6 gap-y-2", compact ? "mt-4" : "mt-6")}>
        {LEGEND.map(({ label, className }) => (
          <span key={label} className="flex items-center gap-2 text-xs md:text-sm text-Text-body-text">
            <span className={cn("size-3.5 rounded-sm", className)} />
            {label}
          </span>
        ))}
      </div>
    </>
  );
}
