import React from "react";
import Link from "next/link";
import Image from "next/image";
import Wrapper from "@/components/wrapper/wrapper";
import Logo from "@/public/icons/logo.svg";
import { FacebookIcon, InstagramIcon, LinkeDinIcon, TwitterIcon } from "../icons/icons";

export default function HomeFooter() {
  return (
    <footer className="bg-black pt-24 pb-12 text-white overflow-hidden">
      <Wrapper>
        <div className="flex flex-col md:flex-row justify-between gap-16 sm:mb-24">
          <div className="space-y-6 flex-1">
            <Link href="/">
              <Image src={Logo} alt="Logo" className="text-white w-35 h-auto" />
            </Link>
            <p className="text-Text-Text-Light leading-relaxed text-sm">
              A trust-first short-let and workspace booking <br/>platform. Built for Nigeria, starting in Ibadan.
            </p>
          </div>
          
          <div className="lg:w-1/3 grid grid-cols-2 md:grid-cols-3 gap-12 flex-1 max-w-2xl">
            <div className="space-y-6">
              <h4 className="font-bold text-white uppercase text-xs tracking-widest">Company</h4>
              <ul className="space-y-4 text-Text-Text-Light text-sm">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white transition-colors">How it works</Link></li>
                <li><Link href="/safety" className="hover:text-white transition-colors">Trust & Safety</Link></li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h4 className="font-bold text-white uppercase text-xs tracking-widest">Resources</h4>
              <ul className="space-y-4 text-Text-Text-Light text-sm">
                <li><Link href="/listings" className="hover:text-white transition-colors">Browse listings</Link></li>
                <li><Link href="/help" className="hover:text-white transition-colors">Help centre</Link></li>
                <li><Link href="/support" className="hover:text-white transition-colors">Contact support</Link></li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h4 className="font-bold text-white uppercase text-xs tracking-widest">Legal</h4>
              <ul className="space-y-4 text-Text-Text-Light text-sm">
                <li><Link href="/list" className="hover:text-white transition-colors">List your space</Link></li>
                <li><Link href="/guide" className="hover:text-white transition-colors">Owner guide</Link></li>
                <li><Link href="/payouts" className="hover:text-white transition-colors">Payout info</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 mb-16">
          <p className="text-Text-Text-Light text-sm">© 2025 SpaceFinda. All Rights Reserved.</p>
          <div className="flex items-center gap-8 text-white/40 text-sm">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of service</Link>
          </div>
        </div>

        <ul className="flex md:hidden gap-2">
          <li>
            <Link href="https://twitter.com/spacefinda" target="_blank" rel="noopener noreferrer">
              <TwitterIcon />
            </Link>
          </li>
          <li>
            <Link href="https://www.linkedin.com/company/spacefinda" target="_blank" rel="noopener noreferrer">
              <LinkeDinIcon />
            </Link>
          </li>
          <li>
            <Link href="https://www.instagram.com/spacefinda" target="_blank" rel="noopener noreferrer">
              <InstagramIcon />
            </Link>
          </li>
          <li>
            <Link href="https://www.facebook.com/spacefinda" target="_blank" rel="noopener noreferrer">
              <FacebookIcon />
            </Link>
          </li>
        </ul>

        <div className="relative w-full aspect-1280/200 mt-12">
          <Image src="/icons/name.png" alt="SPACE FINDA" fill className="object-contain object-bottom " />
        </div>
      </Wrapper>
    </footer>
  );
}
