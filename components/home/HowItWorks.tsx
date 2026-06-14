import React from "react";
import Image from "next/image";
import Wrapper from "@/components/wrapper/wrapper";

const STEPS = [
  {
    icon: "/icons/search-big.svg",
    number: "01",
    title: "Find your stay",
    desc: "Browse verified shortlet apartments in Ibadan. Every listing is reviewed before it goes live, so what you see is what you can expect.",
  },
  {
    icon: "/icons/card-big.svg",
    number: "02",
    title: "Book and pay securely",
    desc: "Pay through SpaceFinda with confidence. Your payment is protected until check in, and eligible cancellations are refunded automatically.",
  },
  {
    icon: "/icons/key.svg",
    number: "03",
    title: "Check in with confidence",
    desc: "Your host is verified, your booking is confirmed, and your payment is protected. Arrive knowing everything is ready for your stay.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <Wrapper>
        <div className="max-w-xl mb-16">
          <h2 className="text-4xl font-bricolage font-bold text-[#333333] mb-4">How SpaceFinda works</h2>
          <p className="text-[#666666]">Booking a space should feel safe. Here's how we make that happen.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((step, index) => (
            <div key={index} className="bg-[#FBFBFB] p-10 rounded-3xl relative overflow-hidden group hover:bg-white hover:shadow-xl transition-all duration-300">
              <div className="relative z-10 space-y-8">
                <div className="h-14 w-14 bg-blue rounded-2xl flex items-center justify-center shadow-lg shadow-blue/20 mx-auto">
                  <Image src={step.icon} alt={step.title} width={28} height={28} className="brightness-0 invert" />
                </div>

                <div className="space-y-3 text-center">
                  <h3 className="text-xl font-medium text-Text-Dark">{step.title}</h3>
                  <p className="text-Text-body-text leading-relaxed font-['Geist'] self-stretch text-base ">
                    {step.desc}
                  </p>
                </div>
              </div>
              
              <div className="absolute top-8 right-8 text-7xl font-bold text-gray-100 select-none group-hover:text-gray-200 transition-colors">
                {step.number}
              </div>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  );
}
