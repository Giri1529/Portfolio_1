import { useState } from "react";
import { Section } from "./Section";
import { cvData } from "@/data";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

function extractYear(duration: string): string {
  const match = duration.match(/(\d{4})/);
  return match ? match[1] : "";
}

function extractEndYear(duration: string): string {
  const matches = duration.match(/(\d{4})/g);
  if (!matches) return "";
  return matches[matches.length - 1];
}

function ExperienceRow({ exp, i, total }: { exp: typeof cvData.experience[0]; i: number; total: number }) {
  const [expanded, setExpanded] = useState(false);
  const startYear = extractYear(exp.duration);
  const endYear = extractEndYear(exp.duration);
  const yearLabel = startYear === endYear ? startYear : `${startYear}—${endYear.slice(-2)}`;

  const hasMore = exp.highlights.length > 1;
  const visible = expanded ? exp.highlights : exp.highlights.slice(0, 1);

  return (
    <motion.div
      className="relative grid md:grid-cols-[minmax(260px,0.9fr)_1.6fr] gap-8 md:gap-20 py-16 md:py-24 border-t border-[rgba(184,150,62,0.2)]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Timeline dot */}
      <motion.span
        aria-hidden
        className="hidden md:block absolute left-0 top-[6.5rem] w-2 h-2 rounded-full bg-[#b8963e] -translate-x-[calc(50%+0.5px)]"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="md:sticky md:top-28 md:self-start">
        <div className="display-hero text-[#b8963e] font-light tabular leading-none">{yearLabel}</div>
        <p className="smallcaps text-[0.68rem] text-[#7a7a9a] mt-4">{exp.duration}</p>
      </div>

      <div className="pt-2">
        <p className="smallcaps text-[0.65rem] text-[#b8963e] mb-3">
          {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
        <h3 className="font-serif text-[1.8rem] md:text-[2.4rem] font-light italic text-[#0d1b2a] mb-3 leading-[1.05]">
          {exp.role}
        </h3>
        <p className="smallcaps text-[0.72rem] text-[#3d3d5c] mb-8">
          {exp.organization}
          {exp.location && <span className="text-[#7a7a9a]"> · {exp.location}</span>}
        </p>

        <ul className="space-y-5">
          <AnimatePresence initial={false}>
            {visible.map((h, j) => (
              <motion.li
                key={j}
                className="flex gap-5 font-serif text-[1.02rem] font-light body-luxe text-[#3d3d5c]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="smallcaps text-[0.58rem] text-[#b8963e]/60 mt-2 tabular shrink-0">
                  {String(j + 1).padStart(2, "0")}
                </span>
                <span>{h}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        {hasMore && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="smallcaps text-[0.65rem] text-[#b8963e] hover:text-[#0d1b2a] transition-colors mt-8 inline-flex items-center gap-2 group"
            data-cursor="link"
          >
            <span>{expanded ? "Show less" : "Read more"}</span>
            <ChevronDown
              className={`w-3 h-3 transition-transform duration-500 ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        )}

        {i === total - 1 && (
          <div className="mt-10">
            <a
              href={cvData.personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="link-draw smallcaps text-[0.7rem] text-[#b8963e]"
              data-cursor="link"
            >
              View Profile →
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function Experience() {
  return (
    <Section id="experience" subtitle="Professional History" title="Work" titleAccent="Experience">
      <div className="relative">
        {/* Vertical gold line — drawn in on scroll */}
        <motion.div
          aria-hidden
          className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-[rgba(184,150,62,0.25)] origin-top"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="md:pl-16">
          {cvData.experience.map((exp, i) => (
            <ExperienceRow key={i} exp={exp} i={i} total={cvData.experience.length} />
          ))}
          <div className="border-t border-[rgba(184,150,62,0.2)]" />
        </div>
      </div>
    </Section>
  );
}
