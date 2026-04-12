import { cvData } from "@/data";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer
      className="border-t border-[rgba(184,150,62,0.15)]"
      style={{ background: "#0d1b2a" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-[1100px] mx-auto px-8 py-6 text-center">
        <p className="text-[0.75rem] text-white/25">
          &copy; 2025 <span className="text-[#b8963e]">{cvData.personal.name}</span>. PhD Scholar | Pharm D | Researcher
        </p>
      </div>
    </motion.footer>
  );
}
