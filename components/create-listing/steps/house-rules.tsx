import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import StepHeading from "../step-heading";
import CharCount from "../char-count";
import { formatTime, RULES, StepProps, TIME_SLOTS } from "../types";

export const ADDITIONAL_RULES_MAX = 300;

function TimeSelect({ id, label, value, onChange }: { id: string; label: string; value: string; onChange: (value: string) => void }) {
  return (
    <div className="flex-1 space-y-2">
      <Label htmlFor={id} className="text-sm font-normal text-Text-dark">
        {label}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id} className="h-11! w-full border-light-Grey shadow-none text-Text-body-text">
          <SelectValue />
        </SelectTrigger>
        <SelectContent position="popper" className="max-h-64">
          {TIME_SLOTS.map((slot) => (
            <SelectItem key={slot} value={slot}>
              {formatTime(slot)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default function HouseRulesStep({ draft, update }: StepProps) {
  return (
    <>
      <StepHeading title="Set your house rules">
        Renters agree to your rules before booking. Clear rules protect your property and prevent misunderstandings.
      </StepHeading>

      <h2 className="text-base md:text-lg text-Text-dark">Check-in and check-out</h2>
      <div className="mt-3 flex flex-col sm:flex-row gap-3">
        <TimeSelect id="check-in" label="Check-in from" value={draft.checkIn} onChange={(checkIn) => update({ checkIn })} />
        <TimeSelect id="check-out" label="Check-out by" value={draft.checkOut} onChange={(checkOut) => update({ checkOut })} />
      </div>

      <h2 className="mt-6 text-base md:text-lg text-Text-dark">What is allowed</h2>
      <ul className="mt-1">
        {RULES.map(({ key, label }) => (
          <li key={key} className="flex items-center justify-between gap-4 border-b border-light-Grey py-3">
            <Label htmlFor={`rule-${key}`} className="text-sm font-normal text-Text-body-text">
              {label}
            </Label>
            <Switch
              id={`rule-${key}`}
              checked={draft.rules[key]}
              onCheckedChange={(checked) => update({ rules: { ...draft.rules, [key]: checked } })}
              className="h-5.5! w-8.5! data-checked:bg-primary data-unchecked:bg-light-Grey"
            />
          </li>
        ))}
      </ul>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="additional-rules" className="text-sm font-normal text-Text-dark">
            Additional rules <span className="text-Text-body-text">(optional)</span>
          </Label>
          <CharCount value={draft.additionalRules} max={ADDITIONAL_RULES_MAX} />
        </div>
        <Textarea
          id="additional-rules"
          value={draft.additionalRules}
          maxLength={ADDITIONAL_RULES_MAX}
          onChange={(e) => update({ additionalRules: e.target.value })}
          placeholder="Any other rules you want guests to know before booking..."
          className="min-h-23 border-light-Grey shadow-none placeholder:text-Grey-Pure-White focus-visible:ring-0 focus-visible:border-primary"
        />
      </div>
    </>
  );
}
