import React from "react";
import { cn } from "@/lib/utils";
import { PROGRESS_STEPS } from "./types";

// `current` is the index of the active step; every segment up to and including it is filled
export default function ProgressBar({ current }: { current: number }) {
  return (
    <div
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={PROGRESS_STEPS.length}
      aria-valuenow={current + 1}
      aria-label={`Step ${current + 1} of ${PROGRESS_STEPS.length}`}
      className="flex gap-0.5 md:gap-1"
    >
      {PROGRESS_STEPS.map((step, index) => (
        <span key={step} className={cn("h-1 flex-1 transition-colors", index <= current ? "bg-primary" : "bg-text-Grey-Muted")} />
      ))}
    </div>
  );
}
