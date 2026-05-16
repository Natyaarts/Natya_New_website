"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  subtitle?: string;
}

export default function AnimatedSection({
  id,
  title,
  children,
  className = "",
  subtitle = "",
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  return (
    <section id={id} className={`py-24 md:py-32 relative ${className}`} ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 md:mb-24 flex flex-col items-center text-center"
        >
          {subtitle && (
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4">
              {subtitle}
            </span>
          )}
          <h2 className="text-4xl md:text-6xl font-black tracking-tight relative">
            {title}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-primary rounded-full"></div>
          </h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
