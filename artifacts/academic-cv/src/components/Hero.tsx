import { useState, useEffect } from "react";
import { cvData } from "@/data";
import { motion } from "framer-motion";
import heroImg from "@assets/WhatsApp_Image_2026-04-12_at_13.41.41_1776010255509.jpeg";

function FlipCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsFlipped(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="w-full max-w-[420px] cursor-pointer"
      style={{ perspective: "1200px" }}
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="w-full rounded-md overflow-hidden border border-[rgba(184,150,62,0.25)]"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="relative aspect-[3/4]">
            <img
              src={heroImg}
              alt="N.L. Swathi — Researcher"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a]/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="font-serif text-white text-lg font-light italic">N.L. Swathi</p>
              <p className="text-[0.72rem] text-white/50 uppercase tracking-[0.1em] mt-1">PhD Scholar · Researcher</p>
            </div>
            <div className="absolute top-4 right-4">
              <span className="text-[0.65rem] text-white/40 uppercase tracking-[0.15em] flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                Tap to flip
              </span>
            </div>
          </div>
        </div>

        <div
          className="w-full absolute top-0 left-0 rounded-md"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="bg-white/[0.04] border border-[rgba(184,150,62,0.15)] rounded-md p-10 aspect-[3/4] flex flex-col justify-center">
            <div className="text-center mb-6">
              <div className="font-serif text-[4.5rem] font-light text-[#d4af6a] leading-none mb-2">{cvData.stats.publications}</div>
              <div className="text-[0.78rem] uppercase tracking-[0.12em] text-white/50">Publications</div>
              <p className="text-[0.7rem] text-white/30 mt-1 italic">Articles · Book Chapters · Reviews · Systematic Reviews · Meta-Analysis</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="font-serif text-[2.5rem] font-light text-[#d4af6a] leading-none mb-1">{cvData.stats.ongoingProjects}</div>
                <div className="text-[0.72rem] uppercase tracking-[0.1em] text-white/45">Ongoing Projects</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-[2.5rem] font-light text-[#d4af6a] leading-none mb-1">{cvData.stats.awards}</div>
                <div className="text-[0.72rem] uppercase tracking-[0.1em] text-white/45">Awards & Prizes</div>
              </div>
            </div>
            <hr className="border-t border-[rgba(184,150,62,0.15)] my-6" />
            <div className="text-center">
              <p className="text-[0.72rem] text-white/35 uppercase tracking-[0.1em] mb-1">Location</p>
              <p className="text-[0.9rem] text-white/70">{cvData.personal.location}</p>
            </div>
            <div className="mt-6 text-center">
              <span className="text-[0.65rem] text-white/30 uppercase tracking-[0.15em]">← Tap to see photo</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden py-20" style={{ background: "#0d1b2a" }}>
      <div className="absolute top-[-200px] right-[-200px] w-[700px] h-[700px] rounded-full border border-[rgba(184,150,62,0.08)] pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full border border-[rgba(184,150,62,0.06)] pointer-events-none" />

      <div className="max-w-[1100px] mx-auto w-full px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="space-y-6">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="w-[30px] h-px bg-[#b8963e]" />
              <span className="text-[0.72rem] font-medium uppercase tracking-[0.2em] text-[#b8963e]">
                PhD Scholar & Researcher
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-[4.5rem] font-serif font-light text-white leading-[1.1]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              N.L. <em className="italic text-[#d4af6a]">Swathi</em>
            </motion.h1>

            <motion.p
              className="font-serif text-[1.2rem] text-white/50 font-light italic"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
              Pharm D · Computational Biology · Clinical Research
            </motion.p>

            <motion.p
              className="text-[0.9rem] text-white/60 leading-[1.85] max-w-[480px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            >
              I am a PhD Scholar and Pharm D graduate with a passion for Diabetes Research, Computational Biology, and Clinical Pharmacy. My work bridges theory and practice — advancing knowledge while mentoring the next generation of researchers. Open to research collaborations, academic discussions, writing opportunities, and mentoring inquiries.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            >
              <a href={`mailto:${cvData.personal.email}`} className="inline-flex items-center gap-2 px-4 py-2 border border-[rgba(184,150,62,0.4)] text-[#d4af6a] text-[0.75rem] uppercase tracking-[0.08em] hover:bg-[rgba(184,150,62,0.1)] hover:border-[#b8963e] hover:text-white transition-all rounded-sm">
                ✉ Email
              </a>
              <a href={cvData.personal.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 border border-[rgba(184,150,62,0.4)] text-[#d4af6a] text-[0.75rem] uppercase tracking-[0.08em] hover:bg-[rgba(184,150,62,0.1)] hover:border-[#b8963e] hover:text-white transition-all rounded-sm">
                LinkedIn
              </a>
              <a href={cvData.personal.scopus} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 border border-[rgba(184,150,62,0.4)] text-[#d4af6a] text-[0.75rem] uppercase tracking-[0.08em] hover:bg-[rgba(184,150,62,0.1)] hover:border-[#b8963e] hover:text-white transition-all rounded-sm">
                Scopus
              </a>
              <a href={cvData.personal.orcid} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 border border-[rgba(184,150,62,0.4)] text-[#d4af6a] text-[0.75rem] uppercase tracking-[0.08em] hover:bg-[rgba(184,150,62,0.1)] hover:border-[#b8963e] hover:text-white transition-all rounded-sm">
                ORCID
              </a>
              <a href={cvData.personal.researchId} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 border border-[rgba(184,150,62,0.4)] text-[#d4af6a] text-[0.75rem] uppercase tracking-[0.08em] hover:bg-[rgba(184,150,62,0.1)] hover:border-[#b8963e] hover:text-white transition-all rounded-sm">
                Research ID
              </a>
            </motion.div>
          </div>

          <motion.div
            className="flex justify-end"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <FlipCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
