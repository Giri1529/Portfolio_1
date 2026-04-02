import { Section } from "./Section";
import { cvData } from "@/data";
import { motion } from "framer-motion";

const decorativeIcons = [
  <svg key="0" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2L12 22M2 12L22 12M5.64 5.64L18.36 18.36M18.36 5.64L5.64 18.36" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,
  <svg key="1" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2C12 2 14 8 12 12C10 8 12 2 12 2Z" stroke="currentColor" strokeWidth="1.2"/><path d="M2 12C2 12 8 14 12 12C8 10 2 12 2 12Z" stroke="currentColor" strokeWidth="1.2"/><path d="M22 12C22 12 16 14 12 12C16 10 22 12 22 12Z" stroke="currentColor" strokeWidth="1.2"/><path d="M12 22C12 22 14 16 12 12C10 16 12 22 12 22Z" stroke="currentColor" strokeWidth="1.2"/></svg>,
  <svg key="2" width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.2"/><path d="M12 2v7M12 15v7M2 12h7M15 12h7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,
];

export function Education() {
  return (
    <Section id="education" title="Education">
      <div className="flex flex-col items-center space-y-0 max-w-xl mx-auto">
        {cvData.education.map((edu, i) => (
          <motion.div
            key={i}
            className="w-full"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
          >
            <div className="flex items-center gap-4 py-5">
              <span className="text-primary/60 shrink-0">
                {decorativeIcons[i % decorativeIcons.length]}
              </span>
              <div>
                <h3 className="text-lg font-medium text-primary">{edu.degree}</h3>
                <p className="text-sm text-primary/60 mt-0.5">{edu.institution}</p>
                <p className="text-xs text-primary/45 mt-0.5">{edu.status}</p>
              </div>
            </div>
            {i < cvData.education.length - 1 && <div className="w-full h-px bg-primary/15" />}
            {edu.coursework && (
              <div className="ml-10 mb-4 text-sm text-primary/55 leading-relaxed">
                <span className="font-medium text-primary/70">Relevant Coursework: </span>{edu.coursework}
              </div>
            )}
          </motion.div>
        ))}
        <motion.div
          className="w-full pt-4"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        >
          <div className="flex items-center gap-4 py-5 border-t border-primary/15">
            <span className="text-primary/60 shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 8h16M4 12h16M4 16h16M8 4v16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
            </span>
            <div>
              <h3 className="text-lg font-medium text-primary">Additional Certifications</h3>
              <p className="text-sm text-primary/60 mt-0.5">Coursera, ICMR, Manipal University, Bioinformatics Training</p>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
