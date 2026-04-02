import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionProps {
  id: string;
  title?: string;
  children: ReactNode;
  className?: string;
  noDivider?: boolean;
}

export function Section({ id, title, children, className = "", noDivider = false }: SectionProps) {
  return (
    <motion.section
      id={id}
      className={`py-16 md:py-24 scroll-mt-20 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {title && (
        <div className="mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-serif italic text-primary mb-4">
            {title}
          </h2>
          {!noDivider && <div className="w-full h-px bg-primary/20" />}
        </div>
      )}
      {children}
    </motion.section>
  );
}
