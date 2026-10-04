import { LegalDocument } from "../types";

export const termsOfService: LegalDocument = {
  slug: "terms-of-service",
  title: "Terms of Service",
  description: "The rules for using SpaceFinda as a renter or property owner.",
  intro:
    "Please read these Terms of Service carefully before using SpaceFinda. By creating an account or using the platform, you agree to be bound by these terms. If you do not agree, you may not use SpaceFinda.",
  sections: [
    {
      id: "who-we-are",
      nav: "Introduction",
      title: "Who we are",
      blocks: [
        {
          type: "p",
          text: 'SpaceFinda Technologies Ltd ("SpaceFinda", "we", "us", "our") operates a digital marketplace platform that connects individuals seeking short-let accommodation or workspace ("Renters") with property owners ("Owners") in Nigeria. These Terms of Service ("Terms") govern your access to and use of the SpaceFinda website, mobile application, and all associated services.',
        },
      ],
    },
    {
      id: "eligibility",
      nav: "Eligibility",
      title: "Eligibility",
      blocks: [
        { type: "h3", text: "To use SpaceFinda you must:" },
        {
          type: "list",
          items: [
            "Be at least 18 years of age",
            "Be a Nigerian citizen or lawful resident of Nigeria, or be a valid visitor to Nigeria",
            "Have a valid Nigerian phone number for verification purposes",
            "Have the legal capacity to enter into binding contracts under Nigerian law",
            "Not have been previously banned from the SpaceFinda platform",
          ],
        },
        { type: "p", text: "By creating an account you represent and warrant that you meet all eligibility requirements." },
      ],
    },
    {
      id: "marketplace",
      nav: "Marketplace role",
      title: "SpaceFinda as a marketplace",
      blocks: [
        {
          type: "p",
          text: "SpaceFinda is a technology platform that facilitates connections between Renters and Owners. SpaceFinda is not a party to the rental agreement between a Renter and an Owner. SpaceFinda does not own, manage, operate, or control any listed property.",
        },
        { type: "p", text: "SpaceFinda's role is limited to:" },
        {
          type: "list",
          items: [
            "Providing the platform and tools for discovery, booking, and communication",
            "Processing payments securely on behalf of both parties through Paystack",
            "Holding rent payments until check-in day and caution fees until the 48-hour post-checkout claim window closes",
            "Mediating disputes between Renters and Owners where appropriate",
            "Verifying the identity of users to maintain platform safety",
            "Reviewing and approving listings before they go live",
          ],
        },
        {
          type: "p",
          text: "SpaceFinda does not guarantee the accuracy of any listing, the conduct of any user, or the outcome of any stay. SpaceFinda is not an insurer of property or persons.",
        },
      ],
    },
    {
      id: "accounts",
      nav: "Accounts",
      title: "Accounts",
      blocks: [
        {
          type: "p",
          text: "You are responsible for maintaining the confidentiality of your account credentials. You must notify SpaceFinda immediately at support@spacefinda.com if you suspect unauthorised access to your account.",
        },
        {
          type: "p",
          text: "You may not create more than one account. You may not create an account on behalf of another person without their explicit authorisation. SpaceFinda reserves the right to verify the identity of any account holder at any time.",
        },
        {
          type: "p",
          text: "You are responsible for all activity that occurs under your account, including bookings made, messages sent, and reviews submitted.",
        },
      ],
    },
    {
      id: "renter-obligations",
      nav: "Renter obligations",
      title: "Renter obligations",
      blocks: [
        { type: "p", text: "As a Renter using SpaceFinda you agree to:" },
        {
          type: "list",
          items: [
            "Provide accurate and truthful information during registration and booking",
            "Use booked properties only for lawful purposes and only for the number of guests stated at booking",
            "Comply with all house rules set by the property Owner for each listing",
            "Treat all listed properties with care and respect",
            "Report any damage caused during your stay honestly and promptly",
            "Not use booked properties for commercial purposes, parties, or events unless explicitly permitted by the Owner",
            "Not arrange payments to Owners outside the SpaceFinda platform — all transactions must go through Paystack via SpaceFinda",
            "Check out by the stated check-out time",
            "Not allow additional guests beyond the number booked without Owner approval",
          ],
        },
        {
          type: "p",
          text: "SpaceFinda does not guarantee the accuracy of any listing, the conduct of any user, or the outcome of any stay. SpaceFinda is not an insurer of property or persons.",
        },
      ],
    },
    {
      id: "owner-obligations",
      nav: "Owner obligations",
      title: "Owner obligations",
      blocks: [
        { type: "p", text: "As a Property Owner on SpaceFinda you agree to:" },
        {
          type: "list",
          items: [
            "Provide accurate, complete, and non-misleading listing information including accurate photos, amenities, and house rules",
            "Maintain the property in the condition shown and described in the listing",
            "Respond to renter messages in a timely manner",
            "Be available or have a representative available to facilitate check-in as agreed with the Renter",
            "Accept SpaceFinda's 10% commission on every successful booking as agreed during onboarding",
            "Accept that your payout will be released on check-in day — not at booking — as part of SpaceFinda's trust architecture",
            "Submit any caution fee damage claim within the 48-hour post-checkout window with photographic evidence",
            "Process refunds in accordance with the cancellation policy tier you selected for each listing",
            "Not arrange payments from Renters outside the SpaceFinda platform",
            "Keep your listing availability calendar current to avoid booking conflicts",
          ],
        },
      ],
    },
    {
      id: "payments",
      nav: "Payment fees",
      title: "Payments, fees, and refunds",
      blocks: [
        {
          type: "p",
          text: "All payments on SpaceFinda are processed by Paystack. By making or receiving a payment through SpaceFinda you also agree to Paystack's terms of service.",
        },
        {
          type: "p",
          text: "SpaceFinda charges Owners a 10% platform commission on the rent component of every confirmed booking. This is deducted automatically at the point of payment and is non-refundable in any circumstance, including cancellations under all policy tiers.",
        },
        {
          type: "p",
          text: "The Paystack processing fee (1.5% + ₦100 on local transactions) is absorbed into the platform commission and is not shown as a separate line item to Renters. It is non-refundable.",
        },
        {
          type: "p",
          text: "Rent payments are held in SpaceFinda's Paystack balance from the point of booking until check-in day. They are released to the Owner automatically on check-in day. If a Renter cancels before check-in, the applicable refund is processed according to the cancellation policy of the listing.",
        },
        {
          type: "p",
          text: "Caution fees are held separately from rent and follow the caution fee lifecycle described in the Cancellation and Refund Policy. See that document for full details.",
        },
        { type: "p", text: "For full details on cancellation tiers and refund timelines, see the Cancellation and Refund Policy." },
      ],
    },
    {
      id: "prohibited-conduct",
      nav: "Prohibited conduct",
      title: "Prohibited conduct",
      blocks: [
        {
          type: "p",
          text: "The following conduct is strictly prohibited on SpaceFinda and may result in immediate account suspension, termination, or reporting to Nigerian authorities:",
        },
        {
          type: "list",
          items: [
            "Submitting fraudulent or falsified identity documents during verification",
            "Creating fake listings or misrepresenting a property's location, condition, or amenities",
            "Arranging off-platform payments to bypass SpaceFinda's payment system",
            "Harassing, threatening, or discriminating against any other user",
            "Using a booked property for illegal activities of any kind",
            "Submitting fraudulent damage claims as an Owner",
            "Circumventing the cancellation and refund system",
            "Creating multiple accounts to circumvent a suspension or ban",
            "Scraping, copying, or republishing SpaceFinda content without written permission",
            "Introducing malware or attempting to interfere with the platform's operation",
          ],
        },
      ],
    },
    {
      id: "intellectual-property",
      nav: "Intellectual property",
      title: "Intellectual property",
      blocks: [
        {
          type: "p",
          text: "The SpaceFinda name, logo, platform design, and all content created by SpaceFinda are the intellectual property of SpaceFinda Technologies Ltd. You may not use, copy, reproduce, or distribute any of this content without prior written permission.",
        },
        {
          type: "p",
          text: "By submitting content to SpaceFinda — including listing photos, reviews, and messages — you grant SpaceFinda a non-exclusive, royalty-free licence to use that content for the purpose of operating and improving the platform. You retain ownership of any content you submit.",
        },
      ],
    },
    {
      id: "liability",
      nav: "Limitation of liability",
      title: "Limitation of liability",
      blocks: [
        {
          type: "p",
          text: "To the maximum extent permitted by Nigerian law, SpaceFinda's total liability to you for any claim arising from your use of the platform shall not exceed the total value of the specific booking to which the claim relates.",
        },
        {
          type: "p",
          text: "SpaceFinda is not liable for: property damage beyond the caution fee, personal injury, theft, loss of property, or any incident occurring during a stay; the conduct of any Owner or Renter on the platform; inaccuracies in listing information provided by Owners; or any loss resulting from your failure to comply with these Terms.",
        },
        {
          type: "p",
          text: "SpaceFinda does not warrant that the platform will be uninterrupted, error-free, or free of viruses. We reserve the right to modify, suspend, or discontinue any part of the platform at any time.",
        },
      ],
    },
    {
      id: "disputes",
      nav: "Disputes",
      title: "Dispute resolution",
      blocks: [
        {
          type: "p",
          text: "SpaceFinda encourages Renters and Owners to resolve disputes between themselves first. For disputes that cannot be resolved directly, SpaceFinda's support team will act as a mediator. SpaceFinda's decision in mediated disputes involving caution fees and damage claims is binding on both parties.",
        },
        {
          type: "p",
          text: "For legal disputes between a user and SpaceFinda, both parties agree to attempt resolution through good-faith negotiation before initiating legal proceedings. Any unresolved legal dispute shall be submitted to the courts of Lagos State, Nigeria, which shall have exclusive jurisdiction.",
        },
      ],
    },
    {
      id: "termination",
      nav: "Termination",
      title: "Account termination",
      blocks: [
        {
          type: "p",
          text: "SpaceFinda may suspend or terminate your account at any time for violation of these Terms, including but not limited to fraudulent activity, prohibited conduct, or posing a risk to other users or the platform.",
        },
        {
          type: "p",
          text: "You may close your account at any time through Account Settings. Closed accounts retain booking records and financial history for the retention periods specified in our Privacy Policy for compliance and legal purposes.",
        },
        {
          type: "p",
          text: "If you have active bookings at the time of account closure, those bookings must be cancelled according to the applicable cancellation policy before account deletion can be processed.",
        },
      ],
    },
    {
      id: "governing-law",
      nav: "Governing law",
      title: "Governing law and jurisdiction",
      blocks: [
        {
          type: "p",
          text: "These Terms are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any dispute arising from or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Lagos State, Nigeria.",
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
          title: "Questions about these Terms?",
          lines: [{ text: "Contact SpaceFinda at legal@spacefinda.com or support@spacefinda.com" }],
        },
      ],
    },
  ],
  closing: "Your continued use of SpaceFinda after the effective date of any change constitutes your acceptance of the updated Terms.",
};
