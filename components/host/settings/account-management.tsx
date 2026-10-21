"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { SettingRow } from "@/components/dashboard/account-settings/account-settings";

// No design for this tab yet; mirrors the data and deletion rows from the renter account settings
export default function AccountManagement() {
  const [dataRequested, setDataRequested] = useState(false);

  const requestData = () => {
    setDataRequested(true);
    toast("Data request received");
  };

  return (
    <div>
      <h2 className="text-lg md:text-xl font-medium text-Text-dark">Account settings</h2>
      <p className="mt-1 text-sm text-Text-body-text">Manage your data and your SpaceFinda owner account.</p>

      <SettingRow
        title="Request my data"
        description="Request a copy of all personal data SpaceFinda holds about you. Our team will compile and email it to you within 30 days."
      >
        {dataRequested ? (
          <span className="text-sm text-Text-body-text">Requested</span>
        ) : (
          <button type="button" onClick={requestData} className="text-sm text-primary underline underline-offset-2">
            Request
          </button>
        )}
      </SettingRow>

      <SettingRow
        title="Delete account"
        description="Owner accounts are closed by SpaceFinda support so upcoming bookings and pending payouts can be settled first."
      >
        <a href="mailto:support@spacefinda.com?subject=Close%20my%20owner%20account" className="text-sm text-red-600 underline underline-offset-2">
          Contact support
        </a>
      </SettingRow>
    </div>
  );
}
