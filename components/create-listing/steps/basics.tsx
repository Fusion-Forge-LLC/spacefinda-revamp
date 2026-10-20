import React from "react";
import StepHeading from "../step-heading";
import CounterRow from "../counter-row";
import { StepProps } from "../types";

export default function BasicsStep({ draft, update }: StepProps) {
  return (
    <>
      <StepHeading title="Share some basics about your space">
        You can always update these details later from your dashboard.
      </StepHeading>

      <div>
        <CounterRow label="Guests" description="Maximum number of guests" value={draft.guests} min={1} onChange={(guests) => update({ guests })} />
        <CounterRow
          label="Bedrooms"
          description="Not counting hallways or living areas"
          value={draft.bedrooms}
          onChange={(bedrooms) => update({ bedrooms })}
        />
        <CounterRow label="Bathrooms" value={draft.bathrooms} onChange={(bathrooms) => update({ bathrooms })} />
        <CounterRow label="Beds" value={draft.beds} onChange={(beds) => update({ beds })} />
      </div>
    </>
  );
}
