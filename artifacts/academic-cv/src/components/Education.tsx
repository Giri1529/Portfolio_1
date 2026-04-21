import { useEffect, useRef } from "react";
import { Section } from "./Section";
import { cvData } from "@/data";
import { motion } from "framer-motion";
import VanillaTilt from "vanilla-tilt";

function EducationPlaque({ edu, i }: { edu: typeof cvData.education[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const hasHover = window.matchMedia("(hover: hover)").matches;
    if (!hasHover) return;

    VanillaTilt.init(el, {
      max: 5,
      speed: 600,
      glare: false,
      scale: 1.01,
      perspective: 1400,
      "full-page-listening": false,
    } as any);

    return () => {
      (el as any).vanillaTilt?.destroy();
    };
  }, []);

  const yearMatch = edu.status.match(/\d{4}/);
  const yearLabel = yearMatch ? yearMatch[0] : edu.status;
  const isYear = Boolean(yearMatch);

  return (
    <motion.div
      ref={ref}
      className="group relative py-12 md:py-16 px-4 md:px-8 -mx-4 md:-mx-8 border-t border-[rgba(184,150,62,0.2)] transition-colors duration-700 hover:bg-white/40"
      style={{ transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      data-cursor="link"
    >
      <div className="grid md:grid-cols-[1fr_auto] gap-8 md:gap-16 items-baseline">
        <div>
          <p className="smallcaps text-[0.62rem] text-[#b8963e]/80 mb-4 tabular">
            {String(i + 1).padStart(2, "0")} — {edu.status}
          </p>
          <h3 className="font-serif font-light text-[2.2rem] md:text-[3rem] text-[#0d1b2a] leading-[1.05] mb-2 tracking-[-0.01em]">
            {edu.degree}
          </h3>
          <p className="font-serif italic font-light text-[1.05rem] md:text-[1.2rem] text-[#b8963e] mb-3">
            {edu.institution}
          </p>
          {edu.location && (
            <p className="smallcaps text-[0.65rem] text-[#7a7a9a]">{edu.location}</p>
          )}
          {edu.description && (
            <p className="mt-6 body-luxe font-serif font-light text-[1rem] text-[#3d3d5c] max-w-2xl">
              {edu.description}
            </p>
          )}
          {edu.coursework && (
            <ul className="mt-6 space-y-2 max-w-2xl">
              {edu.coursework.map((item: string, j: number) => (
                <li
                  key={j}
                  className="flex gap-4 text-[0.88rem] text-[#3d3d5c] font-light font-serif body-luxe"
                >
                  <span className="smallcaps text-[0.55rem] text-[#b8963e]/70 mt-1.5 tabular shrink-0">
                    {String(j + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="text-left md:text-right md:pl-8">
          {isYear ? (
            <div className="display-hero font-light text-[#b8963e] tabular leading-none opacity-70 group-hover:opacity-100 transition-opacity duration-700">
              {yearLabel}
            </div>
          ) : (
            <div className="font-serif italic font-light text-[2rem] md:text-[2.75rem] text-[#b8963e] leading-none opacity-80 group-hover:opacity-100 transition-opacity duration-700 whitespace-nowrap">
              {yearLabel}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Education() {
  return (
    <Section id="education" subtitle="Academic Background" title="Education &" titleAccent="Training">
      <div>
        {cvData.education.map((edu, i) => (
          <EducationPlaque key={i} edu={edu} i={i} />
        ))}
        <div className="border-t border-[rgba(184,150,62,0.2)]" />
      </div>
    </Section>
  );
}
