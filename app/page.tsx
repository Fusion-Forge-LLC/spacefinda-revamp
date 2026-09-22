import React from "react";
import HomeHeader from "@/components/home/HomeHeader";
import Hero from "@/components/home/Hero";
import TrustSignals from "@/components/home/TrustSignals";
import PropertyGrid from "@/components/home/PropertyGrid";
import ExpansionGrid from "@/components/home/ExpansionGrid";
import HowItWorks from "@/components/home/HowItWorks";
import HostCTA from "@/components/home/HostCTA";
import HeroHeader from "@/components/home/hero-header";
import Footer from "@/components/footer/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FEFEFE]">
      <HeroHeader />
      <TrustSignals />
      <PropertyGrid 
        title="Spaces in Ibadan" 
        subtitle="All listings are reviewed and verified by SpaceFinda before going live." 
        showListingLink
      />
      <ExpansionGrid />
      <HowItWorks />
      <HostCTA />
      <Footer />
    </main>
  );
}
