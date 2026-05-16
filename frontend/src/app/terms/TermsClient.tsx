"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowUp, FileText, ChevronRight } from "lucide-react";

export default function TermsClient() {
  const [activeSection, setActiveSection] = useState("acceptance");

  const sections = [
    { id: "acceptance", label: "1. Acceptance of Terms" },
    { id: "services", label: "2. Services" },
    { id: "accounts", label: "3. Accounts & Eligibility" },
    { id: "payments", label: "4. Payments" },
    { id: "pricing", label: "5. Pricing, Taxes & Billing" },
    { id: "ip", label: "6. Intellectual Property" },
    { id: "acceptable-use", label: "7. Acceptable Use" },
    { id: "refunds", label: "8. Cancellations & Refunds" },
    { id: "links", label: "9. Third-Party Links" },
    { id: "liability", label: "10. Limitation of Liability" },
    { id: "changes", label: "11. Changes to Terms" },
    { id: "contact", label: "12. Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 120,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-32 pb-24 px-6 relative">
      {/* Glowing background accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] pointer-events-none z-0"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-[128px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16 border-b border-white/10 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/80 border border-primary/30 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-primary mb-6 shadow-xl backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5" /> Legal & Policy
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4"
          >
            Terms & Conditions.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm md:text-base text-zinc-400 font-medium max-w-2xl"
          >
            Last updated: May 16, 2026
          </motion.p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Sticky Sidebar Navigation (4 cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 self-start space-y-6 hidden lg:block">
            <div className="p-8 rounded-3xl bg-zinc-900/40 border border-white/10 backdrop-blur-xl shadow-2xl">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-300 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" /> On this page
              </h3>
              <p className="text-xs text-zinc-500 mb-6 font-medium">Tip: use these links to jump around.</p>
              
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center justify-between group cursor-pointer ${
                      activeSection === section.id
                        ? "bg-primary/10 text-primary border border-primary/20 shadow-md"
                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{section.label}</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeSection === section.id ? "translate-x-0 text-primary" : "-translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"}`} />
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content (8 cols) */}
          <div className="lg:col-span-8 space-y-16 text-zinc-300 text-sm md:text-base leading-relaxed font-normal">
            {/* Mobile Table of Contents */}
            <div className="lg:hidden p-6 rounded-2xl bg-zinc-900/40 border border-white/10 mb-12">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-300 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" /> On this page
              </h3>
              <p className="text-[11px] text-zinc-500 mb-4 font-medium">Tip: use these links to jump around.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="text-left px-3 py-2 rounded-lg text-xs font-medium text-zinc-400 hover:bg-white/5 hover:text-white border border-white/5"
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Section 1 */}
            <section id="acceptance" className="scroll-mt-32 space-y-4">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-3 flex items-center gap-3">
                <span className="text-primary font-black">1.</span> Acceptance of Terms
              </h2>
              <p className="text-zinc-300 leading-relaxed font-medium">
                By accessing or using <span className="text-white font-semibold">natyaarts.com</span> and any related services, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our services.
              </p>
            </section>

            {/* Section 2 */}
            <section id="services" className="scroll-mt-32 space-y-4">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-3 flex items-center gap-3">
                <span className="text-primary font-black">2.</span> Services
              </h2>
              <p className="text-zinc-300 leading-relaxed font-medium">
                Natya Arts provides arts learning content and related services (“Services”). We may update or modify features from time to time.
              </p>
            </section>

            {/* Section 3 */}
            <section id="accounts" className="scroll-mt-32 space-y-4">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-3 flex items-center gap-3">
                <span className="text-primary font-black">3.</span> Accounts & Eligibility
              </h2>
              <p className="text-zinc-300 leading-relaxed font-medium">
                You are responsible for maintaining the confidentiality of your account and for all activities under it. You must provide accurate information and promptly update any changes.
              </p>
            </section>

            {/* Section 4 */}
            <section id="payments" className="scroll-mt-32 space-y-4">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-3 flex items-center gap-3">
                <span className="text-primary font-black">4.</span> Payments
              </h2>
              <p className="text-zinc-300 leading-relaxed font-medium">
                Payments are processed securely by our payment partners (including Stripe). By submitting a payment, you authorize the transaction and agree to the pricing and terms shown at checkout.
              </p>
            </section>

            {/* Section 5 */}
            <section id="pricing" className="scroll-mt-32 space-y-4">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-3 flex items-center gap-3">
                <span className="text-primary font-black">5.</span> Pricing, Taxes & Billing
              </h2>
              <p className="text-zinc-300 leading-relaxed font-medium">
                All prices are shown inclusive/exclusive of taxes as indicated at checkout. You are responsible for any applicable taxes, duties, or government charges unless stated otherwise.
              </p>
            </section>

            {/* Section 6 */}
            <section id="ip" className="scroll-mt-32 space-y-4">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-3 flex items-center gap-3">
                <span className="text-primary font-black">6.</span> Intellectual Property
              </h2>
              <p className="text-zinc-300 leading-relaxed font-medium">
                All content, course materials, images, logos, and trademarks on our website are owned by Natya Arts or its licensors and are protected by applicable laws. You may not copy, modify, or redistribute content without permission.
              </p>
            </section>

            {/* Section 7 */}
            <section id="acceptable-use" className="scroll-mt-32 space-y-4">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-3 flex items-center gap-3">
                <span className="text-primary font-black">7.</span> Acceptable Use
              </h2>
              <ul className="space-y-3 pl-5 list-disc text-zinc-300 font-medium">
                <li>No unauthorized access attempts or security interference</li>
                <li>No unlawful, harmful, or abusive activity</li>
                <li>No reverse-engineering, scraping, or automated misuse that degrades the service</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section id="refunds" className="scroll-mt-32 space-y-4">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-3 flex items-center gap-3">
                <span className="text-primary font-black">8.</span> Cancellations & Refunds
              </h2>
              <p className="text-zinc-300 leading-relaxed font-medium">
                Please refer to our <a href="/refund" className="text-primary hover:underline font-semibold">Refund Policy</a> for details on eligibility and how refunds are processed.
              </p>
            </section>

            {/* Section 9 */}
            <section id="links" className="scroll-mt-32 space-y-4">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-3 flex items-center gap-3">
                <span className="text-primary font-black">9.</span> Third-Party Links
              </h2>
              <p className="text-zinc-300 leading-relaxed font-medium">
                Our site may contain links to third-party sites. We are not responsible for their content or policies.
              </p>
            </section>

            {/* Section 10 */}
            <section id="liability" className="scroll-mt-32 space-y-4">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-3 flex items-center gap-3">
                <span className="text-primary font-black">10.</span> Limitation of Liability
              </h2>
              <p className="text-zinc-300 leading-relaxed font-medium">
                To the maximum extent permitted by law, Natya Arts shall not be liable for indirect, incidental, special, or consequential damages arising from your use of the Services.
              </p>
            </section>

            {/* Section 11 */}
            <section id="changes" className="scroll-mt-32 space-y-4">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-3 flex items-center gap-3">
                <span className="text-primary font-black">11.</span> Changes to Terms
              </h2>
              <p className="text-zinc-300 leading-relaxed font-medium">
                We may update these Terms from time to time. Continued use of the Services after changes means you accept the revised Terms.
              </p>
            </section>

            {/* Section 12 */}
            <section id="contact" className="scroll-mt-32 space-y-4">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-3 flex items-center gap-3">
                <span className="text-primary font-black">12.</span> Contact
              </h2>
              <p className="text-zinc-300 leading-relaxed font-medium">
                Questions about these Terms? Email us at <a href="mailto:info@natyaarts.com" className="text-primary hover:underline font-semibold">info@natyaarts.com</a>.
              </p>
            </section>

            {/* Back to Top */}
            <div className="pt-12 border-t border-white/10 flex items-center justify-between">
              <div className="text-xs text-zinc-500 font-medium">© 2026 Natya Arts. All rights reserved.</div>
              <button
                onClick={scrollToTop}
                className="px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-primary/40 hover:bg-primary/10 hover:text-primary transition-all text-xs font-bold tracking-widest uppercase flex items-center gap-2 text-zinc-300 cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" /> Back to top
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
