import { Section } from "./Section";
import { cvData } from "@/data";
import { motion } from "framer-motion";

export function Awards() {
  return (
    <Section id="achievements" subtitle="Recognition" title="Honors &" titleAccent="Awards" dark>
      <div className="grid sm:grid-cols-2 gap-0 border border-white/10">
        {cvData.awards.map((award, i) => (
          <motion.div
            key={i}
            className={`p-6 md:p-8 border-b border-white/10 sm:border-r ${
              i % 2 !== 0 ? "sm:border-r-0" : ""
            } ${i >= cvData.awards.length - 2 ? "sm:border-b-0" : ""} ${
              i === cvData.awards.length - 1 ? "border-b-0" : ""
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.05, ease: "easeOut" }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-[hsl(40,45%,55%)] mb-3">
              {award.date}
            </p>
            <h4 className="text-base md:text-lg font-semibold text-white mb-2 leading-snug">
              {award.title}
            </h4>
            <p className="text-sm text-white/50 leading-relaxed">
              {award.issuer} — {award.description || ""}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
