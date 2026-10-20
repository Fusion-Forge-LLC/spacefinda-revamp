import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import StepHeading from "../step-heading";
import { StepProps } from "../types";

export default function LocationStep({ draft, update }: StepProps) {
  return (
    <>
      <StepHeading title="Where is your space located?">
        Renters search by neighbourhood. Your exact address stays private and is only shared after payment is confirmed.
      </StepHeading>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="city" className="text-sm md:text-base font-normal text-Text-dark">
            City your space is located at
          </Label>
          <Input
            id="city"
            value={draft.city}
            onChange={(e) => update({ city: e.target.value })}
            placeholder="Type in a city"
            autoComplete="address-level2"
            className="h-11 border-light-Grey"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="neighbourhood" className="text-sm md:text-base font-normal text-Text-dark">
            Neighbourhood
          </Label>
          <Input
            id="neighbourhood"
            value={draft.neighbourhood}
            onChange={(e) => update({ neighbourhood: e.target.value })}
            placeholder="e.g. Bodija, Jericho, Akala Express, Challenge"
            className="h-11 border-light-Grey"
          />
          <p className="text-xs text-Grey-Pure-White">The exact address is only shared with renters after their booking is confirmed.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address" className="text-sm md:text-base font-normal text-Text-dark">
            Full address <span className="text-Text-body-text">(kept private)</span>
          </Label>
          <Input
            id="address"
            value={draft.address}
            onChange={(e) => update({ address: e.target.value })}
            placeholder="Street address, area, city"
            autoComplete="street-address"
            className="h-11 border-light-Grey"
          />
          <p className="text-xs text-Grey-Pure-White">This is stored securely and revealed to renters only after payment is confirmed.</p>
        </div>
      </div>
    </>
  );
}
