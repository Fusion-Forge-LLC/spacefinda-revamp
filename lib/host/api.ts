// Server-side reads for the host dashboard. Each returns null/[] on failure (e.g. not signed in,
// or the user hasn't accepted the host terms yet) so pages fall back to their empty states.
import { apiFetch } from "@/lib/api/client";
import type {
  ApiHostBooking,
  ApiListing,
  BookingStats,
  DataResponse,
  EarningsSummary,
  HostBookingsPage,
  OccupancyReport,
  RatingSummary,
} from "@/lib/api/types";

async function getData<T>(path: string): Promise<T | null> {
  const res = await apiFetch<DataResponse<T>>(path, { auth: true });
  return res.ok ? res.data.data ?? null : null;
}

export const getListing = (id: string) => getData<ApiListing>(`/host/listings/${encodeURIComponent(id)}`);

export const getDrafts = async () => (await getData<ApiListing[]>("/host/listings/drafts")) ?? [];

// GET /host/listings only selects a few fields (no title, description or currentStep), so fill those in
// from the drafts list and from each listing's own endpoint. Hosts have a handful of listings, so this stays cheap.
export async function getHostListings(): Promise<ApiListing[]> {
  const [listings, drafts] = await Promise.all([getData<ApiListing[]>("/host/listings"), getDrafts()]);
  if (!listings) return [];

  const draftsById = new Map(drafts.map((d) => [d._id, d]));
  return Promise.all(
    listings.map(async (listing) => {
      const full = draftsById.get(listing._id) ?? (listing.title ? null : await getListing(listing._id));
      return full ? { ...full, ...listing, title: full.title, stats: listing.stats } : listing;
    })
  );
}

export const getEarnings = () => getData<EarningsSummary>("/host/earnings");
export const getBookingStats = () => getData<BookingStats>("/host/bookings/stats");
export const getOccupancy = () => getData<OccupancyReport>("/host/occupancy-report");
export const getRatingSummary = () => getData<RatingSummary>("/host/ratings/summary");

export async function getHostBookings(params: { status?: ApiHostBooking["stage"]; page?: number; limit?: number } = {}) {
  const query = new URLSearchParams();
  if (params.status) query.set("status", params.status);
  query.set("page", String(params.page ?? 1));
  query.set("limit", String(params.limit ?? 50));
  const res = await apiFetch<HostBookingsPage>(`/host/bookings?${query}`, { auth: true });
  return res.ok ? res.data.data : [];
}

export const getHostBooking = (id: string) => getData<ApiHostBooking>(`/host/bookings/${encodeURIComponent(id)}`);
