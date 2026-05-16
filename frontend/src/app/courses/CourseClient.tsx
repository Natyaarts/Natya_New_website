"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Search, ArrowUpRight, Sparkles, BookOpen, Award, Users, CheckCircle2 } from "lucide-react";

export default function CourseClient() {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All Programs");
  const [searchQuery, setSearchQuery] = useState("");

  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://3.111.197.92/api';
    fetch(`${apiUrl}/course-categories/`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setCategories(data);
        }
      })
      .catch(console.error);
  }, []);

  // Flatten all courses for "All Programs" view or filtering
  const allCourses = categories.reduce((acc, cat) => {
    const coursesWithCat = (cat.courses || []).map((c: any) => ({
      ...c,
      category_name: cat.name
    }));
    return [...acc, ...coursesWithCat];
  }, []);

  // Filter logic
  const filteredCourses = allCourses.filter((course: any) => {
    const matchesCategory = selectedCategory === "All Programs" || course.category_name === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.category_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categoryTabs = ["All Programs", ...categories.map(c => c.name)];

  return (
    <main className="flex flex-col bg-black text-white selection:bg-primary selection:text-black min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-40 pb-28 px-6 w-full bg-black flex flex-col justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[url('/img/hero1.png')] bg-cover bg-center bg-fixed grayscale opacity-20 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black z-10"></div>
        
        <div className="relative z-20 text-center max-w-4xl mx-auto pt-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 rounded-full text-xs font-bold tracking-[0.2em] uppercase text-primary mb-8 border border-white/5 shadow-2xl"
          >
            <Sparkles className="w-4 h-4" /> Professional Arts Curriculum
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-[6.5rem] font-semibold tracking-tighter leading-[1.05] text-white drop-shadow-2xl mb-8"
          >
            Our Courses.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl md:text-2xl text-zinc-400 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Master classical dance, vocals, and instrumental music with personalized mentorship from world-class gurus.
          </motion.p>
        </div>
      </section>

      {/* Courses Grid & Filter Section */}
      <section className="py-28 px-6 relative z-20 bg-black">
        <div className="max-w-7xl mx-auto">
          {/* Search & Tabs Controls */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-16 p-4 md:p-6 bg-zinc-950/80 rounded-3xl border border-white/5 backdrop-blur-xl shadow-2xl">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type="text"
                placeholder="Search courses, instruments, dance forms…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-zinc-900/50 border border-white/5 rounded-2xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/20 transition-colors text-sm"
              />
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-2 bg-zinc-900/50 border border-white/5 rounded-2xl p-1.5 w-full lg:w-auto justify-start">
              {categoryTabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setSelectedCategory(tab)}
                  className={`px-6 py-3.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                    selectedCategory === tab
                      ? "bg-white text-black shadow-xl"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>          {/* Courses Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredCourses.map((course: any) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.4 }}
                  key={course.id}
                  className="group relative flex flex-col bg-gradient-to-b from-zinc-900/30 via-zinc-950/60 to-zinc-950 border border-white/10 hover:border-primary/40 rounded-[2rem] p-6 transition-all duration-500 hover:-translate-y-2 backdrop-blur-2xl shadow-2xl overflow-hidden"
                >
                  {/* Category Pill */}
                  <div className="absolute top-9 left-9 z-10 flex items-center gap-1.5 px-3.5 py-1.5 bg-black/80 backdrop-blur-md border border-primary/30 rounded-full text-[9px] font-bold tracking-[0.2em] uppercase text-primary shadow-xl">
                    <Sparkles className="w-3 h-3" /> {course.category_name}
                  </div>

                  {/* Course Image */}
                  <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-6 bg-zinc-900 border border-white/5 shadow-inner">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                    <img
                      src={course.image ? (course.image.startsWith('http') ? course.image : `http://3.111.197.92${course.image}`) : '/img/hero.png'}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  </div>

                  {/* Course Content */}
                  <div className="flex flex-col flex-1 px-1">
                    <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors mb-2.5 leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mb-6 flex-1 font-normal line-clamp-3">
                      {course.description}
                    </p>

                    {/* Action Link / Button */}
                    <div className="pt-3 flex items-center justify-between border-t border-white/5">
                      <a
                        href={course.link || `https://wa.me/918113000000?text=I%20am%20interested%20in%20${encodeURIComponent(course.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-bold tracking-[0.2em] text-xs uppercase text-white group-hover:text-primary transition-colors duration-300 cursor-pointer py-2"
                      >
                        {course.button_text}
                      </a>
                      <a
                        href={course.link || `https://wa.me/918113000000?text=I%20am%20interested%20in%20${encodeURIComponent(course.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all duration-300 shadow-xl group-hover:scale-110 cursor-pointer"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredCourses.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-zinc-400 text-lg md:text-xl font-medium mb-6 max-w-lg mx-auto leading-relaxed">
                No courses match your search criteria. Please try a different keyword or category.
              </p>
              <button
                onClick={() => { setSelectedCategory("All Programs"); setSearchQuery(""); }}
                className="px-8 py-4 rounded-full bg-primary text-black font-bold tracking-widest text-xs uppercase hover:bg-white transition-all shadow-xl cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Natyaarts */}
      <section className="py-32 px-6 border-t border-white/5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/20 via-black to-black relative z-20 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-24 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/80 border border-primary/30 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-primary mb-6 shadow-xl backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5" /> Why Natyaarts
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white mb-6 drop-shadow-2xl"
            >
              The Natya Advantage.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-zinc-400 font-medium max-w-2xl mx-auto leading-relaxed"
            >
              A holistic approach to arts education combining ancient traditions with modern stagecraft and global mentorship.
            </motion.p>
          </div>

          {/* Luxury Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {/* Bento Card 1: Master Gurus (Span 2) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:col-span-2 bg-gradient-to-br from-zinc-900/30 via-zinc-950/80 to-zinc-950 border border-white/10 hover:border-primary/40 rounded-3xl p-8 md:p-12 relative overflow-hidden group shadow-2xl backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
            >
              {/* Glowing background orb */}
              <div className="absolute -right-20 -top-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700 z-0"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-8 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all duration-500 shadow-[0_0_25px_rgba(255,215,0,0.15)]">
                  <Award className="w-7 h-7" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-primary transition-colors leading-snug">
                  Master Gurus & Acclaimed Artists
                </h3>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-normal max-w-xl mb-8">
                  Learn directly from legendary performers and dedicated pedagogues with decades of stage and teaching experience. Our faculty focuses on individual nuance, traditional purity, and modern presentation.
                </p>
              </div>

              <div className="relative z-10 border-t border-white/5 pt-6 flex items-center gap-6 text-xs font-bold tracking-widest uppercase text-zinc-300">
                <span>Personalized Mentorship</span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span>Lineage Purity</span>
              </div>
            </motion.div>

            {/* Bento Card 2: Structured Syllabus (Span 1) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:col-span-1 bg-gradient-to-bl from-zinc-900/30 via-zinc-950/80 to-zinc-950 border border-white/10 hover:border-primary/40 rounded-3xl p-8 md:p-12 relative overflow-hidden group shadow-2xl backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
            >
              {/* Glowing background orb */}
              <div className="absolute -left-20 -top-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700 z-0"></div>

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-8 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all duration-500 shadow-[0_0_25px_rgba(255,215,0,0.15)]">
                  <BookOpen className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-primary transition-colors leading-snug">
                  Structured Syllabus
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed font-normal mb-8">
                  A meticulously crafted curriculum balancing deep theoretical foundations with rigorous practical training and extensive stage repertoire.
                </p>
              </div>

              <div className="relative z-10 border-t border-white/5 pt-6 text-xs font-bold tracking-widest uppercase text-primary">
                Annual Examinations
              </div>
            </motion.div>

            {/* Bento Card 3: Active Community (Span 3 - Full Width Horizontal) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="md:col-span-3 bg-gradient-to-r from-zinc-900/30 via-zinc-950/80 to-zinc-900/30 border border-white/10 hover:border-primary/40 rounded-3xl p-8 md:p-12 relative overflow-hidden group shadow-2xl backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
            >
              {/* Glowing background orb */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-700 z-0"></div>

              <div className="relative z-10 flex items-start gap-6 max-w-2xl">
                <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all duration-500 shadow-[0_0_25px_rgba(255,215,0,0.15)] shrink-0 mt-1">
                  <Users className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight group-hover:text-primary transition-colors leading-snug">
                    Vibrant Global Community
                  </h3>
                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-normal">
                    Join an international network of passionate artists, participate in grand collaborative stage productions, attend exclusive masterclasses, and showcase your talent to global audiences.
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex items-center gap-4 border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-12 w-full md:w-auto justify-between md:justify-end">
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-1">5,000+</div>
                  <div className="text-[10px] font-bold tracking-widest uppercase text-zinc-400">Global Alumni</div>
                </div>
                <a
                  href="https://wa.me/918113000000?text=I%20am%20interested%20in%20enquiring%20about%20Natyaarts%20courses"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-full bg-white text-black font-bold tracking-widest text-xs uppercase hover:bg-primary transition-all shadow-xl whitespace-nowrap cursor-pointer"
                >
                  Enquire Now
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
