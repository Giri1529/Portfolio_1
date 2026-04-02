import { Section } from "./Section";
import { cvData } from "@/data";
import { ExternalLink } from "lucide-react";

export function Awards() {
  return (
    <Section id="achievements" title="Key Achievements">
      <div className="space-y-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
          {cvData.awards.map((award, i) => (
            <div key={i}>
              <h4 className="text-base font-semibold text-primary mb-2">{award.title}</h4>
              <p className="text-sm text-primary/55 leading-relaxed">
                {award.description || award.issuer}
                {award.date && <span className="block mt-1 text-primary/40 text-xs">{award.issuer} - {award.date}</span>}
              </p>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-2xl font-serif italic text-primary mb-4">Invited Talks</h3>
          <div className="w-full h-px bg-primary/20 mb-8" />
          <div className="space-y-0">
            {cvData.talks.map((talk, i) => (
              <div key={i} className="border-t border-primary/10 py-6">
                <div className="grid md:grid-cols-[280px_1fr] gap-4 md:gap-12">
                  <h4 className="text-base font-medium text-primary">{talk.title}</h4>
                  <div>
                    <p className="text-primary/65 font-serif">{talk.audience}</p>
                    {talk.link && (
                      <a
                        href={talk.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center mt-2 text-sm text-primary/60 hover:text-primary transition-colors"
                        data-testid={`talk-link-${i}`}
                      >
                        Watch on YouTube <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div className="border-t border-primary/10" />
          </div>
        </div>
      </div>
    </Section>
  );
}
