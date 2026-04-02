import { Section } from "./Section";
import { cvData } from "@/data";
import { motion } from "framer-motion";

export function Awards() {
  return (
    <Section id="achievements" title="Key Achievements">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
        {cvData.awards.map((award, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.07, ease: "easeOut" }}
          >
            <h4 className="text-base font-semibold text-primary mb-2">{award.title}</h4>
            <p className="text-sm text-primary/55 leading-relaxed">
              {award.description || award.issuer}
              {award.date && <span className="block mt-1 text-primary/40 text-xs">{award.issuer} - {award.date}</span>}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
