import { cvData } from "@/data";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer
      className="border-t border-primary/15 mt-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-12">
        <div className="grid md:grid-cols-[1fr_1fr_1fr] gap-8">
          <div>
            <div className="group flex items-center gap-2 text-primary mb-4 cursor-default">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary transition-transform duration-300 group-hover:rotate-90">
                <path d="M12 2L12 22M2 12L22 12M5.64 5.64L18.36 18.36M18.36 5.64L5.64 18.36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span className="font-serif text-lg font-semibold transition-colors duration-300 group-hover:text-[hsl(40,45%,55%)]">{cvData.personal.name}</span>
            </div>
            <div className="text-sm text-primary/50 space-y-3">
              <p className="font-medium text-primary/60">Stay Connected</p>
              <div className="flex gap-4">
                <a href={cvData.personal.linkedin} target="_blank" rel="noreferrer" className="footer-link hover:text-primary transition-colors" data-testid="footer-linkedin">LinkedIn</a>
                <a href={cvData.personal.orcid} target="_blank" rel="noreferrer" className="footer-link hover:text-primary transition-colors" data-testid="footer-orcid">ORCID</a>
                <a href={cvData.personal.scopus} target="_blank" rel="noreferrer" className="footer-link hover:text-primary transition-colors" data-testid="footer-scopus">Scopus</a>
              </div>
            </div>
          </div>

          <div className="text-sm text-primary/50">
            <a href={`tel:${cvData.personal.phone}`} className="footer-link block hover:text-primary transition-colors">{cvData.personal.phone}</a>
            <a href={`mailto:${cvData.personal.email}`} className="footer-link block hover:text-primary transition-colors mt-1">{cvData.personal.email}</a>
            <p className="mt-4">{cvData.personal.location}</p>
          </div>

          <div className="text-sm text-primary/50 md:text-right">
            <p>&copy; 2025 {cvData.personal.name}.</p>
            <p className="mt-1">PhD Scholar | Pharm D | Researcher</p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
