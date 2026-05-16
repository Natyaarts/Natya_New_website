"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Career", href: "/career" },
  { name: "Courses", href: "/courses" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out flex justify-center ${
          isScrolled ? "pt-4 px-4" : "pt-6 px-6 md:px-12"
        }`}
      >
        <div 
          className={`flex justify-between items-center w-full transition-all duration-500 ease-out ${
            isScrolled 
              ? "max-w-5xl bg-[#111111]/80 backdrop-blur-xl shadow-2xl border border-white/5 rounded-full py-2 px-6" 
              : "max-w-7xl bg-transparent py-2"
          }`}
        >
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center group relative z-50 overflow-visible"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="relative h-10 md:h-12 w-32 flex items-center justify-center">
              <Image 
                src="/img/logo1.png" 
                alt="Natya Logo" 
                width={160} 
                height={60} 
                className="absolute object-contain scale-[1.3] md:scale-[1.5] transition-transform duration-300 group-hover:scale-[1.4] md:group-hover:scale-[1.6]"
                priority
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative px-5 py-2 text-sm font-normal tracking-wide uppercase transition-colors"
                >
                  {isActive ? (
                    <motion.div
                      layoutId="activeNavBackground"
                      className="absolute inset-0 bg-white/10 shadow-sm border border-white/10 rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  ) : null}
                  <span className={`relative z-10 transition-colors duration-300 ${isActive ? "text-white" : "text-zinc-500 hover:text-white"}`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* CTA Button & Mobile Toggle */}
          <div className="flex items-center gap-4 z-50">
            <Link 
              href="/contact"
              className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-white text-black text-sm font-medium uppercase tracking-wider rounded-full hover:bg-zinc-200 transition-all duration-300 group shadow-lg"
            >
              Enroll Now
              <motion.span
                className="inline-block"
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ChevronRight size={16} />
              </motion.span>
            </Link>

            <button
              className="lg:hidden relative w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white text-black hover:bg-zinc-200 transition-colors shadow-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={18} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at top right)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-zinc-950 flex flex-col justify-center items-center lg:hidden"
          >
            {/* Background Decoration */}
            <div className="absolute top-1/4 -right-1/4 w-[50vw] h-[50vw] bg-primary/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-1/4 -left-1/4 w-[60vw] h-[60vw] bg-yellow-600/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

            <div className="flex flex-col items-center gap-6 w-full px-8 z-10">
              {navItems.map((item, i) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden w-full text-center"
                  >
                    <Link
                      href={item.href}
                      className={`text-2xl sm:text-3xl font-bold uppercase tracking-wider hover:text-primary transition-colors inline-flex items-center gap-3 group ${isActive ? "text-primary" : "text-white"}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className={`transition-all duration-300 ${isActive ? "opacity-100 translate-x-0 text-white" : "text-primary opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0"}`}>
                         <ChevronRight size={22} />
                      </span>
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="mt-6 w-full max-w-xs"
              >
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3 bg-primary text-black font-bold text-xs uppercase tracking-widest rounded-full flex items-center justify-center gap-2 hover:bg-yellow-400 transition-colors shadow-[0_0_25px_rgba(250,204,21,0.25)]"
                >
                  Enroll Now <ChevronRight size={16} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
