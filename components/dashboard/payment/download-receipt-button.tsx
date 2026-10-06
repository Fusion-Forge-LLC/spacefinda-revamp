"use client";

import React from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

// Uses the browser's print dialog (Save as PDF) until the backend can generate a real PDF
export default function DownloadReceiptButton() {
  return (
    <Button onClick={() => window.print()} className="h-10 px-4">
      <Download />
      Download receipt
    </Button>
  );
}
