import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Work Experience" },
  { id: "education", label: "Education" },
  { id: "publications", label: "Publications" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <motion.header
      className="sticky top-0 z-50 w-full backdrop-blur-md border-b border-[rgba(184,150,62,0.3)]"
      style={{ background: "rgba(13,27,42,0.97)" }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-[1100px] mx-auto px-8">
        <div className="flex h-[60px] items-center justify-between">
          <a href="#home" onClick={(e) => handleScroll(e, "home")} className="group flex items-center gap-2" data-testid="nav-logo">
            <span className="font-serif text-[1.2rem] font-medium tracking-[0.04em] text-[#d4af6a] transition-colors duration-300 group-hover:text-white">N.L. Swathi</span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleScroll(e, link.id)}
                className="nav-link-hover text-[0.78rem] font-normal uppercase tracking-[0.12em] text-white/70 hover:text-[#d4af6a] transition-colors"
                data-testid={`nav-${link.id}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>
          <button
            className="md:hidden text-[#d4af6a] p-2 transition-transform duration-200 active:scale-90"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="nav-mobile-toggle"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden border-t border-[rgba(184,150,62,0.2)] overflow-hidden"
            style={{ background: "#0d1b2a" }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <nav className="flex flex-col px-8 py-4 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleScroll(e, link.id)}
                  className="px-3 py-3 text-sm font-normal text-white/70 hover:text-[#d4af6a] hover:pl-5 transition-all duration-300 border-b border-white/10 last:border-0"
                  data-testid={`nav-mobile-${link.id}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
