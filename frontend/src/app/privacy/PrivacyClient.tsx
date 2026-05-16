"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowUp, FileText, ChevronRight, Info } from "lucide-react";

export default function PrivacyClient() {
  const [activeSection, setActiveSection] = useState("who-we-are");

  const sections = [
    { id: "who-we-are", label: "1. Who We Are" },
    { id: "info-collect", label: "2. Information We Collect" },
    { id: "how-use", label: "3. How We Use Information" },
    { id: "sharing", label: "4. Sharing of Information" },
    { id: "cookies", label: "5. Cookies & Analytics" },
    { id: "security", label: "6. Data Security" },
    { id: "rights", label: "7. Your Rights" },
    { id: "children", label: "8. Children’s Privacy" },
    { id: "intl", label: "9. International Transfers" },
    { id: "changes", label: "10. Changes" },
    { id: "contact", label: "11. Contact" },
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
            Privacy Policy.
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
            <section id="who-we-are" className="scroll-mt-32 space-y-4">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-3 flex items-center gap-3">
                <span className="text-primary font-black">1.</span> Who We Are
              </h2>
              <p className="text-zinc-300 leading-relaxed font-medium">
                Natya Arts operates <span className="text-white font-semibold">natyaarts.com</span>. You can contact us at <a href="mailto:info@natyaarts.com" className="text-primary hover:underline font-semibold">info@natyaarts.com</a>.
              </p>
            </section>

            {/* Section 2 */}
            <section id="info-collect" className="scroll-mt-32 space-y-4">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-3 flex items-center gap-3">
                <span className="text-primary font-black">2.</span> Information We Collect
              </h2>
              <ul className="space-y-3 pl-5 list-disc text-zinc-300 font-medium">
                <li><strong className="text-white">Information you provide:</strong> name, email, phone, billing details, messages.</li>
                <li><strong className="text-white">Automatic data:</strong> IP address, device info, pages viewed, approximate location.</li>
                <li><strong className="text-white">Payment data:</strong> processed by payment partners (e.g., Stripe). We do not store full card details on our servers.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section id="how-use" className="scroll-mt-32 space-y-4">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-3 flex items-center gap-3">
                <span className="text-primary font-black">3.</span> How We Use Information
              </h2>
              <ul className="space-y-3 pl-5 list-disc text-zinc-300 font-medium">
                <li>Provide and improve our services and customer support</li>
                <li>Process payments and manage orders/subscriptions</li>
                <li>Send service-related messages (receipts, reminders, updates)</li>
                <li>Security, fraud prevention, and legal compliance</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section id="sharing" className="scroll-mt-32 space-y-4">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-3 flex items-center gap-3">
                <span className="text-primary font-black">4.</span> Sharing of Information
              </h2>
              <p className="text-zinc-300 leading-relaxed font-medium">
                We may share information with trusted service providers (e.g., payment processors, hosting, analytics) only as necessary to deliver our services or comply with the law.
              </p>
            </section>

            {/* Section 5 */}
            <section id="cookies" className="scroll-mt-32 space-y-4">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-3 flex items-center gap-3">
                <span className="text-primary font-black">5.</span> Cookies & Analytics
              </h2>
              <p className="text-zinc-300 leading-relaxed font-medium mb-4">
                We use cookies or similar technologies to operate the site and understand usage. You can control cookies via your browser settings. Disabling some cookies may impact functionality.
              </p>
              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 flex items-start gap-3 text-zinc-400 text-xs leading-relaxed font-medium">
                <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span><strong className="text-white">Tip:</strong> Most browsers let you clear or block cookies from their Settings → Privacy screens.</span>
              </div>
            </section>

            {/* Section 6 */}
            <section id="security" className="scroll-mt-32 space-y-4">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-3 flex items-center gap-3">
                <span className="text-primary font-black">6.</span> Data Security
              </h2>
              <p className="text-zinc-300 leading-relaxed font-medium">
                We implement reasonable technical and organizational measures to protect personal data. However, no method of transmission or storage is 100% secure.
              </p>
            </section>

            {/* Section 7 */}
            <section id="rights" className="scroll-mt-32 space-y-4">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-3 flex items-center gap-3">
                <span className="text-primary font-black">7.</span> Your Rights
              </h2>
              <p className="text-zinc-300 leading-relaxed font-medium">
                Subject to applicable law, you may request access, correction, deletion, or restriction of your personal data by emailing <a href="mailto:info@natyaarts.com" className="text-primary hover:underline font-semibold">info@natyaarts.com</a>.
              </p>
            </section>

            {/* Section 8 */}
            <section id="children" className="scroll-mt-32 space-y-4">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-3 flex items-center gap-3">
                <span className="text-primary font-black">8.</span> Children’s Privacy
              </h2>
              <p className="text-zinc-300 leading-relaxed font-medium">
                Our services are not directed to children under the age required by local law without appropriate consent. If you believe a child has provided personal data, contact us to delete it.
              </p>
            </section>

            {/* Section 9 */}
            <section id="intl" className="scroll-mt-32 space-y-4">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-3 flex items-center gap-3">
                <span className="text-primary font-black">9.</span> International Transfers
              </h2>
              <p className="text-zinc-300 leading-relaxed font-medium">
                Your data may be processed in countries other than your own. We take steps to protect personal data in accordance with this policy.
              </p>
            </section>

            {/* Section 10 */}
            <section id="changes" className="scroll-mt-32 space-y-4">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-3 flex items-center gap-3">
                <span className="text-primary font-black">10.</span> Changes
              </h2>
              <p className="text-zinc-300 leading-relaxed font-medium">
                We may update this Privacy Policy as needed. We’ll post the new version on this page with an updated date.
              </p>
            </section>

            {/* Section 11 */}
            <section id="contact" className="scroll-mt-32 space-y-4">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-3 flex items-center gap-3">
                <span className="text-primary font-black">11.</span> Contact
              </h2>
              <p className="text-zinc-300 leading-relaxed font-medium">
                For privacy questions or requests, email <a href="mailto:info@natyaarts.com" className="text-primary hover:underline font-semibold">info@natyaarts.com</a>.
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
