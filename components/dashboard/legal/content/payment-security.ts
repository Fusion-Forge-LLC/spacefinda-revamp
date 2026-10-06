import { LegalDocument } from "../types";

export const paymentSecurity: LegalDocument = {
  slug: "payment-security",
  title: "Payment and Data Security",
  description: "How your payment information and money are protected on SpaceFinda.",
  intro:
    "This document explains how SpaceFinda handles your payment information, how your money is protected during and after a booking, and what security measures we use to safeguard your financial and personal data.",
  sections: [
    {
      id: "overview",
      nav: "Overview",
      title: "Overview",
      blocks: [
        {
          type: "p",
          text: "SpaceFinda takes payment and data security seriously. We have designed our payment architecture to minimise the amount of sensitive financial data we hold, to protect your money during the full booking lifecycle, and to comply with Nigerian financial regulations and best practices for payment security.",
        },
      ],
    },
    {
      id: "paystack",
      nav: "Paystack and PCI compliance",
      title: "Paystack and PCI-DSS compliance",
      blocks: [
        {
          type: "p",
          text: "All payment processing on SpaceFinda is handled by Paystack, one of Nigeria's leading and most trusted payment processors. Paystack is PCI-DSS Level 1 compliant — the highest level of payment security certification recognised internationally.",
        },
        { type: "p", text: "PCI-DSS (Payment Card Industry Data Security Standard) Level 1 compliance means:" },
        {
          type: "list",
          items: [
            "Paystack maintains a secure environment for cardholder data processing",
            "Paystack undergoes annual security audits by independent qualified security assessors",
            "All card data transmitted between your device and Paystack is encrypted using TLS 1.2 or higher",
            "Paystack never transmits your full card number to SpaceFinda's systems",
          ],
        },
        {
          type: "p",
          text: "When you pay on SpaceFinda, you enter your card details directly into Paystack's secure inline checkout. Your card data goes directly to Paystack's servers — it never passes through SpaceFinda's infrastructure.",
        },
      ],
    },
    {
      id: "what-we-store",
      nav: "What we store",
      title: "What SpaceFinda stores — and what we do not",
      blocks: [
        {
          type: "table",
          columns: ["Data", "SpaceFinda stores?", "What we store instead"],
          rows: [
            ["Full card number (PAN)", "Never", "Masked number (e.g. **** 4521) for display only"],
            ["CVV / security code", "Never", "Nothing — CVV must never be stored"],
            ["Card expiry date", "Never", "Nothing beyond display reference"],
            ["Card tokenisation reference", "Yes", "A Paystack-issued secure token used to charge the card without re-entering details"],
            ["Transaction confirmation", "Yes", "Amount, booking reference, Paystack transaction ID, timestamp"],
            ["Bank account details (Owners)", "No — held by Paystack", "Paystack sub-account reference only"],
          ],
        },
        {
          type: "p",
          text: "Card tokenisation means that when you save a card on SpaceFinda, we store a secure reference token issued by Paystack. This token can be used to initiate payments but cannot be used to reconstruct your card details. Even if SpaceFinda's database were compromised, no usable card data would be exposed.",
        },
      ],
    },
    {
      id: "payment-hold",
      nav: "Payment hold model",
      title: "The payment hold model",
      blocks: [
        { type: "p", text: "SpaceFinda operates a payment hold architecture designed to protect both Renters and Owners:" },
        {
          type: "list",
          items: [
            "When a Renter completes checkout, the full amount — rent plus caution fee — is processed by Paystack and held in SpaceFinda's Paystack balance",
            "No funds are released to the Owner at the time of booking",
            "On check-in day, SpaceFinda automatically releases the rent component (90% after platform commission) to the Owner's registered bank account via Paystack's Transfer API",
            "SpaceFinda retains the 10% platform commission from the rent component",
            "The caution fee remains held separately until the 48-hour post-checkout window closes",
          ],
        },
        {
          type: "quote",
          text: {
            bold: "Why this protects you:",
            text: "Because the Owner never receives your rent before check-in, SpaceFinda can process any eligible refund directly without involving the Owner. You are never in a position of chasing an Owner for money they have already received.",
          },
        },
      ],
    },
    {
      id: "caution-fee",
      nav: "Caution fee custody",
      title: "Caution fee custody",
      blocks: [
        {
          type: "p",
          text: "The caution fee is held in SpaceFinda's dedicated Paystack balance, ring-fenced and tracked per individual booking in our database. SpaceFinda acts as a neutral custodian of caution fees — we hold the funds on behalf of both the Renter and the Owner until the claim window closes.",
        },
        {
          type: "p",
          text: "This is a structured security deposit model, not an escrow arrangement. SpaceFinda does not earn interest on held caution fees.",
        },
        {
          type: "p",
          text: "Caution fee release is triggered by: automatic release to the Renter after 48 hours with no damage claim; SpaceFinda-mediated release to the Owner upon a valid damage claim; or immediate release to the Renter upon pre-checkin cancellation.",
        },
      ],
    },
    {
      id: "refunds",
      nav: "Refund process",
      title: "The refund process",
      blocks: [
        { type: "p", text: "Refunds are processed by SpaceFinda through Paystack's Refund and Transfer APIs. The process is as follows:" },
        {
          type: "list",
          items: [
            "SpaceFinda initiates the refund instruction to Paystack",
            "Paystack processes the refund back to the Renter's original payment card",
            "The Renter receives the funds within 5 to 10 business days, depending on their bank",
            "SpaceFinda sends a refund confirmation email to the Renter",
          ],
        },
        {
          type: "p",
          text: "All refunds go to the original payment card used at booking. Refunds cannot be sent to a different card, bank account, or payment method. This protects against fraudulent refund redirection attempts.",
        },
      ],
    },
    {
      id: "fraud-prevention",
      nav: "Fraud prevention",
      title: "Fraud prevention",
      blocks: [
        { type: "p", text: "SpaceFinda takes a layered approach to fraud prevention:" },
        {
          type: "list",
          items: [
            { bold: "Identity verification:", text: "All users are required to verify their phone number via OTP at signup. Property Owners are required to complete government ID and BVN verification before listing or receiving payouts." },
            { bold: "Paystack fraud detection:", text: "Paystack applies its own risk scoring and fraud detection algorithms to every transaction." },
            { bold: "Login monitoring:", text: "We log the IP address, device type, and timestamp of every login. Unusual login patterns are flagged for review." },
            { bold: "Off-platform payment prevention:", text: "Our Terms of Service prohibit arranging payments outside SpaceFinda. Listings or communications facilitating off-platform payments are removed and accounts suspended." },
            { bold: "Listing verification:", text: "All listings are reviewed by our team before going live to prevent fraudulent or misleading properties." },
          ],
        },
        {
          type: "p",
          text: "If you suspect fraudulent activity on your account, contact support@spacefinda.com immediately. We will investigate and take appropriate action within 24 hours.",
        },
      ],
    },
    {
      id: "encryption",
      nav: "Encryption",
      title: "Encryption and infrastructure security",
      blocks: [
        {
          type: "list",
          items: [
            "All communications between your device and SpaceFinda servers are encrypted using HTTPS with TLS 1.2 or higher",
            "All data stored in our database (Supabase) is encrypted at rest using AES-256 encryption",
            "Passwords are hashed using bcrypt with a strong salt — they are never stored in readable form",
            "Access to production infrastructure is restricted to authorised personnel only, using multi-factor authentication",
            "Images are stored in Cloudinary with access controls preventing unauthorised access",
            "We do not store any session tokens or authentication credentials on our servers beyond what is necessary for the session",
          ],
        },
      ],
    },
    {
      id: "security-incidents",
      nav: "Security incidents",
      title: "Security incidents and data breaches",
      blocks: [
        { type: "p", text: "In the event of a security incident or data breach that poses a risk to your personal data:" },
        {
          type: "list",
          items: [
            "We will notify the Nigeria Data Protection Commission (NDPC) within 72 hours of discovering the breach, as required by the NDPA 2023",
            "We will notify all affected users by email without undue delay, providing information about what data was affected, what we are doing to address it, and what steps you can take to protect yourself",
            "We will conduct a full investigation and implement corrective measures",
          ],
        },
        {
          type: "p",
          text: "To report a suspected security vulnerability in the SpaceFinda platform, contact security@spacefinda.com. We take all reports seriously and will respond within 48 hours.",
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
          title: "Payment and security queries",
          lines: [
            { text: "For questions about a specific payment or transaction, contact us with your receipt number at support@spacefinda.com" },
            { text: "To report a security vulnerability: security@spacefinda.com" },
            { text: "For privacy-related concerns: privacy@spacefinda.com" },
          ],
        },
      ],
    },
  ],
};
