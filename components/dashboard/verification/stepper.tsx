import React from "react";
import { cn } from "@/lib/utils";
import { STEPPER_STEPS } from "./types";

// `current` is the index of the active step; everything up to and including it is highlighted
export default function Stepper({ current }: { current: number }) {
  return (
    <div className="flex flex-col items-center gap-3">
    <ol className="flex items-center justify-center gap-2 md:gap-3">
      {STEPPER_STEPS.map((step, index) => {
        const reached = index <= current;
        return (
          <li key={step.key} className="flex items-center gap-2 md:gap-3">
            {index > 0 && (
              <span className={cn("h-px w-4 md:w-16", reached ? "bg-primary" : "bg-light-Grey")} />
            )}
            <span
              aria-current={index === current ? "step" : undefined}
              className={cn(
                "flex size-5 md:size-6 shrink-0 items-center justify-center rounded-full",
                reached ? "bg-primary" : "bg-light-Grey"
              )}
            >
              <span className={cn("size-2 rounded-full", reached ? "bg-white" : "bg-text-Grey-Muted")} />
            </span>
            <span className={cn("text-sm md:text-base whitespace-nowrap max-md:hidden", reached ? "text-primary" : "text-Text-body-text")}>
              {step.label}
            </span>
          </li>
        );
      })}
    </ol>
    {/* Labels are hidden on mobile, so show the current step as text */}
    <p className="text-xs text-primary md:hidden">
      Step {current + 1} of {STEPPER_STEPS.length} · {STEPPER_STEPS[current].label}
    </p>
    </div>
  );
}
