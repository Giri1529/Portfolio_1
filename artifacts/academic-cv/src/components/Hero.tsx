import { useState, useEffect } from "react";
import { cvData } from "@/data";
import { motion, AnimatePresence } from "framer-motion";
import heroImg from "@assets/WhatsApp_Image_2026-04-12_at_13.41.41_1776010255509.jpeg";

const rotatingWords = ["Researcher", "Mentor", "Author", "Speaker", "Innovator"];

function RotatingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block relative align-bottom">
      <span className="text-white/80">I am a </span>
      <span className="inline-block w-[220px] md:w-[280px] text-left align-bottom relative">
        <AnimatePresence mode="wait">
          <motion.span
            key={rotatingWords[index]}
            className="inline-block text-[#d4af6a] italic"
            initial={{ y: 22, opacity: 0, filter: "blur(6px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -22, opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            {rotatingWords[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}

function CornerBrackets() {
  const commonPath = {
    fill: "none",
    stroke: "#b8963e",
    strokeWidth: 1,
    strokeLinecap: "round" as const,
  };
  return (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <motion.path
        {...commonPath}
        d="M 2,14 L 2,2 L 14,2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ duration: 1.3, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.path
        {...commonPath}
        d="M 86,2 L 98,2 L 98,14"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ duration: 1.3, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.path
        {...commonPath}
        d="M 98,86 L 98,98 L 86,98"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ duration: 1.3, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.path
        {...commonPath}
        d="M 14,98 L 2,98 L 2,86"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ duration: 1.3, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

function DNARibbon() {
  return (
    <svg
      aria-hidden
      className="absolute -right-24 top-0 h-full w-[380px] pointer-events-none opacity-[0.18] hidden md:block"
      viewBox="0 0 200 800"
      fill="none"
    >
      <defs>
        <linearGradient id="dnaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b8963e" stopOpacity="0" />
          <stop offset="50%" stopColor="#d4af6a" stopOpacity="1" />
          <stop offset="100%" stopColor="#b8963e" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.g
        animate={{ y: [0, -120, 0] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <path
          d="M 60 0 Q 140 60 60 120 Q -20 180 60 240 Q 140 300 60 360 Q -20 420 60 480 Q 140 540 60 600 Q -20 660 60 720 Q 140 780 60 840"
          stroke="url(#dnaGrad)"
          strokeWidth="1.2"
        />
        <path
          d="M 140 0 Q 60 60 140 120 Q 220 180 140 240 Q 60 300 140 360 Q 220 420 140 480 Q 60 540 140 600 Q 220 660 140 720 Q 60 780 140 840"
          stroke="url(#dnaGrad)"
          strokeWidth="1.2"
        />
        {[0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720].map((y) => (
          <line key={y} x1="60" y1={y} x2="140" y2={y} stroke="#b8963e" strokeWidth="0.6" opacity="0.4" />
        ))}
      </motion.g>
    </svg>
  );
}

function FlipCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsFlipped(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="w-full max-w-[440px] relative"
      style={{ perspective: "1400px" }}
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      data-cursor="link"
    >
      <motion.div
        className="relative w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="w-full rounded-sm overflow-hidden border border-[rgba(184,150,62,0.2)] relative"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="relative aspect-[3/4]">
            <img
              src={heroImg}
              alt="N.L. Swathi — Researcher"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a]/75 via-[#0d1b2a]/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="font-serif text-white text-[1.4rem] font-light italic leading-none">N.L. Swathi</p>
              <p className="smallcaps text-[0.65rem] text-white/45 mt-2">PhD · Metabolomics · Researcher</p>
            </div>
            <div className="absolute top-5 right-5">
              <span className="smallcaps text-[0.55rem] text-white/40">flip</span>
            </div>
          </div>
          <CornerBrackets />
        </div>

        <div
          className="w-full absolute top-0 left-0 rounded-sm"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="bg-white/[0.03] border border-[rgba(184,150,62,0.15)] rounded-sm p-10 aspect-[3/4] flex flex-col justify-center relative">
            <div className="text-center mb-8">
              <div className="font-serif text-[5.5rem] font-light text-[#d4af6a] leading-none mb-3 tabular">
                {cvData.stats.publications}
              </div>
              <div className="smallcaps text-[0.7rem] text-white/55">Publications</div>
              <p className="text-[0.7rem] text-white/30 mt-2 italic font-serif">
                Articles · Chapters · Reviews · Meta-Analyses
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="font-serif text-[2.8rem] font-light text-[#d4af6a] leading-none mb-2 tabular">
                  {cvData.stats.ongoingProjects}
                </div>
                <div className="smallcaps text-[0.62rem] text-white/50">Ongoing</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-[2.8rem] font-light text-[#d4af6a] leading-none mb-2 tabular">
                  {cvData.stats.awards}
                </div>
                <div className="smallcaps text-[0.62rem] text-white/50">Awards</div>
              </div>
            </div>
            <hr className="border-t border-[rgba(184,150,62,0.15)] my-7" />
            <div className="text-center">
              <p className="smallcaps text-[0.62rem] text-white/40 mb-2">Location</p>
              <p className="text-[0.9rem] text-white/70 font-serif italic">{cvData.personal.location}</p>
            </div>
            <CornerBrackets />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden pt-28 pb-24 md:pt-32"
      style={{ background: "#0d1b2a" }}
    >
      <div className="absolute top-[-280px] right-[-280px] w-[760px] h-[760px] rounded-full border border-[rgba(184,150,62,0.06)] pointer-events-none" />
      <div className="absolute bottom-[-120px] left-[-120px] w-[440px] h-[440px] rounded-full border border-[rgba(184,150,62,0.05)] pointer-events-none" />
      <DNARibbon />

      <div className="max-w-[1280px] mx-auto w-full px-8 md:px-12 relative">
        <div className="grid md:grid-cols-[1.15fr_1fr] gap-14 md:gap-24 items-center">
          <div className="space-y-8">
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="rule-gold-short" style={{ background: "#b8963e" }} />
              <span className="smallcaps text-[0.65rem] text-[#d4af6a]">
                PhD in Metabolomics · Pharm D
              </span>
            </motion.div>

            <motion.h1
              className="display-xl text-white"
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              N.L.
              <br />
              <em className="italic text-[#d4af6a] font-light">Swathi.</em>
            </motion.h1>

            <motion.div
              className="font-serif text-[1.45rem] md:text-[1.7rem] font-light leading-snug"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <RotatingText />
            </motion.div>

            <motion.p
              className="text-[0.95rem] text-white/55 body-luxe max-w-[520px] font-light"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Bridging Diabetes Research, Computational Biology, and Clinical Pharmacy —
              advancing knowledge while mentoring the next generation of researchers.
            </motion.p>

            <motion.div
              className="pt-2 space-y-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="rule-gold-short" />
              <p className="smallcaps text-[0.66rem] text-white/50">
                Currently — Pursuing PhD at{" "}
                <span className="text-[#d4af6a]">Manipal Academy of Higher Education</span>
              </p>
            </motion.div>

            <motion.p
              className="text-[0.82rem] text-white/45 font-light italic font-serif pt-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              Open for collaborations · public speaking · podcasts · mentoring
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                href={`mailto:${cvData.personal.email}`}
                className="link-draw smallcaps text-[0.7rem] text-[#d4af6a]"
                data-cursor="link"
              >
                {cvData.personal.email}
              </a>
              <span className="text-white/20">·</span>
              <a
                href={cvData.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="link-draw smallcaps text-[0.7rem] text-white/55 hover:text-[#d4af6a]"
                data-cursor="link"
              >
                LinkedIn
              </a>
              <a
                href={cvData.personal.scopus}
                target="_blank"
                rel="noreferrer"
                className="link-draw smallcaps text-[0.7rem] text-white/55 hover:text-[#d4af6a]"
                data-cursor="link"
              >
                Scopus
              </a>
              <a
                href={cvData.personal.orcid}
                target="_blank"
                rel="noreferrer"
                className="link-draw smallcaps text-[0.7rem] text-white/55 hover:text-[#d4af6a]"
                data-cursor="link"
              >
                ORCID
              </a>
              <a
                href={cvData.personal.researchId}
                target="_blank"
                rel="noreferrer"
                className="link-draw smallcaps text-[0.7rem] text-white/55 hover:text-[#d4af6a]"
                data-cursor="link"
              >
                Research ID
              </a>
            </motion.div>
          </div>

          <motion.div
            className="flex justify-end"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <FlipCard />
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0.5, 0] }}
          transition={{ duration: 3, delay: 2, repeat: Infinity, repeatDelay: 0.5 }}
        >
          <span className="smallcaps text-[0.6rem] text-white/40">Scroll</span>
          <span className="w-px h-10 bg-gradient-to-b from-[#b8963e] to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
