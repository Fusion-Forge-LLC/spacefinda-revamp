"use client";

import React from "react";
import { CloudUpload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { InsightListingRow } from "@/lib/dummy";
import { conversionRate } from "./insight-utils";

const HEADERS = ["Listing", "Status", "Views", "Saves", "Bookings", "Conversion (%)", "Revenue (NGN)"];

export default function ExportReportButton({ rows, periodLabel }: { rows: InsightListingRow[]; periodLabel: string }) {
  const exportCsv = () => {
    if (rows.length === 0) {
      toast("No data to export yet");
      return;
    }
    const lines = rows.map((r) => [r.title, r.status, r.views, r.saves, r.bookings, conversionRate(r)?.toFixed(1) ?? "", r.revenue || ""]);
    const csv = [HEADERS, ...lines].map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `spacefinda-insights-${periodLabel.toLowerCase().replace(/\s+/g, "-")}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={exportCsv} className="h-10 rounded-lg px-4">
      <CloudUpload className="size-4" />
      Export report
    </Button>
  );
}
