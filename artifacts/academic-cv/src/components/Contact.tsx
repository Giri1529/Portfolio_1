import { useEffect, useRef, useState } from "react";
import { Section } from "./Section";
import { cvData } from "@/data";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, ExternalLink, CheckCircle2, AlertCircle } from "lucide-react";

const profileLinks = [
  { label: "LinkedIn", url: cvData.personal.linkedin, icon: "in" },
  { label: "ORCID", url: cvData.personal.orcid, icon: "ID" },
  { label: "Scopus", url: cvData.personal.scopus, icon: "Sc" },
  { label: "Research ID", url: cvData.personal.researchId, icon: "Ri" },
];

const emptyForm = { firstName: "", lastName: "", email: "", phone: "", message: "" };

type SubmitStatus = "idle" | "sending" | "success" | "error";

export function Contact() {
  const [formData, setFormData] = useState(emptyForm);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const scheduleReset = () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setStatus("idle"), 6000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setErrorMessage("Form is not configured. Please email directly.");
      setStatus("error");
      scheduleReset();
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Portfolio Contact: ${formData.firstName} ${formData.lastName}`.trim(),
          from_name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setFormData(emptyForm);
      } else {
        setErrorMessage(data.message || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setStatus("error");
    } finally {
      scheduleReset();
    }
  };

  const isSending = status === "sending";

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
          <div className="contact-card flex items-start gap-4 p-6 border border-[rgba(184,150,62,0.25)] rounded-sm cursor-default bg-[#f5f0e8]">
            <div className="contact-icon w-10 h-10 rounded-full bg-[#0d1b2a]/5 flex items-center justify-center shrink-0 transition-all duration-300">
              <Mail className="w-4 h-4 text-[#0d1b2a]/60" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-[#0d1b2a] mb-1">Email</h4>
              <a href={`mailto:${cvData.personal.email}`} className="link-underline text-sm text-[#3d3d5c] hover:text-[#0d1b2a] transition-colors break-all">
                {cvData.personal.email}
              </a>
            </div>
          </div>

          <div className="contact-card flex items-start gap-4 p-6 border border-[rgba(184,150,62,0.25)] rounded-sm cursor-default bg-[#f5f0e8]">
            <div className="contact-icon w-10 h-10 rounded-full bg-[#0d1b2a]/5 flex items-center justify-center shrink-0 transition-all duration-300">
              <Phone className="w-4 h-4 text-[#0d1b2a]/60" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-[#0d1b2a] mb-1">Phone</h4>
              <a href={`tel:${cvData.personal.phone}`} className="link-underline text-sm text-[#3d3d5c] hover:text-[#0d1b2a] transition-colors">
                {cvData.personal.phone}
              </a>
            </div>
          </div>

          <div className="contact-card flex items-start gap-4 p-6 border border-[rgba(184,150,62,0.25)] rounded-sm cursor-default bg-[#f5f0e8]">
            <div className="contact-icon w-10 h-10 rounded-full bg-[#0d1b2a]/5 flex items-center justify-center shrink-0 transition-all duration-300">
              <MapPin className="w-4 h-4 text-[#0d1b2a]/60" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-[#0d1b2a] mb-1">Location</h4>
              <p className="text-sm text-[#3d3d5c]">{cvData.personal.location}</p>
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
            <h3 className="text-xl font-serif font-medium text-[#0d1b2a] mb-2">Send a Message</h3>
            <p className="text-sm text-[#7a7a9a] mb-6">Feel free to reach out for collaborations, research inquiries, or academic discussions.</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#7a7a9a] mb-1.5 uppercase tracking-wider">First name *</label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="input-glow w-full px-4 py-3 bg-transparent border border-[rgba(184,150,62,0.25)] text-[#0d1b2a] text-sm focus:outline-none transition-all placeholder:text-[#7a7a9a]/50"
                  placeholder="Your first name"
                  data-testid="input-first-name"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#7a7a9a] mb-1.5 uppercase tracking-wider">Last name *</label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="input-glow w-full px-4 py-3 bg-transparent border border-[rgba(184,150,62,0.25)] text-[#0d1b2a] text-sm focus:outline-none transition-all placeholder:text-[#7a7a9a]/50"
                  placeholder="Your last name"
                  data-testid="input-last-name"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#7a7a9a] mb-1.5 uppercase tracking-wider">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-glow w-full px-4 py-3 bg-transparent border border-[rgba(184,150,62,0.25)] text-[#0d1b2a] text-sm focus:outline-none transition-all placeholder:text-[#7a7a9a]/50"
                  placeholder="your@email.com"
                  data-testid="input-email"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#7a7a9a] mb-1.5 uppercase tracking-wider">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="input-glow w-full px-4 py-3 bg-transparent border border-[rgba(184,150,62,0.25)] text-[#0d1b2a] text-sm focus:outline-none transition-all placeholder:text-[#7a7a9a]/50"
                  placeholder="+91 XXXXXXXXXX"
                  data-testid="input-phone"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#7a7a9a] mb-1.5 uppercase tracking-wider">Message</label>
              <textarea
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="input-glow w-full px-4 py-3 bg-transparent border border-[rgba(184,150,62,0.25)] text-[#0d1b2a] text-sm focus:outline-none transition-all resize-none placeholder:text-[#7a7a9a]/50"
                placeholder="Write your message here..."
                data-testid="input-message"
              />
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="btn-shine px-8 py-3 bg-[#0d1b2a] text-[#f5f0e8] text-sm font-medium hover:bg-[#1a2f45] transition-all duration-300 tracking-wide hover:tracking-wider rounded-sm disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-[#0d1b2a] disabled:hover:tracking-wide"
              data-testid="button-submit"
            >
              {isSending ? "Sending..." : "Send Message"}
            </button>

            <AnimatePresence mode="wait">
              {status === "success" && (
                <motion.div
                  key="success-toast"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  role="status"
                  aria-live="polite"
                  className="flex items-start gap-3 p-4 border border-[rgba(184,150,62,0.35)] bg-[#f5f0e8] rounded-sm"
                  data-testid="contact-toast-success"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#b8963e] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[#0d1b2a]">Message sent!</p>
                    <p className="text-xs text-[#3d3d5c] mt-0.5">
                      {cvData.personal.name.split(" ")[0]} will get back to you soon.
                    </p>
                  </div>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  key="error-toast"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  role="alert"
                  aria-live="assertive"
                  className="flex items-start gap-3 p-4 border border-[rgba(185,28,28,0.35)] bg-[rgba(185,28,28,0.06)] rounded-sm"
                  data-testid="contact-toast-error"
                >
                  <AlertCircle className="w-5 h-5 text-[#b91c1c] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[#0d1b2a]">Could not send message</p>
                    <p className="text-xs text-[#3d3d5c] mt-0.5">{errorMessage}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>

          <div className="hidden md:block w-px bg-[rgba(184,150,62,0.25)]" />

          <motion.div
            className="space-y-10 md:pl-4 pt-10 md:pt-0"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            <div>
              <h3 className="text-xl font-serif font-medium text-[#0d1b2a] mb-6">Academic Profiles</h3>
              <div className="space-y-4">
                {profileLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="profile-link group flex items-center gap-4 p-4 border border-[rgba(184,150,62,0.25)] rounded-sm"
                    data-testid={`contact-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#0d1b2a]/5 group-hover:bg-[#b8963e] flex items-center justify-center shrink-0 transition-all duration-300">
                      <span className="text-xs font-bold text-[#0d1b2a]/50 group-hover:text-white transition-colors duration-300">{link.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#0d1b2a]">{link.label}</p>
                      <p className="text-xs text-[#7a7a9a] truncate">{link.url}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-[#7a7a9a] group-hover:text-[#b8963e] transition-colors duration-300 shrink-0" />
                  </a>
                ))}
              </div>
            </div>

            <div className="hover-glow p-6 bg-[#f5f0e8] border border-[rgba(184,150,62,0.25)] cursor-default rounded-sm">
              <p className="text-sm font-serif italic text-[#3d3d5c] leading-relaxed">
                "Open to research collaborations, academic discussions, writing opportunities, and mentoring inquiries. Let's advance knowledge together."
              </p>
              <p className="text-xs text-[#7a7a9a] mt-3 font-medium">— {cvData.personal.name}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
