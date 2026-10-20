import React from "react";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import StepHeading from "../step-heading";
import RadioCard from "../radio-card";
import { AVAILABILITY_OPTIONS, StepProps } from "../types";

// Full-width, two months on desktop, with roomier cells and a filled primary selection
const listingCalendarClassNames = {
  root: "w-full",
  months: "relative flex flex-col gap-8 md:flex-row",
  month: "flex w-full flex-col gap-4",
  month_caption: "flex h-9 items-center justify-center",
  caption_label: "text-sm md:text-base font-medium text-Text-dark",
  weekday: "flex-1 pb-2 text-xs font-medium uppercase text-Text-body-text",
  week: "mt-1 flex w-full",
  today: "[&_button]:font-semibold [&_button]:text-primary [&_button]:after:absolute [&_button]:after:bottom-1.5 [&_button]:after:size-1 [&_button]:after:rounded-full [&_button]:after:bg-primary",
  disabled: "[&_button]:text-Grey-Pure-White [&_button]:line-through [&_button]:opacity-60",
};

const dayButtonClassName =
  "rounded-full text-sm text-Text-dark hover:bg-primary-containers hover:text-primary data-[selected-single=true]:bg-primary data-[selected-single=true]:text-white data-[selected-single=true]:after:bg-white";

const CalendarCard = ({ summary, children }: { summary: React.ReactNode; children: React.ReactNode }) => (
  <div className="mt-3 overflow-hidden rounded-xl border border-light-Grey">
    <div className="flex items-center gap-2 border-b border-light-Grey bg-text-Grey-Muted px-4 py-3 text-sm text-Text-dark">
      <CalendarDays className="size-4 text-primary" />
      {summary}
    </div>
    {children}
  </div>
);

export default function AvailabilityStep({ draft, update }: StepProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <>
      <StepHeading title="When is your space available">
        Set your availability before going live so renters only see dates you can honour. This prevents surprise bookings on
        dates you cannot accommodate. You can change your availability later in your dashboard.
      </StepHeading>

      <div role="radiogroup" aria-label="Availability" className="space-y-2">
        {AVAILABILITY_OPTIONS.map(({ value, title, description }) => (
          <RadioCard key={value} selected={draft.availability === value} onClick={() => update({ availability: value })}>
            <p className="text-sm md:text-base text-Text-dark">{title}</p>
            <p className="mt-1 text-sm text-Text-body-text">{description}</p>
          </RadioCard>
        ))}
      </div>

      {draft.availability === "from-date" && (
        <div className="mt-6">
          <p className="text-sm text-Text-dark">Choose the first date renters can book</p>
          <CalendarCard
            summary={
              draft.availableFrom ? (
                <span>
                  Bookable from <span className="font-medium">{format(draft.availableFrom, "EEE, d MMM yyyy")}</span>
                </span>
              ) : (
                <span className="text-Text-body-text">No date selected yet</span>
              )
            }
          >
            <Calendar
              mode="single"
              selected={draft.availableFrom}
              onSelect={(availableFrom) => update({ availableFrom })}
              disabled={{ before: today }}
              startMonth={today}
              numberOfMonths={2}
              showOutsideDays={false}
              classNames={listingCalendarClassNames}
              components={{ DayButton: (props) => <CalendarDayButton {...props} className={dayButtonClassName} /> }}
              className="w-full p-4 md:p-6 [--cell-size:--spacing(10)]"
            />
          </CalendarCard>
        </div>
      )}

      {draft.availability === "block-dates" && (
        <div className="mt-6">
          <p className="text-sm text-Text-dark">
            Tap the dates you are unavailable
          </p>
          <CalendarCard
            summary={
              draft.blockedDates.length ? (
                <span>
                  <span className="font-medium">{draft.blockedDates.length}</span>{" "}
                  {draft.blockedDates.length === 1 ? "date" : "dates"} blocked
                </span>
              ) : (
                <span className="text-Text-body-text">No dates blocked yet</span>
              )
            }
          >
            <Calendar
              mode="multiple"
              selected={draft.blockedDates}
              onSelect={(dates) => update({ blockedDates: dates ?? [] })}
              disabled={{ before: today }}
              startMonth={today}
              numberOfMonths={2}
              showOutsideDays={false}
              classNames={listingCalendarClassNames}
              components={{ DayButton: (props) => <CalendarDayButton {...props} className={dayButtonClassName} /> }}
              className="w-full p-4 md:p-6 [--cell-size:--spacing(10)]"
            />
          </CalendarCard>
        </div>
      )}
    </>
  );
}
