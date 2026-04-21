import { useRef } from "react";
import { Section } from "./Section";
import { cvData } from "@/data";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import aboutImg from "@assets/Confident_doctor_in_modern_clinic_1776013522116.png";

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const quoteY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const imgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <Section id="about" subtitle="About" title="A Quiet" titleAccent="Practice">
      <motion.div
        ref={ref}
        className="space-y-24"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {/* Pull-quote split */}
        <motion.div variants={fadeUp} className="grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-20 items-start">
          <motion.blockquote
            style={{ y: quoteY }}
            className="font-serif italic font-light text-[#0d1b2a] leading-[1.15]"
          >
            <span className="text-[#b8963e] text-[2.5rem] leading-none block mb-4 font-light">&ldquo;</span>
            <span style={{ fontSize: "var(--fs-pullquote)" }}>
              Bridging theory with impact — translating research into care for the people who need it most.
            </span>
          </motion.blockquote>

          <div className="relative">
            <p className="dropcap body-luxe text-[#3d3d5c] font-serif text-[1.05rem] md:text-[1.12rem]">
              I am a dedicated PhD Scholar and Pharm D graduate with a wealth of experience in both research
              and academic mentoring. My expertise spans Diabetes Research, Computational Biology, Drug
              Discovery, and Clinical Pharmacy — mentoring researchers toward successful academic paths,
              and turning ideas into impact in clinical and pharmaceutical sectors.
            </p>
          </div>
        </motion.div>

        {/* Image + supporting paragraph */}
        <motion.div variants={fadeUp} className="grid md:grid-cols-[1fr_1.1fr] gap-12 md:gap-20 items-center">
          <motion.div
            style={{ y: imgY }}
            className="img-zoom aspect-[4/5] overflow-hidden relative border border-[rgba(184,150,62,0.15)]"
            data-cursor="link"
          >
            <img
              src={aboutImg}
              alt="N.L. Swathi"
              className="w-full h-full object-cover object-top"
            />
          </motion.div>
          <div>
            <p className="smallcaps text-[0.7rem] text-[#b8963e] mb-4">Research Philosophy</p>
            <p className="body-luxe font-serif text-[1.05rem] md:text-[1.18rem] text-[#3d3d5c] font-light">
              My research has led to meaningful contributions in Diabetes Management, Molecular Docking,
              Epigenetics, and Drug Development. I strive to bridge theoretical foundations with practical
              applications in clinical and pharmaceutical sectors — turning ideas into impact.
            </p>
          </div>
        </motion.div>

        {/* Stats row — three large serif numbers separated by gold rules */}
        <motion.div variants={fadeUp} className="pt-8 border-t border-b border-[rgba(184,150,62,0.2)] py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 text-center md:divide-x md:divide-[rgba(184,150,62,0.2)]">
            <div className="px-6">
              <div className="display-hero text-[#0d1b2a] tabular mb-3">{cvData.stats.publications}</div>
              <div className="smallcaps text-[0.68rem] text-[#7a7a9a]">Publications</div>
            </div>
            <div className="px-6">
              <div className="display-hero text-[#0d1b2a] tabular mb-3">{cvData.stats.ongoingProjects}</div>
              <div className="smallcaps text-[0.68rem] text-[#7a7a9a]">Ongoing Projects</div>
            </div>
            <div className="px-6">
              <div className="display-hero text-[#0d1b2a] tabular mb-3">{cvData.stats.awards}</div>
              <div className="smallcaps text-[0.68rem] text-[#7a7a9a]">Awards &amp; Prizes</div>
            </div>
          </div>
        </motion.div>

        {/* Competencies + Thesis */}
        <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-14 md:gap-24 pt-4">
          <div>
            <p className="smallcaps text-[0.7rem] text-[#b8963e] mb-6">Key Competencies</p>
            <ul className="space-y-4 text-[#3d3d5c]">
              {cvData.competencies.map((comp, i) => (
                <li
                  key={i}
                  className="group py-2 font-serif text-[1.02rem] font-light body-luxe border-b border-[rgba(184,150,62,0.12)] transition-colors duration-500 hover:text-[#0d1b2a]"
                >
                  <span className="smallcaps text-[0.6rem] text-[#b8963e]/70 mr-4 tabular">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {comp}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="smallcaps text-[0.7rem] text-[#b8963e] mb-6">Thesis Research</p>
            <ol className="space-y-6">
              {cvData.thesis.map((thesis, i) => (
                <li key={i} className="font-serif text-[1.05rem] font-light italic body-luxe text-[#0d1b2a]">
                  <span className="not-italic smallcaps text-[0.6rem] text-[#b8963e]/70 mr-3 tabular">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {thesis}
                </li>
              ))}
            </ol>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
