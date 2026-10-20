import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface RadioCardProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  // "leading" puts the radio circle before the content, "trailing" renders a check after it
  indicator?: "leading" | "trailing";
  className?: string;
}

export default function RadioCard({ selected, onClick, children, indicator = "leading", className }: RadioCardProps) {
  const circle = (
    <span
      className={cn(
        "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border",
        selected ? "border-primary bg-primary text-white" : "border-Text-body-text"
      )}
    >
      {selected && (indicator === "trailing" ? <Check className="size-2.5" strokeWidth={3} /> : <span className="size-1.5 rounded-full bg-white" />)}
    </span>
  );

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={cn(
        "flex w-full items-start gap-3 rounded-lg border p-3 md:p-4 text-left transition-colors",
        selected ? "border-primary bg-primary-containers/60" : "border-light-Grey bg-white hover:border-primary/40",
        className
      )}
    >
      {indicator === "leading" && circle}
      <div className="flex-1 min-w-0">{children}</div>
      {indicator === "trailing" && circle}
    </button>
  );
}
