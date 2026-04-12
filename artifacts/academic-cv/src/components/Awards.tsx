import { useState } from "react";
import { Section } from "./Section";
import { cvData } from "@/data";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const MOBILE_INITIAL_COUNT = 4;

export function Awards() {
  const [showAll, setShowAll] = useState(false);
  const awards = cvData.awards;
  const hasMore = awards.length > MOBILE_INITIAL_COUNT;

  return (
    <Section id="achievements" subtitle="Recognition" title="Honors &" titleAccent="Awards" dark>
      <div className="grid md:grid-cols-2 gap-6">
        {awards.map((award, i) => (
          <motion.div
            key={i}
            className={`group bg-[#0d1b2a] border border-[rgba(184,150,62,0.2)] rounded-sm p-7 transition-all duration-200 hover:border-[rgba(184,150,62,0.5)] cursor-default ${
              !showAll && i >= MOBILE_INITIAL_COUNT ? "hidden md:block" : ""
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
          >
            <p className="text-[0.7rem] text-[#b8963e] tracking-[0.1em] uppercase mb-1">{award.date}</p>
            <h4 className="font-serif text-[1.15rem] font-medium text-white mb-1">{award.title}</h4>
            <p className="text-[0.78rem] text-white/45 leading-[1.65]">
              <span className="text-white/65 font-medium">{award.issuer}</span>
              {award.description ? ` — ${award.description}` : ""}
            </p>
          </motion.div>
        ))}
      </div>

      {hasMore && (
        <div className="md:hidden flex justify-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 px-6 py-3 border border-[rgba(184,150,62,0.35)] text-sm font-medium text-[#d4af6a] hover:bg-[rgba(184,150,62,0.1)] transition-all duration-300 rounded-sm"
          >
            {showAll ? "Show Less" : `View All ${awards.length} Awards`}
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      )}
    </Section>
  );
}
