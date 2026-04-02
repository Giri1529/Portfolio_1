import React from "react";
import { Section } from "./Section";
import { cvData } from "@/data";
import { CheckCircle2 } from "lucide-react";

export function About() {
  return (
    <Section id="about-details" title="About">
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold text-primary mb-4">Theses</h3>
          <ul className="space-y-3">
            {cvData.thesis.map((thesis, i) => (
              <li key={i} className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-100 text-accent flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-gray-700 leading-relaxed">{thesis}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-primary mb-4">Key Competencies</h3>
            <ul className="space-y-2">
              {cvData.competencies.map((comp, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">{comp}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-primary mb-4">Technical Expertise</h3>
            <ul className="space-y-2">
              {cvData.expertise.map((exp, i) => {
                const [category, details] = exp.split(": ");
                return (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-accent mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      {details ? (
                        <>
                          <strong className="font-semibold text-gray-900">{category}:</strong> {details}
                        </>
                      ) : (
                        exp
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
