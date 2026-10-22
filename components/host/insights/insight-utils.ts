import type { InsightListingRow } from "@/lib/dummy";

// Share of listing views that became bookings, or null when there were no views
export const conversionRate = ({ views, bookings }: Pick<InsightListingRow, "views" | "bookings">) =>
  views ? (bookings / views) * 100 : null;

