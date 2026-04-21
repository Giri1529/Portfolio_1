import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "publications", label: "Publications" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

function MagneticLink({
  children,
  onClick,
  href,
  active,
  className = "",
  "data-testid": dataTestId,
}: {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  href: string;
  active: boolean;
  className?: string;
  "data-testid"?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = e.clientX - (rect.left + rect.width / 2);
    const my = e.clientY - (rect.top + rect.height / 2);
    setOffset({ x: mx * 0.25, y: my * 0.3 });
  };

  const onLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative ${className}`}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.3 }}
      data-cursor="link"
      data-testid={dataTestId}
    >
      <span className="relative inline-block">
        {children}
        {active && (
          <motion.span
            layoutId="nav-dot"
            className="absolute left-1/2 -bottom-2 w-1 h-1 rounded-full bg-[#d4af6a]"
            style={{ translateX: "-50%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </span>
    </motion.a>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 80);

      if (currentY < 100) {
        setVisible(true);
      } else if (currentY > lastScrollY.current + 4) {
        setVisible(false);
      } else if (currentY < lastScrollY.current - 4) {
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length === 0) return;
        const topMost = visibleEntries.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        );
        setActive(topMost.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 40;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-500"
      style={{
        background: scrolled ? "rgba(13,27,42,0.72)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(184,150,62,0.14)" : "1px solid transparent",
      }}
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-[1280px] mx-auto px-8 md:px-12">
        <div className="flex h-[72px] items-center justify-between">
          <a
            href="#home"
            onClick={(e) => handleScroll(e, "home")}
            className="group flex items-center"
            data-cursor="link"
            data-testid="nav-logo"
          >
            <span className="font-serif text-[1.5rem] font-light italic tracking-[-0.01em] text-[#d4af6a] transition-colors duration-300 group-hover:text-white">
              nls.
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-9">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <MagneticLink
                  href={`#${link.id}`}
                  onClick={(e) => handleScroll(e, link.id)}
                  active={active === link.id}
                  className={`text-[0.7rem] font-normal uppercase tracking-[0.18em] transition-colors ${
                    active === link.id ? "text-[#d4af6a]" : "text-white/60 hover:text-[#d4af6a]"
                  }`}
                  data-testid={`nav-${link.id}`}
                >
                  {link.label}
                </MagneticLink>
              </motion.div>
            ))}
          </nav>

          <button
            className="md:hidden text-[#d4af6a] p-2 transition-transform duration-200 active:scale-90"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-cursor="link"
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
            style={{ background: "rgba(13,27,42,0.98)", backdropFilter: "blur(14px)" }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="flex flex-col px-8 py-6 gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleScroll(e, link.id)}
                  className={`px-3 py-4 font-serif text-[1.3rem] font-light transition-all duration-300 border-b border-white/5 last:border-0 ${
                    active === link.id ? "text-[#d4af6a] italic" : "text-white/70 hover:text-[#d4af6a] hover:pl-5"
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                  data-testid={`nav-mobile-${link.id}`}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
