"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-zinc-800 relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand & Description */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link href="/" className="mb-6 inline-block overflow-visible">
              <div className="relative h-12 w-32 flex items-center justify-start">
                <Image 
                  src="/img/logo1.png" 
                  alt="Natyaarts Logo" 
                  width={160} 
                  height={60} 
                  className="absolute object-contain scale-[1.5] origin-left" 
                />
              </div>
            </Link>
            <p className="text-zinc-400 leading-relaxed mb-8">
              Learn Indian classical dance & music with caring, verified tutors. Live and recorded classes, structured paths, real progress.
            </p>
            
            {/* App Downloads */}
            <div className="flex flex-col gap-3 w-full">
              <a 
                href="https://play.google.com/store/apps/details?id=app.natya&pcampaignid=web_share" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 hover:bg-zinc-800 transition-colors w-max"
              >
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-400 leading-tight">GET IT ON</span>
                  <span className="text-sm font-bold leading-tight">Google Play</span>
                </div>
              </a>
              <a 
                href="https://apps.apple.com/in/app/natya-arts/id6752331629" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 hover:bg-zinc-800 transition-colors w-max"
              >
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-400 leading-tight">Download on the</span>
                  <span className="text-sm font-bold leading-tight">App Store</span>
                </div>
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-lg mb-6 tracking-wide">Explore</h4>
            <ul className="space-y-4 text-zinc-400">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
              <li><Link href="/career" className="hover:text-primary transition-colors">Career</Link></li>
              <li><Link href="/courses" className="hover:text-primary transition-colors">Courses</Link></li>
            </ul>
          </div>

          {/* Popular Courses */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-lg mb-6 tracking-wide">Courses</h4>
            <ul className="space-y-4 text-zinc-400">
              <li><Link href="/courses" className="hover:text-primary transition-colors">Popular Courses</Link></li>
              <li><Link href="/courses" className="text-primary hover:text-white transition-colors flex items-center gap-2">See all courses <ArrowRight size={14} /></Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4">
            <h4 className="font-bold text-lg mb-6 tracking-wide">Stay in the loop</h4>
            <p className="text-zinc-400 mb-6">
              Get class updates and free learning tips.
            </p>
            <form className="flex flex-col gap-3">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-zinc-900 border border-zinc-800 text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-primary text-black font-bold py-3 rounded-xl hover:bg-yellow-400 transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-zinc-600 mt-4 text-center">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Bottom Links */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 text-sm text-zinc-500">
            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <span className="text-zinc-700">·</span>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="text-zinc-700">·</span>
            <Link href="/refund" className="hover:text-white transition-colors">Refund Policy</Link>
            <span className="text-zinc-700">·</span>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <span className="text-zinc-700">·</span>
            <a href="https://learn.natyaarts.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-white font-semibold transition-colors">Sign Up</a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/natyaartslearning/?hl=en" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-zinc-900 flex items-center justify-center rounded-full text-zinc-400 hover:bg-primary hover:text-black transition-all" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://www.facebook.com/natyaartslearning/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-zinc-900 flex items-center justify-center rounded-full text-zinc-400 hover:bg-primary hover:text-black transition-all" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://x.com/natyalearning?lang=en" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-zinc-900 flex items-center justify-center rounded-full text-zinc-400 hover:bg-primary hover:text-black transition-all" aria-label="X (Twitter)">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-zinc-600 text-sm mt-8">
          © {new Date().getFullYear()} Natyaarts. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
