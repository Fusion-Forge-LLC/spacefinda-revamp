// Public apartment reads (no login needed)
import { apiFetch } from "@/lib/api/client";
import type { ApartmentSearch, ApartmentsPage, ApiApartment, DataResponse, Pagination } from "@/lib/api/types";

const EMPTY: { apartments: ApiApartment[]; pagination: Pagination } = { apartments: [], pagination: { page: 1, limit: 12, total: 0, pages: 0 } };

export async function searchApartments(search: ApartmentSearch = {}) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(search)) {
    if (value !== undefined && value !== "") query.set(key, String(value));
  }
  const res = await apiFetch<ApartmentsPage>(`/apartments${query.size ? `?${query}` : ""}`);
  return res.ok ? { apartments: res.data.data ?? [], pagination: res.data.pagination ?? EMPTY.pagination } : EMPTY;
}

export async function getApartment(id: string) {
  // Ids are Mongo ObjectIds; anything else can't exist, so skip the request
  if (!/^[a-f\d]{24}$/i.test(id)) return null;
  const res = await apiFetch<DataResponse<ApiApartment>>(`/apartments/${id}`);
  return res.ok ? res.data.data ?? null : null;
}
