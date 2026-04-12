import { Section } from "./Section";
import { cvData } from "@/data";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const statusColors: Record<string, string> = {
  "Under Production": "bg-amber-100 text-amber-800 border-amber-200",
  "Preprint": "bg-rose-100 text-rose-800 border-rose-200",
  "Accepted": "bg-green-100 text-green-800 border-green-200",
  "Under Review": "bg-blue-100 text-blue-800 border-blue-200",
  "Ongoing": "bg-amber-100 text-amber-800 border-amber-200",
};

export function OngoingProjects() {
  return (
    <Section id="projects" subtitle="Current Work" title="Ongoing" titleAccent="Projects">
      <div className="space-y-0">
        {cvData.projects.map((project, i) => (
          <motion.div
            key={i}
            className="border-t border-primary/10 py-5"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4, delay: i * 0.04, ease: "easeOut" }}
          >
            <div className="flex items-start gap-4">
              <span
                className={`inline-block px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider border rounded-sm shrink-0 mt-0.5 ${
                  statusColors[project.status] || "bg-gray-100 text-gray-700 border-gray-200"
                }`}
              >
                {project.status}
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-[15px] text-primary/80 leading-relaxed">
                  {project.title}
                </span>
                {project.link && (
                  <>
                    {" — "}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-[hsl(40,45%,55%)] hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" /> Link
                    </a>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        <div className="border-t border-primary/10" />
      </div>
    </Section>
  );
}
