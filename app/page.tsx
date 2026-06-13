import React from "react";
import HomeHeader from "@/components/home/HomeHeader";
import Hero from "@/components/home/Hero";
import TrustSignals from "@/components/home/TrustSignals";
import PropertyGrid from "@/components/home/PropertyGrid";
import ExpansionGrid from "@/components/home/ExpansionGrid";
import HowItWorks from "@/components/home/HowItWorks";
import HostCTA from "@/components/home/HostCTA";
import HomeFooter from "@/components/home/HomeFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FEFEFE]">
      <HomeHeader />
      <Hero />
      <TrustSignals />
      <PropertyGrid />
      <ExpansionGrid />
      <HowItWorks />
      <HostCTA />
      <HomeFooter />
    </main>
  );
}
