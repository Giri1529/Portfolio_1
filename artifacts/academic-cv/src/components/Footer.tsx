import { cvData } from "@/data";
import { motion } from "framer-motion";

const footerLinks = [
  { label: "LinkedIn", url: cvData.personal.linkedin },
  { label: "Scopus", url: cvData.personal.scopus },
  { label: "ORCID", url: cvData.personal.orcid },
  { label: "Research ID", url: cvData.personal.researchId },
];

export function Footer() {
  return (
    <motion.footer
      className="relative overflow-hidden border-t border-[rgba(184,150,62,0.18)]"
      style={{ background: "#0d1b2a" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      {/* Thin gold rule at the top that draws in */}
      <motion.span
        aria-hidden
        className="absolute left-0 right-0 top-0 h-px bg-[#b8963e] origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="max-w-[1280px] mx-auto px-8 md:px-12 pt-20 md:pt-28 pb-10">
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-16 md:gap-24 items-end mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="smallcaps text-[0.64rem] text-[#b8963e] mb-6">Signature</p>
            <h3 className="display-xl text-white leading-[0.9]">
              N.L.
              <br />
              <em className="italic text-[#d4af6a] font-light">Swathi.</em>
            </h3>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="smallcaps text-[0.64rem] text-[#b8963e]">Connect</p>
            <ul className="space-y-4">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="link-draw font-serif font-light text-[1.05rem] text-white/70 hover:text-[#d4af6a] transition-colors duration-500"
                    data-cursor="link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${cvData.personal.email}`}
                  className="link-draw font-serif font-light text-[1.05rem] text-white/70 hover:text-[#d4af6a] transition-colors duration-500"
                  data-cursor="link"
                >
                  Email
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="pt-8 border-t border-[rgba(184,150,62,0.15)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p className="smallcaps text-[0.6rem] text-white/35 tabular">
            © 2026 {cvData.personal.name} · PhD Scholar · Pharm D · Researcher
          </p>
          <p className="smallcaps text-[0.58rem] text-white/25 italic font-serif">
            Crafted with deliberate quiet.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
