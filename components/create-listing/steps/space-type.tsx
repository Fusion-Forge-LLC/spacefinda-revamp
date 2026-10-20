import React from "react";
import StepHeading from "../step-heading";
import OptionCard from "../option-card";
import { SPACE_TYPES, StepProps } from "../types";

export default function SpaceTypeStep({ draft, update }: StepProps) {
  return (
    <>
      <StepHeading title="What type of space are you listing?">
        Choose the option that best describes your property. This helps renters filter their search accurately.
      </StepHeading>

      <div role="radiogroup" aria-label="Space type" className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5">
        {SPACE_TYPES.map(({ value, label, icon }) => (
          <OptionCard
            key={value}
            label={label}
            icon={icon}
            selected={draft.spaceType === value}
            onClick={() => update({ spaceType: value })}
          />
        ))}
      </div>
    </>
  );
}
