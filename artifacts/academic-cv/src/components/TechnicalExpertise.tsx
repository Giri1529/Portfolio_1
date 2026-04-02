import { Section } from "./Section";
import { cvData } from "@/data";
import { motion } from "framer-motion";

export function TechnicalExpertise() {
  return (
    <Section id="expertise" title="Technical Expertise">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
        {cvData.expertise.map((exp, i) => {
          const colonIdx = exp.indexOf(":");
          const title = colonIdx > -1 ? exp.slice(0, colonIdx) : exp;
          const details = colonIdx > -1 ? exp.slice(colonIdx + 1).trim() : "";
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: "easeOut" }}
            >
              <h4 className="text-base font-semibold text-primary mb-2">{title}</h4>
              {details && <p className="text-sm text-primary/55 leading-relaxed">{details}</p>}
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
