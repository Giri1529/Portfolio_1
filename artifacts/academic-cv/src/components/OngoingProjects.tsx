import { useState } from "react";
import { Section } from "./Section";
import { cvData } from "@/data";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const MOBILE_INITIAL_COUNT = 4;

const statusColors: Record<string, string> = {
  "Under Production": "bg-[rgba(184,150,62,0.12)] text-[#b8963e] border-[rgba(184,150,62,0.3)]",
  "Preprint": "bg-[rgba(184,150,62,0.12)] text-[#b8963e] border-[rgba(184,150,62,0.3)]",
  "Accepted": "bg-[rgba(34,139,34,0.1)] text-[#228b22] border-[rgba(34,139,34,0.3)]",
  "Under Review": "bg-[rgba(70,130,180,0.1)] text-[#4682b4] border-[rgba(70,130,180,0.3)]",
  "Ongoing": "bg-[rgba(184,150,62,0.12)] text-[#b8963e] border-[rgba(184,150,62,0.3)]",
};

export function OngoingProjects() {
  const [showAll, setShowAll] = useState(false);
  const projects = cvData.projects;
  const hasMore = projects.length > MOBILE_INITIAL_COUNT;

  return (
    <Section id="projects" subtitle="Current Work" title="Ongoing" titleAccent="Projects">
      <div className="space-y-0">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            className={`flex items-start gap-4 py-4 px-5 bg-white border border-[rgba(184,150,62,0.25)] rounded-sm mb-3 ${
              !showAll && i >= MOBILE_INITIAL_COUNT ? "hidden md:flex" : ""
            }`}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4, delay: i * 0.04, ease: "easeOut" }}
          >
            <span
              className={`status-badge inline-block px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.08em] border rounded-sm shrink-0 mt-0.5 cursor-default whitespace-nowrap ${
                statusColors[project.status] || "bg-gray-100 text-gray-700 border-gray-200"
              }`}
            >
              {project.status}
            </span>
            <div className="flex-1 min-w-0">
              <span className="text-[0.85rem] text-[#3d3d5c] leading-relaxed">
                {project.title}
              </span>
              {project.link && (
                <>
                  {" — "}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline inline-flex items-center gap-1 text-sm text-[#b8963e] hover:underline transition-colors"
                  >
                    Link
                  </a>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {hasMore && (
        <div className="md:hidden flex justify-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 px-6 py-3 border border-[rgba(184,150,62,0.35)] text-sm font-medium text-[#b8963e] hover:bg-[rgba(184,150,62,0.08)] transition-all duration-300 rounded-sm"
          >
            {showAll ? "Show Less" : `View All ${projects.length} Projects`}
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      )}
    </Section>
  );
}
