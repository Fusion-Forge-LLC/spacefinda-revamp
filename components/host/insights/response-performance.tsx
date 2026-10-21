import React from "react";
import { CircleCheck } from "lucide-react";
import type { DUMMY_RESPONSE_PERFORMANCE } from "@/lib/dummy";
import SectionCard from "../section-card";

const RADIUS = 40;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ResponsePerformance({ response }: { response: typeof DUMMY_RESPONSE_PERFORMANCE }) {
  const { rate, averageTime, fastResponder } = response;

  return (
    <SectionCard className="flex flex-col">
      <h2 className="text-base md:text-lg font-medium text-Text-dark">Response performance</h2>
      <p className="mt-1 text-xs md:text-sm text-Text-body-text">Fast responses improve your search ranking</p>

      <div className="mt-6 flex items-center gap-6">
        <div className="relative size-24 shrink-0">
          <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden>
            <circle cx="50" cy="50" r={RADIUS} fill="none" strokeWidth="14" className="stroke-text-Grey-Muted" />
            <circle
              cx="50"
              cy="50"
              r={RADIUS}
              fill="none"
              strokeWidth="14"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE * (1 - rate / 100)}
              className="stroke-primary"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-Text-dark">{rate}%</span>
        </div>

        <div>
          <p className="text-xs md:text-sm text-Text-body-text">Response rate</p>
          <p className="mt-1 text-lg md:text-xl font-medium text-Text-dark">{averageTime}</p>
          {fastResponder && (
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-green-50 px-2.5 py-1 text-xs md:text-sm text-green-600">
              <CircleCheck className="size-3.5" />
              Fast responder
            </span>
          )}
        </div>
      </div>

      <p className="mt-6 rounded-lg bg-text-Grey-Muted px-3 py-2.5 text-xs leading-5 text-Text-body-text">
        {fastResponder
          ? `${rate}% response rate qualifies you for the Fast responder badge, which improves your search ranking. Maintain above 90% to keep this badge.`
          : `Reply to more than 90% of enquiries to earn the Fast responder badge, which improves your search ranking.`}
      </p>
    </SectionCard>
  );
}
