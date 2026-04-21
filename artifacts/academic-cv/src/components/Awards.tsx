import { useState } from "react";
import { Section } from "./Section";
import { cvData } from "@/data";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const MOBILE_INITIAL_COUNT = 4;

function extractYear(date: string): string {
  const match = date.match(/\d{4}/);
  return match ? match[0] : date;
}

export function Awards() {
  const [showAll, setShowAll] = useState(false);
  const awards = cvData.awards;
  const hasMore = awards.length > MOBILE_INITIAL_COUNT;

  return (
    <Section id="achievements" subtitle="Recognition" title="Honors &" titleAccent="Awards" dark>
      <motion.div
        className="flex items-baseline gap-6 flex-wrap mb-14 md:mb-20"
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="display-xl font-light tabular text-white leading-none">
          {cvData.stats.awards}
        </div>
        <div className="font-serif italic font-light text-[1.75rem] md:text-[2.25rem] text-[#d4af6a]">
          awards &amp; prizes.
        </div>
      </motion.div>

      <div>
        {awards.map((award, i) => {
          const hidden = !showAll && i >= MOBILE_INITIAL_COUNT;
          return (
            <motion.article
              key={i}
              className={`group relative grid grid-cols-[80px_1fr] md:grid-cols-[180px_1fr_56px] gap-6 md:gap-16 py-8 md:py-12 border-t border-[rgba(184,150,62,0.18)] transition-colors duration-700 hover:bg-white/[0.03] px-2 md:px-4 -mx-2 md:-mx-4 ${
                hidden ? "hidden md:grid" : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: Math.min(i * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] }}
              data-cursor="link"
            >
              {/* Left gold accent bar */}
              <span
                aria-hidden
                className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-[60%] bg-[#b8963e] transition-all duration-700 group-hover:w-[2px]"
              />

              <div className="font-serif font-light tabular text-[#b8963e]/80 leading-none group-hover:text-[#d4af6a] transition-colors duration-700 text-[2rem] md:text-[clamp(2.25rem,3vw,3.25rem)] md:text-right">
                {extractYear(award.date)}
              </div>

              <div className="md:pt-2 min-w-0">
                <h4 className="font-serif text-[1.25rem] md:text-[1.55rem] font-light italic text-white leading-[1.25] mb-2 tracking-[-0.005em]">
                  {award.title}
                </h4>
                <p className="smallcaps text-[0.65rem] text-[#d4af6a]/90 mb-3">
                  {award.issuer}
                </p>
                {award.description && (
                  <p className="body-luxe font-serif font-light text-[0.92rem] text-white/55 max-w-2xl">
                    {award.description}
                  </p>
                )}
              </div>

              <div className="hidden md:flex items-start justify-end pt-4">
                <p className="smallcaps text-[0.6rem] text-white/30 tabular">
                  {String(i + 1).padStart(2, "0")}
                </p>
              </div>
            </motion.article>
          );
        })}
        <div className="border-t border-[rgba(184,150,62,0.18)]" />
      </div>

      {hasMore && (
        <div className="md:hidden flex justify-center mt-10">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 smallcaps text-[0.7rem] text-[#d4af6a]"
            data-cursor="link"
          >
            {showAll ? "Show less" : `View all ${awards.length}`}
            <ChevronDown className={`w-3 h-3 transition-transform duration-500 ${showAll ? "rotate-180" : ""}`} />
          </button>
        </div>
      )}
    </Section>
  );
}
