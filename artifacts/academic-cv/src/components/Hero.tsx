import { cvData } from "@/data";
import { motion } from "framer-motion";
import heroImg from "@assets/Smiling_scientist_in_lab_with_equipment_1776005121219.png";

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
              I am a PhD Scholar and Pharm D graduate with a passion for Diabetes Research, Computational Biology, and Clinical Pharmacy. My work bridges theory and practice — advancing knowledge while mentoring the next generation of researchers.
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
            <div className="bg-white/[0.04] border border-[rgba(184,150,62,0.15)] rounded-md p-10 w-full max-w-[420px]">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="font-serif text-[3rem] font-light text-[#d4af6a] leading-none mb-1">{cvData.stats.articles}</div>
                  <div className="text-[0.72rem] uppercase tracking-[0.1em] text-white/45">Research Articles</div>
                </div>
                <div className="text-center">
                  <div className="font-serif text-[3rem] font-light text-[#d4af6a] leading-none mb-1">{cvData.stats.bookChapters}</div>
                  <div className="text-[0.72rem] uppercase tracking-[0.1em] text-white/45">Book Chapters</div>
                </div>
                <div className="text-center">
                  <div className="font-serif text-[3rem] font-light text-[#d4af6a] leading-none mb-1">{cvData.stats.ongoingProjects}</div>
                  <div className="text-[0.72rem] uppercase tracking-[0.1em] text-white/45">Ongoing Projects</div>
                </div>
                <div className="text-center">
                  <div className="font-serif text-[3rem] font-light text-[#d4af6a] leading-none mb-1">{cvData.stats.awards}</div>
                  <div className="text-[0.72rem] uppercase tracking-[0.1em] text-white/45">Awards & Prizes</div>
                </div>
              </div>
              <hr className="border-t border-[rgba(184,150,62,0.15)] my-6" />
              <div className="text-center">
                <p className="text-[0.72rem] text-white/35 uppercase tracking-[0.1em] mb-1">Location</p>
                <p className="text-[0.9rem] text-white/70">{cvData.personal.location}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
