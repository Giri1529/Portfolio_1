import React from "react";
import { Section } from "./Section";
import { cvData } from "@/data";
import { Trophy, Mic } from "lucide-react";

export function Awards() {
  return (
    <Section id="awards" title="Honors & Awards">
      <div className="space-y-12">
        {/* Awards List */}
        <div className="grid gap-4 sm:grid-cols-2">
          {cvData.awards.map((award, i) => (
            <div key={i} className="bg-white border border-gray-100 p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-start justify-between mb-2">
                <Trophy className="w-5 h-5 text-accent opacity-70 group-hover:opacity-100 transition-opacity flex-shrink-0 mr-3 mt-1" />
                <div className="flex-1">
                  <h4 className="font-bold text-primary leading-snug">{award.title}</h4>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-gray-500">
                    <span className="font-medium text-gray-700">{award.issuer}</span>
                    {award.date && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        <span>{award.date}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {award.description && (
                <p className="text-gray-600 text-sm mt-3 ml-8 leading-relaxed">
                  {award.description}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Invited Talks */}
        <div className="pt-6 border-t border-gray-100">
          <h3 className="text-xl font-semibold text-primary mb-6 flex items-center">
            <Mic className="w-5 h-5 mr-2 text-accent" />
            Invited Talks
          </h3>
          <ul className="space-y-4 ml-2 border-l-2 border-gray-100 pl-4">
            {cvData.talks.map((talk, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-accent ring-4 ring-white"></span>
                <p className="text-gray-800">
                  <strong className="font-semibold text-primary">{talk.title}</strong>
                  <span className="mx-2 text-gray-400">—</span>
                  <span className="text-gray-600">{talk.audience}</span>
                </p>
                {talk.link && (
                  <a
                    href={talk.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-1 text-sm text-[#FF0000] hover:underline font-medium"
                    data-testid={`talk-link-${i}`}
                  >
                    Watch on YouTube
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
