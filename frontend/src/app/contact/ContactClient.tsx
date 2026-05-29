"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle, ArrowUpRight, Sparkles, MessageSquare } from "lucide-react";
import { API_URL } from "@/config/api";

// Custom crisp SVG icons for 100% build reliability
const TwitterIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export default function ContactClient() {
  const [contactInfo, setContactInfo] = useState<any>({
    address: "Natya Arts, SG Arcade, KT Gopalan Rd, Kottooli, Kozhikode, Kerala 673016",
    phone: "+91 75598 61455",
    whatsapp: "+91 75598 61455",
    email: "info@natyaarts.com",
    twitter: "https://twitter.com/natyaarts",
    instagram: "https://instagram.com/natyaarts",
    facebook: "https://facebook.com/natyaarts",
  });

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    preferred_time: "Anytime",
    interest: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/contact-info/`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setContactInfo(data[0]);
        }
      })
      .catch((err) => console.error("Failed to fetch contact info:", err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile) {
      setError("Please fill in all required fields (Full Name and Phone/WhatsApp).");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/call-requests/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          mobile: "",
          email: "",
          preferred_time: "Anytime",
          interest: "",
          message: "",
        });
      } else {
        const errData = await res.json();
        setError(errData.detail || "Failed to submit request. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const cleanWhatsapp = contactInfo.whatsapp.replace(/[^0-9]/g, "");

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Background glowing accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] pointer-events-none z-0"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-[128px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/80 border border-primary/30 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-primary mb-6 shadow-xl backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5" /> Connect With Us
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-4"
          >
            Contact Natyaarts.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-zinc-400 font-normal max-w-2xl leading-relaxed"
          >
            We’d love to hear from you. Questions about courses, schedules, or fees? Reach out and a course advisor will guide you to the right path. You can also request a quick call back using the form below.
          </motion.p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact Details (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-10"
          >
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-white mb-8 border-b border-white/10 pb-4">
                Get in touch
              </h2>
              <div className="space-y-8">
                {/* Phone / WhatsApp */}
                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black group-hover:scale-110 transition-all duration-300 shrink-0 shadow-lg mt-1">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-1">Phone / WhatsApp</div>
                    <div className="text-base font-semibold text-white mb-1">{contactInfo.phone}</div>
                    <a
                      href={`https://wa.me/${cleanWhatsapp}?text=I%20am%20interested%20in%20enquiring%20about%20Natyaarts%20courses`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                    >
                      Chat on WhatsApp <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black group-hover:scale-110 transition-all duration-300 shrink-0 shadow-lg mt-1">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-1">Email</div>
                    <a href={`mailto:${contactInfo.email}`} className="text-base font-semibold text-white hover:text-primary transition-colors">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black group-hover:scale-110 transition-all duration-300 shrink-0 shadow-lg mt-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-1">Address</div>
                    <div className="text-sm text-zinc-300 leading-relaxed font-normal">
                      {contactInfo.address}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <div className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-4">Social</div>
              <div className="flex items-center gap-4">
                {contactInfo.twitter && (
                  <a
                    href={contactInfo.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full bg-zinc-900 border border-white/10 hover:border-primary/40 hover:bg-primary/10 hover:text-primary transition-all text-xs font-bold tracking-wider uppercase flex items-center gap-2 shadow-lg"
                  >
                    <TwitterIcon className="w-3.5 h-3.5" /> Twitter
                  </a>
                )}
                {contactInfo.instagram && (
                  <a
                    href={contactInfo.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full bg-zinc-900 border border-white/10 hover:border-primary/40 hover:bg-primary/10 hover:text-primary transition-all text-xs font-bold tracking-wider uppercase flex items-center gap-2 shadow-lg"
                  >
                    <InstagramIcon className="w-3.5 h-3.5" /> Instagram
                  </a>
                )}
                {contactInfo.facebook && (
                  <a
                    href={contactInfo.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full bg-zinc-900 border border-white/10 hover:border-primary/40 hover:bg-primary/10 hover:text-primary transition-all text-xs font-bold tracking-wider uppercase flex items-center gap-2 shadow-lg"
                  >
                    <FacebookIcon className="w-3.5 h-3.5" /> Facebook
                  </a>
                )}
              </div>
            </div>

            {/* Footer note */}
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/5 text-xs text-zinc-500 leading-relaxed font-medium">
              For account, billing or refund questions, see our{" "}
              <Link href="/refund" className="text-zinc-300 underline hover:text-primary">Refund Policy</Link> and{" "}
              <Link href="/privacy" className="text-zinc-300 underline hover:text-primary">Privacy Policy</Link>.
            </div>
          </motion.div>

          {/* Right Column: Call Back Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 bg-gradient-to-b from-zinc-900/40 via-zinc-950/80 to-zinc-950 border border-white/10 hover:border-primary/30 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

            <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white mb-2 leading-snug">
              Request a Call Back
            </h2>
            <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mb-6 font-normal">
              Share a few details and we’ll help you pick the right course and schedule.
            </p>

            <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-8 pb-4 border-b border-white/10">
              All fields marked with * are required.
            </div>

            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-16 text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center text-primary mx-auto shadow-[0_0_30px_rgba(255,215,0,0.2)]">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Request Received!</h3>
                  <p className="text-zinc-400 text-base max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out. A course advisor will review your preferences and call you within 1–2 business days.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="px-8 py-3.5 rounded-full bg-white text-black font-bold tracking-widest text-xs uppercase hover:bg-primary transition-all shadow-xl cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {error && (
                    <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-400 text-sm font-medium">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                      className="w-full px-5 py-4 rounded-2xl bg-zinc-900/60 border border-white/10 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all backdrop-blur-md"
                    />
                  </div>

                  {/* Phone / WhatsApp */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                      Phone / WhatsApp*
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-5 text-zinc-500 font-bold text-sm">+91</span>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="9876543210"
                        required
                        className="w-full pl-14 pr-5 py-4 rounded-2xl bg-zinc-900/60 border border-white/10 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all backdrop-blur-md font-medium"
                      />
                    </div>
                    <div className="text-[11px] text-zinc-500 font-medium pl-1">
                      Detected country: India.
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                      Email (optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full px-5 py-4 rounded-2xl bg-zinc-900/60 border border-white/10 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all backdrop-blur-md"
                    />
                  </div>

                  {/* Preferred Time */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                      Preferred Time (optional)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {["Anytime", "Morning", "Afternoon", "Evening"].map((time) => (
                        <button
                          type="button"
                          key={time}
                          onClick={() => setFormData({ ...formData, preferred_time: time })}
                          className={`py-3 rounded-xl border text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                            formData.preferred_time === time
                              ? "bg-primary text-black border-primary shadow-lg shadow-primary/20 font-black"
                              : "bg-zinc-900/40 border-white/10 text-zinc-400 hover:border-white/30 hover:text-white"
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5" /> {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Interest */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                      What are you interested in? (optional)
                    </label>
                    <input
                      type="text"
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      placeholder="e.g., Bharatanatyam, Carnatic vocals, Mridangam"
                      className="w-full px-5 py-4 rounded-2xl bg-zinc-900/60 border border-white/10 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all backdrop-blur-md"
                    />
                  </div>

                  {/* Anything else */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                      Anything else we should know? (optional)
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Kerala, India / Your message or query"
                      className="w-full px-5 py-4 rounded-2xl bg-zinc-900/60 border border-white/10 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all backdrop-blur-md resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10">
                    <div className="text-xs text-zinc-400 font-medium">
                      We’ll call you within 1–2 business days.
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-bold tracking-widest text-xs uppercase hover:bg-primary transition-all duration-300 shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Request Call Back <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
