import React from "react";
import { Minus, Plus } from "lucide-react";

interface CounterRowProps {
  label: string;
  description?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export default function CounterRow({ label, description, value, onChange, min = 0, max = 20 }: CounterRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-light-Grey py-5 last:border-b-0">
      <div>
        <p className="text-base text-Text-dark">{label}</p>
        {description && <p className="mt-1 text-sm text-Text-body-text">{description}</p>}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={`Decrease ${label.toLowerCase()}`}
          onClick={() => onChange(value - 1)}
          disabled={value <= min}
          className="flex size-7 items-center justify-center rounded-full border border-Text-body-text text-Text-dark disabled:border-light-Grey disabled:text-Grey-Pure-White"
        >
          <Minus className="size-3.5" />
        </button>
        <span className="w-5 text-center text-base text-Text-dark tabular-nums" aria-live="polite">
          {value}
        </span>
        <button
          type="button"
          aria-label={`Increase ${label.toLowerCase()}`}
          onClick={() => onChange(value + 1)}
          disabled={value >= max}
          className="flex size-7 items-center justify-center rounded-full border border-Text-body-text text-Text-dark disabled:border-light-Grey disabled:text-Grey-Pure-White"
        >
          <Plus className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
