"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatNaira } from "@/lib/utils";
import { DUMMY_AVAILABILITY } from "@/lib/dummy";

type RuleKey = keyof typeof DUMMY_AVAILABILITY.rules;

const RULES: { key: RuleKey; label: string; format: (value: number) => React.ReactNode }[] = [
  {
    key: "nightlyRate",
    label: "Standard nightly rate",
    format: (v) => (
      <>
        <span className="font-medium text-Text-dark">{formatNaira(v)}</span> / night
      </>
    ),
  },
  { key: "minStay", label: "Minimum stay", format: (v) => `${v} ${v === 1 ? "night" : "nights"}` },
  { key: "maxStay", label: "Maximum stay", format: (v) => `${v} nights` },
];

export default function PricingRules() {
  const [rules, setRules] = useState(DUMMY_AVAILABILITY.rules);
  const [editing, setEditing] = useState<RuleKey | null>(null);
  const [draft, setDraft] = useState("");

  const save = (key: RuleKey) => {
    const value = Number(draft);
    if (!Number.isFinite(value) || value <= 0) {
      toast.error("Enter a number greater than 0");
      return;
    }
    setRules((prev) => ({ ...prev, [key]: value }));
    setEditing(null);
    toast.success("Saved");
  };

  return (
    <section id="rules" className="rounded-2xl border border-gray-100 bg-white p-4 md:p-5">
      <h2 className="text-base md:text-lg font-medium text-Text-dark">Pricing and availability rules</h2>
      <div className="mt-2 divide-y divide-gray-100">
        {RULES.map(({ key, label, format }) => (
          <div key={key} className="flex items-center justify-between gap-3 py-3 text-xs md:text-sm text-Text-body-text">
            <span>{label}</span>
            {editing === key ? (
              <form
                className="flex items-center gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  save(key);
                }}
              >
                <Input autoFocus inputMode="numeric" value={draft} onChange={(e) => setDraft(e.target.value)} className="h-8 w-28" />
                <Button type="submit" size="sm" className="h-8">
                  Save
                </Button>
              </form>
            ) : (
              <div className="flex items-center gap-3">
                <span>{format(rules[key])}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setEditing(key);
                    setDraft(String(rules[key]));
                  }}
                  className="h-8 bg-primary-containers text-primary hover:bg-primary-containers/80"
                >
                  Edit
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
