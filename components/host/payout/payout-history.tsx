"use client";

import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatNaira } from "@/lib/utils";
import type { HostPayout } from "@/lib/dummy";
import SectionCard from "../section-card";
import PayoutTable from "./payout-table";

// "11 Apr 2026" -> "Apr 2026"
const monthOf = (date: string) => date.split(" ").slice(1).join(" ");

export default function PayoutHistory({ payouts }: { payouts: HostPayout[] }) {
  const [period, setPeriod] = useState("all");
  const months = [...new Set(payouts.map((p) => monthOf(p.checkInDate)))];
  const visible = period === "all" ? payouts : payouts.filter((p) => monthOf(p.checkInDate) === period);
  const total = visible.reduce((sum, p) => sum + p.amount, 0);

  return (
    <SectionCard
      title="Payout history"
      action={
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger aria-label="Period" className="h-10! w-36 rounded-lg">
            <SelectValue />
          </SelectTrigger>
          <SelectContent position="popper" align="end">
            <SelectItem value="all">All time</SelectItem>
            {months.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      }
    >
      <div className="pt-3">
        <PayoutTable payouts={visible} />
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
        <p className="text-xs md:text-sm text-Text-body-text">
          Showing {visible.length} payouts · {period === "all" ? "All time" : period} total
        </p>
        <p className="text-lg md:text-xl font-medium text-Text-dark">{formatNaira(total)}</p>
      </div>
    </SectionCard>
  );
}
