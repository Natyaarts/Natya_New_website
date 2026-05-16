"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, ChevronUp, ArrowUpRight, Sparkles, Heart, BookOpen, Globe, X, CheckCircle2 } from "lucide-react";

export default function CareerClient() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [benefits, setBenefits] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);

  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All departments");
  const [sortBy, setSortBy] = useState("Newest");
  
  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Modal application states
  const [selectedJobForModal, setSelectedJobForModal] = useState<any | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleApplyClick = (job: any) => {
    setSelectedJobForModal(job);
    setName("");
    setEmail("");
    setMobile("");
    setCvFile(null);
    setCoverLetter("");
    setSubmitSuccess(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !mobile || !cvFile) {
      alert("Please fill in all required fields and upload your CV.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    if (selectedJobForModal && selectedJobForModal.id) {
      formData.append("job", selectedJobForModal.id);
    }
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("cv", cvFile);
    formData.append("cover_letter", coverLetter);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://3.111.197.92/api';
      const res = await fetch(`${apiUrl}/job-applications/`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setSubmitSuccess(true);
      } else {
        const errorData = await res.json();
        console.error("Submission error:", errorData);
        alert("There was an error submitting your application. Please try again.");
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://3.111.197.92/api';
    fetch(`${apiUrl}/jobs/`)
      .then(res => res.json())
      .then(data => { if (data && data.length > 0) setJobs(data); })
      .catch(console.error);

    fetch(`${apiUrl}/benefits/`)
      .then(res => res.json())
      .then(data => { if (data && data.length > 0) setBenefits(data); })
      .catch(console.error);

    fetch(`${apiUrl}/faqs/`)
      .then(res => res.json())
      .then(data => { if (data && data.length > 0) setFaqs(data); })
      .catch(console.error);
  }, []);

  const departments = ["All departments", ...Array.from(new Set(jobs.map(j => j.department)))];

  let filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === "All departments" || job.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  if (sortBy === "Newest") {
    filteredJobs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  } else if (sortBy === "A–Z") {
    filteredJobs.sort((a, b) => a.title.localeCompare(b.title));
  }

  const getBenefitIcon = (title: string) => {
    if (title.includes("Craft")) return <Sparkles className="w-6 h-6 text-primary" />;
    if (title.includes("Healthy")) return <Heart className="w-6 h-6 text-primary" />;
    if (title.includes("Learning")) return <BookOpen className="w-6 h-6 text-primary" />;
    if (title.includes("Remote")) return <Globe className="w-6 h-6 text-primary" />;
    return <Sparkles className="w-6 h-6 text-primary" />;
  };

  return (
    <main className="flex flex-col bg-black text-white selection:bg-primary selection:text-black min-h-screen">
      <section ref={heroRef} className="relative pt-40 pb-28 px-6 w-full bg-black flex flex-col justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[url('/img/hero2.png')] bg-cover bg-center bg-fixed grayscale opacity-20 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black z-10"></div>
        
        <div className="relative z-20 text-center max-w-4xl mx-auto pt-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 rounded-full text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 mb-8 border border-white/5 shadow-2xl"
          >
            Location: Calicut / Remote
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-[6.5rem] font-semibold tracking-tighter leading-[1.05] text-white drop-shadow-2xl mb-8"
          >
            Join Natyaarts.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl md:text-2xl text-zinc-400 font-medium max-w-2xl mx-auto"
          >
            Minimal, focused, and human. Find a role where your craft shapes learners every day.
          </motion.p>
        </div>
      </section>

      <section className="py-28 px-6 relative z-20 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16 p-4 md:p-6 bg-zinc-950/80 rounded-3xl border border-white/5 backdrop-blur-xl shadow-2xl">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type="text"
                placeholder="Search roles, skills, keywords…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-zinc-900/50 border border-white/5 rounded-2xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/20 transition-colors text-sm"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-end">
              <div className="flex flex-wrap items-center gap-2 bg-zinc-900/50 border border-white/5 rounded-2xl p-1.5 w-full sm:w-auto justify-start">
                {departments.map(dept => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`px-5 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                      selectedDept === dept
                        ? "bg-white text-black shadow-lg"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 bg-zinc-900/50 border border-white/5 rounded-2xl p-1 w-full sm:w-auto justify-center">
                <span className="text-xs font-bold tracking-widest uppercase text-zinc-500 pl-4">Sort:</span>
                {["Newest", "A–Z"].map(s => (
                  <button
                    key={s}
                    onClick={() => setSortBy(s)}
                    className={`px-4 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all ${
                      sortBy === s
                        ? "bg-white text-black shadow-lg"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-zinc-950/40 rounded-3xl border border-white/5 overflow-hidden backdrop-blur-xl shadow-2xl">
            <div className="hidden md:grid grid-cols-12 gap-4 px-10 py-6 border-b border-white/5 text-xs font-bold tracking-[0.2em] uppercase text-zinc-500 bg-zinc-900/20">
              <div className="col-span-5">Role</div>
              <div className="col-span-3">Department</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            <div className="divide-y divide-white/5">
              <AnimatePresence>
                {filteredJobs.map((job) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    key={job.id}
                    className="group grid grid-cols-1 md:grid-cols-12 gap-4 px-6 md:px-10 py-8 items-center hover:bg-zinc-900/40 transition-colors duration-300"
                  >
                    <div className="col-span-1 md:col-span-5">
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white group-hover:text-primary transition-colors mb-2">
                        {job.title}
                      </h3>
                      <p className="text-zinc-500 text-sm flex items-center gap-2 font-medium md:hidden mb-2">
                        {job.department} • {job.job_type}
                      </p>
                      <span className="text-xs font-bold tracking-widest uppercase text-zinc-600 bg-zinc-900 px-3 py-1.5 rounded-full border border-white/5">
                        {job.location}
                      </span>
                    </div>

                    <div className="hidden md:block col-span-3 text-zinc-400 font-medium text-base">
                      {job.department}
                    </div>

                    <div className="hidden md:block col-span-2 text-zinc-400 font-medium text-base">
                      {job.job_type}
                    </div>

                    <div className="col-span-1 md:col-span-2 flex justify-start md:justify-end">
                      <button
                        onClick={() => handleApplyClick(job)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold text-xs tracking-widest uppercase hover:bg-primary hover:text-black transition-all duration-300 shadow-lg group-hover:scale-105 cursor-pointer"
                      >
                        Apply <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredJobs.length === 0 && (
                <div className="py-24 px-6 text-center">
                  <p className="text-zinc-400 text-lg md:text-xl font-medium mb-6 max-w-lg mx-auto leading-relaxed">
                    No openings match your filters. Send an open application to explore future roles.
                  </p>
                  <button
                    onClick={() => handleApplyClick({ id: null, title: "Open Application" })}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-black font-bold text-sm tracking-widest uppercase hover:bg-white transition-all shadow-xl hover:scale-105 duration-300 cursor-pointer"
                  >
                    Open Application <ArrowUpRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-t border-white/5 bg-gradient-to-b from-zinc-950/50 via-black to-zinc-950/50 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/80 border border-primary/30 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-primary mb-6 shadow-xl backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" /> Core Values
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">Life at Natyaarts</h2>
            <p className="text-sm md:text-base text-zinc-400 font-medium max-w-xl mx-auto leading-relaxed">
              We believe great art education starts with an inspired, well-supported team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <div 
                key={i} 
                className="p-8 rounded-[2rem] bg-gradient-to-b from-zinc-900/60 via-zinc-950/80 to-zinc-950 border border-white/10 hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 group shadow-2xl hover:shadow-primary/5 backdrop-blur-xl flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-950 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-primary/40 transition-all duration-500 shadow-lg">
                    {getBenefitIcon(benefit.title)}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-primary transition-colors">
                    {benefit.title.replace(/(\w)\?+(\w)/g, "$1'$2").replace(/\?+/g, " — ")}
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-medium">
                    {benefit.description.replace(/(\w)\?+(\w)/g, "$1'$2").replace(/\?+/g, " — ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-white/5 bg-black relative z-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">FAQ</h2>
            <p className="text-sm md:text-base text-zinc-400 font-medium">Everything you need to know about joining our team.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i}
                className="rounded-2xl bg-zinc-900/30 border border-white/10 overflow-hidden transition-all duration-300 shadow-lg backdrop-blur-md"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 group cursor-pointer"
                >
                  <h3 className="text-base md:text-lg font-bold tracking-tight text-zinc-200 group-hover:text-primary transition-colors">
                    {faq.question.replace(/\?+/g, "'")}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-zinc-900/80 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors shrink-0 shadow-sm">
                    {openFaq === i ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-zinc-400 text-xs md:text-sm leading-relaxed font-medium border-t border-white/5 pt-4">
                        {faq.answer.replace(/\?+/g, "'")}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedJobForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-lg bg-zinc-950 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl my-4 overflow-hidden"
            >
              <button
                onClick={() => setSelectedJobForModal(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {submitSuccess ? (
                <div className="py-12 text-center">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-20 h-20 rounded-full bg-primary/10 border border-primary flex items-center justify-center mx-auto mb-6 text-primary"
                  >
                    <CheckCircle2 className="w-10 h-10" />
                  </motion.div>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-3">Application Submitted!</h3>
                  <p className="text-zinc-400 text-sm mb-8 max-w-sm mx-auto leading-relaxed">
                    Thank you for applying to Natyaarts. Our hiring team will review your craft and reach out to you soon.
                  </p>
                  <button
                    onClick={() => setSelectedJobForModal(null)}
                    className="px-8 py-3 rounded-full bg-white text-black font-bold tracking-widest text-xs uppercase hover:bg-primary transition-all shadow-xl cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 pt-2">
                  <div className="pr-12">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary mb-1 block">Application Form</span>
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white leading-snug">
                      {selectedJobForModal.title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-zinc-400 mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Anjali Sharma"
                        className="w-full px-4 py-3 bg-zinc-900/80 border border-white/5 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 text-xs transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-zinc-400 mb-1.5">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 bg-zinc-900/80 border border-white/5 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 text-xs transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold tracking-widest uppercase text-zinc-400 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="anjali@example.com"
                      className="w-full px-4 py-3 bg-zinc-900/80 border border-white/5 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 text-xs transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold tracking-widest uppercase text-zinc-400 mb-1.5">Upload CV / Resume (PDF, DOCX) *</label>
                    <div className="relative flex items-center bg-zinc-900/80 border border-white/5 rounded-xl px-3 py-2">
                      <input
                        type="file"
                        required
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setCvFile(e.target.files ? e.target.files[0] : null)}
                        className="w-full text-xs text-zinc-400 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:tracking-widest file:uppercase file:bg-white file:text-black hover:file:bg-primary hover:file:text-black file:transition-all file:cursor-pointer cursor-pointer"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold tracking-widest uppercase text-zinc-400 mb-1.5">Cover Letter / Short Note (Optional)</label>
                    <textarea
                      rows={2}
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      placeholder="Tell us about your background in arts..."
                      className="w-full px-4 py-3 bg-zinc-900/80 border border-white/5 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 text-xs resize-none transition-colors"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-full bg-white text-black font-bold tracking-[0.2em] text-xs uppercase hover:bg-primary transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isSubmitting ? "Submitting Application..." : "Submit Application"}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
