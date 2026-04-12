import { Section } from "./Section";
import { cvData } from "@/data";
import { motion } from "framer-motion";

export function Education() {
  return (
    <Section id="education" subtitle="Academic Background" title="Education &" titleAccent="Training">
      <div className="grid md:grid-cols-3 gap-0 border border-primary/10">
        {cvData.education.map((edu, i) => (
          <motion.div
            key={i}
            className={`p-8 ${i < cvData.education.length - 1 ? "border-b md:border-b-0 md:border-r border-primary/10" : ""}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
          >
            <h3 className="text-xl font-serif font-semibold text-primary mb-3">{edu.degree}</h3>
            <p className="text-sm text-primary/70 leading-relaxed mb-2">
              {edu.institution}
            </p>
            <p className="text-sm text-[hsl(40,45%,55%)] font-medium mb-4">
              {edu.status}{edu.location ? ` · ${edu.location}` : ""}
            </p>

            {edu.description && (
              <p className="text-sm text-primary/60 leading-relaxed">{edu.description}</p>
            )}

            {edu.coursework && (
              <ul className="space-y-1.5 text-sm text-primary/60">
                {edu.coursework.map((item: string, j: number) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className="text-primary/30 mt-1.5 shrink-0">•</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
