import { Section } from "./Section";
import { cvData } from "@/data";
import { motion } from "framer-motion";

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="space-y-0">
        {cvData.experience.map((exp, i) => (
          <motion.div
            key={i}
            className="border-t border-primary/15 py-8 md:py-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
          >
            <div className="grid md:grid-cols-[280px_1fr] gap-4 md:gap-12">
              <div>
                <h3 className="text-lg md:text-xl font-medium text-primary">{exp.role}</h3>
                <p className="text-sm text-primary/50 mt-1">{exp.duration}</p>
              </div>
              <div>
                <p className="text-primary/80 font-serif mb-3">{exp.organization}{exp.location ? ` | ${exp.location}` : ""}</p>
                <ul className="space-y-2 text-primary/65">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="leading-relaxed">{h}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
        <div className="border-t border-primary/15" />
      </div>
    </Section>
  );
}
