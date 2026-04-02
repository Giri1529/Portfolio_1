import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionProps {
  id: string;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, title, children, className = "" }: SectionProps) {
  return (
    <motion.section
      id={id}
      className={`py-12 border-t border-gray-200 first:border-t-0 scroll-mt-24 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {title && (
        <h2 className="text-2xl font-serif font-bold text-primary mb-8 border-l-4 border-accent pl-4">
          {title}
        </h2>
      )}
      {children}
    </motion.section>
  );
}
