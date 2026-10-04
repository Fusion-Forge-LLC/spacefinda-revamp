import React from "react";
import PageHeading from "../page-heading";
import InfoRow from "./info-row";
import GovernmentIdentity from "./government-identity";
import { DUMMY_USER } from "@/lib/dummy";

const SECTIONS = [
  {
    title: "Your name",
    description: "Hosts receive your first name only until a booking is confirmed.",
    rows: [{ label: "Name", placeholder: "Let us know what to call you", defaultValue: DUMMY_USER.name }],
  },
  {
    title: "Contact details",
    description: "Changing your email or phone number requires a verification code to confirm the change.",
    rows: [
      { label: "Email address", placeholder: "you@example.com", type: "email", defaultValue: DUMMY_USER.email },
      { label: "Phone number", placeholder: "+234 xxx xxx xxxx", type: "tel", defaultValue: DUMMY_USER.phone },
    ],
  },
  {
    title: "Additional information",
    description: "Optional. Helps build trust with hosts and enriches your profile.",
    rows: [
      { label: "Date of birth", placeholder: "Fill the day you were born", type: "date" },
      { label: "Residential address", placeholder: "Let us know where you live" },
      { label: "Emergency contact", placeholder: "Let us know who to contact in case of emergency" },
    ],
  },
];

export default function PersonalDetails() {
  return (
    <div className="max-w-192">
      <PageHeading
        title="Personal information"
        description="Your private account information. Used for bookings and identity verification."
      />

      {SECTIONS.map((section) => (
        <section key={section.title} className="pt-6 border-b border-light-Grey">
          <h2 className="text-lg font-medium text-Text-dark">{section.title}</h2>
          <p className="mt-2 text-sm md:text-base text-Text-body-text">{section.description}</p>
          <div>
            {section.rows.map((row) => (
              <InfoRow key={row.label} {...row} />
            ))}
          </div>
        </section>
      ))}

      <div className="mt-8">
        <GovernmentIdentity status={DUMMY_USER.verificationStatus} />
      </div>
    </div>
  );
}
