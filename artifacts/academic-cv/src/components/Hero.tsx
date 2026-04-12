import { cvData } from "@/data";
import { motion } from "framer-motion";
import heroImg from "@assets/Smiling_scientist_in_lab_with_equipment_1776005121219.png";

export function Hero() {
  return (
    <section id="home" className="pt-8 pb-16 md:pt-16 md:pb-24 scroll-mt-20">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="space-y-6 md:space-y-8">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-[80px] font-serif italic text-primary leading-[1.05] tracking-tight uppercase"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Visionary<br />Researcher
          </motion.h1>
          <motion.p
            className="text-base md:text-lg text-primary/70 leading-relaxed max-w-lg font-serif"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            I am a PhD Scholar and Pharm D graduate with a passion for Diabetes Research, Computational Biology, and Clinical Pharmacy. My work bridges theory and practice — advancing knowledge while mentoring the next generation of researchers.
          </motion.p>
          <motion.a
            href="#about"
            className="btn-shine inline-block px-6 py-3 text-sm font-medium border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:tracking-wider"
            data-testid="hero-explore-btn"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
          >
            Explore More
          </motion.a>
        </div>
        <motion.div
          className="flex justify-end"
          initial={{ opacity: 0, scale: 0.95, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="img-zoom w-full max-w-[420px] aspect-[3/4] rounded-sm">
            <img
              src={heroImg}
              alt="N.L. Swathi - Researcher portrait"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
