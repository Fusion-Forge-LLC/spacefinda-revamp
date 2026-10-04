import React from "react";
import { cn } from "@/lib/utils";
import StepHeader from "../step-header";
import StepActions from "../step-actions";
import { ID_TYPES, IdType } from "../types";

interface SelectIdStepProps {
  value: IdType | null;
  onChange: (value: IdType) => void;
  onNext: () => void;
}

export default function SelectIdStep({ value, onChange, onNext }: SelectIdStepProps) {
  return (
    <>
      <StepHeader title="Which ID will you use?">
        Choose the government-issued ID you have available. All options are equally accepted. Make sure the document is
        current and has not expired.
      </StepHeader>

      <div role="radiogroup" className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {ID_TYPES.map(({ value: option, title, description, icon: Icon }) => {
          const selected = value === option;
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option)}
              className={cn(
                "flex flex-col items-start rounded-xl border bg-white p-3 text-left transition-colors",
                selected ? "border-primary ring-1 ring-primary bg-primary-containers/50" : "border-light-Grey hover:border-primary/40"
              )}
            >
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary-containers text-primary">
                <Icon className="size-5" />
              </div>
              <p className="mt-3 text-base md:text-lg text-Text-dark">{title}</p>
              <p className="mt-1 text-sm md:text-base text-Text-body-text">{description}</p>
            </button>
          );
        })}
      </div>

      <StepActions primaryLabel="Continue" onPrimary={onNext} disabled={!value} />
    </>
  );
}
