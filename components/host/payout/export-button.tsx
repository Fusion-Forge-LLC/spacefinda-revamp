"use client";

import React from "react";
import { CloudUpload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { HostPayout } from "@/lib/dummy";

const HEADERS = ["Check-in date", "Property", "Renter", "Reference", "Amount (NGN)", "Status"];

export default function ExportButton({ payouts }: { payouts: HostPayout[] }) {
  const exportCsv = () => {
    if (payouts.length === 0) {
      toast("No payouts to export yet");
      return;
    }
    const rows = payouts.map((p) => [p.checkInDate, p.property, p.renter, p.reference, p.amount, p.status]);
    const csv = [HEADERS, ...rows].map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "spacefinda-payouts.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button variant="outline" onClick={exportCsv} className="h-10 rounded-lg border-gray-200 px-4">
      <CloudUpload className="size-4" />
      Export payout history
    </Button>
  );
}
