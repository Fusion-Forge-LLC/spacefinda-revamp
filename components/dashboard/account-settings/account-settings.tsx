"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import PageHeading from "../page-heading";
import ChangePasswordModal from "./change-password-modal";

const NOTIFICATIONS = [
  {
    key: "email",
    title: "Email notifications",
    description: "Booking confirmations, receipts, and stay reminders.",
    defaultOn: true,
  },
  {
    key: "sms",
    title: "SMS notifications",
    description: "OTP codes and critical security alerts. Required for account security and cannot be disabled.",
    defaultOn: true,
    locked: true,
  },
  {
    key: "marketing",
    title: "Marketing and promotions",
    description:
      "Occasional emails about new spaces, special offers, and platform updates in your area. You can turn this off at any time.",
    defaultOn: false,
  },
];

function SettingRow({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 border-b border-light-Grey">
      <div className="min-w-0">
        <p className="text-sm md:text-base font-medium text-Text-dark">{title}</p>
        <p className="mt-1 text-xs md:text-sm text-Text-body-text">{description}</p>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-8 first:mt-0 text-base md:text-lg text-Text-body-text">{children}</h2>;
}

const linkClass = "text-sm text-primary underline underline-offset-2";

export default function AccountSettings() {
  const [prefs, setPrefs] = useState<Record<string, boolean>>(
    Object.fromEntries(NOTIFICATIONS.map((n) => [n.key, n.defaultOn]))
  );
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [dataRequested, setDataRequested] = useState(false);

  const togglePref = (key: string, value: boolean) => {
    setPrefs((prev) => ({ ...prev, [key]: value }));
    toast("Preferences saved");
  };

  const requestData = () => {
    setDataRequested(true);
    toast("Data request received");
  };

  return (
    <div className="max-w-200">
      <PageHeading
        title="Account settings"
        description="Manage how SpaceFinda communicates with you and keep your account secure."
      />

      <SectionTitle>Notifications</SectionTitle>
      {NOTIFICATIONS.map((n) => (
        <SettingRow key={n.key} title={n.title} description={n.description}>
          <Switch
            checked={prefs[n.key]}
            disabled={n.locked}
            onCheckedChange={(value) => togglePref(n.key, value)}
            aria-label={n.title}
            className="h-6 w-10.5 data-disabled:opacity-100 [&>span]:size-5"
          />
        </SettingRow>
      ))}

      <SectionTitle>Security</SectionTitle>
      <SettingRow
        title="Password"
        description="Update your account password. You will need your current password to make changes."
      >
        <button type="button" onClick={() => setIsPasswordOpen(true)} className={linkClass}>
          Change
        </button>
      </SettingRow>

      <SectionTitle>Request and data</SectionTitle>
      <SettingRow
        title="Request my data"
        description="Request a copy of all personal data SpaceFinda holds about you. Our team will compile and email it to you within 30 days."
      >
        {dataRequested ? (
          <span className="text-sm text-Text-body-text">Requested</span>
        ) : (
          <button type="button" onClick={requestData} className={linkClass}>
            Request
          </button>
        )}
      </SettingRow>

      <SectionTitle>Account management</SectionTitle>
      <SettingRow
        title="Delete account"
        description="Permanently delete your SpaceFinda account and all associated data. This action is irreversible. Any active bookings must be cancelled before proceeding."
      >
        <Link href="/dashboard/account-settings/delete-account" className="text-sm text-red-600 underline underline-offset-2">
          Delete account
        </Link>
      </SettingRow>

      <ChangePasswordModal open={isPasswordOpen} onOpenChange={setIsPasswordOpen} />
    </div>
  );
}
