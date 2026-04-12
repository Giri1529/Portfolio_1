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
      className={`py-16 md:py-24 scroll-mt-20 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {(title || subtitle) && (
        <div className="mb-10 md:mb-14">
          {subtitle && (
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-[#b8963e]">
                {subtitle}
              </span>
              <div className="h-px w-10 bg-[#b8963e]" />
            </div>
          )}
          {title && (
            <h2 className={`text-3xl md:text-4xl lg:text-[3rem] font-serif font-light ${textColor} leading-[1.15]`}>
              {title}
              {titleAccent && (
                <span className={`italic ${accentColor}`}> {titleAccent}</span>
              )}
            </h2>
          )}
          {!noDivider && !subtitle && <div className={`w-full h-px ${dark ? "bg-white/15" : "bg-[rgba(184,150,62,0.25)]"}`} />}
        </div>
      )}
      {children}
    </motion.section>
  );
}
