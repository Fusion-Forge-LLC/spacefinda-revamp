import { AirConditioner, CarPark, GasCooker, MicroWave, SolarPanel, TVSmart, WashingMachine, WaterPump } from "@/components/icons/icons";
import { Card, Clock, Lock, ShieldTick, TickCircle, Wifi } from "iconsax-reactjs";
import {
  Fan,
  CookingPot,
} from "lucide-react";

export const amenities = [
  {
    category: "Connectivity",
    items: [
      { name: "WiFi", icon: Wifi },
      { name: "Smart TV", icon: TVSmart },
    ],
  },
  {
    category: "Climate and comfort",
    items: [
      { name: "Air conditioning", icon: AirConditioner },
      { name: "Ceiling fans", icon: Fan },
    ],
  },
  {
    category: "Kitchen",
    items: [
      { name: "Fully equipped kitchen", icon: CookingPot },
      { name: "Microwave", icon:  MicroWave},
      { name: "Hot water", icon: WaterPump },
      { name: "Gas cooker", icon: GasCooker },
    ],
  },
  {
    category: "Safety and facilities",
    items: [
      { name: "24hr security", icon: Lock },
      { name: "Parking space", icon: CarPark},
      { name: "Standby Solar", icon: SolarPanel },
      { name: "Washing machine", icon: WashingMachine },
    ],
  },
];

export const refundOPtion = [
    {
        label: "Flexible",
        title: "Full refund",
        note: "Cancel at least 24 hours before your check-in time and receive a full rent refund. Cancellations made less than 24 hours before check-in are not eligible for a refund.",
        className: 'bg-primary-containers text-primary'
    },
    {
        label: "Moderate",
        title: "50% refund",
        note: "Cancel at least 72 hours before your check-in time and receive a 50% rent refund. Cancellations made less than 72 hours before check-in are not eligible for any refund.",
        className: "bg-[#F7F7EF] text-[#9E8549]"
    },
    {
        label: "Strict",
        title: "No refund",
        note: "This listing does not offer refunds after booking is confirmed. Please review all listing details carefully before completing your booking.",
        className: 'bg-[#FEF2F2] text-[#DC2626]'
    },
]

export const protection = [
    {
        Icon: Card,
        title: "You pay at checkout",
        note: "You complete your booking and pay securely through Paystack. Your full payment lands in SpaceFinda's secure balance. Nothing goes to the host at this point.",
    },
    {
        Icon: ShieldTick,
        title: "SpaceFinda holds your payment",
        note: "Your rent is held securely from the moment of booking until your check-in day. If you cancel within the allowed window, SpaceFinda refunds you directly. No chasing the host. No disputes.",
    },
    {
        Icon: TickCircle,
        title: "Host is paid on check-in day",
        note: "On the day you check in, the rent is automatically released to the host. No action needed from either party. The process is guaranteed and automatic.",
    },
    {
        Icon: Clock,
        title: "Caution fee returned after checkout",
        note: "The caution fee is held separately until 48 hours after checkout. If no damage is reported by the host within that window, it is automatically returned to you. No action needed on your part.",
    },
]

export const sampleImages = ["/images/listings/cozy-living-room.jpg", "/images/listings/sunlit-lounge.jpg", "/images/listings/cozy-bedroom.jpg", ]