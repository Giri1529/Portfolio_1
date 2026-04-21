import { useEffect, useRef, useState } from "react";
import { Section } from "./Section";
import { cvData } from "@/data";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

const profileLinks = [
  { label: "LinkedIn", url: cvData.personal.linkedin },
  { label: "ORCID", url: cvData.personal.orcid },
  { label: "Scopus", url: cvData.personal.scopus },
  { label: "Research ID", url: cvData.personal.researchId },
];

const emptyForm = { firstName: "", lastName: "", email: "", phone: "", message: "" };

type SubmitStatus = "idle" | "sending" | "success" | "error";

type FieldKey = keyof typeof emptyForm;

function FloatingField({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  "data-testid": dataTestId,
  textarea = false,
  rows,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  "data-testid"?: string;
  textarea?: boolean;
  rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  const sharedProps = {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    className:
      "w-full bg-transparent border-0 border-b border-[rgba(184,150,62,0.3)] focus:border-[#b8963e] outline-none py-4 text-[1.02rem] text-[#0d1b2a] font-serif font-light placeholder-transparent transition-colors duration-500",
    required,
    placeholder: label,
    "data-testid": dataTestId,
  };

  return (
    <div className="relative">
      <label
        className={`absolute left-0 pointer-events-none smallcaps transition-all duration-500 ease-out ${
          active
            ? "text-[0.58rem] text-[#b8963e] top-0"
            : "text-[0.72rem] text-[#7a7a9a] top-4"
        }`}
      >
        {label}
        {required && <span className="text-[#b8963e] ml-1">*</span>}
      </label>
      {textarea ? (
        <textarea {...sharedProps} rows={rows || 4} className={sharedProps.className + " resize-none"} />
      ) : (
        <input type={type} {...sharedProps} />
      )}
    </div>
  );
}

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

  const setField = (key: FieldKey) => (v: string) => setFormData((p) => ({ ...p, [key]: v }));

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
    <Section id="contact" subtitle="Get in Touch" title="Let's" titleAccent="Collaborate">
      <div className="space-y-20">
        {/* Contact info strip — stripped to text, no card backgrounds */}
        <motion.div
          className="grid sm:grid-cols-3 gap-0 sm:divide-x sm:divide-[rgba(184,150,62,0.2)]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="sm:px-8 py-6 first:pl-0">
            <p className="smallcaps text-[0.62rem] text-[#b8963e] mb-3">Email</p>
            <a
              href={`mailto:${cvData.personal.email}`}
              className="link-draw font-serif text-[1rem] text-[#0d1b2a] break-all"
              data-cursor="link"
            >
              {cvData.personal.email}
            </a>
          </div>
          <div className="sm:px-8 py-6">
            <p className="smallcaps text-[0.62rem] text-[#b8963e] mb-3">Phone</p>
            <a
              href={`tel:${cvData.personal.phone}`}
              className="link-draw font-serif text-[1rem] text-[#0d1b2a] tabular"
              data-cursor="link"
            >
              {cvData.personal.phone}
            </a>
          </div>
          <div className="sm:px-8 py-6 last:pr-0">
            <p className="smallcaps text-[0.62rem] text-[#b8963e] mb-3">Location</p>
            <p className="font-serif text-[1rem] text-[#0d1b2a]">{cvData.personal.location}</p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-[1.3fr_1fr] gap-14 md:gap-24">
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-10"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <p className="smallcaps text-[0.68rem] text-[#b8963e] mb-3">Send a Message</p>
              <h3 className="font-serif font-light italic text-[1.75rem] md:text-[2.2rem] text-[#0d1b2a] leading-[1.15]">
                Reach out for collaborations, research inquiries, or academic discussions.
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-x-10 gap-y-8 pt-2">
              <FloatingField
                label="First name"
                value={formData.firstName}
                onChange={setField("firstName")}
                required
                data-testid="input-first-name"
              />
              <FloatingField
                label="Last name"
                value={formData.lastName}
                onChange={setField("lastName")}
                required
                data-testid="input-last-name"
              />
              <FloatingField
                label="Email"
                value={formData.email}
                onChange={setField("email")}
                type="email"
                required
                data-testid="input-email"
              />
              <FloatingField
                label="Phone"
                value={formData.phone}
                onChange={setField("phone")}
                type="tel"
                data-testid="input-phone"
              />
              <div className="md:col-span-2">
                <FloatingField
                  label="Message"
                  value={formData.message}
                  onChange={setField("message")}
                  textarea
                  rows={4}
                  data-testid="input-message"
                />
              </div>
            </div>

            <div className="flex flex-col gap-6 pt-4">
              <button
                type="submit"
                disabled={isSending}
                className="group inline-flex items-center gap-4 self-start smallcaps text-[0.78rem] text-[#0d1b2a] hover:text-[#b8963e] transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                data-cursor="link"
                data-testid="button-submit"
              >
                <span className="relative">
                  {isSending ? "Sending…" : "Send Message"}
                  <span className="absolute left-0 -bottom-1 h-px w-full bg-[#b8963e] origin-left scale-x-100 transition-transform duration-500 group-hover:origin-right group-hover:scale-x-0" />
                </span>
                <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
              </button>

              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.div
                    key="success-toast"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    role="status"
                    aria-live="polite"
                    className="flex items-start gap-4 py-5 border-t border-b border-[rgba(184,150,62,0.3)]"
                    data-testid="contact-toast-success"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#b8963e] shrink-0 mt-0.5" />
                    <div>
                      <p className="smallcaps text-[0.68rem] text-[#0d1b2a]">Message sent</p>
                      <p className="font-serif font-light italic text-[1rem] text-[#3d3d5c] mt-1">
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
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    role="alert"
                    aria-live="assertive"
                    className="flex items-start gap-4 py-5 border-t border-b border-[rgba(185,28,28,0.3)]"
                    data-testid="contact-toast-error"
                  >
                    <AlertCircle className="w-5 h-5 text-[#b91c1c] shrink-0 mt-0.5" />
                    <div>
                      <p className="smallcaps text-[0.68rem] text-[#0d1b2a]">Could not send</p>
                      <p className="font-serif font-light italic text-[1rem] text-[#3d3d5c] mt-1">
                        {errorMessage}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.form>

          <motion.div
            className="space-y-12"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <p className="smallcaps text-[0.68rem] text-[#b8963e] mb-6">Academic Profiles</p>
              <ul className="space-y-5">
                {profileLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-baseline justify-between gap-4 py-3 border-b border-[rgba(184,150,62,0.15)] transition-colors duration-500 hover:border-[#b8963e]"
                      data-cursor="link"
                      data-testid={`contact-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      <span className="font-serif font-light text-[1.1rem] text-[#0d1b2a] group-hover:text-[#b8963e] transition-colors duration-500">
                        {link.label}
                      </span>
                      <span className="smallcaps text-[0.6rem] text-[#7a7a9a] group-hover:text-[#b8963e] transition-colors duration-500">
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <blockquote className="border-l-2 border-[#b8963e] pl-6 py-2">
              <p className="font-serif font-light italic text-[1.08rem] text-[#3d3d5c] body-luxe">
                &ldquo;Open to research collaborations, academic discussions, writing opportunities, and
                mentoring inquiries. Let&rsquo;s advance knowledge together.&rdquo;
              </p>
              <p className="smallcaps text-[0.62rem] text-[#7a7a9a] mt-4">— {cvData.personal.name}</p>
            </blockquote>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
