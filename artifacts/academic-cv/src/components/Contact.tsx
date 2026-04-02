import { useState } from "react";
import { Section } from "./Section";
import { cvData } from "@/data";
import { motion } from "framer-motion";

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
      <div className="grid md:grid-cols-2 gap-12">
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-5 max-w-md"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div>
            <label className="block text-sm text-primary/60 mb-1.5">First name *</label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full px-3 py-2.5 bg-transparent border border-primary/20 text-primary text-sm focus:outline-none focus:border-primary/50 transition-colors"
              data-testid="input-first-name"
            />
          </div>
          <div>
            <label className="block text-sm text-primary/60 mb-1.5">Last name *</label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full px-3 py-2.5 bg-transparent border border-primary/20 text-primary text-sm focus:outline-none focus:border-primary/50 transition-colors"
              data-testid="input-last-name"
            />
          </div>
          <div>
            <label className="block text-sm text-primary/60 mb-1.5">Email *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2.5 bg-transparent border border-primary/20 text-primary text-sm focus:outline-none focus:border-primary/50 transition-colors"
              data-testid="input-email"
            />
          </div>
          <div>
            <label className="block text-sm text-primary/60 mb-1.5">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2.5 bg-transparent border border-primary/20 text-primary text-sm focus:outline-none focus:border-primary/50 transition-colors"
              data-testid="input-phone"
            />
          </div>
          <div>
            <label className="block text-sm text-primary/60 mb-1.5">Message</label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3 py-2.5 bg-transparent border border-primary/20 text-primary text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none"
              data-testid="input-message"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            data-testid="button-submit"
          >
            Submit
          </button>
        </motion.form>

        <motion.div
          className="space-y-6 text-sm text-primary/70"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        >
          <div>
            <h4 className="font-medium text-primary mb-2">Contact Information</h4>
            <p>{cvData.personal.email}</p>
            <p>{cvData.personal.phone}</p>
            <p className="mt-2">{cvData.personal.location}</p>
          </div>
          <div>
            <h4 className="font-medium text-primary mb-2">Academic Profiles</h4>
            <div className="space-y-1.5">
              <a href={cvData.personal.linkedin} target="_blank" rel="noreferrer" className="block hover:text-primary transition-colors" data-testid="contact-linkedin">LinkedIn</a>
              <a href={cvData.personal.orcid} target="_blank" rel="noreferrer" className="block hover:text-primary transition-colors" data-testid="contact-orcid">ORCID</a>
              <a href={cvData.personal.scopus} target="_blank" rel="noreferrer" className="block hover:text-primary transition-colors" data-testid="contact-scopus">Scopus</a>
              <a href={cvData.personal.researchId} target="_blank" rel="noreferrer" className="block hover:text-primary transition-colors" data-testid="contact-researchid">Research ID</a>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
