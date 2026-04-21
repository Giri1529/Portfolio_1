import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  titleAccent?: string;
  children: ReactNode;
  className?: string;
  noDivider?: boolean;
  dark?: boolean;
}

export function Section({ id, title, subtitle, titleAccent, children, className = "", noDivider = false, dark = false }: SectionProps) {
  const textColor = dark ? "text-white" : "text-[#0d1b2a]";
  const accentColor = "text-[#b8963e]";

  return (
    <motion.section
      id={id}
      className={`section-pad scroll-mt-20 ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {(title || subtitle) && (
        <motion.div
          className="mb-14 md:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {subtitle && (
            <div className="flex items-center gap-3 mb-5">
              <span className="rule-gold-short" />
              <span className={`smallcaps text-[0.68rem] ${accentColor}`}>
                {subtitle}
              </span>
            </div>
          )}
          {title && (
            <h2 className={`display-section ${textColor}`}>
              {title}
              {titleAccent && (
                <span className={`italic ${accentColor}`}> {titleAccent}</span>
              )}
            </h2>
          )}
          {!noDivider && !subtitle && (
            <motion.div
              className={`mt-8 w-full h-px origin-left ${dark ? "bg-white/15" : "bg-[rgba(184,150,62,0.25)]"}`}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
        </motion.div>
      )}
      {children}
    </motion.section>
  );
}
