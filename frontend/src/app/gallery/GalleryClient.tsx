"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { API_URL } from "@/config/api";

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

export default function GalleryClient() {
  const [categories, setCategories] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.1]);
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    fetch(`${API_URL}/gallery-categories/`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setCategories(data);
          setActiveCategory(data[0].id);
        }
      })
      .catch(console.error);
  }, []);

  const activeCategoryData = categories.find(c => c.id === activeCategory);
  const images = activeCategoryData ? activeCategoryData.images : [];

  return (
    <main className="flex flex-col bg-black text-white selection:bg-primary selection:text-black min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[70vh] md:h-[90vh] w-full bg-black flex flex-col justify-center overflow-hidden border-b border-white/5">
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
            Gallery
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-[5.5rem] font-semibold tracking-tighter leading-[1.1] text-white drop-shadow-2xl mb-8"
          >
            Our Moments.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl md:text-2xl text-zinc-400 font-medium max-w-2xl mx-auto"
          >
            Performances, workshops, behind-the-scenes and student highlights — curated from our community.
          </motion.p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 px-6 relative z-20 bg-black min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Floating Glassmorphism Filter */}
          <div className="flex justify-center mb-16 px-2">
            <div className="flex flex-wrap justify-center gap-1.5 p-2 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-xl max-w-full shadow-2xl">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`relative px-4 py-2 md:px-6 md:py-2.5 rounded-full text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase transition-all duration-500 z-10 ${
                    activeCategory === category.id
                      ? "text-black"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {activeCategory === category.id && (
                    <motion.div 
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 bg-white rounded-full -z-10 shadow-lg shadow-white/20"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            <AnimatePresence mode="popLayout">
              {images.map((img: any, i: number) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  key={img.id}
                  className="break-inside-avoid relative group rounded-[2rem] overflow-hidden bg-zinc-900 shadow-2xl cursor-pointer"
                >
                  <img
                    src={img.image ? (img.image.startsWith('http') ? img.image : `${API_URL.replace('/api', '')}${img.image}`) : '/img/hero.png'}
                    alt={img.caption || "Natya Arts Academy Student Performance and Stage Show"}
                    className="w-full h-auto object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex flex-col justify-end p-8">
                    {img.caption && (
                      <p className="text-white text-xl md:text-2xl font-semibold tracking-tight translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out drop-shadow-xl">
                        {img.caption}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {images.length === 0 && categories.length > 0 && (
              <div className="col-span-full py-32 text-center text-zinc-500 text-sm tracking-[0.2em] font-bold uppercase">
                No moments captured in this category yet.
              </div>
            )}
            
            {categories.length === 0 && (
               <div className="col-span-full py-32 text-center text-zinc-500 text-sm tracking-[0.2em] font-bold uppercase">
                Loading gallery...
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
