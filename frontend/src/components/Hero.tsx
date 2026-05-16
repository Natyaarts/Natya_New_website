"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Apple-style scroll animations
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={containerRef} className="relative h-[120vh] bg-black overflow-hidden pt-32">
      <motion.div style={{ y, opacity }} className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-zinc-400 font-semibold tracking-widest uppercase text-sm md:text-base mb-6"
        >
          Welcome to Natya
        </motion.h2>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.1] mb-8"
        >
          Learning Indian <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#facc15] to-[#a16207]">
            Classical Arts.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-xl md:text-3xl text-zinc-400 max-w-3xl font-medium tracking-tight mb-12"
        >
          Now easier, structured, and more beautiful than ever.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex items-center gap-4"
        >
          <Link href="/contact" className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-colors text-base">
            Enquire Now
          </Link>
          <Link href="#explore" className="px-6 py-3 text-white font-semibold hover:text-primary transition-colors flex items-center gap-2 text-base group">
            Explore Academy <Play size={14} className="fill-white group-hover:fill-primary transition-colors" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Massive Cinematic Image */}
      <motion.div style={{ scale }} className="absolute bottom-0 left-0 right-0 h-[70vh] md:h-[85vh] w-full z-0 overflow-hidden">
        {/* Deep smooth fade from the black background down into the image */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-transparent z-10"></div>
        {/* Smooth fade at the bottom edge */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black to-transparent z-10"></div>
        {/* Overall subtle darkening to ensure the white text is always readable */}
        <div className="absolute inset-0 bg-black/20 z-10"></div>

        <img 
          src="/img/hero.png" 
          alt="Student performing Bharatanatyam classical dance at Natya Arts Academy Kozhikode" 
          className="w-full h-full object-cover object-top"
        />
      </motion.div>
    </section>
  );
}
