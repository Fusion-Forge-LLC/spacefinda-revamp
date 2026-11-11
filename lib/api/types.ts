// Shapes returned by the SpaceNG backend (see /v2/api-docs.json)

export type FieldErrors = Record<string, string[]>;

export interface ApiErrorBody {
  success: false;
  message: string;
  errors?: FieldErrors;
  error?: string;
}

// Result of every API call: HTTP errors come back as values, not exceptions
export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; message: string; errors?: FieldErrors; code?: "unverified"; body?: unknown };

export interface MessageResponse {
  success: boolean;
  message: string;
}

// The spec doesn't define /user/me's payload yet, so everything beyond email is optional
export interface User {
  _id?: string;
  id?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  // The backend stores one lowercased `fullname`; firstName/lastName are never returned
  fullname?: string;
  phone?: string;
  avatarUrl?: string;
  roles?: string[];
}

export interface AuthResponse extends MessageResponse {
  token: string;
  user: { id: string; name: string; email: string };
}

// What the live /auth/login really returns (differs from the Swagger docs):
// verified → 201 { data: { token, user } }; unverified → 200 { message, email } with no token
export interface LiveLoginResponse extends MessageResponse {
  token?: string;
  user?: User & { _id?: string };
  data?: { token: string; user: User & { _id?: string } };
  email?: string;
}

export interface LoginResponse extends MessageResponse {
  token: string;
  userProfile: { _id: string; name: string; email: string };
}

export interface UserResponse extends MessageResponse {
  data: User;
}

export interface HostTermsResponse extends MessageResponse {
  data: {
    vendor: { _id: string; user: string; verificationStatus: string };
    roles: string[];
  };
}

// ---- Host listings (/host/listings) ----

export type ApiListingStatus = "draft" | "pending_review" | "active" | "paused" | "suspended";
export type ApiPropertyType = "studio flat" | "entire apartment" | "private room" | "entire house" | "workspaces" | "other";

export interface ApiListingImage {
  url: string;
  publicId?: string;
}

// Every field past _id/status is optional: drafts are incomplete, and GET /host/listings only selects a few fields
export interface ApiListing {
  _id: string;
  status: ApiListingStatus;
  currentStep?: number;
  completedSteps?: number[];
  submittedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  propertyType?: ApiPropertyType;
  address?: { city?: string; neighbourhood?: string; fullAddress?: string };
  maxGuests?: number;
  bedrooms?: number;
  bathrooms?: number;
  beds?: number;
  title?: string;
  description?: string;
  // The model stores { url, publicId }; the docs show plain strings, so accept both
  images?: (ApiListingImage | string)[];
  amenities?: string[];
  houseRules?: {
    checkInTime?: string;
    checkOutTime?: string;
    smokingAllowed?: boolean;
    partiesAllowed?: boolean;
    petsAllowed?: boolean;
    visitorsAllowed?: boolean;
    additionalRules?: string;
  };
  availability?: { startType?: "immediately" | "specific_date"; startDate?: string };
  blockedDates?: { from: string; to: string; reason?: string }[];
  pricePerNight?: number;
  cautionFee?: number;
  offer?: { enabled?: boolean; discountPercent?: number; minNights?: number };
  cancellationPolicy?: "flexible" | "moderate" | "strict";
  ratingAverage?: number;
  ratingCount?: number;
  // Only on GET /host/listings for active listings (or with no status filter)
  stats?: { totalReviews: number; averageRating: number; totalBookings: number; totalWishlist: number; totalViews: number };
}

export interface DataResponse<T> extends MessageResponse {
  data: T;
}

// ---- Host dashboard stats ----

export interface OccupancyPeriod {
  month: string;
  from: string;
  to: string;
  bookedNights: number;
  availableNights: number;
  occupancyRate: number;
}

export interface OccupancyReport {
  period: "month_to_date" | "full_month";
  current: OccupancyPeriod;
  previous: OccupancyPeriod;
  comparison: { direction: "increase" | "decrease" | "no_change"; changePercent: number | null; changePoints: number };
}

export interface EarningsSummary {
  currency: string;
  totalEarnings: number;
  thisMonth: { month: string; earnings: number; bookings: number };
}

export interface BookingStats {
  total: number;
  thisMonth: number;
  month: string;
}

export interface RatingSummary {
  averageRating: number;
  totalRatings: number;
  totalPropertiesRated: number;
}

// ---- Host bookings (/host/bookings) ----

export type ApiBookingStage = "upcoming" | "active" | "completed" | "cancelled";

export interface ApiHostBooking {
  _id: string;
  stage: ApiBookingStage;
  // The docs say fullName/avatar; the live API populates the user's fullname/avatarUrl
  guest?: {
    _id: string;
    fullName?: string;
    fullname?: string;
    avatar?: string;
    avatarUrl?: string;
    email?: string;
    phone?: string;
    completedBookings?: number;
  } | null;
  apartment?: {
    _id: string;
    title?: string;
    address?: { city?: string; neighbourhood?: string; fullAddress?: string };
    cancellationPolicy?: "flexible" | "moderate" | "strict";
  } | null;
  checkIn: string;
  checkOut: string;
  guestsCount?: number;
  pricing?: { nights?: number; pricePerNight?: number; discount?: number; cautionFee?: number; serviceFee?: number; total?: number };
  status: "pending" | "confirmed" | "cancelled" | "completed";
  paymentStatus?: "unpaid" | "paid" | "refunded";
  paidAt?: string;
  cancelledAt?: string;
  createdAt?: string;
  // Detail endpoint only
  earning?: number;
  payment?: { provider?: string; reference?: string; amount?: number; currency?: string; paidAt?: string } | null;
}

export interface HostBookingsPage extends MessageResponse {
  data: ApiHostBooking[];
  pagination: { page: number; limit: number; total: number; pages: number };
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

// ---- Public apartments (/apartments) ----

// GET /apartments returns cards (first photo only); GET /apartments/{id} adds the full listing and the host
export interface ApiApartment extends ApiListing {
  vendor?:
    | string
    | {
        _id: string;
        businessName?: string;
        bio?: string;
        verificationStatus?: string;
        user?: { _id: string; firstName?: string; lastName?: string; fullname?: string; avatarUrl?: string } | null;
        createdAt?: string;
      };
}

export interface ApartmentsPage extends MessageResponse {
  data: ApiApartment[];
  pagination: Pagination;
}

export interface ApartmentSearch {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  guests?: number;
  checkIn?: string;
  checkOut?: string;
  page?: number;
  limit?: number;
}

// ---- Guest bookings (/booking) ----

export interface ApiGuestBooking {
  _id: string;
  guest: string;
  apartment?:
    | string
    | { _id: string; title?: string; address?: { city?: string; neighbourhood?: string }; images?: (ApiListingImage | string)[] }
    | null;
  checkIn: string;
  checkOut: string;
  guestsCount?: number;
  pricing?: { nights?: number; pricePerNight?: number; discount?: number; cautionFee?: number; serviceFee?: number; total?: number };
  status: "pending" | "confirmed" | "cancelled" | "completed";
  paymentStatus?: "unpaid" | "paid" | "refunded";
  paymentReference?: string;
  paidAt?: string;
  cancelledAt?: string;
  createdAt?: string;
}

// ---- Payments (/transaction) ----

export type PaymentProvider = "paystack" | "flutterwave";

export interface PaymentInit {
  paymentUrl: string;
  reference: string;
  provider: PaymentProvider;
  amount: number;
  currency: string;
  expiresAt?: string;
}

export interface PaymentVerification {
  payment: { reference: string; status: "pending" | "success" | "failed" | "mismatch" | string; amount?: number; provider?: string; paidAt?: string };
  booking: ApiGuestBooking | null;
}

// ---- Payouts (/payout) ----

export interface PayoutMethod {
  _id: string;
  account_number: string;
  bank_code: string;
  bank_name: string;
  account_name: string;
  createdAt?: string;
}

export interface Bank {
  id: number;
  name: string;
  code: string;
  active?: boolean;
}

export interface ResolvedAccount {
  account_number: string;
  account_name: string;
  bank_id?: number;
}
