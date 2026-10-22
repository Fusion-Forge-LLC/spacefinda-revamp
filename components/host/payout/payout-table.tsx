import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn, formatNaira } from "@/lib/utils";
import type { HostPayout } from "@/lib/dummy";

const STATUS = {
  upcoming: { label: "Upcoming", className: "bg-primary-containers text-primary" },
  paid: { label: "Paid", className: "bg-green-50 text-green-600" },
};

export default function PayoutTable({ payouts, headerClassName }: { payouts: HostPayout[]; headerClassName?: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100">
      <Table className="text-xs md:text-sm">
        <TableHeader className={cn("bg-text-Grey-Muted", headerClassName)}>
          <TableRow className="hover:bg-transparent">
            <TableHead className="px-4">Check-in Date</TableHead>
            <TableHead>Property</TableHead>
            <TableHead>Renter name</TableHead>
            <TableHead>Reference</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="px-4 text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payouts.map((p) => (
            <TableRow key={`${p.reference}-${p.checkInDate}`}>
              <TableCell className="px-4 py-3.5">{p.checkInDate}</TableCell>
              <TableCell className="text-Text-dark">{p.property}</TableCell>
              <TableCell className="text-Text-body-text">{p.renter}</TableCell>
              <TableCell className="text-Text-body-text">{p.reference}</TableCell>
              <TableCell className="text-right">{formatNaira(p.amount)}</TableCell>
              <TableCell className="px-4 text-right">
                <span className={cn("rounded-md px-2 py-0.5 text-xs", STATUS[p.status].className)}>{STATUS[p.status].label}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
