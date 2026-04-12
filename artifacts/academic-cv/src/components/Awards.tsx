import { Section } from "./Section";
import { cvData } from "@/data";
import { motion } from "framer-motion";
import { Trophy, Medal, Star, Award, BadgeCheck, FileText } from "lucide-react";

const awardIcons = [Trophy, Medal, Star, Award, BadgeCheck, FileText, Trophy, Medal, Star, Award];

export function Awards() {
  return (
    <Section id="achievements" subtitle="Recognition" title="Honors &" titleAccent="Awards" dark>
      <div className="space-y-6">
        {cvData.awards.map((award, i) => {
          const Icon = awardIcons[i % awardIcons.length];
          return (
            <motion.div
              key={i}
              className="group relative overflow-hidden rounded-sm cursor-default"
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
            >
              <div className="relative bg-white/[0.04] border border-white/8 p-6 md:p-8 transition-all duration-400 group-hover:bg-white/[0.07] group-hover:border-white/15">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[hsl(40,45%,55%)] to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />

                <div className="flex items-start gap-5">
                  <div className="w-11 h-11 rounded-full bg-[hsl(40,45%,55%)]/10 flex items-center justify-center shrink-0 transition-all duration-400 group-hover:bg-[hsl(40,45%,55%)]/20 group-hover:scale-110">
                    <Icon className="w-5 h-5 text-[hsl(40,45%,55%)]" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h4 className="text-base md:text-lg font-semibold text-white leading-snug transition-colors duration-300 group-hover:text-[hsl(40,45%,55%)]">
                        {award.title}
                      </h4>
                      <span className="inline-block px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-[hsl(40,45%,55%)]/15 text-[hsl(40,45%,55%)] border border-[hsl(40,45%,55%)]/20 rounded-sm">
                        {award.date}
                      </span>
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed">
                      <span className="text-white/65 font-medium">{award.issuer}</span> — {award.description || ""}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
