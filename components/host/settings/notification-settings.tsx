"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

const ALERTS = [
  { key: "booking", title: "New booking confirmed", description: "Email and SMS when a renter books your space", defaultOn: true },
  { key: "message", title: "New message from renter", description: "Email and SMS when a renter sends you a message", defaultOn: true },
  { key: "checkin", title: "Check-in reminder", description: "Reminder 24 hours before a renter checks in", defaultOn: true },
  { key: "payout", title: "Payout released", description: "Confirmation when your payout has been sent", defaultOn: true },
  { key: "damage", title: "Damage claim window alert", description: "Alert when a claim window is about to close", defaultOn: true },
  { key: "review", title: "New review posted", description: "Notification when a renter leaves a review", defaultOn: true },
  { key: "cancellation", title: "Booking cancellation", description: "Alert if a renter cancels a confirmed booking", defaultOn: true },
  { key: "platform", title: "SpaceFinda platform updates", description: "New features, policy changes, and announcements", defaultOn: false },
];

// The design stops at this section's heading, so the channels follow the renter account settings
const CHANNELS = [
  { key: "email", title: "Email notifications", description: "Booking alerts, payout confirmations and reminders by email.", defaultOn: true },
  {
    key: "sms",
    title: "SMS notifications",
    description: "OTP codes and critical security alerts. Required for account security and cannot be disabled.",
    defaultOn: true,
    locked: true,
  },
];

type Pref = { key: string; title: string; description: string; defaultOn: boolean; locked?: boolean };

function PrefRows({ prefs, values, onToggle }: { prefs: Pref[]; values: Record<string, boolean>; onToggle: (key: string, value: boolean) => void }) {
  return (
    <div>
      {prefs.map((p) => (
        <div key={p.key} className="flex items-center justify-between gap-4 py-3">
          <div className="min-w-0">
            <p className="text-sm md:text-base font-medium text-Text-dark">{p.title}</p>
            <p className="mt-0.5 text-xs md:text-sm text-Text-body-text">{p.description}</p>
          </div>
          <Switch
            checked={values[p.key]}
            disabled={p.locked}
            onCheckedChange={(value) => onToggle(p.key, value)}
            aria-label={p.title}
            className="h-6 w-10.5 shrink-0 data-disabled:opacity-100 [&>span]:size-5"
          />
        </div>
      ))}
    </div>
  );
}

export default function NotificationSettings() {
  const [values, setValues] = useState<Record<string, boolean>>(
    Object.fromEntries([...ALERTS, ...CHANNELS].map((p) => [p.key, p.defaultOn]))
  );

  // No settings API yet
  const toggle = (key: string, value: boolean) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    toast("Preferences saved");
  };

  return (
    <div>
      <PrefRows prefs={ALERTS} values={values} onToggle={toggle} />

      <h2 className="mt-6 text-base md:text-lg font-medium text-Text-dark">Notification preferences</h2>
      <p className="mt-1 text-sm text-Text-body-text">Choose how and when you want to hear from SpaceFinda.</p>
      <div className="mt-2">
        <PrefRows prefs={CHANNELS} values={values} onToggle={toggle} />
      </div>
    </div>
  );
}
