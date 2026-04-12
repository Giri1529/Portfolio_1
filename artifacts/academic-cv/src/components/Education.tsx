import { Section } from "./Section";
import { cvData } from "@/data";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Award } from "lucide-react";

const icons = [GraduationCap, BookOpen, Award];
const accents = [
  "from-[hsl(225,40%,18%)] to-[hsl(225,30%,28%)]",
  "from-[hsl(40,45%,45%)] to-[hsl(40,35%,55%)]",
  "from-[hsl(160,30%,35%)] to-[hsl(160,25%,45%)]",
];

export function Education() {
  return (
    <Section id="education" subtitle="Academic Background" title="Education &" titleAccent="Training">
      <div className="space-y-8">
        {cvData.education.map((edu, i) => {
          const Icon = icons[i % icons.length];
          return (
            <motion.div
              key={i}
              className="group hover-lift relative bg-background border border-primary/8 rounded-sm overflow-hidden cursor-default"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
            >
              <div className="grid md:grid-cols-[280px_1fr]">
                <div className={`bg-gradient-to-br ${accents[i % accents.length]} p-8 flex flex-col justify-between`}>
                  <div>
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <Icon className="w-5 h-5 text-white/80" />
                    </div>
                    <h3 className="text-2xl font-serif font-semibold text-white mb-2">{edu.degree}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">
                      {edu.institution}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-2">
                    <span className="inline-block px-3 py-1 text-[10px] font-semibold uppercase tracking-wider bg-white/15 text-white rounded-sm">
                      {edu.status}
                    </span>
                    {edu.location && (
                      <span className="text-xs text-white/40">{edu.location}</span>
                    )}
                  </div>
                </div>

                <div className="p-8 flex flex-col justify-center">
                  {edu.description && (
                    <p className="text-[15px] text-primary/70 leading-relaxed">{edu.description}</p>
                  )}

                  {edu.coursework && (
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.15em] text-primary/40 mb-4">Key Training</p>
                      <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                        {edu.coursework.map((item: string, j: number) => (
                          <div key={j} className="flex items-start gap-3 group/item transition-all duration-300 hover:translate-x-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(40,45%,55%)] mt-2 shrink-0 transition-transform duration-300 group-hover/item:scale-150" />
                            <span className="text-sm text-primary/65 leading-relaxed transition-colors duration-300 group-hover/item:text-primary">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
