import { Section } from "./Section";
import { cvData } from "@/data";
import { motion } from "framer-motion";

export function Skills() {
  const categories = Object.entries(cvData.skills);

  return (
    <Section id="expertise" subtitle="Competencies" title="Skills &" titleAccent="Expertise">
      <div className="grid md:grid-cols-3 gap-8">
        {categories.map(([category, skills], i) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
          >
            <h3 className="text-[0.7rem] font-medium uppercase tracking-[0.15em] text-[#b8963e] mb-4 pb-2 border-b border-[rgba(184,150,62,0.2)]">
              {category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="skill-tag px-3 py-1.5 text-[0.75rem] text-[#3d3d5c] bg-[rgba(184,150,62,0.08)] border border-[rgba(184,150,62,0.2)] rounded-sm cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
