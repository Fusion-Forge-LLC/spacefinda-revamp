import { LegalDocument } from "../types";

export const cancellationPolicy: LegalDocument = {
  slug: "cancellation-policy",
  title: "Cancellation Policy",
  description: "How cancellations, caution fees, and refunds work on SpaceFinda.",
  intro:
    "This policy explains how cancellations and refunds work on SpaceFinda. Read this carefully before making a booking. The cancellation policy for a specific listing is always shown on the property detail page before you confirm payment.",
  sections: [
    {
      id: "overview",
      nav: "Overview",
      title: "Overview",
      blocks: [
        {
          type: "p",
          text: "SpaceFinda uses three preset cancellation policy tiers: Flexible, Moderate, and Strict. Each listing's cancellation policy is set by the Owner at the time of listing creation and cannot be changed after a booking is made. You will always see the applicable tier clearly before you confirm a booking.",
        },
        {
          type: "p",
          text: "A critical feature of SpaceFinda's payment architecture protects you as a Renter: your rent payment is held in SpaceFinda's Paystack balance from the moment of booking and is never released to the Owner until check-in day. This means that if you cancel before check-in, SpaceFinda processes your refund directly and you never need to chase the Owner for money.",
        },
      ],
    },
    {
      id: "policy-tiers",
      nav: "Policy tiers",
      title: "Cancellation policy tiers",
      blocks: [
        {
          type: "tiers",
          tiers: [
            {
              label: "Flexible",
              tone: "blue",
              title: "Full refund if cancelled at least 24 hours before check-in",
              items: [
                "Cancel at least 24 hours before your scheduled check-in time and receive a full refund of the rent amount",
                "Cancel less than 24 hours before check-in and no rent refund is issued",
                "The caution fee is always refunded immediately on any pre-checkin cancellation (see Section 3)",
                "The SpaceFinda platform fee (absorbed into commission) is non-refundable in all circumstances",
              ],
            },
            {
              label: "Moderate",
              tone: "amber",
              title: "50% refund if cancelled at least 72 hours before check-in",
              // TODO: copy from the design repeats the Flexible tier's bullets — confirm the Moderate rules with the team
              items: [
                "Cancel at least 24 hours before your scheduled check-in time and receive a full refund of the rent amount",
                "Cancel less than 24 hours before check-in and no rent refund is issued",
                "The caution fee is always refunded immediately on any pre-checkin cancellation (see Section 3)",
                "The SpaceFinda platform fee (absorbed into commission) is non-refundable in all circumstances",
              ],
            },
            {
              label: "Strict",
              tone: "red",
              title: "No rent refund once booking is confirmed",
              items: [
                "Once a Strict booking is confirmed and paid, no rent refund is issued for any cancellation at any time before check-in",
                "The full rent is released to the Owner",
                "Important exception: the caution fee is still refunded to the Renter immediately since no stay occurred and no damage was possible",
                "The SpaceFinda platform fee is non-refundable",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "pre-checkin",
      nav: "Pre-checkin cancellations",
      title: "Pre-checkin cancellations — caution fee rule",
      blocks: [
        {
          type: "p",
          text: "If a Renter cancels at any point before checking in regardless of which cancellation policy tier applies, the caution fee is refunded to the Renter immediately and in full.",
        },
        {
          type: "quote",
          text: {
            bold: "The reason:",
            text: "The caution fee's purpose is to cover potential property damage caused by a Renter during a stay. If no stay occurs, no damage is possible. Therefore the 48-hour damage claim window does not apply to pre-checkin cancellations. The refund is processed in the same transaction as any applicable rent refund.",
          },
        },
        { type: "p", text: "The 48-hour damage claim window applies only after a Renter has physically checked in and completed a stay." },
      ],
    },
    {
      id: "caution-fee",
      nav: "Caution fee lifecycle",
      title: "Caution fee lifecycle (completed stays)",
      blocks: [
        { type: "p", text: "For bookings where the Renter completes their stay and checks out:" },
        {
          type: "list",
          items: [
            "The caution fee is held in SpaceFinda's Paystack balance throughout the stay",
            "After checkout, a 48-hour damage claim window opens and the Owner is notified",
            "If the Owner raises no damage claim within 48 hours, the caution fee is automatically returned to the Renter via Paystack",
            "If the Owner submits a valid damage claim with photographic evidence within 48 hours, SpaceFinda Support reviews the claim and mediates resolution",
            "SpaceFinda's decision on contested caution fee claims is final",
            "Owner silence within the 48-hour window is treated as confirmation of no damage — the caution fee is then released to the Renter automatically",
          ],
        },
        { type: "h3", text: "Caution fee tiers (platform-defined)" },
        {
          type: "table",
          columns: ["Total booking value", "Caution fee"],
          alignLastRight: true,
          rows: [
            ["₦0 to ₦50,000", "₦10,000"],
            ["₦50,001 to ₦150,000", "₦10,000"],
            ["₦150,001 to ₦300,000", "₦20,000"],
            ["₦300,001 and above", "₦30,000"],
          ],
        },
        {
          type: "p",
          text: "Caution fee tiers are set by SpaceFinda and cannot be modified by Owners. They are shown clearly to Renters during the booking flow before payment is made.",
        },
      ],
    },
    {
      id: "damage-claims",
      nav: "Damage claims",
      title: "Damage claims exceeding the caution fee",
      blocks: [
        {
          type: "p",
          text: "The caution fee is a security deposit — it covers partial or minor damages. It is not insurance. If a Renter causes damage that exceeds the caution fee amount:",
        },
        {
          type: "list",
          items: [
            "The full caution fee is released to the Owner after SpaceFinda validates the claim",
            "SpaceFinda Support will facilitate a documented resolution conversation between the Owner and Renter",
            "SpaceFinda provides an official damage report document for the Owner's records",
            "Financial recovery beyond the caution fee is between the Owner and Renter directly and may require civil or legal action",
            "Owners are strongly advised to photograph their property comprehensively before every check-in as their primary evidence record",
          ],
        },
      ],
    },
    {
      id: "refund-timelines",
      nav: "Refund timelines",
      title: "Refund timelines",
      blocks: [
        {
          type: "p",
          text: "Refunds are processed by SpaceFinda through Paystack and returned to the original payment method used at the time of booking. You cannot redirect a refund to a different payment method.",
        },
        {
          type: "table",
          columns: ["Refund type", "Initiation", "Estimated arrival"],
          rows: [
            ["Pre-checkin cancellation — rent", "Immediately upon cancellation confirmation", "5 to 10 business days"],
            ["Pre-checkin cancellation — caution fee", "Immediately upon cancellation confirmation", "5 to 10 business days (same transaction)"],
            ["Caution fee — no damage (post-checkout)", "Automatically after 48-hour window closes", "5 to 10 business days"],
            ["Caution fee — partial (post-damage claim)", "After SpaceFinda resolves the claim", "5 to 10 business days from resolution"],
          ],
        },
        {
          type: "p",
          text: "Refund timelines depend on your bank and card issuer. Some Nigerian banks may take up to 14 business days. If you have not received a refund after 14 business days, contact support@spacefinda.com with your receipt number.",
        },
      ],
    },
    {
      id: "non-refundable",
      nav: "Non-refundable fees",
      title: "Non-refundable fees",
      blocks: [
        { type: "p", text: "The following amounts are never refunded under any circumstances:" },
        {
          type: "list",
          items: [
            { bold: "SpaceFinda platform commission (10% of rent):", text: "Retained by SpaceFinda in every booking scenario. Owners are informed of this during onboarding." },
            { bold: "Paystack processing fee (1.5% + ₦100):", text: "Absorbed into the platform commission and non-refundable as it is charged by Paystack at the point of transaction." },
          ],
        },
      ],
    },
    {
      id: "exceptional-circumstances",
      nav: "Exceptional circumstances",
      title: "Exceptional circumstances",
      blocks: [
        {
          type: "p",
          text: "In cases of verifiable natural disasters, declared national emergencies, or serious medical emergencies that prevent a Renter from completing their stay, SpaceFinda may exercise discretion to offer partial or full refunds outside the standard policy tiers. This is handled case-by-case by our support team.",
        },
        {
          type: "p",
          text: "To request an exceptional circumstance review, contact support@spacefinda.com with documentation supporting your claim. SpaceFinda's decision is final.",
        },
      ],
    },
    {
      id: "how-to-cancel",
      nav: "How to cancel",
      title: "How to cancel a booking",
      blocks: [
        {
          type: "p",
          text: "To cancel a booking, go to My Bookings in your account, select the relevant booking, open the Booking Detail page, and tap Cancel this booking. The cancellation flow will show you exactly what refund you are entitled to before you confirm. You can also contact support@spacefinda.com if you need assistance.",
        },
        {
          type: "p",
          text: "Cancellations cannot be reversed once confirmed. If you cancel by mistake, you will need to make a new booking subject to availability.",
        },
      ],
    },
    {
      id: "contact",
      nav: "Contact",
      title: "Contact us",
      blocks: [
        {
          type: "contact",
          title: "Need help with a cancellation or refund?",
          lines: [
            {
              text: "Contact our support team at support@spacefinda.com with your booking reference number. We respond within a few hours during business hours.",
            },
          ],
        },
      ],
    },
  ],
};
