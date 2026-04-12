import { Section } from "./Section";
import { cvData } from "@/data";
import { motion } from "framer-motion";

export function Experience() {
  return (
    <Section id="experience" subtitle="Professional History" title="Work" titleAccent="Experience">
      <div className="space-y-0">
        {cvData.experience.map((exp, i) => (
          <motion.div
            key={i}
            className="row-highlight border-t border-[rgba(184,150,62,0.25)] py-10 rounded-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
          >
            <div className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-8">
              <div className="pt-1">
                <p className="text-[0.75rem] font-medium text-[#b8963e] tracking-[0.04em]">{exp.duration}</p>
                <p className="text-[0.78rem] text-[#7a7a9a] mt-1">{exp.organization}</p>
                {exp.location && <p className="text-[0.78rem] text-[#7a7a9a]">{exp.location}</p>}
              </div>
              <div>
                <h3 className="font-serif text-[1.35rem] font-medium text-[#0d1b2a] mb-3 transition-colors duration-300 hover:text-[#b8963e]">{exp.role}</h3>
                <ul className="space-y-2 text-[0.85rem] text-[#3d3d5c] leading-[1.75]">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <span className="text-[#7a7a9a] mt-1.5 shrink-0">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                {i === cvData.experience.length - 1 && (
                  <a
                    href={cvData.personal.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline inline-flex items-center mt-4 text-sm text-[#b8963e] hover:text-[#0d1b2a] transition-colors"
                  >
                    View Profile →
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        <div className="border-t border-[rgba(184,150,62,0.25)]" />
      </div>
    </Section>
  );
}
