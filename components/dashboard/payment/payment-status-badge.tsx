import React from "react";
import { CircleCheck, CircleX, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { PaymentStatus } from "@/lib/dummy";

const STATUS = {
  upcoming: { label: "Upcoming", icon: Clock, className: "bg-primary-containers text-primary" },
  completed: { label: "Completed", icon: CircleCheck, className: "bg-green-50 text-green-600" },
  cancelled: { label: "Cancelled", icon: CircleX, className: "bg-red-50 text-red-600" },
};

export default function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const { label, icon: Icon, className } = STATUS[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs md:text-sm", className)}>
      <Icon className="size-3.5" />
      {label}
    </span>
  );
}
