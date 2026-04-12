import { Section } from "./Section";
import { cvData } from "@/data";
import { motion } from "framer-motion";

export function Awards() {
  return (
    <Section id="achievements" subtitle="Recognition" title="Honors &" titleAccent="Awards" dark>
      <div className="grid md:grid-cols-2 gap-6">
        {cvData.awards.map((award, i) => (
          <motion.div
            key={i}
            className="group bg-[#0d1b2a] border border-[rgba(184,150,62,0.2)] rounded-sm p-7 transition-all duration-200 hover:border-[rgba(184,150,62,0.5)] cursor-default"
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
    </Section>
  );
}
