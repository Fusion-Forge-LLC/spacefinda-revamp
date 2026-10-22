"use client";

import React, { useState } from "react";
import AvailabilityGrid, { AvailabilityActions, getBlockedDates } from "./availability-grid";

export default function AvailabilityCalendar({ isLive }: { isLive: boolean }) {
  const [blocked, setBlocked] = useState<Date[]>(() => (isLive ? getBlockedDates() : []));

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 md:p-5">
      <div className="mb-6">
        <AvailabilityActions />
      </div>

      <AvailabilityGrid blocked={blocked} onBlockedChange={setBlocked} showBookings={isLive} />

      {isLive && (
        <p className="mt-6 text-xs md:text-sm text-Text-body-text">
          Tap any date to block it. Tap again to unblock. You can always adjust from your owner dashboard.
        </p>
      )}
    </div>
  );
}
