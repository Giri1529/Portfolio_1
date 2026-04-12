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
  const textColor = dark ? "text-white" : "text-primary";
  const accentColor = "text-[hsl(40,45%,55%)]";
  const subtitleColor = dark ? "text-[hsl(40,45%,55%)]" : "text-[hsl(40,45%,55%)]";
  const dividerColor = dark ? "bg-white/15" : "bg-primary/20";

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
            <div className="flex items-center gap-4 mb-4">
              <span className={`text-xs font-medium uppercase tracking-[0.2em] ${subtitleColor}`}>
                {subtitle}
              </span>
              <div className={`h-px w-12 ${dark ? "bg-[hsl(40,45%,55%)]/50" : "bg-[hsl(40,45%,55%)]/50"}`} />
            </div>
          )}
          {title && (
            <h2 className={`text-3xl md:text-4xl lg:text-[42px] font-serif ${textColor} mb-4 leading-tight`}>
              {title}
              {titleAccent && (
                <span className={`italic ${accentColor}`}> {titleAccent}</span>
              )}
            </h2>
          )}
          {!noDivider && !subtitle && <div className={`w-full h-px ${dividerColor}`} />}
        </div>
      )}
      {children}
    </motion.section>
  );
}
