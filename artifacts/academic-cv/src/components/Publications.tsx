import { useState } from "react";
import { Section } from "./Section";
import { cvData } from "@/data";
import { ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Tab = "articles" | "chapters";

export function Publications() {
  const [activeTab, setActiveTab] = useState<Tab>("articles");
  const [showAll, setShowAll] = useState(false);

  const articles = cvData.publications.articles;
  const chapters = cvData.publications.chapters;

  const displayedArticles = showAll ? articles : articles.slice(0, 8);
  const displayedChapters = showAll ? chapters : chapters.slice(0, 5);

  const defaultLimit = activeTab === "articles" ? 8 : 5;
  const totalCount = activeTab === "articles" ? articles.length : chapters.length;
  const canToggle = totalCount > defaultLimit;

  return (
    <Section id="publications" subtitle="Research Output" title="Publications &" titleAccent="Chapters">
      <div className="space-y-10">
        <div className="flex items-center gap-0 border-b border-[rgba(184,150,62,0.25)]" role="tablist">
          <button
            onClick={() => { setActiveTab("articles"); setShowAll(false); }}
            className={`px-6 py-3 text-[0.78rem] font-medium uppercase tracking-[0.08em] transition-all duration-300 relative border-b-2 -mb-px ${
              activeTab === "articles"
                ? "text-[#0d1b2a] border-b-[#b8963e] font-medium"
                : "text-[#7a7a9a] border-b-transparent hover:text-[#3d3d5c]"
            }`}
            role="tab"
            aria-selected={activeTab === "articles"}
            data-testid="tab-articles"
          >
            Research Articles ({cvData.publications.articles.length})
          </button>
          <button
            onClick={() => { setActiveTab("chapters"); setShowAll(false); }}
            className={`px-6 py-3 text-[0.78rem] font-medium uppercase tracking-[0.08em] transition-all duration-300 relative border-b-2 -mb-px ${
              activeTab === "chapters"
                ? "text-[#0d1b2a] border-b-[#b8963e] font-medium"
                : "text-[#7a7a9a] border-b-transparent hover:text-[#3d3d5c]"
            }`}
            role="tab"
            aria-selected={activeTab === "chapters"}
            data-testid="tab-chapters"
          >
            Book Chapters ({cvData.publications.chapters.length})
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-0"
          >
            {activeTab === "articles" ? (
              <>
                {displayedArticles.map((article, i) => (
                  <motion.div
                    key={i}
                    className="row-highlight border-t border-[rgba(184,150,62,0.12)] py-6 rounded-sm"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.4, delay: i * 0.03, ease: "easeOut" }}
                  >
                    <div className="grid grid-cols-[40px_1fr] gap-4">
                      <span className="font-serif text-[1.5rem] font-light text-[#b8963e] opacity-60 leading-[1.2] pt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-[0.88rem] font-medium text-[#0d1b2a] leading-[1.5] mb-1">
                          {article.title}
                        </p>
                        <p className="text-[0.78rem] text-[#7a7a9a] mb-1">{article.authors}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          {article.journal && (
                            <span className="text-[0.78rem] italic text-[#b8963e]">{article.journal}</span>
                          )}
                          {article.journal && <span className="text-[#7a7a9a]/40">·</span>}
                          <span className="text-[0.78rem] text-[#7a7a9a]">{article.year}</span>
                          {article.link && (
                            <>
                              <span className="text-[#7a7a9a]/40">·</span>
                              <a
                                href={article.link}
                                target="_blank"
                                rel="noreferrer"
                                className="link-underline inline-flex items-center gap-1 text-[0.72rem] text-[#b8963e] hover:underline tracking-[0.05em]"
                                data-testid={`article-link-${i}`}
                              >
                                ↗ View
                              </a>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </>
            ) : (
              <>
                {displayedChapters.map((chapter, i) => (
                  <motion.div
                    key={i}
                    className="row-highlight border-t border-[rgba(184,150,62,0.12)] py-6 rounded-sm"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.4, delay: i * 0.03, ease: "easeOut" }}
                  >
                    <div className="grid grid-cols-[40px_1fr] gap-4">
                      <span className="font-serif text-[1.5rem] font-light text-[#b8963e] opacity-60 leading-[1.2] pt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-[0.88rem] font-medium text-[#0d1b2a] leading-[1.5] mb-1">
                          {chapter.title}
                        </p>
                        {chapter.authors && <p className="text-[0.78rem] text-[#7a7a9a] mb-1">{chapter.authors}</p>}
                        <div className="flex items-center gap-2 flex-wrap">
                          {chapter.publisher && (
                            <span className="text-[0.78rem] italic text-[#b8963e]">{chapter.publisher}</span>
                          )}
                          {chapter.publisher && chapter.year && <span className="text-[#7a7a9a]/40">·</span>}
                          {chapter.year && <span className="text-[0.78rem] text-[#7a7a9a]">{chapter.year}</span>}
                          {chapter.details && (
                            <span className="text-[0.78rem] text-[#7a7a9a]/60">{chapter.details}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {canToggle && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="btn-shine block mx-auto px-8 py-3 text-[0.8rem] font-normal uppercase tracking-[0.08em] border border-[rgba(184,150,62,0.25)] text-[#0d1b2a] hover:bg-[#0d1b2a] hover:text-white hover:border-[#0d1b2a] transition-all duration-200 rounded-sm"
            data-testid={`toggle-${activeTab}`}
          >
            {showAll ? "Show Less" : `Show All ${totalCount} ${activeTab === "articles" ? "Articles" : "Chapters"} ↓`}
          </button>
        )}
      </div>
    </Section>
  );
}
