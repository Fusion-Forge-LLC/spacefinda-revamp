import { INITIAL_DRAFT, type ListingDraft } from "@/components/create-listing/types";

export const DUMMY_PROPERTIES = [
  {
    id: "1",
    image: "/images/listing-1.png",
    title: "Cosy 2-bed Apartment, Bodija...",
    location: "Bodija · 2 guests · Entire apartment",
    amenities: [
      { icon: "/icons/wifi.svg", label: "Wifi" },
      { icon: "/icons/power.svg", label: "Power" },
      { icon: "/icons/garage.svg", label: "Garage" },
    ],
    price: "₦120,000",
    rating: 4.5,
    reviews: 120,
  },
  {
    id: "2",
    image: "/images/listing-2.png",
    title: "Cosy 2-bed Apartment, Bodija...",
    location: "Bodija · 2 guests · Entire apartment",
    amenities: [
      { icon: "/icons/wifi.svg", label: "Wifi" },
      { icon: "/icons/power.svg", label: "Power" },
      { icon: "/icons/garage.svg", label: "Garage" },
    ],
    price: "₦120,000",
    rating: 4.5,
    reviews: 120,
  },
  {
    id: "3",
    image: "/images/listing-3.png",
    title: "Cosy 2-bed Apartment, Bodija...",
    location: "Bodija · 2 guests · Entire apartment",
    amenities: [
      { icon: "/icons/wifi.svg", label: "Wifi" },
      { icon: "/icons/power.svg", label: "Power" },
      { icon: "/icons/garage.svg", label: "Garage" },
    ],
    price: "₦120,000",
    rating: 4.5,
    reviews: 120,
  },
  {
    id: "4",
    image: "/images/listing-4.png",
    title: "Cosy 3-bed Apartment, Bodija...",
    location: "Bodija · 2 guests · Entire apartment",
    amenities: [
      { icon: "/icons/wifi.svg", label: "Wifi" },
      { icon: "/icons/power.svg", label: "Power" },
      { icon: "/icons/garage.svg", label: "Garage" },
    ],
    price: "₦120,000",
    rating: 4.5,
    reviews: 120,
  },
];
export const DUMMY_USER = {
  name: "Odujebe Pelumi",
  avatar: "/images/profile/425a32c0973170d750514947064f636e2aeef239.jpg",
  memberSince: "February 2026",
  bio: "",
  email: "pelumi2349@gmail.com",
  phone: "",
  stats: [
    { label: "Completed stays", value: 4 },
    { label: "Nights stayed", value: 12 },
    { label: "Reviews received", value: 2 },
  ],
  verificationStatus: "not-submitted" as "not-submitted" | "pending" | "verified",
};

export const DUMMY_HOST_REVIEWS = [
  {
    id: "1",
    host: "Taiwo Adeyemi",
    avatar: "/images/profile/81b5fea648eba2a75d270f261bd259114c668e29.jpg",
    property: "Cosy 2-bed Apartment, Bodija",
    date: "Mar 2026",
    rating: 5,
    comment:
      "Odujebe was a wonderful guest. Clear communication before arrival, respected all house rules, and left the apartment in excellent condition. Would welcome him back anytime.",
  },
  {
    id: "2",
    host: "Kunle Adebayo",
    avatar: "/images/profile/ca043b1ef4cc927e1a5be6a5e0fabaf1b067fd6d.jpg",
    property: "Modern Studio, Ring Road",
    date: "Feb 2026",
    rating: 5,
    comment:
      "Very respectful guest. Arrived on time, kept the space tidy, and was easy to communicate with throughout. No issues at all. Highly recommend.",
  },
];

export type PaymentStatus = "upcoming" | "completed" | "cancelled";

export const DUMMY_PAYMENTS = [
  {
    id: "SFB-2026-00391",
    property: "Cosy 2-bed Apartment, Bodija",
    propertyFullName: "Modern 2-Bedroom Apartment in Bodija",
    address: "Bodija, Ibadan, Oyo State",
    checkIn: "Tue 7 Apr, 2026",
    checkOut: "Sun 12 Apr, 2026",
    dateRange: "Tue 7 Apr – Sun 12 Apr 2026",
    nights: 5,
    guests: 2,
    status: "upcoming" as PaymentStatus,
    pricePerNight: 120000,
    cautionFee: 10000,
    issuedAt: "4 Apr 2026 · 11:02 AM",
    paymentMethod: "Debit card ending 4521",
    paymentDate: "Sat 4 Apr 2026 · 2:14 PM",
    processor: "Paystack",
    transactionRef: "PSK-TXN-20260205-8A4C2F",
    receiptNumber: "RCP-2026-00391",
    bookingReference: "SFB-2026-00847",
    host: "Taiwo Adeyemi",
  },
  {
    id: "SFB-2026-00392",
    property: "Executive flat, Agodi GRA",
    propertyFullName: "Executive Flat in Agodi GRA",
    address: "Agodi GRA, Ibadan, Oyo State",
    checkIn: "Tue 7 Apr, 2026",
    checkOut: "Sun 12 Apr, 2026",
    dateRange: "Tue 7 Apr – Sun 12 Apr 2026",
    nights: 5,
    guests: 2,
    status: "completed" as PaymentStatus,
    pricePerNight: 70000,
    cautionFee: 10000,
    issuedAt: "2 Mar 2026 · 9:40 AM",
    paymentMethod: "Debit card ending 4521",
    paymentDate: "Mon 2 Mar 2026 · 9:38 AM",
    processor: "Paystack",
    transactionRef: "PSK-TXN-20260302-3B9D1E",
    receiptNumber: "RCP-2026-00392",
    bookingReference: "SFB-2026-00712",
    host: "Kunle Adebayo",
  },
  {
    id: "SFB-2026-00393",
    property: "Cosy 2-bed Apartment, Bodija",
    propertyFullName: "Modern 2-Bedroom Apartment in Bodija",
    address: "Bodija, Ibadan, Oyo State",
    checkIn: "Tue 7 Apr, 2026",
    checkOut: "Sun 12 Apr, 2026",
    dateRange: "Tue 7 Apr – Sun 12 Apr 2026",
    nights: 5,
    guests: 2,
    status: "cancelled" as PaymentStatus,
    pricePerNight: 70000,
    cautionFee: 10000,
    issuedAt: "10 Feb 2026 · 4:15 PM",
    paymentMethod: "Debit card ending 4521",
    paymentDate: "Tue 10 Feb 2026 · 4:12 PM",
    processor: "Paystack",
    transactionRef: "PSK-TXN-20260210-7F2A0C",
    receiptNumber: "RCP-2026-00393",
    bookingReference: "SFB-2026-00655",
    host: "Taiwo Adeyemi",
  },
];

export type Payment = (typeof DUMMY_PAYMENTS)[number];

export type CardBrand = "mastercard" | "visa" | "verve";

export interface SavedCard {
  id: string;
  brand: CardBrand;
  last4: string;
  expiry: string;
  name: string;
}

export const DUMMY_SAVED_CARDS: SavedCard[] = [];

// ---- Host dashboard ----
// Which stage of the host journey the overview shows by default (the preview switcher overrides it):
//   "new"         nothing published yet: three setup cards
//   "setup"       first listing in progress: navy "isn't live yet" banner
//   "live"        listing live, nothing urgent
//   "live-alerts" listing live, with a damage-claim window closing and no bank account yet
export const HOST_STAGES = ["new", "setup", "live", "live-alerts"] as const;
export type HostStage = (typeof HOST_STAGES)[number];
// The overview's dev preview switcher stores the chosen stage in this cookie
export const HOST_STAGE_COOKIE = "sf-host-stage";

export type HostBank = { accountName: string; bankName: string; last4: string };
const HOST_STAGE = "new" as HostStage;

const PENDING_DAMAGE_CLAIM = {
  renter: "Adewale Okonkwo",
  property: "Cosy 2-bed Apartment, Bodija",
  checkedOut: "Sunday 19 April",
  deadline: "Tuesday 21 April at 10:02 AM",
  hoursRemaining: 23,
  cautionFee: 5000,
};

// What the host has done so far at each stage
export function getHostStageFlags(stage: HostStage) {
  const isLive = stage === "live" || stage === "live-alerts";
  return {
    hasLiveListing: isLive,
    isVerified: isLive,
    hasBank: stage === "live",
    pendingDamageClaim: stage === "live-alerts" ? PENDING_DAMAGE_CLAIM : null,
  };
}

export const DUMMY_HOST = {
  name: "Taiwo",
  avatar: "/images/listings/taiwo-adeyemi.jpg",
  email: "odujebep@gmail.com",
  stage: HOST_STAGE,
  setup: { listingTitle: "Bodija Studio", draftTitle: "Cosy 2-bed Apartment, Bodija", location: "Bodija, Ibadan", stepsComplete: 2, totalSteps: 10 },
  bank: { accountName: "Odujebe Pelumi", bankName: "GTBank", last4: "6106" } as HostBank,
};

// Owner profile and personal details shown on /host/profile
export const DUMMY_HOST_PROFILE = {
  name: "Odujebe Pelumi",
  location: "Ibadan, Oyo",
  email: DUMMY_HOST.email,
  phone: "+234 816 592 2994",
  dateOfBirth: "",
  address: "",
};

// Payout accounts in account settings. `bank` matches an entry in NIGERIAN_BANKS so the edit form can preselect it
export type HostPayoutAccount = { id: string; bank: string; accountNumber: string; accountName: string };

export const DUMMY_HOST_PAYOUT_ACCOUNTS: HostPayoutAccount[] = [
  { id: "1", bank: "Guaranty Trust Bank", accountNumber: "0170894821", accountName: "Odujebe Pelumi" },
];

// Requests the host has sent to support, listed under Help & support → My requests
export type SupportRequestStatus = "open" | "review" | "resolved";

export const DUMMY_HOST_SUPPORT_REQUESTS: {
  reference: string;
  topic: string;
  subject: string;
  date: string;
  status: SupportRequestStatus;
  update: string;
}[] = [
  {
    reference: "BCR-2026-00042",
    topic: "Bank account change",
    subject: "Change payout account to Zenith Bank",
    date: "18 Apr 2026",
    status: "review",
    update: "We're verifying your new account against your BVN. Expect an update within 2 to 3 business days.",
  },
  {
    reference: "SUP-2026-00317",
    topic: "Payout",
    subject: "Payout for SFB-2026-00698 not received",
    date: "16 Mar 2026",
    status: "resolved",
    update: "Your bank delayed the transfer. The payout reached your account on 17 Mar 2026.",
  },
  {
    reference: "SUP-2026-00288",
    topic: "Listing",
    subject: "Photos not showing on Executive Flat, Agodi GRA",
    date: "2 Mar 2026",
    status: "resolved",
    update: "We re-processed your photos and they now show on your listing.",
  },
];

export const DUMMY_HOST_STATS = {
  totalEarned: 382500,
  earnedThisMonth: 90000,
  totalBookings: 11,
  bookingsThisMonth: 3,
  occupancyRate: 64,
  occupancyChange: 12,
  averageRating: 4.9,
  reviewCount: 8,
  listingCount: 2,
};

export type HostBookingStatus = "upcoming" | "active" | "completed" | "cancelled";

export interface HostBooking {
  ref: string;
  status: HostBookingStatus;
  renter: { name: string; avatar: string; completedStays: number; rating: number };
  listingTitle: string;
  propertyName: string;
  location: string;
  address: string;
  checkIn: string;
  checkOut: string;
  dateRange: string;
  nights: number;
  guests: number;
  bookedOn: string;
  bookingType: string;
  policy: "Flexible" | "Moderate" | "Strict";
  pricePerNight: number;
  cautionFee: number;
  // Short label shown on the list row pill and the detail header
  statusNote: string;
  headerNote: string;
  payout: { date: string; bank: string; reference?: string };
  progress?: { day: number; totalDays: number; checkedIn: string; checksOut: string };
  cautionReturnedOn?: string;
  claimWindowClosedOn?: string;
  cancellation?: { by: string; on: string; hoursBefore: number; daysBefore: number };
  review?: { date: string; rating: number; comment: string };
}

const RENTER = {
  name: "Adewale Okonkwo",
  avatar: "/images/profile/81b5fea648eba2a75d270f261bd259114c668e29.jpg",
  completedStays: 3,
  rating: 5.0,
};

const BOOKING_BASE = {
  renter: RENTER,
  listingTitle: "Cosy 2-bed Apartment, Bodija",
  propertyName: "Cosy 2 bedroom Apartment",
  location: "Bodija, Ibadan",
  address: "14 Akinola Close, Bodija Estate, Ibadan, Oyo State",
  nights: 2,
  bookingType: "Instant booking",
  policy: "Flexible" as const,
  pricePerNight: 50000,
  cautionFee: 10000,
};

export const DUMMY_HOST_BOOKINGS: HostBooking[] = [
  {
    ...BOOKING_BASE,
    ref: "SFB-2026-00901",
    status: "upcoming",
    checkIn: "Sat 26 Apr 2026",
    checkOut: "Mon 28 Apr 2026",
    dateRange: "Sat 26 Apr – Mon 28 Apr 2026",
    guests: 2,
    bookedOn: "Thu 23 Apr 2026",
    statusNote: "Check-in in 2 days",
    headerNote: "Check-in in 2 days · Sat 26 Apr 2026",
    payout: { date: "Saturday 26 April 2026", bank: "Zenith Bank" },
  },
  {
    ...BOOKING_BASE,
    ref: "SFB-2026-00902",
    status: "upcoming",
    checkIn: "Sat 4 May 2026",
    checkOut: "Mon 6 May 2026",
    dateRange: "Sat 4 May – Mon 6 May 2026",
    guests: 2,
    bookedOn: "Fri 24 Apr 2026",
    statusNote: "Check-in in 10 days",
    headerNote: "Check-in in 10 days · Sat 4 May 2026",
    payout: { date: "Saturday 4 May 2026", bank: "Zenith Bank" },
  },
  {
    ...BOOKING_BASE,
    ref: "SFB-2026-00903",
    status: "upcoming",
    checkIn: "Wed 6 May 2026",
    checkOut: "Fri 8 May 2026",
    dateRange: "Wed 6 May – Fri 8 May 2026",
    guests: 3,
    bookedOn: "Fri 24 Apr 2026",
    statusNote: "Check-in in 12 days",
    headerNote: "Check-in in 12 days · Wed 6 May 2026",
    payout: { date: "Wednesday 6 May 2026", bank: "Zenith Bank" },
  },
  {
    ...BOOKING_BASE,
    ref: "SFB-2026-00900",
    status: "active",
    checkIn: "Fri 28 Mar · 2:15 PM",
    checkOut: "Sun 30 Mar · 11:00 AM",
    dateRange: "Fri 28 Mar – Sun 30 Mar 2026",
    guests: 2,
    bookedOn: "Tue 25 Mar 2026",
    statusNote: "Checkout Sun 30 Mar",
    headerNote: "Checks out Sun 30 Mar 2026 · Tomorrow",
    payout: { date: "Fri 28 Mar 2026", bank: "Zenith Bank", reference: "PSK-TXN-2026-0328-4F1A" },
    progress: { day: 1, totalDays: 2, checkedIn: "Fri 28 Mar", checksOut: "Sun 30 Mar · 11:00 AM" },
  },
  {
    ...BOOKING_BASE,
    ref: "SFB-2026-00899",
    status: "completed",
    checkIn: "Fri 6 Feb 2026",
    checkOut: "Sun 8 Feb 2026",
    dateRange: "Fri 6 Feb – Sun 8 Feb 2026",
    guests: 3,
    bookedOn: "Wed 4 Feb 2026",
    statusNote: "Completed · Payout released",
    headerNote: "Checked out Sun 8 Feb 2026",
    payout: { date: "Fri 6 Feb 2026", bank: "Zenith Bank", reference: "PSK-TXN-2026-0206-2C8B" },
    cautionReturnedOn: "10 Feb 2026",
    claimWindowClosedOn: "10 Feb 2026",
    review: {
      date: "8 Feb 2026",
      rating: 5,
      comment:
        "Really clean and comfortable space. Everything was exactly as described. The host was responsive and the whole booking process was smooth. Would definitely stay again.",
    },
  },
  {
    ...BOOKING_BASE,
    ref: "SFB-2026-00898",
    status: "cancelled",
    checkIn: "Thu 19 Mar 2026",
    checkOut: "Sat 21 Mar 2026",
    dateRange: "Thu 19 Mar – Sat 21 Mar 2026",
    guests: 3,
    bookedOn: "Mon 16 Mar 2026",
    statusNote: "Cancelled by renter · Full refund",
    headerNote: "Cancelled by renter · Mon 17 Mar 2026 · 9:44 AM",
    payout: { date: "", bank: "Zenith Bank" },
    cancellation: { by: "renter", on: "Mon 17 Mar · 9:44 AM", hoursBefore: 50, daysBefore: 2 },
  },
];

export type HostListingStatus = "live" | "paused" | "review" | "draft";

export interface HostListing {
  id: string;
  title: string;
  image: string;
  status: HostListingStatus;
  location: string;
  beds: number;
  guests: number;
  pricePerNight: number;
  // Short line used on the overview card
  meta: string;
  stats?: { rating: number; reviews: number; bookings: number; views: number; saves: number };
  submittedOn?: string;
  draft?: { lastEdited: string; step: number; totalSteps: number; stepName: string };
}

export const DUMMY_HOST_LISTINGS: HostListing[] = [
  {
    id: "cosy-2-bed-bodija",
    title: "Cosy 2-bed Apartment, Bodija",
    image: "/images/listings/cozy-living-room.jpg",
    status: "live",
    location: "Bodija, Ibadan",
    beds: 2,
    guests: 2,
    pricePerNight: 120000,
    meta: "7 total bookings",
    stats: { rating: 4.9, reviews: 48, bookings: 18, views: 342, saves: 11 },
  },
  {
    id: "executive-flat-agodi",
    title: "Executive Flat, Agodi GRA",
    image: "/images/listings/sunlit-lounge.jpg",
    status: "review",
    location: "Agodi, Ibadan",
    beds: 2,
    guests: 2,
    pricePerNight: 120000,
    meta: "Submitted 18 Apr · Under SpaceFinda review",
    submittedOn: "18 Apr",
  },
  {
    id: "modern-studio-ring-road",
    title: "Modern Studio, Ring Road",
    image: "/images/listings/cozy-bedroom.jpg",
    status: "draft",
    location: "Ring Road, Ibadan",
    beds: 2,
    guests: 2,
    pricePerNight: 120000,
    meta: "Draft · Stopped at Step 4 of 10",
    draft: { lastEdited: "15 Apr", step: 4, totalSteps: 10, stepName: "Title and description" },
  },
];

export type HostActivityType = "booking" | "payout" | "review" | "message";

export const DUMMY_HOST_ACTIVITY: { id: string; type: HostActivityType; title: string; time: string }[] = [
  { id: "1", type: "booking", title: "New booking confirmed — Adewale O., Mar 29–31", time: "Today · 10:42 AM" },
  { id: "2", type: "payout", title: "Payout of ₦63,000 released to your account", time: "Yesterday · 9:01 AM" },
  { id: "3", type: "review", title: "Kunle A. left you a 5-star review", time: "26 Mar · 3:15 PM" },
  { id: "4", type: "message", title: "Kemi F. sent you a message about her booking", time: "25 Mar · 11:30 AM" },
];

// Availability calendar for the selected listing, as day offsets from today so the demo always shows current dates
export const DUMMY_AVAILABILITY = {
  booked: [
    { offset: 1, renter: "Pelumi O." },
    { offset: 2, renter: "Bola A." },
    { offset: 3, renter: "Bola A." },
  ],
  blocked: [4, 5],
  rules: { nightlyRate: 45000, minStay: 1, maxStay: 30 },
};

export interface HostPayout {
  checkInDate: string;
  property: string;
  renter: string;
  reference: string;
  amount: number;
  status: "upcoming" | "paid";
}

export const DUMMY_PAYOUT_SUMMARY = {
  totalEarned: 1300000,
  thisMonth: 550000,
  monthChange: 18,
  pendingRelease: 200000,
};

export const DUMMY_HOST_PAYOUTS: HostPayout[] = [
  { checkInDate: "30 Apr 2026", property: "Cosy 2-bed, Bodija", renter: "Adewale Okonkwo", reference: "SFB-2026-00847", amount: 100000, status: "upcoming" },
  { checkInDate: "29 Apr 2026", property: "Executive Flat, Agodi GRA", renter: "Adewale Okonkwo", reference: "SFB-2026-00761", amount: 100000, status: "upcoming" },
  { checkInDate: "11 Apr 2026", property: "Cosy 2-bed, Bodija", renter: "Adewale Okonkwo", reference: "SFB-2026-00847", amount: 300000, status: "paid" },
  { checkInDate: "05 Apr 2026", property: "Executive Flat, Agodi GRA", renter: "Adewale Okonkwo", reference: "SFB-2026-00812", amount: 250000, status: "paid" },
  { checkInDate: "29 Mar 2026", property: "Executive Flat, Agodi GRA", renter: "Adewale Okonkwo", reference: "SFB-2026-00761", amount: 450000, status: "paid" },
  { checkInDate: "15 Mar 2026", property: "Executive Flat, Agodi GRA", renter: "Adewale Okonkwo", reference: "SFB-2026-00698", amount: 300000, status: "paid" },
];

export const NIGERIAN_BANKS = [
  "Access Bank",
  "Fidelity Bank",
  "First Bank of Nigeria",
  "First City Monument Bank",
  "Guaranty Trust Bank",
  "Kuda Bank",
  "Moniepoint MFB",
  "OPay",
  "Stanbic IBTC Bank",
  "Sterling Bank",
  "Union Bank",
  "United Bank for Africa",
  "Wema Bank",
  "Zenith Bank",
];

export type DamageClaimStatus = "review" | "approved" | "rejected";

export interface DamageClaim {
  id: string;
  bookingRef: string;
  renter: string;
  property: string;
  checkedOut: string;
  amount: number;
  description: string;
  photos: string[];
  submittedOn: string;
  status: DamageClaimStatus;
  outcome?: string;
}

const CLAIM_PHOTOS = ["/images/listings/cozy-bedroom.jpg", "/images/listings/sunlit-lounge.jpg", "/images/listing-1.png", "/images/listing-2.png"];

export const DUMMY_DAMAGE_CLAIMS: DamageClaim[] = [
  {
    id: "CLM-2026-0012",
    bookingRef: "SFB-2026-00847",
    renter: "Adewale Okonkwo",
    property: "Cosy 2-bed Apartment",
    checkedOut: "30 Mar",
    amount: 8000,
    description: "Broken bathroom mirror and scratched kitchen counter surface.",
    photos: CLAIM_PHOTOS,
    submittedOn: "30 Mar",
    status: "review",
  },
  {
    id: "CLM-2026-0013",
    bookingRef: "SFB-2026-00848",
    renter: "Chidi Nwosu",
    property: "Cosy 2-bed Apartment",
    checkedOut: "30 Mar",
    amount: 8000,
    description: "Broken bathroom mirror and scratched kitchen counter surface.",
    photos: CLAIM_PHOTOS,
    submittedOn: "30 Mar",
    status: "review",
  },
  {
    id: "CLM-2026-0009",
    bookingRef: "SFB-2026-00781",
    renter: "Adewale Okonkwo",
    property: "Cosy 2-bed Apartment",
    checkedOut: "30 Mar",
    amount: 10000,
    description: "Damage or condition remote section window blind in the master bedroom.",
    photos: CLAIM_PHOTOS,
    submittedOn: "30 Mar",
    status: "approved",
    outcome: "Claim approved · ₦10,000 paid out",
  },
  {
    id: "CLM-2026-0007",
    bookingRef: "SFB-2026-00761",
    renter: "Adewale Okonkwo",
    property: "Cosy 2-bed Apartment",
    checkedOut: "30 Mar",
    amount: 10000,
    description: "Claim damage to the kitchen tab · Admin found insufficient evidence to support the claim.",
    photos: CLAIM_PHOTOS,
    submittedOn: "30 Mar",
    status: "rejected",
    outcome: "Claim rejected · Insufficient evidence",
  },
];

// Completed bookings still inside their 48-hour claim window
export const DUMMY_CLAIMABLE_BOOKINGS = [
  { ref: "SFB-2026-00905", label: "Adewale Okonkwo · Cosy 2-bed Apartment, Bodija · Checked out 19 Apr" },
  { ref: "SFB-2026-00906", label: "Kemi Fashola · Executive Flat, Agodi GRA · Checked out 20 Apr" },
];

// Saved listing loaded into the edit form; photos already uploaded only have a url
export const DUMMY_LISTING_DRAFT: ListingDraft = {
  ...INITIAL_DRAFT,
  spaceType: "entire-apartment",
  city: "Ibadan",
  neighbourhood: "Akala Express",
  address: "No 6, Adegbolu behind Energy switch filing station, Akala Express",
  title: "Cosy 2 bed apartment bodija",
  description:
    "A peaceful and calm apartment designed for comfort and quiet living, with soft natural light, minimal noise, and a relaxing atmosphere that helps you unwind and feel at ease.",
  photos: ["/images/listings/cozy-bedroom.jpg", "/images/listings/sunlit-lounge.jpg", "/images/listings/cozy-living-room.jpg", "/images/listing-1.png", "/images/listing-2.png"].map(
    (url, i) => ({ id: `photo-${i}`, url })
  ),
  amenities: ["wifi", "smart-tv", "air-conditioning", "washing-machine", "parking", "solar", "workspace", "kitchen", "first-aid", "smoke-alarm", "microwave", "fire-extinguisher", "satellite", "exercise-equipment"],
  checkIn: "12:00",
  checkOut: "12:00",
  rules: { smoking: false, parties: false, pets: true, visitors: true },
  additionalRules: "Hard drugs and weapons are not allowed",
  availability: "from-date",
  availableFrom: new Date(2026, 3, 25),
  price: 100000,
  launchOffer: true,
};

export interface ConversationMessage {
  id: string;
  from: "renter" | "host";
  text: string;
  // Separator label for the day the message was sent, e.g. "Saturday, 11 April 2026"
  day: string;
  time: string;
}

export interface HostConversation {
  id: string;
  renter: { name: string; avatar: string; phone: string; respondsIn: string; online: boolean };
  booking: { ref: string; listingTitle: string; dates: string; dateRange: string; nights: number; amount: number; status: HostBookingStatus };
  lastMessageAt: string;
  unread: number;
  messages: ConversationMessage[];
}

const PROFILE = "/images/profile";

// Messaging opens once a booking is paid and confirmed, so every conversation belongs to a booking
export const DUMMY_CONVERSATIONS: HostConversation[] = [
  {
    id: "c1",
    renter: { name: "Taiwo Adeyemi", avatar: `${PROFILE}/81b5fea648eba2a75d270f261bd259114c668e29.jpg`, phone: "+234 801 234 5678", respondsIn: "Responds in ~1 hour", online: true },
    booking: {
      ref: "SFB-2026-00901",
      listingTitle: "Cosy 2-bed Apartment, Bodija",
      dates: "Apr 26–28",
      dateRange: "Apr 26 – Apr 28, 2026",
      nights: 2,
      amount: 120000,
      status: "upcoming",
    },
    lastMessageAt: "2 min ago",
    unread: 1,
    messages: [
      {
        id: "m1",
        from: "renter",
        text: "Hi, I just completed my booking. Looking forward to my stay. Could you let me know what time works best for check-in and if there is parking available?",
        day: "Saturday, 11 April 2026",
        time: "2:17 PM",
      },
      {
        id: "m2",
        from: "host",
        text: "Hi Taiwo! Welcome and thank you for booking. Check-in is from 2PM on Saturday. Yes there is a dedicated parking spot in the compound. I will be available to let you in personally.",
        day: "Saturday, 11 April 2026",
        time: "2:25 PM",
      },
      { id: "m3", from: "renter", text: "That is great to hear. I will be arriving around 3PM. See you then.", day: "Today, 13 April 2026", time: "8:15 AM" },
      { id: "m4", from: "host", text: "Alright. I'd be expecting you.", day: "Today, 13 April 2026", time: "8:20 AM" },
      { id: "m5", from: "renter", text: "Thanks! Is there anything I should bring along, like towels or toiletries?", day: "Today, 13 April 2026", time: "8:42 AM" },
    ],
  },
  {
    id: "c2",
    renter: { name: "Kehinde Osula", avatar: `${PROFILE}/ca043b1ef4cc927e1a5be6a5e0fabaf1b067fd6d.jpg`, phone: "+234 803 555 0192", respondsIn: "Responds in ~3 hours", online: false },
    booking: {
      ref: "SFB-2026-00899",
      listingTitle: "Cosy 2-bed Apartment, Bodija",
      dates: "Feb 6–8",
      dateRange: "Feb 6 – Feb 8, 2026",
      nights: 2,
      amount: 100000,
      status: "completed",
    },
    lastMessageAt: "2 hours ago",
    unread: 0,
    messages: [
      { id: "m1", from: "renter", text: "Just checked out. Thanks for having me, the place was spotless.", day: "Sunday, 8 February 2026", time: "11:04 AM" },
      {
        id: "m2",
        from: "host",
        text: "Hope you enjoyed your stay. The caution fee has been released back to you. Let me know whenever you are back in Ibadan.",
        day: "Tuesday, 10 February 2026",
        time: "9:30 AM",
      },
    ],
  },
  {
    id: "c3",
    renter: { name: "Adebanjo Josephine", avatar: `${PROFILE}/425a32c0973170d750514947064f636e2aeef239.jpg`, phone: "+234 812 777 4410", respondsIn: "Responds in ~1 hour", online: false },
    booking: {
      ref: "SFB-2026-00898",
      listingTitle: "Cosy 2-bed Apartment, Bodija",
      dates: "Mar 19–21",
      dateRange: "Mar 19 – Mar 21, 2026",
      nights: 2,
      amount: 100000,
      status: "cancelled",
    },
    lastMessageAt: "Yesterday",
    unread: 0,
    messages: [
      { id: "m1", from: "renter", text: "Sorry, I had to cancel. Something came up at work and I can't travel that weekend.", day: "Tuesday, 17 March 2026", time: "9:50 AM" },
      { id: "m2", from: "host", text: "Thank you for understanding. I hope the dates get filled.", day: "Tuesday, 17 March 2026", time: "10:12 AM" },
    ],
  },
];

export interface ListingReview {
  id: string;
  listingId: string;
  listingTitle: string;
  renter: { name: string; avatar: string };
  date: string;
  rating: number;
  comment: string;
  reply?: string;
}

// Rating counts per listing, highest star first. The reviews below are only the most recent few
export const DUMMY_REVIEWED_LISTINGS = [
  { id: "cosy-2-bed-bodija", label: "Cosy 2-bed, Bodija", distribution: [34, 4, 0, 0, 0] },
  { id: "executive-flat-agodi", label: "Executive flat, Agodi GRA", distribution: [9, 1, 0, 0, 0] },
];

const REVIEW_COMMENT =
  "Absolutely lovely space. Taiwo was very responsive and the apartment was exactly as described. The generator came on immediately when NEPA went and the AC was ice cold. Will definitely book again.";
const REVIEW_REPLY = "Thank you so much Adewale. It was a pleasure hosting you. Looking forward to your next visit!";

export const DUMMY_LISTING_REVIEWS: ListingReview[] = [
  {
    id: "r1",
    listingId: "cosy-2-bed-bodija",
    listingTitle: "Cosy 2-bed Apartment, Bodija",
    renter: { name: "Adewale Okonkwo", avatar: `${PROFILE}/81b5fea648eba2a75d270f261bd259114c668e29.jpg` },
    date: "29 Mar 2026",
    rating: 5,
    comment: REVIEW_COMMENT,
    reply: REVIEW_REPLY,
  },
  {
    id: "r2",
    listingId: "cosy-2-bed-bodija",
    listingTitle: "Cosy 2-bed Apartment, Bodija",
    renter: { name: "Fatima Abubakar", avatar: `${PROFILE}/ca043b1ef4cc927e1a5be6a5e0fabaf1b067fd6d.jpg` },
    date: "11 Apr 2026",
    rating: 5,
    comment: REVIEW_COMMENT,
    reply: REVIEW_REPLY,
  },
  {
    id: "r3",
    listingId: "executive-flat-agodi",
    listingTitle: "Executive flat, Agodi GRA",
    renter: { name: "Christiana Hammed", avatar: `${PROFILE}/425a32c0973170d750514947064f636e2aeef239.jpg` },
    date: "05 Apr 2026",
    rating: 5,
    comment: REVIEW_COMMENT,
  },
];

// ---- Host insights ----
export const INSIGHT_PERIODS = ["month", "3-months", "6-months", "year"] as const;
export type InsightPeriod = (typeof INSIGHT_PERIODS)[number];

export type DemandLevel = "low" | "medium" | "high" | "peak";

export interface InsightListingRow {
  title: string;
  status: HostListingStatus;
  views: number;
  saves: number;
  bookings: number;
  revenue: number;
}

export interface HostInsights {
  stats: { views: number; viewsChange: number; saves: number; savesChange: number; conversion: number; revenue: number; revenueChange: number };
  chartLabel: string;
  // Host's 90% share per month; null means the month hasn't happened yet
  earnings: { month: string; amount: number | null }[];
  listings: InsightListingRow[];
  funnel: { impressions: number; pageViews: number; bookings: number; note: string };
  // Share of nights booked for each week, 0 to 100
  occupancy: { month: string; weeks: number[] }[];
  occupancyRange: string;
  occupancyNote: string;
  reviewTrend: { month: string; rating: number }[];
}

const EARNINGS_2026 = [
  { month: "Jan", amount: 120000 },
  { month: "Feb", amount: 200000 },
  { month: "Mar", amount: 300000 },
  { month: "Apr", amount: 400000 },
  ...["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month) => ({ month, amount: null })),
];

const OCCUPANCY_2026 = [
  { month: "Jan", weeks: [30, 15, 0, 0] },
  { month: "Feb", weeks: [100, 100, 60, 100] },
  { month: "Mar", weeks: [30, 60, 60, 100] },
  { month: "Apr", weeks: [100, 100, 60, 30] },
  ...["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month) => ({ month, weeks: [0, 0, 0, 0] })),
];

const REVIEW_TREND = [
  { month: "Dec", rating: 4.9 },
  { month: "Jan", rating: 5.0 },
  { month: "Feb", rating: 4.9 },
  { month: "Mar", rating: 4.8 },
  { month: "Apr", rating: 4.9 },
];

const months = <T extends { month: string }>(series: T[], from: string, to: string) =>
  series.slice(series.findIndex((m) => m.month === from), series.findIndex((m) => m.month === to) + 1);

const FUNNEL_NOTE =
  "Over 3 months your conversion funnel is consistent and healthy. The booking rate suggests renters find your pricing and listing details compelling.";

export const DUMMY_HOST_INSIGHTS: Record<InsightPeriod, HostInsights> = {
  month: {
    stats: { views: 240, viewsChange: 42, saves: 29, savesChange: 8, conversion: 4.6, revenue: 550000, revenueChange: 54000 },
    chartLabel: "1 year",
    earnings: EARNINGS_2026,
    listings: [
      { title: "Cosy 2-bed, Bodija", status: "live", views: 142, saves: 18, bookings: 7, revenue: 300000 },
      { title: "Executive Flat, Agodi GRA", status: "live", views: 98, saves: 11, bookings: 4, revenue: 250000 },
      { title: "Modern Studio, Ring Road", status: "review", views: 0, saves: 0, bookings: 0, revenue: 0 },
    ],
    funnel: { impressions: 1840, pageViews: 342, bookings: 11, note: FUNNEL_NOTE },
    occupancy: months(OCCUPANCY_2026, "Apr", "Jun"),
    occupancyRange: "Apr 2026 — Jun 2026",
    occupancyNote: "April week 4 dropped below 50% booked and May and June are still open. A 5–10% early-booking discount can help fill these weeks.",
    reviewTrend: REVIEW_TREND,
  },
  "3-months": {
    stats: { views: 580, viewsChange: 20, saves: 71, savesChange: 22, conversion: 4.9, revenue: 2550000, revenueChange: 54000 },
    chartLabel: "3 months",
    earnings: months(EARNINGS_2026, "Feb", "Apr"),
    listings: [
      { title: "Cosy 2-bed, Bodija", status: "live", views: 426, saves: 54, bookings: 21, revenue: 300000 },
      { title: "Executive Flat, Agodi GRA", status: "live", views: 294, saves: 33, bookings: 12, revenue: 250000 },
      { title: "Modern Studio, Ring Road", status: "review", views: 0, saves: 0, bookings: 0, revenue: 0 },
    ],
    funnel: { impressions: 4200, pageViews: 890, bookings: 19, note: FUNNEL_NOTE },
    occupancy: months(OCCUPANCY_2026, "Feb", "Apr"),
    occupancyRange: "Feb 2026 — Apr 2026",
    occupancyNote: "Early March consistently underperforms against February and April. This is a predictable post-festive dip. Budget for a 5–10% rate reduction in early March.",
    reviewTrend: months(REVIEW_TREND, "Feb", "Apr"),
  },
  "6-months": {
    stats: { views: 642, viewsChange: 20, saves: 87, savesChange: 22, conversion: 5.9, revenue: 2550000, revenueChange: 54000 },
    chartLabel: "6 months",
    earnings: months(EARNINGS_2026, "Jan", "Jun"),
    listings: [
      { title: "Cosy 2-bed, Bodija", status: "live", views: 300, saves: 54, bookings: 21, revenue: 300000 },
      { title: "Executive Flat, Agodi GRA", status: "live", views: 242, saves: 33, bookings: 12, revenue: 250000 },
      { title: "Modern Studio, Ring Road", status: "review", views: 0, saves: 0, bookings: 0, revenue: 0 },
    ],
    funnel: { impressions: 4200, pageViews: 890, bookings: 19, note: FUNNEL_NOTE },
    occupancy: months(OCCUPANCY_2026, "Jan", "Jun"),
    occupancyRange: "Jan 2026 — Jun 2026",
    occupancyNote: "January weeks 3 and 4 show no bookings — a clear slow period. Consider lowering your nightly rate by 10–15% during late January to fill these gaps next year.",
    reviewTrend: months(REVIEW_TREND, "Jan", "Apr"),
  },
  year: {
    stats: { views: 1320, viewsChange: 20, saves: 180, savesChange: 22, conversion: 8.9, revenue: 4000000, revenueChange: 54000 },
    chartLabel: "This year",
    earnings: EARNINGS_2026,
    listings: [
      { title: "Cosy 2-bed, Bodija", status: "live", views: 526, saves: 120, bookings: 40, revenue: 2500000 },
      { title: "Executive Flat, Agodi GRA", status: "live", views: 494, saves: 10, bookings: 22, revenue: 1500000 },
      { title: "Modern Studio, Ring Road", status: "review", views: 0, saves: 0, bookings: 0, revenue: 0 },
    ],
    funnel: { impressions: 6700, pageViews: 1210, bookings: 66, note: FUNNEL_NOTE },
    occupancy: OCCUPANCY_2026,
    occupancyRange: "Jan 2026 — Dec 2026",
    occupancyNote: "January weeks 3 and 4 show no bookings — a clear slow period. Consider lowering your nightly rate by 10–15% during late January to fill these gaps next year.",
    reviewTrend: REVIEW_TREND,
  },
};

// Shared across periods: how busy Ibadan is each month, and the host's response stats
export const DUMMY_IBADAN_DEMAND: { month: string; level: DemandLevel }[] = [
  { month: "January", level: "low" },
  { month: "February", level: "medium" },
  { month: "March", level: "medium" },
  { month: "April", level: "high" },
  { month: "May", level: "low" },
  { month: "June", level: "medium" },
  { month: "July", level: "high" },
  { month: "August", level: "high" },
  { month: "September", level: "medium" },
  { month: "October", level: "high" },
  { month: "November", level: "medium" },
  { month: "December", level: "peak" },
];

export const DUMMY_RESPONSE_PERFORMANCE = { rate: 94, averageTime: "Under 2 hrs avg", fastResponder: true };

export const DUMMY_INSIGHT_TIP =
  "Your Bodija listing has a 4.6% booking conversion rate which is above the Ibadan average of 3.2%. Listings in your area with 10 or more photos convert 38% better. Your Bodija listing currently has 5 photos. Consider adding more photos to increase bookings further.";
