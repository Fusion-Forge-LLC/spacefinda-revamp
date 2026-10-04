import { LegalDocument } from "../types";

export const privacyPolicy: LegalDocument = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  description: "How SpaceFinda collects, uses, stores, and protects your personal data.",
  intro:
    'This Privacy Policy explains how SpaceFinda Technologies Ltd ("SpaceFinda", "we", "us", "our") collects, uses, stores, and protects your personal data when you use the SpaceFinda platform. It is written in compliance with the Nigeria Data Protection Act (NDPA) 2023 and the Nigeria Data Protection Commission\'s Guidelines and Implementation Directives (GAID) 2025. By using SpaceFinda, you consent to the practices described in this policy.',
  sections: [
    {
      id: "who-we-are",
      nav: "Introduction",
      title: "Who we are",
      blocks: [
        {
          type: "p",
          text: "SpaceFinda Technologies Ltd is the data controller responsible for your personal data. We are registered in Nigeria and operate the SpaceFinda short-let and workspace booking platform. Our platform connects renters with property owners across Nigeria, starting with Ibadan.",
        },
        {
          type: "p",
          text: {
            bold: "Data Protection Officer:",
            text: "As a startup, our Data Protection responsibilities are currently handled by the founding team. Contact: dpo@spacefinda.com",
          },
        },
      ],
    },
    {
      id: "data-we-collect",
      nav: "Data we collect",
      title: "Personal data we collect",
      blocks: [
        { type: "h3", text: "Information you provide directly" },
        {
          type: "list",
          items: [
            { bold: "Account information:", text: "First name, last name, email address, phone number, password (stored as an encrypted hash, never in plain text)" },
            { bold: "Profile information:", text: "Profile photo, bio, home state, travel preferences, emergency contact name and phone number" },
            { bold: "Identity verification:", text: "Government-issued ID document (NIN slip, National ID card, Driver's licence, or International passport), selfie photograph submitted for face-match verification" },
            { bold: "Booking information:", text: "Property selections, check-in and check-out dates, number of guests, special requests" },
            { bold: "Payment information:", text: "A secure payment token representing your card is stored. We never store your raw card number, CVV, or expiry date. These are handled exclusively by Paystack." },
            { bold: "Reviews and ratings:", text: "Content you submit as a review after a completed stay" },
            { bold: "Emergency contact:", text: "Name, relationship, and phone number of your designated emergency contact" },
          ],
        },
        { type: "h3", text: "Information collected automatically" },
        {
          type: "list",
          items: [
            { bold: "Usage data:", text: "Pages visited, searches performed, listings viewed, booking flow interactions" },
            { bold: "Device information:", text: "IP address, browser type, operating system, device type collected at the point of login for fraud prevention purposes" },
            { bold: "Session data:", text: "Login timestamps, session duration" },
          ],
        },
        { type: "h3", text: "Information from third parties" },
        {
          type: "list",
          items: [{ bold: "Paystack:", text: "Transaction status and confirmation data following payment processing" }],
        },
      ],
    },
    {
      id: "how-we-collect",
      nav: "How we collect it",
      title: "How we collect your data",
      blocks: [
        {
          type: "p",
          text: "We collect data when you create an account, complete your profile, make or receive a booking, submit payment, send messages on the platform, submit an identity verification document, contact our support team, or use any feature of the SpaceFinda platform.",
        },
        {
          type: "p",
          text: "Automatic collection occurs when you access and use our website or mobile application through standard web technologies including server logs and session management tools.",
        },
      ],
    },
    {
      id: "how-we-use",
      nav: "How we use it",
      title: "How we use your personal data",
      blocks: [
        {
          type: "table",
          columns: ["Purpose", "Data used", "Lawful basis"],
          rows: [
            ["Creating and managing your account", "Name, email, phone, password", "Contract performance"],
            ["Processing bookings and payments", "Booking details, payment token, contact info", "Contract performance"],
            ["Identity verification", "Government ID, selfie", "Legitimate interest / Legal obligation"],
            ["Facilitating renter-owner communication", "Messages, booking context", "Contract performance"],
            ["Sending booking confirmations and receipts", "Email, booking data", "Contract performance"],
            ["Fraud prevention and platform security", "IP address, device info, login data", "Legitimate interest"],
            ["Responding to support requests", "Contact info, booking history", "Contract performance / Legitimate interest"],
            ["Emergency contact notifications", "Emergency contact details", "Vital interest"],
            ["Marketing and promotional emails", "Email address", "Consent (opt-in, withdrawable at any time)"],
            ["Improving the platform", "Anonymised usage data", "Legitimate interest"],
            ["Compliance with Nigerian law", "Various data as required", "Legal obligation"],
          ],
        },
      ],
    },
    {
      id: "lawful-bases",
      nav: "Lawful bases",
      title: "Lawful bases for processing",
      blocks: [
        { type: "p", text: "Under the NDPA 2023, we process your personal data on the following lawful bases:" },
        {
          type: "list",
          items: [
            { bold: "Contract performance:", text: "Processing necessary to fulfil the booking contract between you and SpaceFinda or between you and a property owner" },
            { bold: "Legitimate interests:", text: "Processing necessary for our legitimate business interests, such as fraud prevention, platform security, and service improvement, where these are not overridden by your rights" },
            { bold: "Consent:", text: "Where you have clearly opted in, such as marketing communications. You may withdraw consent at any time through your account settings." },
            { bold: "Legal obligation:", text: "Where we are required to process data to comply with Nigerian law, including anti-money laundering requirements" },
            { bold: "Vital interests:", text: "In genuine emergency situations involving risk to life, where we may need to share emergency contact information" },
          ],
        },
      ],
    },
    {
      id: "third-parties",
      nav: "Third parties",
      title: "Third parties we share data with",
      blocks: [
        {
          type: "table",
          columns: ["Third party", "Purpose", "Data shared", "Location"],
          rows: [
            ["Paystack", "Payment processing", "Transaction amount, booking reference, email", "Nigeria"],
            ["Supabase", "Database and authentication", "All account and booking data", "Cloud (encrypted)"],
            ["Cloudinary", "Image storage", "Listing photos, profile photos", "Cloud (encrypted)"],
            ["Termii", "SMS and OTP delivery", "Phone number, OTP code", "Nigeria"],
            ["Resend", "Email delivery", "Transaction amount, booking reference, email", "Cloud"],
          ],
        },
        {
          type: "p",
          text: "We do not share data with advertising networks, data brokers, or any entity for commercial purposes unrelated to providing the SpaceFinda service.",
        },
        {
          type: "p",
          text: "We may disclose your data to regulatory authorities or law enforcement agencies if required by Nigerian law or court order.",
        },
      ],
    },
    {
      id: "data-retention",
      nav: "Data retention",
      title: "Data retention periods",
      blocks: [
        {
          type: "table",
          columns: ["Data type", "Retention period", "Reason"],
          rows: [
            ["Account information", "Duration of account + 2 years after closure", "Legal compliance, dispute resolution"],
            ["Government ID documents", "Deleted within 30 days of verification completion", "Data minimisation — only token retained"],
            ["Selfie photographs", "Deleted within 30 days of verification completion", "Data minimisation"],
            ["Messages between users", "Duration of account", "Dispute resolution, platform safety"],
            ["Payment tokens", "Until card is removed or account closed", "Facilitating repeat bookings"],
            ["Support correspondence", "3 years", "Dispute resolution and audit trail"],
            ["Device and login logs", "90 days", "Security and fraud prevention"],
            ["Marketing consent records", "3 years from last consent action", "Legal compliance"],
          ],
        },
      ],
    },
    {
      id: "your-rights",
      nav: "Your rights",
      title: "Your rights under the NDPA 2023",
      blocks: [
        { type: "p", text: "The Nigeria Data Protection Act 2023 gives you the following rights over your personal data:" },
        {
          type: "rights",
          items: [
            { title: "Right to access", text: "Request a copy of all personal data we hold about you. We will respond within 30 days." },
            { title: "Right to rectification", text: "Request correction of inaccurate or incomplete data we hold about you." },
            { title: "Right to erasure", text: "Request deletion of your data where there is no lawful reason to continue processing it." },
            { title: "Right to data portability", text: "Receive your data in a structured, machine-readable format to transfer to another service." },
            { title: "Right to restrict processing", text: "Ask us to pause processing your data in certain circumstances while a dispute is resolved." },
            { title: "Right to object", text: "Object to processing based on legitimate interests, including marketing communications." },
            { title: "Right to withdraw consent", text: "Withdraw any consent you have given at any time. This does not affect processing already carried out." },
            { title: "Right to lodge a complaint", text: "File a complaint with the Nigeria Data Protection Commission (NDPC) at ndpc.gov.ng if you believe your rights have been violated." },
          ],
        },
        {
          type: "p",
          text: "To exercise any of these rights, contact us at privacy@spacefinda.com with your full name and account email. We will respond within 30 days. For data access requests, we may need to verify your identity before releasing any information.",
        },
        { type: "h3", text: "Requesting a copy of your data" },
        {
          type: "p",
          text: 'You can request a complete export of all personal data SpaceFinda holds about you by visiting Account Settings and selecting "Request my data", or by emailing privacy@spacefinda.com. We will compile and deliver your data within 30 days in a commonly used, machine-readable format.',
        },
      ],
    },
    {
      id: "security",
      nav: "Security",
      title: "Security measures",
      blocks: [
        {
          type: "p",
          text: "We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, disclosure, alteration, or destruction:",
        },
        {
          type: "list",
          items: [
            "All data in transit is encrypted using TLS 1.2 or higher",
            "All data at rest is encrypted in our database",
            "Passwords are hashed using bcrypt — never stored in plain text",
            "Payment card data is handled exclusively by Paystack (PCI-DSS Level 1 compliant) — SpaceFinda stores only payment tokens",
            "Identity documents are stored temporarily in an access-controlled environment and deleted within 30 days of verification",
            "Access to production data is restricted to authorised personnel only",
            "We conduct regular security reviews of our infrastructure",
          ],
        },
        {
          type: "p",
          text: "In the event of a data breach that is likely to result in risk to your rights and freedoms, we will notify the NDPC within 72 hours and notify affected users without undue delay, as required by the NDPA 2023.",
        },
      ],
    },
    {
      id: "children",
      nav: "Children",
      title: "Children's privacy",
      blocks: [
        {
          type: "p",
          text: "SpaceFinda is not intended for use by persons under the age of 18. We do not knowingly collect personal data from anyone under 18. If you are a parent or guardian and believe your child has provided us with personal data, please contact us immediately at privacy@spacefinda.com and we will delete the information promptly.",
        },
      ],
    },
    {
      id: "policy-changes",
      nav: "Policy changes",
      title: "Changes to this policy",
      blocks: [
        {
          type: "p",
          text: "We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or platform features. We will notify you of significant changes by email to the address on your account and by displaying a prominent notice on the platform at least 14 days before any material change takes effect. The date of the most recent revision appears at the top of this policy.",
        },
        {
          type: "p",
          text: "Your continued use of SpaceFinda after the effective date of any change constitutes your acceptance of the updated policy.",
        },
      ],
    },
    {
      id: "contact",
      nav: "Contact us",
      title: "Contact us",
      blocks: [
        {
          type: "contact",
          title: "Data protection enquiries",
          lines: [
            { text: "For any questions, concerns, or rights requests relating to this Privacy Policy or SpaceFinda's data practices, contact:" },
            { text: "SpaceFinda Data Protection Office", heading: true },
            { text: "Email: privacy@spacefinda.com" },
            { text: "General support: support@spacefinda.com" },
            { text: "To file a complaint with the Nigerian data protection authority: ndpc.gov.ng" },
          ],
        },
      ],
    },
  ],
  closing: "Your continued use of SpaceFinda after the effective date of any change constitutes your acceptance of the updated policy.",
};
