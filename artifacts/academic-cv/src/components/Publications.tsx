import { useMemo, useState } from "react";
import { Section } from "./Section";
import { cvData } from "@/data";
import { motion, AnimatePresence } from "framer-motion";

type FilterKey = "all" | "articles" | "chapters" | "reviews" | "meta";

type PubItem = {
  kind: "article" | "chapter";
  title: string;
  authors?: string;
  journal?: string;
  publisher?: string;
  year: string;
  link?: string;
  details?: string;
  featured?: boolean;
};

const filters: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "articles", label: "Articles" },
  { key: "chapters", label: "Book Chapters" },
  { key: "reviews", label: "Reviews" },
  { key: "meta", label: "Meta-Analyses" },
];

function classify(item: PubItem, key: FilterKey) {
  const title = item.title.toLowerCase();
  if (key === "all") return true;
  if (key === "articles") return item.kind === "article";
  if (key === "chapters") return item.kind === "chapter";
  if (key === "reviews") return /\breview\b/.test(title);
  if (key === "meta") return /meta-?analys/.test(title);
  return true;
}

export function Publications() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [showAll, setShowAll] = useState(false);

  const all = useMemo<PubItem[]>(() => {
    const articles: PubItem[] = cvData.publications.articles.map((a) => ({
      kind: "article",
      title: a.title,
      authors: a.authors,
      journal: a.journal,
      year: a.year,
      link: a.link,
      details: a.details,
    }));
    const chapters: PubItem[] = cvData.publications.chapters.map((c) => ({
      kind: "chapter",
      title: c.title,
      authors: c.authors,
      publisher: c.publisher,
      year: c.year,
      details: c.details,
    }));
    return [...articles, ...chapters].sort((a, b) => parseInt(b.year) - parseInt(a.year));
  }, []);

  const filtered = useMemo(() => all.filter((i) => classify(i, filter)), [all, filter]);
  const visible = showAll ? filtered : filtered.slice(0, 8);
  const canToggle = filtered.length > 8;

  return (
    <Section id="publications" subtitle="Research Output" title="" noDivider>
      <div>
        <motion.div
          className="mb-12 md:mb-20 grid md:grid-cols-[1fr_auto] gap-8 items-end"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <div className="flex items-baseline gap-6 flex-wrap">
              <div className="display-xl font-light tabular text-[#0d1b2a] leading-none">
                {cvData.stats.publications}
              </div>
              <div className="font-serif italic font-light text-[1.75rem] md:text-[2.25rem] text-[#b8963e]">
                publications.
              </div>
            </div>
            <p className="smallcaps text-[0.68rem] text-[#7a7a9a] mt-4">
              Articles · Chapters · Reviews · Meta-Analyses
            </p>
          </div>
        </motion.div>

        {/* Filter chips */}
        <motion.div
          className="flex flex-wrap gap-x-8 gap-y-3 border-b border-[rgba(184,150,62,0.2)] pb-6 mb-0"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {filters.map((f) => {
            const count = all.filter((i) => classify(i, f.key)).length;
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => {
                  setFilter(f.key);
                  setShowAll(false);
                }}
                className={`group smallcaps text-[0.72rem] transition-colors duration-500 tabular ${
                  active ? "text-[#0d1b2a]" : "text-[#7a7a9a] hover:text-[#0d1b2a]"
                }`}
                data-cursor="link"
                data-testid={`filter-${f.key}`}
              >
                <span className="relative inline-block">
                  {f.label}
                  <span className="ml-1.5 text-[#b8963e]/70">({count})</span>
                  {active && (
                    <motion.span
                      layoutId="pub-filter"
                      className="absolute left-0 right-0 -bottom-[7px] h-px bg-[#b8963e]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {visible.map((pub, i) => (
              <motion.article
                key={`${filter}-${i}`}
                className="group grid grid-cols-[56px_minmax(0,1fr)] md:grid-cols-[96px_minmax(0,1fr)] gap-5 md:gap-10 py-8 border-t border-[rgba(184,150,62,0.14)]"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.03, 0.25), ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="pt-1 min-w-0">
                  <div className="font-serif text-[1.6rem] md:text-[2.1rem] font-light text-[#b8963e] tabular leading-none">
                    {pub.year}
                  </div>
                  <div className="smallcaps text-[0.55rem] md:text-[0.58rem] text-[#7a7a9a] mt-2">
                    {pub.kind === "article" ? "Article" : "Chapter"}
                  </div>
                </div>
                <div className="pt-1 min-w-0">
                  <h3 className="font-serif text-[1.05rem] md:text-[1.35rem] font-light text-[#0d1b2a] leading-[1.35] mb-3 tracking-[-0.005em] break-words hyphens-auto">
                    {pub.title}
                  </h3>
                  <span
                    aria-hidden
                    className="block h-px bg-[#b8963e] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] mb-3"
                  />
                  {pub.authors && (
                    <p className="text-[0.8rem] md:text-[0.82rem] text-[#7a7a9a] font-light mb-2 break-words">
                      {pub.authors}
                    </p>
                  )}
                  <div className="flex items-center gap-x-3 gap-y-1 flex-wrap text-[0.8rem] md:text-[0.82rem]">
                    {pub.journal && (
                      <span className="italic font-serif text-[#3d3d5c] break-words">{pub.journal}</span>
                    )}
                    {pub.publisher && (
                      <span className="italic font-serif text-[#3d3d5c] break-words">{pub.publisher}</span>
                    )}
                    {pub.details && (
                      <span className="text-[#7a7a9a]/70 smallcaps text-[0.58rem] md:text-[0.6rem] break-all">{pub.details}</span>
                    )}
                    {pub.link && (
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noreferrer"
                        className="link-draw smallcaps text-[0.62rem] text-[#b8963e]"
                        data-cursor="link"
                      >
                        View →
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
            <div className="border-t border-[rgba(184,150,62,0.14)]" />
          </motion.div>
        </AnimatePresence>

        {canToggle && (
          <motion.div
            className="mt-14 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="link-draw smallcaps text-[0.72rem] text-[#b8963e]"
              data-cursor="link"
              data-testid={`toggle-${filter}`}
            >
              {showAll ? "Show less" : `Show all ${filtered.length}`}
            </button>
          </motion.div>
        )}
      </div>
    </Section>
  );
}
