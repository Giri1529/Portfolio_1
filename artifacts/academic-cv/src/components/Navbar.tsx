import React from "react";
import { useScrollSpy } from "@/hooks/use-scroll-spy";

const navLinks = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "publications", label: "Publications" },
  { id: "awards", label: "Awards" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const activeId = useScrollSpy(navLinks.map((l) => l.id));

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="font-serif font-bold text-xl text-primary tracking-tight">
            N.L. Swathi
          </div>
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleScroll(e, link.id)}
                className={`px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-gray-100 hover:text-primary
                  ${activeId === link.id ? "text-primary bg-gray-50" : "text-gray-600"}
                `}
                data-testid={`nav-${link.id}`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          {/* Mobile menu could be added here, keeping it simple for now */}
        </div>
      </div>
    </header>
  );
}
