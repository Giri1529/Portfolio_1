import React from "react";
import { Section } from "./Section";
import { cvData } from "@/data";
import { Briefcase } from "lucide-react";

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="relative border-l border-gray-200 ml-3 pl-8 space-y-12">
        {cvData.experience.map((exp, i) => (
          <div key={i} className="relative">
            <span className="absolute -left-[41px] flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-200 text-accent">
              <Briefcase className="w-4 h-4" />
            </span>
            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-1">
              <h3 className="text-xl font-bold text-primary">{exp.role}</h3>
              <span className="text-sm font-medium text-accent md:ml-4 whitespace-nowrap">
                {exp.duration}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 mb-4 text-gray-600">
              <p className="text-lg font-serif text-gray-800">{exp.organization}</p>
              {exp.location && (
                <>
                  <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                  <span className="text-sm">{exp.location}</span>
                </>
              )}
            </div>
            
            <ul className="list-disc list-inside space-y-2 text-gray-600 marker:text-gray-400">
              {exp.highlights.map((highlight, j) => (
                <li key={j} className="leading-relaxed pl-2">{highlight}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
