import { motion } from "framer-motion";

export function PageCurtain() {
  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 z-[10000] pointer-events-none origin-top bg-[#0d1b2a] motion-reduce:hidden"
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
    />
  );
}
