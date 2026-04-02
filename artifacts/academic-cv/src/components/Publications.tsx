import React, { useState } from "react";
import { Section } from "./Section";
import { cvData } from "@/data";
import { ExternalLink, BookOpen, FileText } from "lucide-react";

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
    <Section id="publications" title="Publications & Projects">
      <div className="space-y-12">
        {/* Articles */}
        <div>
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-2">
            <FileText className="w-5 h-5 text-accent" />
            <h3 className="text-xl font-semibold text-primary">Articles</h3>
            <span className="ml-auto text-sm font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {cvData.publications.articles.length}
            </span>
          </div>
          
          <ul className="space-y-6">
            {displayedArticles.map((article, i) => (
              <li key={i} className="group">
                <p className="text-gray-800 leading-relaxed">
                  <span className="font-semibold mr-1">{article.authors}</span>
                  <span className="text-primary font-medium">{article.title}.</span>
                  {article.journal && <span className="italic ml-1">{article.journal}.</span>}
                  <span className="ml-1 font-semibold">{article.year}.</span>
                  {article.details && <span className="ml-1 text-gray-600">{article.details}</span>}
                </p>
                {article.link && (
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center mt-1 text-sm text-accent hover:text-primary transition-colors font-medium"
                    data-testid={`article-link-${i}`}
                  >
                    View Publication <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                )}
              </li>
            ))}
          </ul>
          
          {cvData.publications.articles.length > 8 && (
            <button
              onClick={() => setShowAllArticles(!showAllArticles)}
              className="mt-6 text-sm font-semibold text-primary hover:text-accent transition-colors flex items-center border border-gray-200 rounded-md px-4 py-2 hover:bg-gray-50"
              data-testid="toggle-articles"
            >
              {showAllArticles ? "Show Less Articles" : "Show All Publications"}
            </button>
          )}
        </div>

        {/* Book Chapters */}
        <div>
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-2">
            <BookOpen className="w-5 h-5 text-accent" />
            <h3 className="text-xl font-semibold text-primary">Book Chapters</h3>
            <span className="ml-auto text-sm font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {cvData.publications.chapters.length}
            </span>
          </div>
          
          <ul className="space-y-6">
            {displayedChapters.map((chapter, i) => (
              <li key={i}>
                <p className="text-gray-800 leading-relaxed">
                  {chapter.authors && <span className="font-semibold mr-1">{chapter.authors}</span>}
                  <span className="text-primary font-medium">{chapter.title}.</span>
                  {chapter.publisher && <span className="italic ml-1">{chapter.publisher}.</span>}
                  {chapter.year && <span className="ml-1 font-semibold">{chapter.year}.</span>}
                  {chapter.details && <span className="ml-1 text-gray-600">{chapter.details}</span>}
                </p>
              </li>
            ))}
          </ul>
          
          {cvData.publications.chapters.length > 5 && (
            <button
              onClick={() => setShowAllChapters(!showAllChapters)}
              className="mt-6 text-sm font-semibold text-primary hover:text-accent transition-colors flex items-center border border-gray-200 rounded-md px-4 py-2 hover:bg-gray-50"
              data-testid="toggle-chapters"
            >
              {showAllChapters ? "Show Less Chapters" : "Show All Chapters"}
            </button>
          )}
        </div>

        {/* Ongoing Projects */}
        <div>
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-2">
            <span className="w-5 h-5 flex items-center justify-center bg-accent text-white rounded-full text-xs font-bold">O</span>
            <h3 className="text-xl font-semibold text-primary">Ongoing Projects</h3>
            <span className="ml-auto text-sm font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {cvData.projects.length}
            </span>
          </div>
          
          <ul className="list-disc list-outside ml-5 space-y-2 text-gray-700 marker:text-accent">
            {cvData.projects.map((project, i) => (
              <li key={i} className="pl-1 leading-relaxed">{project}</li>
            ))}
          </ul>
        </div>

      </div>
    </Section>
  );
}
