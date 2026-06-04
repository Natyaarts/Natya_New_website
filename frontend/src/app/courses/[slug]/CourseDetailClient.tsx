"use client";

import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, Sparkles, BookOpen, Award, CheckCircle2, ShieldCheck, Clock } from "lucide-react";
import Link from "next/link";
import { API_URL } from "@/config/api";

interface CourseDetailClientProps {
  course: {
    id: number;
    category: number;
    category_name: string;
    title: string;
    image: string;
    description: string;
    button_text: string;
    link: string | null;
    is_active: boolean;
    order: number;
    created_at: string;
  };
}

export default function CourseDetailClient({ course }: CourseDetailClientProps) {
  const imageUrl = course.image 
    ? (course.image.startsWith("http") ? course.image : `${API_URL.replace("/api", "")}${course.image}`)
    : "/img/hero.png";

  const whatsappMessage = `I am interested in learning more about the course: "${course.title}"`;
  const contactLink = course.link || `https://wa.me/918113000000?text=${encodeURIComponent(whatsappMessage)}`;

  // Features list for single course detail
  const features = [
    { icon: Award, title: "Certified Curriculum", desc: "Syllabus aligned with traditional standards and modern performance methods." },
    { icon: BookOpen, title: "Gurus & Master Mentors", desc: "Taught by professional dancers and musicians with years of stage experience." },
    { icon: Clock, title: "Flexible Learning Options", desc: "Available online (one-on-one sessions) and offline at Kozhikode academy." },
    { icon: ShieldCheck, title: "Individualized Assessment", desc: "Receive direct, customized feedback and progress reports from your mentor." }
  ];

  return (
    <main className="flex flex-col bg-black text-white selection:bg-primary selection:text-black min-h-screen pt-32 pb-24">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-zinc-800/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <Link 
            href="/courses" 
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-semibold group text-sm tracking-wider uppercase cursor-pointer"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Courses
          </Link>
        </motion.div>

        {/* Content Layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Media & Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-5 w-full"
          >
            <div className="relative aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 bg-zinc-950 shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
              <img 
                src={imageUrl} 
                alt={course.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Category tag */}
              <div className="absolute top-8 left-8 z-20 flex items-center gap-1.5 px-4 py-2 bg-black/85 backdrop-blur-md border border-primary/30 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-primary shadow-xl">
                <Sparkles size={12} className="text-primary" />
                {course.category_name}
              </div>
            </div>

            {/* Quick stats / summary */}
            <div className="mt-8 grid grid-cols-2 gap-4 p-6 bg-zinc-950/60 rounded-3xl border border-white/5 backdrop-blur-xl">
              <div>
                <div className="text-[10px] font-bold tracking-widest uppercase text-zinc-500 mb-1">Access</div>
                <div className="text-sm font-semibold text-zinc-200">Global (Online & Offline)</div>
              </div>
              <div>
                <div className="text-[10px] font-bold tracking-widest uppercase text-zinc-500 mb-1">Pace</div>
                <div className="text-sm font-semibold text-zinc-200">Self-paced / Mentored</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Information & Enquire */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col justify-center h-full"
          >
            {/* Header info */}
            <div className="border-b border-white/10 pb-8 mb-8">
              <div className="text-primary text-xs font-bold tracking-[0.25em] uppercase mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                Enrollment Open
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
                {course.title}
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-normal">
                {course.description}
              </p>
            </div>

            {/* Structured Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {features.map((feat, idx) => {
                const IconComponent = feat.icon;
                return (
                  <div key={idx} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-900/80 border border-white/5 flex items-center justify-center text-primary shrink-0">
                      <IconComponent size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white tracking-wide text-sm mb-1">{feat.title}</h4>
                      <p className="text-zinc-500 text-xs leading-relaxed font-medium">{feat.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center p-6 bg-gradient-to-r from-zinc-950/80 to-zinc-900/30 rounded-[2rem] border border-white/10 shadow-2xl backdrop-blur-xl">
              <div className="flex-1">
                <h3 className="font-bold text-white text-sm tracking-wide mb-1">Ready to Master the Art?</h3>
                <p className="text-zinc-400 text-xs font-medium">Get in touch with our admissions counselor for scheduling and fee details.</p>
              </div>
              <a
                href={contactLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4.5 bg-primary text-black font-bold tracking-widest text-xs uppercase rounded-full hover:bg-white transition-all shadow-xl hover:scale-[1.03] cursor-pointer whitespace-nowrap"
              >
                <MessageCircle size={16} className="fill-black" />
                {course.button_text}
              </a>
            </div>

          </motion.div>

        </div>

      </div>
    </main>
  );
}
