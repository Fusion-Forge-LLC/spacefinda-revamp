import React from "react";
import Image from "next/image";
import Wrapper from "@/components/wrapper/wrapper";

const SIGNALS = [
  {
    icon: "/icons/verify.svg",
    title: "Verified listings only",
    desc: "Every property reviewed by our team before going live",
  },
  {
    icon: "/icons/card.svg",
    title: "Payment held until check-in",
    desc: "Your money is secure and released only on arrival day",
  },
  {
    icon: "/icons/clock.svg",
    title: "48-hour damage protection",
    desc: "Caution fee held after checkout to protect both sides",
  },
];

export default function TrustSignals() {
  return (
    <section className="bg-primary-background py-12">
      <Wrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:divide-x divide-white/10">
          {SIGNALS.map((signal, index) => (
            <div key={index} className="flex items-center gap-5 md:px-8 first:pl-0 last:pr-0">
              <div className="h-12 w-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                <Image src={signal.icon} alt={signal.title} width={24} height={24} className="brightness-0 invert" />
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
