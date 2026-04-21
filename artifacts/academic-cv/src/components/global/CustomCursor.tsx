import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasHover = window.matchMedia("(hover: hover)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hasHover || reduceMotion) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      setHover(!!t.closest('[data-cursor="link"], a, button, input, textarea, [role="button"]'));
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
        animate={{
          x: pos.x - 3,
          y: pos.y - 3,
          opacity: visible ? 1 : 0,
          scale: hover ? 0 : 1,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 700, mass: 0.18 }}
      >
        <div className="w-[6px] h-[6px] rounded-full bg-[#d4af6a]" />
      </motion.div>
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none z-[9998] will-change-transform"
        animate={{
          x: pos.x - 18,
          y: pos.y - 18,
          opacity: visible ? 1 : 0,
          scale: hover ? 1.7 : 1,
        }}
        transition={{ type: "spring", damping: 22, stiffness: 140, mass: 0.45 }}
      >
        <div className="w-9 h-9 rounded-full border border-[rgba(184,150,62,0.45)]" />
      </motion.div>
    </>
  );
}
