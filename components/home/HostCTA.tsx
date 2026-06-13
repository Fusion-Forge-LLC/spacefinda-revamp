import React from "react";
import Wrapper from "@/components/wrapper/wrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HostCTA() {
  return (
    <section className="py-24 bg-navy text-center">
      <Wrapper>
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-bricolage font-bold text-white">Have a space in Nigeria?</h2>
          <p className="text-white text-lg">
            List your shortlet apartment on SpaceFinda and reach verified renters. 
            Get paid automatically on check in day, with no chasing or delays.
          </p>
          <Link href="/auth/business" className="inline-block">
            <Button className="bg-white hover:scale-105 transition-all text-primary hover:bg-gray-100 px-10 py-7 rounded-xl font-bold text-lg">
              List your shortlet
            </Button>
          </Link>
        </div>
      </Wrapper>
    </section>
  );
}
