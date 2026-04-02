import React from "react";
import { Section } from "./Section";
import { cvData } from "@/data";
import { GraduationCap } from "lucide-react";

export function Education() {
  return (
    <Section id="education" title="Education">
      <div className="relative border-l border-gray-200 ml-3 pl-8 space-y-12">
        {cvData.education.map((edu, i) => (
          <div key={i} className="relative">
            <span className="absolute -left-[41px] flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-200 text-accent">
              <GraduationCap className="w-4 h-4" />
            </span>
            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-1">
              <h3 className="text-xl font-bold text-primary">{edu.degree}</h3>
              <span className="text-sm font-medium text-accent md:ml-4 whitespace-nowrap bg-orange-50 px-2 py-1 rounded-sm">
                {edu.status}
              </span>
            </div>
            <p className="text-lg text-gray-700 mb-2 font-serif">{edu.institution}</p>
            {edu.coursework && (
              <div className="mt-4 bg-gray-50 p-4 rounded-md border border-gray-100">
                <strong className="text-sm font-semibold text-primary block mb-1">Relevant Coursework & Internships:</strong>
                <p className="text-sm text-gray-600 leading-relaxed">{edu.coursework}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
