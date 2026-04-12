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
        <div className="flex items-center gap-0 border-b border-primary/10" role="tablist">
          <button
            onClick={() => { setActiveTab("articles"); setShowAll(false); }}
            className={`px-6 py-3 text-sm font-medium uppercase tracking-wider transition-all duration-300 relative ${
              activeTab === "articles"
                ? "text-primary"
                : "text-primary/40 hover:text-primary/60"
            }`}
            role="tab"
            aria-selected={activeTab === "articles"}
            data-testid="tab-articles"
          >
            Research Articles ({cvData.stats.articles})
            {activeTab === "articles" && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                layoutId="tab-underline"
              />
            )}
          </button>
          <button
            onClick={() => { setActiveTab("chapters"); setShowAll(false); }}
            className={`px-6 py-3 text-sm font-medium uppercase tracking-wider transition-all duration-300 relative ${
              activeTab === "chapters"
                ? "text-primary"
                : "text-primary/40 hover:text-primary/60"
            }`}
            role="tab"
            aria-selected={activeTab === "chapters"}
            data-testid="tab-chapters"
          >
            Book Chapters ({cvData.stats.bookChapters})
            {activeTab === "chapters" && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                layoutId="tab-underline"
              />
            )}
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
                    className="row-highlight border-t border-primary/8 py-6 rounded-sm"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.4, delay: i * 0.03, ease: "easeOut" }}
                  >
                    <div className="grid grid-cols-[40px_1fr] gap-4">
                      <span className="text-lg text-primary/25 font-serif tabular-nums pt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-[15px] font-medium text-primary leading-relaxed mb-1.5">
                          {article.title}
                        </p>
                        <p className="text-sm text-primary/50 mb-1">{article.authors}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          {article.journal && (
                            <span className="text-sm italic text-[hsl(40,45%,55%)]">{article.journal}</span>
                          )}
                          {article.journal && <span className="text-primary/20">·</span>}
                          <span className="text-sm text-primary/40">{article.year}</span>
                          {article.link && (
                            <>
                              <span className="text-primary/20">·</span>
                              <a
                                href={article.link}
                                target="_blank"
                                rel="noreferrer"
                                className="link-underline inline-flex items-center gap-1 text-sm text-[hsl(40,45%,55%)] hover:text-primary transition-colors"
                                data-testid={`article-link-${i}`}
                              >
                                <ExternalLink className="w-3 h-3" /> View
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
                    className="row-highlight border-t border-primary/8 py-6 rounded-sm"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.4, delay: i * 0.03, ease: "easeOut" }}
                  >
                    <div className="grid grid-cols-[40px_1fr] gap-4">
                      <span className="text-lg text-primary/25 font-serif tabular-nums pt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-[15px] font-medium text-primary leading-relaxed mb-1.5">
                          {chapter.title}
                        </p>
                        {chapter.authors && <p className="text-sm text-primary/50 mb-1">{chapter.authors}</p>}
                        <div className="flex items-center gap-2 flex-wrap">
                          {chapter.publisher && (
                            <span className="text-sm italic text-[hsl(40,45%,55%)]">{chapter.publisher}</span>
                          )}
                          {chapter.publisher && chapter.year && <span className="text-primary/20">·</span>}
                          {chapter.year && <span className="text-sm text-primary/40">{chapter.year}</span>}
                          {chapter.details && (
                            <span className="text-sm text-primary/35">{chapter.details}</span>
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
            className="btn-shine px-6 py-3 text-sm font-medium border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            data-testid={`toggle-${activeTab}`}
          >
            {showAll ? "Show Less" : `Show All ${activeTab === "articles" ? "Articles" : "Chapters"}`}
          </button>
        )}
      </div>
    </Section>
  );
}
