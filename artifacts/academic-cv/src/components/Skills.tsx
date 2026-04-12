import { Section } from "./Section";
import { cvData } from "@/data";
import { motion } from "framer-motion";

export function Skills() {
  const categories = Object.entries(cvData.skills);

  return (
    <Section id="expertise" subtitle="Competencies" title="Skills &" titleAccent="Expertise">
      <div className="grid md:grid-cols-3 gap-12 md:gap-16">
        {categories.map(([category, skills], i) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
          >
            <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-primary/50 mb-5">
              {category}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="skill-tag px-4 py-2 text-sm text-primary/70 border border-primary/15 rounded-sm cursor-default"
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
