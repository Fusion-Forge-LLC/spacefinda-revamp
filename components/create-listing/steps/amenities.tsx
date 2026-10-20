import React from "react";
import StepHeading from "../step-heading";
import OptionCard from "../option-card";
import { AMENITIES, StepProps } from "../types";

export default function AmenitiesStep({ draft, update }: StepProps) {
  const toggle = (value: string) =>
    update({
      amenities: draft.amenities.includes(value) ? draft.amenities.filter((a) => a !== value) : [...draft.amenities, value],
    });

  return (
    <>
      <StepHeading title="What amenities does your space have?">
        Only select what you genuinely provide. Inaccurate amenities lead to bad reviews.
      </StepHeading>

      <div role="group" aria-label="Amenities" className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {AMENITIES.map(({ value, label, icon }) => (
          <OptionCard
            key={value}
            role="checkbox"
            label={label}
            icon={icon}
            selected={draft.amenities.includes(value)}
            onClick={() => toggle(value)}
          />
        ))}
      </div>
    </>
  );
}
