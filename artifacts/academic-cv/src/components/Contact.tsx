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
    <Section id="contact" title="Contact" dark>
      <div className="space-y-16">
        <motion.p
          className="text-[1.05rem] text-white/65 leading-[1.85] max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Feel free to reach out for collaborations, research inquiries, or academic discussions.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 shrink-0 border border-[rgba(184,150,62,0.3)] rounded-sm flex items-center justify-center text-[#b8963e]">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[0.7rem] text-white/35 uppercase tracking-[0.1em] mb-0.5">Email</p>
                <a href={`mailto:${cvData.personal.email}`} className="text-[0.88rem] text-[#d4af6a] hover:underline break-all">
                  {cvData.personal.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-9 h-9 shrink-0 border border-[rgba(184,150,62,0.3)] rounded-sm flex items-center justify-center text-[#b8963e]">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[0.7rem] text-white/35 uppercase tracking-[0.1em] mb-0.5">Phone</p>
                <a href={`tel:${cvData.personal.phone}`} className="text-[0.88rem] text-white hover:underline">
                  {cvData.personal.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-9 h-9 shrink-0 border border-[rgba(184,150,62,0.3)] rounded-sm flex items-center justify-center text-[#b8963e]">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[0.7rem] text-white/35 uppercase tracking-[0.1em] mb-0.5">Location</p>
                <p className="text-[0.88rem] text-white">{cvData.personal.location}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            <h3 className="font-serif text-[1.5rem] font-light text-white mb-6">Academic Profiles</h3>
            <div className="space-y-3">
              {profileLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="profile-link group flex items-center justify-between p-4 bg-white/[0.04] border border-[rgba(184,150,62,0.15)] rounded-sm text-white hover:bg-[rgba(184,150,62,0.08)] hover:border-[rgba(184,150,62,0.4)] transition-all duration-200"
                  data-testid={`contact-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                >
                  <div>
                    <p className="text-[0.85rem] font-medium">{link.label}</p>
                    <p className="text-[0.75rem] text-[#b8963e]">{link.icon}</p>
                  </div>
                  <span className="text-white/30 text-[0.8rem]">→</span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
