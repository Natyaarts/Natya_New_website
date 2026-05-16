"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

const ScrollText = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "center 50%"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 1], [0.1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  );
};

export default function AboutClient() {
  const [founders, setFounders] = useState<any[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([
    { value: "1000+", label: "Happy Customers" },
    { value: "50", label: "Faculty" },
    { value: "2020", label: "Founded" }
  ]);
  const [features, setFeatures] = useState<any[]>([
    { title: "Structured Paths", description: "Level-based curriculum and practice plans for steady progress." },
    { title: "Caring Faculty", description: "Experienced mentors with clear, regular feedback." },
    { title: "Performance Ready", description: "Stage exposure, assessments, and recordings to showcase growth." }
  ]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/founders/')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) setFounders(data);
      })
      .catch(console.error);

    fetch('http://127.0.0.1:8000/api/team/')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) setTeam(data);
      })
      .catch(console.error);

    fetch('http://127.0.0.1:8000/api/stats/')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) setStats(data);
      })
      .catch(console.error);

    fetch('http://127.0.0.1:8000/api/features/')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) setFeatures(data);
      })
      .catch(console.error);
  }, []);

  return (
    <main className="flex flex-col bg-black text-white selection:bg-primary selection:text-black min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] md:h-[100vh] w-full bg-black flex flex-col justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[url('/img/hero2.png')] bg-cover bg-center bg-fixed grayscale opacity-30 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black z-10"></div>
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black to-transparent z-10"></div>
        
        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 rounded-full text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 mb-8 border border-white/5 shadow-2xl"
          >
            About Natya
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-[5.5rem] font-semibold tracking-tighter leading-[1.1] text-white drop-shadow-2xl mb-8"
          >
            Celebrating Tradition <br className="hidden md:block"/>
            <span className="text-zinc-500">Empowering Future in Arts</span>
          </motion.h1>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-32 px-6 max-w-6xl mx-auto border-t border-white/10 relative">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 relative">
            <div className="sticky top-40">
              <ScrollText>
                <h2 className="text-5xl md:text-7xl font-medium tracking-tight text-white mb-8">Our Story.</h2>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 rounded-full text-sm font-medium tracking-widest text-zinc-400 border border-white/5 mb-8">
                  Est. 2020
                </div>
                <p className="text-xl text-zinc-500 font-medium leading-relaxed max-w-sm">
                  A legacy of bridging communities and cultures across the world through the vibrant heritage of Indian art.
                </p>
              </ScrollText>
            </div>
          </div>
          
          <div className="lg:col-span-7">
            <ScrollText>
              <p className="text-2xl md:text-3xl text-zinc-300 leading-snug mb-10 font-medium">
                Natya Learning, a leading Art startup based in India has been a pioneer in the realm of performing arts education by transcending geographical boundaries.
              </p>
              <p className="text-lg md:text-xl text-zinc-500 leading-relaxed mb-12 font-medium">
                Founded by Kalamandalam Sivaprasad and his spouse Kalakshetra Anjali in 2020, Natya has evolved into a global platform for learning classical arts. The courses offered span a wide array of disciplines, including Bharathanatyam, Mohiniyattam, Kuchipudi, Kathak, Carnatic music, Yoga, and more.
              </p>
              <p className="text-lg md:text-xl text-zinc-500 leading-relaxed mb-12 font-medium">
                Natya proudly stands as the first-ever dedicated e-learning platform for performing artists, welcoming students from diverse corners of the globe, including the US, UK, Israel, Czech Republic, Sri Lanka, Singapore, and beyond.
              </p>
              <p className="text-lg md:text-xl text-zinc-500 leading-relaxed font-medium">
                Natya has transformed into a dynamic learning ecosystem with both offline options and a dedicated Natya app, ensuring students worldwide can engage in the rich heritage of Indian classical arts at their convenience. The Natya App has democratised arts education, providing flexibility to learners from diverse backgrounds and revolutionising arts learning.
              </p>
            </ScrollText>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-32 mt-20 border-t border-white/5">
          {stats.map((stat, i) => (
            <ScrollText key={i} className="flex flex-col items-center justify-center">
              <div className="text-6xl md:text-[6rem] font-medium tracking-tighter text-white mb-6 leading-none">
                {stat.value.replace(/\+/g, '')}<span className="text-zinc-600">{stat.value.includes('+') ? '+' : ''}</span>
              </div>
              <div className="text-sm font-bold tracking-[0.2em] uppercase text-zinc-500">{stat.label}</div>
            </ScrollText>
          ))}
        </div>
      </section>

      {/* Why Natyaarts */}
      <section className="py-32 px-6 border-t border-white/10 bg-white text-black">
        <div className="max-w-6xl mx-auto">
          <ScrollText className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-8">Why Natyaarts</h2>
            <p className="text-xl md:text-2xl text-zinc-600 font-medium max-w-3xl mx-auto">
              Structured learning + caring mentorship + real performance opportunities — so students grow with clarity and confidence.
            </p>
          </ScrollText>

          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, i) => (
              <ScrollText key={i} className="p-10 rounded-[2.5rem] bg-zinc-50 border border-black/5 hover:-translate-y-2 transition-transform duration-500">
                {feature.icon ? (
                  <img src={feature.icon} alt={feature.title} className="w-12 h-12 object-contain mb-8" />
                ) : (
                  <CheckCircle2 className="w-12 h-12 text-black mb-8" />
                )}
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-zinc-600 text-lg font-medium leading-relaxed">
                  {feature.description}
                </p>
              </ScrollText>
            ))}
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-24 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <ScrollText className="mb-20">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 text-white">Our Founders.</h2>
            <div className="w-16 h-1 bg-primary mb-6"></div>
            <p className="text-lg md:text-xl text-zinc-500 font-medium max-w-2xl">The vision and values that guide Natyaarts.</p>
          </ScrollText>
          
          <div className="flex flex-col gap-24">
            {founders.map((founder, i) => (
              <div key={i} className={`flex flex-col md:flex-row gap-10 md:gap-16 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <ScrollText className="w-full md:w-1/3">
                  <div className="w-full aspect-[4/5] rounded-2xl bg-zinc-900 border border-white/5 overflow-hidden relative group shadow-xl">
                    <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-all duration-700 pointer-events-none"></div>
                    {founder.image ? (
                      <img src={founder.image} alt={founder.name} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[5rem] text-zinc-800 font-bold bg-zinc-950">{founder.name[0]}</div>
                    )}
                  </div>
                </ScrollText>
                
                <ScrollText className="w-full md:w-2/3">
                  <h3 className="text-3xl md:text-4xl font-medium text-white mb-3 tracking-tight">{founder.name}</h3>
                  <p className="text-primary font-bold tracking-[0.15em] uppercase text-xs mb-8">{founder.position}</p>
                  
                  <div className="relative pl-6 md:pl-8 border-l-2 border-white/10">
                    <p className="text-xl md:text-2xl text-zinc-400 font-medium leading-relaxed relative z-10 italic">
                      "{founder.message}"
                    </p>
                  </div>
                </ScrollText>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Team */}
      <section className="py-32 px-6 border-t border-white/10 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <ScrollText className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-8 text-white">Our Core Team</h2>
            <p className="text-xl text-zinc-400 font-medium">The folks who make our learning experience seamless and supportive.</p>
          </ScrollText>
          
          <div 
            className="relative w-full overflow-hidden py-12"
            style={{ 
              maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' 
            }}
          >
            <motion.div 
              className="flex w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
            >
              {team.length > 0 && [...team, ...team, ...team, ...team].map((member, i) => (
                <div key={i} className="flex flex-col text-center group cursor-pointer w-64 md:w-80 px-4">
                  <div className="w-40 h-40 md:w-56 md:h-56 mx-auto rounded-3xl bg-zinc-900 border border-white/5 mb-6 overflow-hidden relative transition-all duration-500 shadow-xl">
                    <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-all duration-500 pointer-events-none"></div>
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl text-zinc-700 font-bold bg-zinc-950">{member.name[0]}</div>
                    )}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1 transition-colors tracking-tight">{member.name}</h3>
                  <p className="text-zinc-500 font-medium text-sm tracking-widest uppercase">{member.position}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Join Now CTA */}
      <section className="py-40 text-center border-t border-white/10 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none"></div>
        <ScrollText className="relative z-10">
          <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-semibold tracking-tighter text-white mb-12">
            Be part of our story.
          </h2>
          <Link
            href="/contact"
            className="inline-block px-10 py-5 bg-white text-black font-semibold text-xl rounded-full hover:scale-105 transition-transform"
          >
            Join Now
          </Link>
        </ScrollText>
      </section>

    </main>
  );
}
