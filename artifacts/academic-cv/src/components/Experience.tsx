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
            className="row-highlight border-t border-primary/10 py-10 rounded-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
          >
            <div className="grid md:grid-cols-[220px_1fr] gap-4 md:gap-16">
              <div>
                <p className="text-sm font-medium text-[hsl(40,45%,55%)]">{exp.duration}</p>
                <p className="text-sm text-primary/50 mt-1">{exp.organization}</p>
                {exp.location && <p className="text-sm text-primary/40">{exp.location}</p>}
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-serif text-primary mb-4 transition-colors duration-300 hover:text-[hsl(40,45%,55%)]">{exp.role}</h3>
                <ul className="space-y-2.5 text-primary/65">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-2.5 leading-relaxed text-[15px] group transition-colors duration-300 hover:text-primary/80">
                      <span className="text-primary/30 mt-1.5 shrink-0 transition-colors duration-300 group-hover:text-[hsl(40,45%,55%)]">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                {i === cvData.experience.length - 1 && (
                  <a
                    href={cvData.personal.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline inline-flex items-center mt-4 text-sm text-[hsl(40,45%,55%)] hover:text-primary transition-colors"
                  >
                    View Profile →
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        <div className="border-t border-primary/10" />
      </div>
    </Section>
  );
}
