import { useState } from "react";
import { Section } from "./Section";
import { cvData } from "@/data";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

const profileLinks = [
  { label: "LinkedIn", url: cvData.personal.linkedin, icon: "in" },
  { label: "ORCID", url: cvData.personal.orcid, icon: "ID" },
  { label: "Scopus", url: cvData.personal.scopus, icon: "Sc" },
  { label: "Research ID", url: cvData.personal.researchId, icon: "Ri" },
];

export function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:${cvData.personal.email}?subject=Message from ${formData.firstName} ${formData.lastName}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${formData.firstName} ${formData.lastName}%0AEmail: ${formData.email}%0APhone: ${formData.phone}`;
    window.open(mailtoLink, "_blank");
  };

  return (
    <Section id="contact" title="Contact">
      <div className="space-y-16">
        <motion.div
          className="grid sm:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="contact-card flex items-start gap-4 p-6 border border-primary/10 cursor-default">
            <div className="contact-icon w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center shrink-0 transition-all duration-300">
              <Mail className="w-4 h-4 text-primary/60" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-primary mb-1">Email</h4>
              <a href={`mailto:${cvData.personal.email}`} className="link-underline text-sm text-primary/60 hover:text-primary transition-colors break-all">
                {cvData.personal.email}
              </a>
            </div>
          </div>

          <div className="contact-card flex items-start gap-4 p-6 border border-primary/10 cursor-default">
            <div className="contact-icon w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center shrink-0 transition-all duration-300">
              <Phone className="w-4 h-4 text-primary/60" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-primary mb-1">Phone</h4>
              <a href={`tel:${cvData.personal.phone}`} className="link-underline text-sm text-primary/60 hover:text-primary transition-colors">
                {cvData.personal.phone}
              </a>
            </div>
          </div>

          <div className="contact-card flex items-start gap-4 p-6 border border-primary/10 cursor-default">
            <div className="contact-icon w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center shrink-0 transition-all duration-300">
              <MapPin className="w-4 h-4 text-primary/60" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-primary mb-1">Location</h4>
              <p className="text-sm text-primary/60">{cvData.personal.location}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_1px_1fr] gap-0 md:gap-12">
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h3 className="text-xl font-serif font-semibold text-primary mb-2">Send a Message</h3>
            <p className="text-sm text-primary/50 mb-6">Feel free to reach out for collaborations, research inquiries, or academic discussions.</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-primary/50 mb-1.5 uppercase tracking-wider">First name *</label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="input-glow w-full px-4 py-3 bg-transparent border border-primary/15 text-primary text-sm focus:outline-none transition-all placeholder:text-primary/25"
                  placeholder="Your first name"
                  data-testid="input-first-name"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-primary/50 mb-1.5 uppercase tracking-wider">Last name *</label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="input-glow w-full px-4 py-3 bg-transparent border border-primary/15 text-primary text-sm focus:outline-none transition-all placeholder:text-primary/25"
                  placeholder="Your last name"
                  data-testid="input-last-name"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-primary/50 mb-1.5 uppercase tracking-wider">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-glow w-full px-4 py-3 bg-transparent border border-primary/15 text-primary text-sm focus:outline-none transition-all placeholder:text-primary/25"
                  placeholder="your@email.com"
                  data-testid="input-email"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-primary/50 mb-1.5 uppercase tracking-wider">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="input-glow w-full px-4 py-3 bg-transparent border border-primary/15 text-primary text-sm focus:outline-none transition-all placeholder:text-primary/25"
                  placeholder="+91 XXXXXXXXXX"
                  data-testid="input-phone"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-primary/50 mb-1.5 uppercase tracking-wider">Message</label>
              <textarea
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="input-glow w-full px-4 py-3 bg-transparent border border-primary/15 text-primary text-sm focus:outline-none transition-all resize-none placeholder:text-primary/25"
                placeholder="Write your message here..."
                data-testid="input-message"
              />
            </div>

            <button
              type="submit"
              className="btn-shine px-8 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all duration-300 tracking-wide hover:tracking-wider"
              data-testid="button-submit"
            >
              Send Message
            </button>
          </motion.form>

          <div className="hidden md:block w-px bg-primary/10" />

          <motion.div
            className="space-y-10 md:pl-4 pt-10 md:pt-0"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            <div>
              <h3 className="text-xl font-serif font-semibold text-primary mb-6">Academic Profiles</h3>
              <div className="space-y-4">
                {profileLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="profile-link group flex items-center gap-4 p-4 border border-primary/10"
                    data-testid={`contact-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/5 group-hover:bg-[hsl(40,45%,55%)] flex items-center justify-center shrink-0 transition-all duration-300">
                      <span className="text-xs font-bold text-primary/50 group-hover:text-white transition-colors duration-300">{link.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-primary">{link.label}</p>
                      <p className="text-xs text-primary/40 truncate">{link.url}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-primary/30 group-hover:text-[hsl(40,45%,55%)] transition-colors duration-300 shrink-0" />
                  </a>
                ))}
              </div>
            </div>

            <div className="hover-glow p-6 bg-primary/[0.03] border border-primary/10 cursor-default">
              <p className="text-sm font-serif italic text-primary/70 leading-relaxed">
                "Open to research collaborations, peer reviews, and academic mentoring opportunities. Let's advance knowledge together."
              </p>
              <p className="text-xs text-primary/40 mt-3 font-medium">— {cvData.personal.name}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
