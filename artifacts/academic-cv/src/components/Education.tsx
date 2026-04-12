import { Section } from "./Section";
import { cvData } from "@/data";
import { motion } from "framer-motion";

export function Education() {
  return (
    <Section id="education" subtitle="Academic Background" title="Education &" titleAccent="Training">
      <div className="grid md:grid-cols-3 gap-6">
        {cvData.education.map((edu, i) => (
          <motion.div
            key={i}
            className="group hover-lift bg-[#f5f0e8] border border-[rgba(184,150,62,0.25)] rounded-sm p-8 border-t-[3px] border-t-[#b8963e] cursor-default"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
          >
            <h3 className="font-serif text-[1.4rem] font-medium text-[#0d1b2a] mb-1">{edu.degree}</h3>
            <p className="text-[0.82rem] font-medium text-[#3d3d5c] mb-1">{edu.institution}</p>
            <p className="text-[0.75rem] font-medium text-[#b8963e] tracking-[0.05em] mb-4">{edu.status}{edu.location ? ` · ${edu.location}` : ""}</p>
            <div className="text-[0.8rem] text-[#7a7a9a] leading-[1.65]">
              {edu.description && <p>{edu.description}</p>}
              {edu.coursework && (
                <ul className="mt-2 space-y-1">
                  {edu.coursework.map((item: string, j: number) => (
                    <li key={j} className="ml-4 list-disc">{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
