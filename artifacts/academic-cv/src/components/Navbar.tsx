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
      const top = element.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <motion.header
      className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md border-b border-primary/5"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="flex h-[72px] items-center justify-between">
          <a href="#home" onClick={(e) => handleScroll(e, "home")} className="flex items-center gap-2 text-primary" data-testid="nav-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
              <path d="M12 2L12 22M2 12L22 12M5.64 5.64L18.36 18.36M18.36 5.64L5.64 18.36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="font-serif text-lg font-semibold tracking-tight">N.L. Swathi</span>
          </a>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleScroll(e, link.id)}
                className="px-3 py-2 text-[13px] font-medium text-primary/70 hover:text-primary transition-colors"
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
            className="md:hidden text-primary p-2"
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
            className="md:hidden bg-background border-t border-border overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <nav className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleScroll(e, link.id)}
                  className="px-3 py-3 text-sm font-medium text-primary/70 hover:text-primary transition-colors border-b border-border/50 last:border-0"
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
