import React from "react";
import Image from "next/image";
import Wrapper from "@/components/wrapper/wrapper";
import { CardIcon, ClockIcon, VerifyIcon } from "../icons/icons";

const SIGNALS = [
  {
    icon: VerifyIcon,
    title: "Verified listings only",
    desc: "Every property reviewed by our team before going live",
  },
  {
    icon: CardIcon,
    title: "Payment held until check-in",
    desc: "Your money is secure and released only on arrival day",
  },
  {
    icon: ClockIcon,
    title: "48-hour damage protection",
    desc: "Caution fee held after checkout to protect both sides",
  },
];

export default function TrustSignals() {
  return (
    <section className="bg-primary-background py-12">
      <Wrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8 md:divide-x divide-white/10">
          {SIGNALS.map((signal, index) => (
            <div key={index} className="flex items-center gap-5 md:px-4 lg:px-8 first:pl-0 last:pr-0">
              <div className="h-10 w-10 md:h-12 md:w-12 bg-primary-containers rounded-lg flex items-center justify-center shrink-0">
                <signal.icon />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-white">{signal.title}</h4>
                <p className="text-sm text-white/60 leading-snug">{signal.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  );
}
