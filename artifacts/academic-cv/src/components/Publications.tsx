import { useState } from "react";
import { Section } from "./Section";
import { cvData } from "@/data";
import { ExternalLink } from "lucide-react";

export function Publications() {
  const [showAllArticles, setShowAllArticles] = useState(false);
  const [showAllChapters, setShowAllChapters] = useState(false);

  const displayedArticles = showAllArticles
    ? cvData.publications.articles
    : cvData.publications.articles.slice(0, 8);

  const displayedChapters = showAllChapters
    ? cvData.publications.chapters
    : cvData.publications.chapters.slice(0, 5);

  return (
    <Section id="publications" title="Publications">
      <div className="space-y-16">
        <div className="flex items-center gap-6 text-sm text-primary/60">
          <span><strong className="text-primary text-lg font-serif">{cvData.stats.articles}</strong> Articles</span>
          <span className="w-px h-4 bg-primary/20" />
          <span><strong className="text-primary text-lg font-serif">{cvData.stats.bookChapters}</strong> Book Chapters</span>
          <span className="w-px h-4 bg-primary/20" />
          <span><strong className="text-primary text-lg font-serif">{cvData.stats.ongoingProjects}</strong> Ongoing Projects</span>
        </div>

        <div>
          <h3 className="text-xl font-serif font-semibold text-primary mb-6">Articles</h3>
          <div className="space-y-6">
            {displayedArticles.map((article, i) => (
              <div key={i} className="border-t border-primary/10 pt-5">
                <div className="grid md:grid-cols-[40px_1fr] gap-3">
                  <span className="text-sm text-primary/40 font-mono pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="text-primary/90 leading-relaxed">
                      <span className="font-medium">{article.authors}</span>{" "}
                      <span className="text-primary">{article.title}.</span>{" "}
                      {article.journal && <em className="text-primary/60">{article.journal}.</em>}{" "}
                      <span className="text-primary/50">{article.year}.</span>
                      {article.details && <span className="text-primary/50 ml-1">{article.details}</span>}
                    </p>
                    {article.link && (
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center mt-2 text-sm text-primary/60 hover:text-primary transition-colors"
                        data-testid={`article-link-${i}`}
                      >
                        View Publication <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {cvData.publications.articles.length > 8 && (
            <button
              onClick={() => setShowAllArticles(!showAllArticles)}
              className="mt-8 px-6 py-3 text-sm font-medium border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              data-testid="toggle-articles"
            >
              {showAllArticles ? "Show Less" : "Show All Articles"}
            </button>
          )}
        </div>

        <div>
          <h3 className="text-xl font-serif font-semibold text-primary mb-6">Book Chapters</h3>
          <div className="space-y-6">
            {displayedChapters.map((chapter, i) => (
              <div key={i} className="border-t border-primary/10 pt-5">
                <div className="grid md:grid-cols-[40px_1fr] gap-3">
                  <span className="text-sm text-primary/40 font-mono pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="text-primary/90 leading-relaxed">
                      {chapter.authors && <span className="font-medium">{chapter.authors} </span>}
                      <span className="text-primary">{chapter.title}.</span>{" "}
                      {chapter.publisher && <em className="text-primary/60">{chapter.publisher}.</em>}{" "}
                      {chapter.year && <span className="text-primary/50">{chapter.year}.</span>}
                      {chapter.details && <span className="text-primary/50 ml-1">{chapter.details}</span>}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {cvData.publications.chapters.length > 5 && (
            <button
              onClick={() => setShowAllChapters(!showAllChapters)}
              className="mt-8 px-6 py-3 text-sm font-medium border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              data-testid="toggle-chapters"
            >
              {showAllChapters ? "Show Less" : "Show All Chapters"}
            </button>
          )}
        </div>

        <div>
          <h3 className="text-xl font-serif font-semibold text-primary mb-6">Ongoing Projects</h3>
          <div className="space-y-4">
            {cvData.projects.map((project, i) => (
              <div key={i} className="border-t border-primary/10 pt-4">
                <div className="grid md:grid-cols-[40px_1fr] gap-3">
                  <span className="text-sm text-primary/40 font-mono pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-primary/80 leading-relaxed">{project}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
