import { useEffect, useRef, useState } from "react";
import { Section } from "./Section";
import { cvData } from "@/data";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import VanillaTilt from "vanilla-tilt";

const MOBILE_INITIAL_COUNT = 4;

const statusTone: Record<string, string> = {
  "Under Production": "text-[#b8963e]",
  "Preprint": "text-[#b8963e]",
  "Accepted": "text-[#2f7d4f]",
  "Under Review": "text-[#4a6c95]",
  "Ongoing": "text-[#b8963e]",
};

function ProjectCard({ project, i, total, hidden }: {
  project: typeof cvData.projects[0];
  i: number;
  total: number;
  hidden: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const hasHover = window.matchMedia("(hover: hover)").matches;
    if (!hasHover) return;

    VanillaTilt.init(el, {
      max: 3,
      speed: 700,
      glare: false,
      scale: 1.005,
      perspective: 1600,
    } as any);

    return () => {
      (el as any).vanillaTilt?.destroy();
    };
  }, []);

  const tone = statusTone[project.status] || "text-[#b8963e]";

  return (
    <motion.div
      ref={ref}
      className={`group relative overflow-hidden border border-[rgba(184,150,62,0.18)] bg-white/40 p-10 md:p-12 transition-colors duration-700 hover:border-[rgba(184,150,62,0.5)] hover:bg-white/70 ${
        hidden ? "hidden md:block" : ""
      }`}
      style={{ transformStyle: "preserve-3d", minHeight: "280px" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9, delay: Math.min(i * 0.06, 0.3), ease: [0.22, 1, 0.36, 1] }}
      data-cursor="link"
    >
      <div className="flex items-start justify-between mb-8">
        <p className="smallcaps text-[0.62rem] text-[#b8963e]/80 tabular">
          Project {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
        <span className={`smallcaps text-[0.58rem] tabular ${tone}`}>
          · {project.status}
        </span>
      </div>

      <h3 className="font-serif text-[1.35rem] md:text-[1.55rem] font-light text-[#0d1b2a] leading-[1.3] group-hover:text-[#0d1b2a] mb-6 tracking-[-0.005em] transition-transform duration-700 group-hover:-translate-y-[2px]">
        {project.title}
      </h3>

      {project.link && (
        <motion.a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="link-draw smallcaps text-[0.68rem] text-[#b8963e] inline-block mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          data-cursor="link"
        >
          Preprint / DOI →
        </motion.a>
      )}

      {/* Corner accent */}
      <span
        aria-hidden
        className="absolute top-0 right-0 w-12 h-px bg-[#b8963e]/30 origin-right transition-transform duration-700 group-hover:scale-x-[1.6]"
      />
    </motion.div>
  );
}

export function OngoingProjects() {
  const [showAll, setShowAll] = useState(false);
  const projects = cvData.projects;
  const hasMore = projects.length > MOBILE_INITIAL_COUNT;

  return (
    <Section id="projects" subtitle="Current Work" title="Ongoing" titleAccent="Projects">
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {projects.map((project, i) => (
          <ProjectCard
            key={i}
            project={project}
            i={i}
            total={projects.length}
            hidden={!showAll && i >= MOBILE_INITIAL_COUNT}
          />
        ))}
      </div>

      {hasMore && (
        <div className="md:hidden flex justify-center mt-10">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 smallcaps text-[0.7rem] text-[#b8963e]"
            data-cursor="link"
          >
            {showAll ? "Show less" : `View all ${projects.length}`}
            <ChevronDown className={`w-3 h-3 transition-transform duration-500 ${showAll ? "rotate-180" : ""}`} />
          </button>
        </div>
      )}
    </Section>
  );
}
