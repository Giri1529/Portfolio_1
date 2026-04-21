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
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-baseline gap-4 mb-8">
              <span className="smallcaps text-[0.58rem] text-[#b8963e]/80 tabular">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="rule-gold-short" />
              <p className="smallcaps text-[0.72rem] text-[#b8963e]">{category}</p>
            </div>

            <ul className="space-y-5">
              {skills.map((skill, j) => (
                <motion.li
                  key={skill}
                  className="group relative"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.12 + j * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <span className="font-serif font-light text-[1.15rem] md:text-[1.25rem] text-[#0d1b2a] transition-colors duration-500 group-hover:text-[#b8963e]">
                    {skill}
                  </span>
                  <motion.span
                    aria-hidden
                    className="block h-px bg-[#b8963e]/35 mt-3 origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{
                      duration: 1.2,
                      delay: i * 0.12 + j * 0.08 + 0.2,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
