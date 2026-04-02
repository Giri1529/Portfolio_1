import React from "react";
import { Mail, Phone, MapPin, ExternalLink, Linkedin } from "lucide-react";
import { cvData } from "@/data";

export function Hero() {
  return (
    <section id="about" className="py-16 md:py-24 scroll-mt-24">
      <div className="flex flex-col-reverse md:flex-row gap-8 items-start md:items-center justify-between">
        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary leading-tight">
              {cvData.personal.name}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-medium font-serif">
              {cvData.personal.title}
            </p>
          </div>

          {/* Stats Bar */}
          <div className="flex flex-wrap gap-4 text-sm font-medium">
            <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-primary flex items-center">
              <span className="text-accent font-bold text-lg mr-2">{cvData.stats.articles}</span>
              Articles
            </div>
            <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-primary flex items-center">
              <span className="text-accent font-bold text-lg mr-2">{cvData.stats.bookChapters}</span>
              Book Chapters
            </div>
            <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-primary flex items-center">
              <span className="text-accent font-bold text-lg mr-2">{cvData.stats.ongoingProjects}</span>
              Ongoing Projects
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
            <a href={`mailto:${cvData.personal.email}`} className="flex items-center hover:text-primary transition-colors" data-testid="hero-email">
              <Mail className="w-4 h-4 mr-2" />
              {cvData.personal.email}
            </a>
            <a href={`tel:${cvData.personal.phone}`} className="flex items-center hover:text-primary transition-colors" data-testid="hero-phone">
              <Phone className="w-4 h-4 mr-2" />
              {cvData.personal.phone}
            </a>
            <span className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              {cvData.personal.location}
            </span>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <a href={cvData.personal.linkedin} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#0a66c2] transition-colors" data-testid="hero-linkedin">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="w-5 h-5" />
            </a>
            <a href={cvData.personal.orcid} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#A6CE39] transition-colors font-medium text-sm flex items-center gap-1" data-testid="hero-orcid">
              ORCID <ExternalLink className="w-3 h-3" />
            </a>
            <a href={cvData.personal.scopus} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#E9711C] transition-colors font-medium text-sm flex items-center gap-1" data-testid="hero-scopus">
              Scopus <ExternalLink className="w-3 h-3" />
            </a>
            <a href={cvData.personal.researchId} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-primary transition-colors font-medium text-sm flex items-center gap-1" data-testid="hero-researchid">
              Research ID <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
