import { FC } from "react";
import { LucideProps } from "lucide-react";
import {
  AirVent,
  AlarmSmoke,
  BedDouble,
  Briefcase,
  Building,
  Building2,
  Car,
  CookingPot,
  Dumbbell,
  FireExtinguisher,
  Flame,
  Home,
  Laptop,
  Microwave,
  Satellite,
  ShieldPlus,
  Store,
  SunMedium,
  Tv,
  WashingMachine,
  Wifi,
} from "lucide-react";

export type ListingStep =
  | "terms"
  | "space-type"
  | "location"
  | "basics"
  | "details"
  | "photos"
  | "amenities"
  | "rules"
  | "availability"
  | "pricing"
  | "review"
  | "submitted";

export type ProgressStep = Exclude<ListingStep, "terms" | "submitted">;

// The segmented progress bar has one segment per step in this list
export const PROGRESS_STEPS: ProgressStep[] = [
  "space-type",
  "location",
  "basics",
  "details",
  "photos",
  "amenities",
  "rules",
  "availability",
  "pricing",
  "review",
];

export type SpaceType = "entire-apartment" | "private-room" | "entire-house" | "studio-flat" | "workspace" | "other";

export interface OptionItem<T extends string = string> {
  value: T;
  label: string;
  icon: FC<LucideProps>;
}

export const SPACE_TYPES: OptionItem<SpaceType>[] = [
  { value: "entire-apartment", label: "Entire apartment", icon: Building2 },
  { value: "private-room", label: "Private room", icon: BedDouble },
  { value: "entire-house", label: "Entire house", icon: Home },
  { value: "studio-flat", label: "Studio flat", icon: Building },
  { value: "workspace", label: "Workspaces", icon: Briefcase },
  { value: "other", label: "Other", icon: Store },
];

export const AMENITIES: OptionItem[] = [
  { value: "wifi", label: "Wifi", icon: Wifi },
  { value: "smart-tv", label: "Smart TV", icon: Tv },
  { value: "air-conditioning", label: "Air conditioning", icon: AirVent },
  { value: "washing-machine", label: "Washing machine", icon: WashingMachine },
  { value: "parking", label: "Parking space", icon: Car },
  { value: "solar", label: "Solar electricity", icon: SunMedium },
  { value: "workspace", label: "Dedicated workspaces", icon: Laptop },
  { value: "kitchen", label: "Kitchen", icon: CookingPot },
  { value: "first-aid", label: "First aid kit", icon: ShieldPlus },
  { value: "smoke-alarm", label: "Smoke alarm", icon: AlarmSmoke },
  { value: "microwave", label: "Microwave", icon: Microwave },
  { value: "fire-extinguisher", label: "Fire extinguisher", icon: FireExtinguisher },
  { value: "fire-pit", label: "Fire pit", icon: Flame },
  { value: "satellite", label: "Satellite TV", icon: Satellite },
  { value: "exercise-equipment", label: "Exercise equipment", icon: Dumbbell },
];

export type RuleKey = "smoking" | "parties" | "pets" | "visitors";

// A rule switched on means the thing is allowed
export const RULES: { key: RuleKey; label: string; shortLabel: string }[] = [
  { key: "smoking", label: "Smoking inside the property", shortLabel: "Smoking" },
  { key: "parties", label: "Parties or events", shortLabel: "Parties" },
  { key: "pets", label: "Pets allowed", shortLabel: "Pets" },
  { key: "visitors", label: "Visitors or additional guests", shortLabel: "Visitors" },
];

// Half-hour slots across the day, stored as "HH:mm"
export const TIME_SLOTS = Array.from({ length: 48 }, (_, i) => {
  const hours = Math.floor(i / 2);
  const minutes = i % 2 === 0 ? "00" : "30";
  return `${String(hours).padStart(2, "0")}:${minutes}`;
});

export const formatTime = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  const suffix = h < 12 ? "AM" : "PM";
  return `${h % 12 === 0 ? 12 : h % 12}:${String(m).padStart(2, "0")} ${suffix}`;
};

export type AvailabilityOption = "immediate" | "from-date" | "block-dates";

export const AVAILABILITY_OPTIONS: { value: AvailabilityOption; title: string; description: string; summary: string }[] = [
  {
    value: "immediate",
    title: "Available immediately. I will manage blocked dates from my dashboard.",
    description:
      "Your listing goes live as soon as it is approved. Block specific dates any time from your owner dashboard. Best if you are ready for bookings right away.",
    summary: "Available immediately",
  },
  {
    value: "from-date",
    title: "Available from a specific date",
    description: "Your listing appears in search results when approved but renters cannot book before your chosen date",
    summary: "Available from a specific date",
  },
  {
    value: "block-dates",
    title: "Let me block specific dates before going live",
    description: "Block dates you are unavailable before your listing is approved. Tap a date to block it. Tap again to unblock.",
    summary: "Specific dates blocked",
  },
];

export type CancellationPolicy = "flexible" | "moderate" | "strict";

export const CANCELLATION_POLICIES: {
  value: CancellationPolicy;
  title: string;
  badge: string;
  badgeClassName: string;
  description: string;
  rule: string;
}[] = [
  {
    value: "flexible",
    title: "Flexible",
    badge: "Recommended",
    badgeClassName: "bg-primary-containers text-primary",
    description:
      "Cancel at least 24 hours before check in to receive a full rent refund. This option suits most listings and gives guests confidence to book.",
    rule: "Guest cancels 24hrs+ before check-in → full refund. Less than 24hrs → no refund.",
  },
  {
    value: "moderate",
    title: "Moderate",
    badge: "Balanced",
    badgeClassName: "bg-[#F7F4EC] text-[#9A7B3F]",
    description: "Cancel 72 hours before check-in for a 50% refund. A balanced approach that protects both you and your guest.",
    rule: "Guest cancels 72hrs+ before check-in → 50% refund. Less than 72hrs → no refund.",
  },
  {
    value: "strict",
    title: "Strict",
    badge: "No refund",
    badgeClassName: "bg-red-50 text-red-600",
    description:
      "No refund after booking is confirmed regardless of when the guest cancels. Use this only if your space has very high demand or limited availability.",
    rule: "Any cancellation after booking → no refund.",
  },
];

export const COMMISSION_RATE = 0.1;
// Placeholder until the backend calculates the caution fee from the booking value
export const CAUTION_FEE = 10000;
export const LAUNCH_DISCOUNTS = [10, 15, 20, 25];
export const LAUNCH_DURATIONS = [
  { value: "first-3", label: "First 3 bookings" },
  { value: "first-5", label: "First 5 bookings" },
  { value: "30-days", label: "First 30 days" },
];

// One photo is enough to continue; the copy still recommends at least five
export const MIN_PHOTOS = 1;
export const RECOMMENDED_PHOTOS = 5;

export interface ListingPhoto {
  id: string;
  // Photos already saved on a listing only have a url
  file?: File;
  url: string;
}

export interface ListingDraft {
  spaceType: SpaceType | null;
  city: string;
  neighbourhood: string;
  address: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  beds: number;
  title: string;
  description: string;
  photos: ListingPhoto[];
  amenities: string[];
  checkIn: string;
  checkOut: string;
  rules: Record<RuleKey, boolean>;
  additionalRules: string;
  availability: AvailabilityOption | null;
  availableFrom?: Date;
  blockedDates: Date[];
  price: number | null;
  launchOffer: boolean;
  launchDiscount: number;
  launchDuration: string;
  cancellationPolicy: CancellationPolicy;
}

export const INITIAL_DRAFT: ListingDraft = {
  spaceType: null,
  city: "",
  neighbourhood: "",
  address: "",
  guests: 2,
  bedrooms: 2,
  bathrooms: 2,
  beds: 2,
  title: "",
  description: "",
  photos: [],
  amenities: [],
  checkIn: "14:00",
  checkOut: "11:00",
  rules: { smoking: false, parties: false, pets: false, visitors: false },
  additionalRules: "",
  availability: null,
  blockedDates: [],
  price: null,
  launchOffer: false,
  launchDiscount: 15,
  launchDuration: "first-3",
  cancellationPolicy: "flexible",
};

// Every step receives the draft and a partial updater, mirroring react-hook-form's setValue
export interface StepProps {
  draft: ListingDraft;
  update: (patch: Partial<ListingDraft>) => void;
}
