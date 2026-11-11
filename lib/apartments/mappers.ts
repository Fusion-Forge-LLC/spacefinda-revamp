import { differenceInCalendarDays, format, parseISO } from "date-fns";
import type { ApiApartment, ApiGuestBooking, ApiListingImage } from "@/lib/api/types";
import type { Payment, PaymentStatus } from "@/lib/dummy";
import { AMENITIES, CANCELLATION_POLICIES, SPACE_TYPES } from "@/components/create-listing/types";
import { formatNaira } from "@/lib/utils";

const PROPERTY_TYPE_LABELS: Record<string, string> = {
  "entire apartment": "Entire apartment",
  "private room": "Private room",
  "entire house": "Entire house",
  "studio flat": "Studio flat",
  workspaces: "Workspace",
  other: SPACE_TYPES.find((t) => t.value === "other")?.label ?? "Other",
};

export const propertyTypeLabel = (type?: string) => (type ? PROPERTY_TYPE_LABELS[type] ?? type : "Space");

export const imageUrl = (image?: ApiListingImage | string) => (typeof image === "string" ? image : image?.url) ?? "";

export const amenityLabel = (key: string) => AMENITIES.find((a) => a.value === key)?.label ?? key.replace(/[-_]/g, " ");

export const cancellationPolicy = (value?: string) => CANCELLATION_POLICIES.find((p) => p.value === value) ?? CANCELLATION_POLICIES[0];

export const placeName = (apartment: Pick<ApiApartment, "address">) =>
  [apartment.address?.neighbourhood, apartment.address?.city].filter(Boolean).join(", ");

// Props for the shared PropertyCard
export function toPropertyCard(apartment: ApiApartment) {
  return {
    id: apartment._id,
    image: imageUrl(apartment.images?.[0]),
    title: apartment.title ?? "Untitled space",
    location: [apartment.address?.neighbourhood ?? apartment.address?.city, apartment.maxGuests && `${apartment.maxGuests} guests`, propertyTypeLabel(apartment.propertyType)]
      .filter(Boolean)
      .join(" · "),
    amenities: [],
    price: formatNaira(apartment.pricePerNight ?? 0),
    rating: apartment.ratingAverage ?? 0,
    reviews: apartment.ratingCount ?? 0,
  };
}

export type PropertyCardData = ReturnType<typeof toPropertyCard>;

export interface BookingQuote {
  nights: number;
  subtotal: number;
  discount: number;
  cautionFee: number;
  total: number;
}

// Mirrors the backend's price calculation so the summary matches what the guest is charged
export function quoteBooking(apartment: Pick<ApiApartment, "pricePerNight" | "cautionFee" | "offer">, checkIn?: Date, checkOut?: Date): BookingQuote {
  const nights = checkIn && checkOut ? Math.max(differenceInCalendarDays(checkOut, checkIn), 0) : 0;
  const subtotal = nights * (apartment.pricePerNight ?? 0);
  const offer = apartment.offer;
  const discount =
    offer?.enabled && offer.discountPercent && nights >= (offer.minNights || 1) ? Math.round((subtotal * offer.discountPercent) / 100) : 0;
  const cautionFee = apartment.cautionFee ?? 0;
  return { nights, subtotal, discount, cautionFee, total: nights ? subtotal - discount + cautionFee : 0 };
}

// A guest booking in the shape the payments list and receipt already render
export function toPayment(booking: ApiGuestBooking, now = new Date()): Payment {
  const apartment = typeof booking.apartment === "object" ? booking.apartment : null;
  const checkIn = parseISO(booking.checkIn);
  const checkOut = parseISO(booking.checkOut);
  const paidAt = booking.paidAt ? parseISO(booking.paidAt) : undefined;
  const status: PaymentStatus =
    booking.status === "cancelled" || booking.paymentStatus === "refunded" ? "cancelled" : checkOut < now ? "completed" : "upcoming";
  const ref = `SFB-${booking._id.slice(-8).toUpperCase()}`;
  const address = apartment?.address;

  return {
    id: booking._id,
    property: apartment?.title ?? "Your stay",
    propertyFullName: apartment?.title ?? "Your stay",
    address: [address?.neighbourhood, address?.city].filter(Boolean).join(", "),
    checkIn: format(checkIn, "EEE d MMM, yyyy"),
    checkOut: format(checkOut, "EEE d MMM, yyyy"),
    dateRange: `${format(checkIn, "EEE d MMM")} – ${format(checkOut, "EEE d MMM yyyy")}`,
    nights: booking.pricing?.nights ?? Math.max(differenceInCalendarDays(checkOut, checkIn), 1),
    guests: booking.guestsCount ?? 1,
    status,
    pricePerNight: booking.pricing?.pricePerNight ?? 0,
    cautionFee: booking.pricing?.cautionFee ?? 0,
    issuedAt: paidAt ? format(paidAt, "d MMM yyyy · h:mm a") : "",
    paymentMethod: "Card or bank transfer",
    paymentDate: paidAt ? format(paidAt, "EEE d MMM yyyy · h:mm a") : "",
    processor: "Paystack",
    transactionRef: booking.paymentReference ?? "",
    receiptNumber: `RCP-${booking._id.slice(-8).toUpperCase()}`,
    bookingReference: ref,
    host: "Your host",
  };
}
