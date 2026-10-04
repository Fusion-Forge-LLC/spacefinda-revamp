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
