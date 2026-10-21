import type { HostBookingStatus } from "@/lib/dummy";

export const BOOKING_STATUS: Record<HostBookingStatus, { label: string; pill: string; header: string; badge: string }> = {
  upcoming: { label: "Upcoming", pill: "bg-amber-50 text-amber-700", header: "bg-[#9A8452]", badge: "bg-white text-[#9A8452]" },
  active: { label: "Active", pill: "bg-primary-containers text-primary", header: "bg-navy", badge: "bg-white text-primary" },
  completed: { label: "Completed", pill: "bg-green-50 text-green-600", header: "bg-[#0F2A16]", badge: "bg-white text-green-600" },
  cancelled: { label: "Cancelled", pill: "bg-red-50 text-red-600", header: "bg-[#4A1010]", badge: "bg-white text-red-600" },
};

export const BOOKING_TABS = Object.keys(BOOKING_STATUS) as HostBookingStatus[];
