import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn, formatNaira } from "@/lib/utils";
import StepHeading from "../step-heading";
import RadioCard from "../radio-card";
import {
  CANCELLATION_POLICIES,
  CAUTION_FEE,
  COMMISSION_RATE,
  LAUNCH_DISCOUNTS,
  LAUNCH_DURATIONS,
  StepProps,
} from "../types";

export const getPayout = (price: number) => {
  const commission = Math.round(price * COMMISSION_RATE);
  return { commission, payout: price - commission };
};

export default function PricingStep({ draft, update }: StepProps) {
  const price = draft.price ?? 0;
  const { commission, payout } = getPayout(price);

  const breakdown = [
    { label: "Base price", value: formatNaira(price) },
    { label: `SpaceFinda commission (${COMMISSION_RATE * 100}%)`, value: price ? `- ${formatNaira(commission)}` : formatNaira(0) },
  ];

  return (
    <>
      <StepHeading title="Set your price and cancellation policy">
        The price you set is what guests pay. SpaceFinda deducts {COMMISSION_RATE * 100}% commission automatically. You
        receive {100 - COMMISSION_RATE * 100}% guaranteed on check-in day.
      </StepHeading>

      <div className="space-y-2">
        <Label htmlFor="price" className="text-sm md:text-base font-normal text-Text-dark">
          Price per night
        </Label>
        <div className="flex h-14 items-center gap-2 rounded-lg border border-light-Grey px-4 focus-within:border-primary">
          <span className="text-xl text-Text-body-text">₦</span>
          <input
            id="price"
            inputMode="numeric"
            value={draft.price ? draft.price.toLocaleString("en-NG") : ""}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, "").slice(0, 9);
              update({ price: digits ? Number(digits) : null });
            }}
            placeholder="0"
            className="w-full bg-transparent text-xl md:text-2xl text-Text-dark outline-none placeholder:text-Grey-Pure-White"
          />
        </div>
        <p className="text-xs text-Grey-Pure-White">We recommend researching similar spaces in your area before setting a price.</p>
      </div>

      <dl className="mt-4 rounded-lg bg-navy p-4 text-sm text-white">
        {breakdown.map(({ label, value }) => (
          <div key={label} className="flex justify-between gap-4 py-1.5">
            <dt className="text-white/80">{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
        <div className="mt-2 flex justify-between gap-4 border-t border-white/20 pt-3">
          <dt className="text-white/80">Your payout per night</dt>
          <dd className="font-medium text-green-400">{formatNaira(payout)}</dd>
        </div>
      </dl>

      <h2 className="mt-8 text-base md:text-lg text-Text-dark">Caution fee assigned by SpaceFinda</h2>
      <div className="mt-3 flex items-center justify-between gap-4 rounded-lg border border-light-Grey p-4">
        <div>
          <p className="text-sm md:text-base text-Text-dark">Auto-calculated based on booking value</p>
          <p className="mt-1 text-sm text-Text-body-text">Collected from guest and held until 48hrs post-checkout</p>
        </div>
        <p className="text-base md:text-lg font-medium text-Text-dark">{formatNaira(CAUTION_FEE)}</p>
      </div>

      <div className={cn("mt-6 rounded-lg border p-4", draft.launchOffer ? "border-primary" : "border-primary/40")}>
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="launch-offer" className="text-sm md:text-base font-normal text-Text-dark">
            Launch offer. Get your first bookings faster.
          </Label>
          <span className="rounded-md bg-primary-containers px-2 py-0.5 text-xs text-primary">Optional</span>
        </div>
        <div className="mt-2 flex items-end justify-between gap-6">
          <p className="text-sm text-Text-body-text leading-relaxed">
            New listings with no reviews can be harder to convert. A temporary discount removes the risk premium renters
            apply and drives first bookings faster. First reviews unlock full-price confidence. You control the percentage
            and duration.
          </p>
          <Switch
            id="launch-offer"
            checked={draft.launchOffer}
            onCheckedChange={(launchOffer) => update({ launchOffer })}
            className="h-5.5! w-8.5! shrink-0 data-checked:bg-primary data-unchecked:bg-light-Grey"
          />
        </div>

        {draft.launchOffer && (
          <div className="mt-4 flex flex-col sm:flex-row gap-3 border-t border-light-Grey pt-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="launch-discount" className="text-sm font-normal text-Text-dark">
                Discount
              </Label>
              <Select value={String(draft.launchDiscount)} onValueChange={(v) => update({ launchDiscount: Number(v) })}>
                <SelectTrigger id="launch-discount" className="h-11! w-full border-light-Grey shadow-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper">
                  {LAUNCH_DISCOUNTS.map((discount) => (
                    <SelectItem key={discount} value={String(discount)}>
                      {discount}% off
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="launch-duration" className="text-sm font-normal text-Text-dark">
                Duration
              </Label>
              <Select value={draft.launchDuration} onValueChange={(launchDuration) => update({ launchDuration })}>
                <SelectTrigger id="launch-duration" className="h-11! w-full border-light-Grey shadow-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper">
                  {LAUNCH_DURATIONS.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      <div role="radiogroup" aria-label="Cancellation policy" className="mt-6 space-y-2">
        {CANCELLATION_POLICIES.map(({ value, title, badge, badgeClassName, description, rule }) => (
          <RadioCard
            key={value}
            indicator="trailing"
            selected={draft.cancellationPolicy === value}
            onClick={() => update({ cancellationPolicy: value })}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm md:text-base text-Text-dark">{title}</p>
              <span className={cn("rounded-md px-2 py-0.5 text-xs", badgeClassName)}>{badge}</span>
            </div>
            <p className="mt-2 text-sm text-Text-body-text leading-relaxed">{description}</p>
            <p className="mt-2 text-sm text-Text-dark">{rule}</p>
          </RadioCard>
        ))}
      </div>
    </>
  );
}
