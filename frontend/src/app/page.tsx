"use client";

import Hero from "@/components/Hero";
import Link from "next/link";
import { ArrowRight, Quote, Sparkles, Target, Eye } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { API_URL } from "@/config/api";

const ScrollText = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "center 50%"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 1], [0.1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <motion.div ref={ref} style={{ opacity, y, scale }} className={className}>
      {children}
    </motion.div>
  );
};

const ScrollCard = ({ children, className = "", index = 0 }: { children: React.ReactNode, className?: string, index?: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "center 70%"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100 + (index * 50), 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  return (
    <motion.div ref={ref} style={{ y, opacity, scale }} className={className}>
      {children}
    </motion.div>
  );
};

const CinematicBreak = () => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const scaleText = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.3]);
  const opacityText = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);

  return (
    <section ref={container} className="relative h-[60vh] md:h-[120vh] w-full overflow-hidden my-32">
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-black to-transparent z-10"></div>
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black to-transparent z-10"></div>
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute inset-0 bg-[url('/img/hero2.png')] bg-cover bg-top"></div>
      </motion.div>
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <motion.h3 style={{ scale: scaleText, opacity: opacityText }} className="text-6xl md:text-[10rem] font-semibold tracking-tighter text-white drop-shadow-2xl">
          Art. <span className="text-zinc-500">Elevated.</span>
        </motion.h3>
      </div>
    </section>
  );
};

const FadeInSection = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const [testimonials, setTestimonials] = useState<any[]>([
    { name: "Ananya S.", location: "USA", text: "Learning Bharatanatyam online seemed impossible until I found Natya. The structured curriculum and live feedback from verified tutors are absolutely incredible." },
    { name: "David M.", location: "UK", text: "The Carnatic vocal teachers are extremely patient and highly qualified. The Natya app makes practicing along with recorded sessions so easy and convenient." },
    { name: "Priya K.", location: "Singapore", text: "I've been a student for 2 years. Kalakshetra Anjali's guidance has transformed my understanding of classical dance completely." }
  ]);

  const [partners, setPartners] = useState<any[]>([
    { name: "PARTNER", subtitle: "ONE", logo: null },
    { name: "GLOBAL", subtitle: "ARTS", logo: null },
    { name: "CULTURE", subtitle: "HUB", logo: null }
  ]);

  useEffect(() => {
    fetch(`${API_URL}/testimonials/`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setTestimonials(data);
        }
      })
      .catch(err => console.error("Error fetching testimonials:", err));

    fetch(`${API_URL}/partners/`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setPartners(data);
        }
      })
      .catch(err => console.error("Error fetching partners:", err));
  }, []);

  return (
    <main className="flex flex-col bg-black text-white selection:bg-primary selection:text-black">
      <Hero />

      {/* Intro Statement */}
      <section className="py-24 md:py-48 px-6 max-w-5xl mx-auto text-center" id="explore">
        <ScrollText>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-zinc-100 leading-snug">
            Natya makes learning Carnatic music, classical dance, and other Indian arts simple, structured, and profoundly beautiful.
          </h2>
        </ScrollText>
        <ScrollText>
          <p className="mt-8 text-xl md:text-2xl lg:text-3xl text-zinc-500 font-medium tracking-tight">
            Live and recorded classes. Experienced teachers. Global community.
          </p>
        </ScrollText>
      </section>

      {/* Cinematic Image Break */}
      <CinematicBreak />

      {/* Mission & Vision - Apple Style Grid */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <ScrollText className="text-center mb-24">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-zinc-500 mb-4">Our Purpose</h2>
          <p className="text-4xl md:text-6xl font-medium tracking-tight text-white">Empowering Indian arts.</p>
          <p className="text-4xl md:text-6xl font-medium tracking-tight text-zinc-600 mt-2">Indian arts for all.</p>
        </ScrollText>

        <div className="grid md:grid-cols-2 gap-6 md:gap-10">
          {/* Mission Card */}
          <ScrollCard index={0} className="relative overflow-hidden bg-gradient-to-br from-[#151515] to-[#0a0a0a] p-8 md:p-12 rounded-[2rem] border border-white/10 flex flex-col justify-between h-[350px] md:h-[400px] group shadow-2xl">
            {/* Ambient animated glow */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-zinc-600/20 rounded-full blur-[120px] group-hover:bg-zinc-500/30 transition-colors duration-1000"></div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-6 backdrop-blur-md">
                <Target className="text-zinc-200" size={24} />
              </div>
              <h3 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-4">Mission.</h3>
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-md font-medium">
                A comprehensive hub dedicated to providing structured platforms and global reach for empowering Indian arts and artists.
              </p>
            </div>
          </ScrollCard>

          {/* Vision Card */}
          <ScrollCard index={1} className="relative overflow-hidden bg-gradient-to-br from-[#151515] to-[#0a0a0a] p-8 md:p-12 rounded-[2rem] border border-white/10 flex flex-col justify-between h-[350px] md:h-[400px] group shadow-2xl">
            {/* Ambient animated glow */}
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px] group-hover:bg-primary/20 transition-colors duration-1000"></div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-6 backdrop-blur-md">
                <Eye className="text-zinc-200" size={24} />
              </div>
              <h3 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-4">Vision.</h3>
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-md font-medium">
                Enhancing accessibility and inclusivity through innovative digital tools to enrich creative expression worldwide.
              </p>
            </div>
          </ScrollCard>
        </div>
      </section>

      {/* Minimalist The Academy Section */}
      <section className="py-32 px-6 max-w-6xl mx-auto border-t border-white/10">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5">
            <ScrollCard index={0}>
              <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white mb-8">The Academy.</h2>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#111] rounded-full text-sm font-medium tracking-widest text-zinc-400 border border-white/5">
                <Sparkles size={14} className="text-primary" />
                Est. 2020
              </div>
            </ScrollCard>
          </div>
          
          <div className="lg:col-span-7">
            <ScrollCard index={1}>
              <p className="text-2xl md:text-3xl text-zinc-300 leading-snug mb-8 font-medium">
                Natya Learning, a leading Art startup based in India, has been a pioneer in the realm of performing arts education by transcending geographical boundaries.
              </p>
              <p className="text-lg md:text-xl text-zinc-500 leading-relaxed mb-12 font-medium">
                Founded by Kalamandalam Sivaprasad and Kalakshetra Anjali, the courses offered span a wide array of disciplines, including Bharathanatyam, Mohiniyattam, Kuchipudi, Kathak, Carnatic music, Yoga, and more. Natya proudly stands as the first-ever dedicated e-learning platform for performing artists.
              </p>
              <Link href="/about" className="text-primary hover:text-white transition-colors flex items-center gap-2 text-xl font-medium group">
                Read the full story <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </ScrollCard>
          </div>
        </div>
      </section>

      {/* Apple-style Testimonials */}
      <section className="py-32 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <ScrollText className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white mb-6">Student Voices.</h2>
            <p className="text-2xl text-zinc-500 font-medium">Hear from our global community.</p>
          </ScrollText>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <ScrollCard key={i} index={i} className="relative overflow-hidden bg-gradient-to-b from-[#151515] to-[#0a0a0a] p-10 rounded-[2.5rem] border border-white/10 shadow-2xl group hover:-translate-y-2 transition-transform duration-500">
                <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary/5 rounded-full blur-[60px] group-hover:bg-primary/10 transition-colors duration-700"></div>
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <Quote className="text-zinc-700 w-12 h-12 mb-8 group-hover:text-primary/40 transition-colors duration-500" />
                    <p className="text-lg text-zinc-300 leading-relaxed mb-10 font-medium">
                      "{testimonial.text}"
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 bg-white/5 border border-white/10 text-white rounded-full flex items-center justify-center font-bold text-lg backdrop-blur-sm shadow-inner">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white tracking-wide">{testimonial.name}</h4>
                      <p className="text-primary/80 text-xs font-bold tracking-wider uppercase">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </ScrollCard>
            ))}
          </div>
        </div>
      </section>

      {/* Minimalist Affiliations */}
      <section className="py-32 px-6 bg-white text-black">
        <ScrollText className="max-w-6xl mx-auto text-center">
          <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-16">Recognized Worldwide</h3>
          <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 opacity-80 hover:opacity-100 transition-opacity duration-500">
            {partners.map((partner, i) => (
              partner.logo ? (
                <img 
                  key={i} 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="h-12 md:h-16 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500" 
                />
              ) : (
                <div key={i} className="text-2xl md:text-3xl font-bold tracking-tight text-black hover:text-primary transition-colors cursor-pointer">
                  {partner.name} <span className="text-zinc-400">{partner.subtitle}</span>
                </div>
              )
            ))}
          </div>
        </ScrollText>
      </section>

      {/* Massive CTA */}
      <section className="py-40 md:py-60 px-6 text-center border-t border-white/10 relative overflow-hidden perspective-1000">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none"></div>
        <ScrollText className="relative z-10">
          <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-semibold tracking-tighter text-white mb-8">
            Ready to begin?
          </h2>
          <p className="text-2xl text-zinc-400 font-medium mb-12">
            Embrace the heritage. Master the art.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-5 bg-white text-black font-semibold text-xl rounded-full hover:scale-105 transition-transform"
          >
            Enquire Now
          </Link>
        </ScrollText>
      </section>
    </main>
  );
}
