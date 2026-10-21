"use client";

import React, { useState } from "react";
import { SettingRow } from "@/components/dashboard/account-settings/account-settings";
import ChangePasswordModal from "@/components/dashboard/account-settings/change-password-modal";

// No design for this tab yet; uses the password row from the renter account settings
export default function SecuritySettings() {
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

  return (
    <div>
      <h2 className="text-lg md:text-xl font-medium text-Text-dark">Security</h2>
      <p className="mt-1 text-sm text-Text-body-text">Keep your owner account and payouts secure.</p>

      <SettingRow title="Password" description="Update your account password. You will need your current password to make changes.">
        <button type="button" onClick={() => setIsPasswordOpen(true)} className="text-sm text-primary underline underline-offset-2">
          Change
        </button>
      </SettingRow>

      <ChangePasswordModal open={isPasswordOpen} onOpenChange={setIsPasswordOpen} />
    </div>
  );
}
