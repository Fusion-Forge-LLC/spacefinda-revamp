import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn, formatCount, formatNaira } from "@/lib/utils";
import type { InsightListingRow } from "@/lib/dummy";
import { LISTING_STATUS } from "../listings/listing-status";
import SectionCard from "../section-card";
import { conversionRate } from "./insight-utils";

export default function ListingPerformance({ rows }: { rows: InsightListingRow[] }) {
  return (
    <SectionCard title="Per listing performance">
      <div className="mt-3 overflow-hidden rounded-xl border border-gray-100">
        <Table className="text-xs md:text-sm">
          <TableHeader className="bg-primary-containers">
            <TableRow className="hover:bg-transparent">
              <TableHead className="px-4">Listing</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Saves</TableHead>
              <TableHead>Bookings</TableHead>
              <TableHead className="text-right">Conversion</TableHead>
              <TableHead className="px-4 text-right">Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => {
              const status = LISTING_STATUS[row.status];
              const conversion = conversionRate(row);
              return (
                <TableRow key={row.title}>
                  <TableCell className="px-4 py-3.5 text-Text-dark">{row.title}</TableCell>
                  <TableCell>
                    <span className={cn("inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs", status.className)}>
                      <span className={cn("size-1.5 rounded-full", status.accent)} />
                      {status.label}
                    </span>
                  </TableCell>
                  <TableCell>{formatCount(row.views, false)}</TableCell>
                  <TableCell>{formatCount(row.saves, false)}</TableCell>
                  <TableCell>{formatCount(row.bookings, false)}</TableCell>
                  <TableCell className="text-right">{conversion === null ? "—" : `${conversion.toFixed(1)}%`}</TableCell>
                  <TableCell className="px-4 text-right">{row.revenue ? formatNaira(row.revenue) : "—"}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </SectionCard>
  );
}
