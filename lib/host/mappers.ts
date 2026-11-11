// Converts between the backend's listing/booking shapes and the shapes the existing UI already renders
import { addDays, differenceInCalendarDays, format, isSameDay, parseISO, startOfDay } from "date-fns";
import type { ApiHostBooking, ApiListing, ApiListingImage, ApiPropertyType } from "@/lib/api/types";
import type { HostBooking, HostListing, HostListingStatus } from "@/lib/dummy";
import {
  CAUTION_FEE,
  INITIAL_DRAFT,
  LAUNCH_DISCOUNTS,
  ListingDraft,
  ListingPhoto,
  PROGRESS_STEPS,
  ProgressStep,
  SpaceType,
} from "@/components/create-listing/types";

export const TOTAL_STEPS = PROGRESS_STEPS.length; // 10, the last one being review

export const STEP_NAMES = [
  "Type of space",
  "Location",
  "Basics",
  "Title and description",
  "Photos",
  "Amenities",
  "House rules",
  "Availability",
  "Price and cancellation",
  "Review",
];

// The API numbers steps 1-10 in the same order as PROGRESS_STEPS
export const stepNumber = (step: ProgressStep) => PROGRESS_STEPS.indexOf(step) + 1;
export const stepFromNumber = (n: number | undefined): ProgressStep => PROGRESS_STEPS[Math.min(Math.max((n ?? 1) - 1, 0), TOTAL_STEPS - 1)];

const SPACE_TYPE_TO_API: Record<SpaceType, ApiPropertyType> = {
  "entire-apartment": "entire apartment",
  "private-room": "private room",
  "entire-house": "entire house",
  "studio-flat": "studio flat",
  workspace: "workspaces",
  other: "other",
};

const SPACE_TYPE_FROM_API = Object.fromEntries(Object.entries(SPACE_TYPE_TO_API).map(([ui, api]) => [api, ui])) as Record<ApiPropertyType, SpaceType>;

// Cloudinary URLs look like .../image/upload/v1712345678/folder/name.jpg; the public id is "folder/name"
export const cloudinaryPublicId = (url: string) => url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[a-z0-9]+)?$/i)?.[1];

const toImage = (image: ApiListingImage | string): ApiListingImage => (typeof image === "string" ? { url: image } : image);

const day = (date: Date) => format(date, "yyyy-MM-dd");

// Single blocked days become ranges; `to` is the day after the last blocked night, like a checkout date
function toBlockedRanges(dates: Date[]) {
  const sorted = [...dates].map((d) => startOfDay(d)).sort((a, b) => a.getTime() - b.getTime());
  const ranges: { from: string; to: string }[] = [];
  let start: Date | null = null;
  let prev: Date | null = null;
  for (const date of sorted) {
    if (start && prev && isSameDay(addDays(prev, 1), date)) {
      prev = date;
      continue;
    }
    if (start && prev) ranges.push({ from: day(start), to: day(addDays(prev, 1)) });
    start = prev = date;
  }
  if (start && prev) ranges.push({ from: day(start), to: day(addDays(prev, 1)) });
  return ranges;
}

function fromBlockedRanges(ranges: { from: string; to: string }[] = []) {
  const days: Date[] = [];
  for (const { from, to } of ranges) {
    const end = startOfDay(parseISO(to));
    for (let d = startOfDay(parseISO(from)); d < end; d = addDays(d, 1)) days.push(d);
  }
  return days;
}

// The request body for PATCH /host/listings/{id}/steps/{step}
export function stepBody(step: ProgressStep, draft: ListingDraft): Record<string, unknown> {
  switch (step) {
    case "space-type":
      return draft.spaceType ? { propertyType: SPACE_TYPE_TO_API[draft.spaceType] } : {};
    case "location":
      return { address: { city: draft.city.trim(), neighbourhood: draft.neighbourhood.trim(), fullAddress: draft.address.trim() } };
    case "basics":
      return { maxGuests: draft.guests, bedrooms: draft.bedrooms, bathrooms: draft.bathrooms, beds: draft.beds };
    case "details":
      return { title: draft.title.trim(), description: draft.description.trim() };
    case "photos":
      return { images: draft.photos.filter((p) => p.publicId).map(({ url, publicId }) => ({ url, publicId })) };
    case "amenities":
      return { amenities: draft.amenities };
    case "rules":
      return {
        houseRules: {
          checkInTime: draft.checkIn,
          checkOutTime: draft.checkOut,
          smokingAllowed: draft.rules.smoking,
          partiesAllowed: draft.rules.parties,
          petsAllowed: draft.rules.pets,
          visitorsAllowed: draft.rules.visitors,
          ...(draft.additionalRules.trim() && { additionalRules: draft.additionalRules.trim() }),
        },
      };
    case "availability":
      return {
        availability:
          draft.availability === "from-date" && draft.availableFrom
            ? { startType: "specific_date", startDate: day(draft.availableFrom) }
            : { startType: "immediately" },
        blockedDates: draft.availability === "block-dates" ? toBlockedRanges(draft.blockedDates) : [],
      };
    case "pricing":
      return {
        pricePerNight: draft.price ?? 0,
        cautionFee: CAUTION_FEE,
        // The duration picker has no API field yet, so only the discount is sent
        offer: draft.launchOffer ? { enabled: true, discountPercent: draft.launchDiscount } : { enabled: false },
        cancellationPolicy: draft.cancellationPolicy,
      };
    default:
      return {};
  }
}

// Pre-fills the create/edit form from a saved listing
export function listingToDraft(listing: ApiListing): ListingDraft {
  const rules = listing.houseRules ?? {};
  const blockedDates = fromBlockedRanges(listing.blockedDates);
  const availability: ListingDraft["availability"] =
    listing.availability?.startType === "specific_date"
      ? "from-date"
      : blockedDates.length
        ? "block-dates"
        : listing.availability?.startType === "immediately"
          ? "immediate"
          : null;
  const discount = listing.offer?.discountPercent;

  return {
    ...INITIAL_DRAFT,
    spaceType: listing.propertyType ? SPACE_TYPE_FROM_API[listing.propertyType] ?? null : null,
    city: listing.address?.city ?? "",
    neighbourhood: listing.address?.neighbourhood ?? "",
    address: listing.address?.fullAddress ?? "",
    guests: listing.maxGuests ?? INITIAL_DRAFT.guests,
    bedrooms: listing.bedrooms ?? INITIAL_DRAFT.bedrooms,
    bathrooms: listing.bathrooms ?? INITIAL_DRAFT.bathrooms,
    beds: listing.beds ?? INITIAL_DRAFT.beds,
    title: listing.title ?? "",
    description: listing.description ?? "",
    photos: (listing.images ?? []).map(toImage).map(
      ({ url, publicId }): ListingPhoto => ({ id: publicId ?? url, url, publicId: publicId ?? cloudinaryPublicId(url) })
    ),
    amenities: listing.amenities ?? [],
    checkIn: rules.checkInTime ?? INITIAL_DRAFT.checkIn,
    checkOut: rules.checkOutTime ?? INITIAL_DRAFT.checkOut,
    rules: {
      smoking: !!rules.smokingAllowed,
      parties: !!rules.partiesAllowed,
      pets: !!rules.petsAllowed,
      visitors: !!rules.visitorsAllowed,
    },
    additionalRules: rules.additionalRules ?? "",
    availability,
    availableFrom: listing.availability?.startDate ? parseISO(listing.availability.startDate) : undefined,
    blockedDates,
    price: listing.pricePerNight || null,
    launchOffer: !!listing.offer?.enabled && !!discount,
    launchDiscount: discount && LAUNCH_DISCOUNTS.includes(discount) ? discount : INITIAL_DRAFT.launchDiscount,
    cancellationPolicy: listing.cancellationPolicy ?? INITIAL_DRAFT.cancellationPolicy,
  };
}

const LISTING_STATUS: Record<ApiListing["status"], HostListingStatus> = {
  active: "live",
  paused: "paused",
  pending_review: "review",
  draft: "draft",
  suspended: "suspended",
};

const shortDate = (iso?: string) => (iso ? format(parseISO(iso), "d MMM") : "");

// The step a draft stopped at: the API's currentStep, or the step after the last one completed
const draftStep = (listing: ApiListing) => listing.currentStep ?? Math.min(Math.max(0, ...(listing.completedSteps ?? [])) + 1, TOTAL_STEPS);

export const listingTitle = (listing: ApiListing) =>
  listing.title || [listing.address?.neighbourhood, listing.address?.city].filter(Boolean).join(", ") || "Untitled listing";

export function toHostListing(listing: ApiListing): HostListing {
  const status = LISTING_STATUS[listing.status] ?? "draft";
  const step = draftStep(listing);
  const stats = listing.stats;
  const meta =
    status === "draft"
      ? `Draft · Stopped at Step ${step} of ${TOTAL_STEPS}`
      : status === "review"
        ? `Submitted ${shortDate(listing.submittedAt ?? listing.updatedAt)} · Under SpaceFinda review`
        : status === "suspended"
          ? "Suspended by SpaceFinda"
          : `${stats?.totalBookings ?? 0} total bookings`;

  return {
    id: listing._id,
    title: listingTitle(listing),
    image: listing.images?.length ? toImage(listing.images[0]).url : "",
    status,
    location: [listing.address?.neighbourhood, listing.address?.city].filter(Boolean).join(", ") || "Location not set",
    beds: listing.beds ?? 0,
    guests: listing.maxGuests ?? 0,
    pricePerNight: listing.pricePerNight ?? 0,
    meta,
    stats:
      status === "live" || status === "paused"
        ? {
            rating: stats?.averageRating ?? listing.ratingAverage ?? 0,
            reviews: stats?.totalReviews ?? listing.ratingCount ?? 0,
            bookings: stats?.totalBookings ?? 0,
            views: stats?.totalViews ?? 0,
            saves: stats?.totalWishlist ?? 0,
          }
        : undefined,
    submittedOn: shortDate(listing.submittedAt ?? listing.updatedAt),
    draft:
      status === "draft"
        ? { lastEdited: shortDate(listing.updatedAt), step, totalSteps: TOTAL_STEPS, stepName: STEP_NAMES[step - 1] }
        : undefined,
  };
}

// Where "Continue setup" goes for a draft
export const draftHref = (id: string) => `/host/create-listing?draft=${id}`;

const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const inDays = (days: number) => (days <= 0 ? "today" : days === 1 ? "tomorrow" : `in ${days} days`);

// Short, readable booking reference from the Mongo id
export const bookingRef = (id: string) => `SFB-${id.slice(-8).toUpperCase()}`;

export function toHostBooking(booking: ApiHostBooking, now = new Date()): HostBooking {
  const checkIn = parseISO(booking.checkIn);
  const checkOut = parseISO(booking.checkOut);
  const nights = booking.pricing?.nights ?? Math.max(differenceInCalendarDays(checkOut, checkIn), 1);
  const address = booking.apartment?.address;
  const guest = booking.guest;
  const name = guest?.fullName ?? guest?.fullname ?? "Guest";
  const policy = capitalise(booking.apartment?.cancellationPolicy ?? "flexible") as HostBooking["policy"];
  const daysToCheckIn = differenceInCalendarDays(checkIn, now);
  const cancelledAt = booking.cancelledAt ? parseISO(booking.cancelledAt) : undefined;

  const notes: Record<HostBooking["status"], { statusNote: string; headerNote: string }> = {
    upcoming: {
      statusNote: `Check-in ${inDays(daysToCheckIn)}`,
      headerNote: `Check-in ${inDays(daysToCheckIn)} · ${format(checkIn, "EEE d MMM yyyy")}`,
    },
    active: { statusNote: `Checkout ${format(checkOut, "EEE d MMM")}`, headerNote: `Checks out ${format(checkOut, "EEE d MMM yyyy")}` },
    completed: { statusNote: "Completed", headerNote: `Checked out ${format(checkOut, "EEE d MMM yyyy")}` },
    cancelled: {
      statusNote: "Cancelled",
      headerNote: cancelledAt ? `Cancelled · ${format(cancelledAt, "EEE d MMM yyyy · h:mm a")}` : "Cancelled",
    },
  };

  return {
    id: booking._id,
    ref: bookingRef(booking._id),
    status: booking.stage,
    renter: {
      name,
      avatar: guest?.avatar ?? guest?.avatarUrl ?? "",
      completedStays: guest?.completedBookings ?? 0,
    },
    listingTitle: booking.apartment?.title ?? "Your listing",
    propertyName: booking.apartment?.title ?? "Your listing",
    location: [address?.neighbourhood, address?.city].filter(Boolean).join(", "),
    address: address?.fullAddress ?? "",
    checkIn: format(checkIn, "EEE d MMM yyyy"),
    checkOut: format(checkOut, "EEE d MMM yyyy"),
    dateRange: `${format(checkIn, "EEE d MMM")} – ${format(checkOut, "EEE d MMM yyyy")}`,
    nights,
    guests: booking.guestsCount ?? 1,
    bookedOn: booking.createdAt ? format(parseISO(booking.createdAt), "EEE d MMM yyyy") : "",
    bookingType: "Instant booking",
    policy,
    pricePerNight: booking.pricing?.pricePerNight ?? 0,
    cautionFee: booking.pricing?.cautionFee ?? 0,
    ...notes[booking.stage],
    payout: { date: format(checkIn, "EEEE d MMMM yyyy"), bank: "bank", reference: booking.payment?.reference },
    progress:
      booking.stage === "active"
        ? {
            day: Math.min(Math.max(differenceInCalendarDays(now, checkIn) + 1, 1), nights),
            totalDays: nights,
            checkedIn: format(checkIn, "EEE d MMM"),
            checksOut: format(checkOut, "EEE d MMM"),
          }
        : undefined,
    cancellation:
      booking.stage === "cancelled" && cancelledAt
        ? {
            by: "renter",
            on: format(cancelledAt, "EEE d MMM · h:mm a"),
            hoursBefore: Math.max(Math.round((checkIn.getTime() - cancelledAt.getTime()) / 36e5), 0),
            daysBefore: Math.max(differenceInCalendarDays(checkIn, cancelledAt), 0),
          }
        : undefined,
  };
}
