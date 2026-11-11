import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import StepHeading from "../step-heading";
import CharCount from "../char-count";
import { StepProps } from "../types";

// The API rejects titles under 10 characters and descriptions under 50
export const TITLE_MIN = 10;
export const TITLE_MAX = 50;
export const DESCRIPTION_MIN = 50;
export const DESCRIPTION_MAX = 800;

export default function DetailsStep({ draft, update }: StepProps) {
  return (
    <>
      <StepHeading title="Give your space a title and description">
        A clear title and honest description convert browsers into bookers. Be specific, warm, and accurate.
      </StepHeading>

      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="title" className="text-sm md:text-base font-normal text-Text-dark">
              Listing title
            </Label>
            <CharCount value={draft.title} max={TITLE_MAX} />
          </div>
          <Input
            id="title"
            value={draft.title}
            maxLength={TITLE_MAX}
            onChange={(e) => update({ title: e.target.value })}
            placeholder="e.g. Cosy 2 bedroom apartment, Bodija"
            className="h-11 border-light-Grey"
          />
          <p className="text-xs text-Grey-Pure-White">
            Include the property type and neighbourhood. Clear titles get more clicks. At least {TITLE_MIN} characters.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="description" className="text-sm md:text-base font-normal text-Text-dark">
              Description
            </Label>
            <CharCount value={draft.description} max={DESCRIPTION_MAX} />
          </div>
          <Textarea
            id="description"
            value={draft.description}
            maxLength={DESCRIPTION_MAX}
            onChange={(e) => update({ description: e.target.value })}
            placeholder="Describe what makes your space special, what is nearby or what guests should know before booking"
            className="min-h-30 border-light-Grey shadow-none placeholder:text-Grey-Pure-White focus-visible:ring-0 focus-visible:border-primary"
          />
          <p className="text-xs text-Grey-Pure-White">At least {DESCRIPTION_MIN} characters.</p>
        </div>
      </div>
    </>
  );
}
