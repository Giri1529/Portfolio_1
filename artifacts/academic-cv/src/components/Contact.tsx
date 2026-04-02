import React from "react";
import { Section } from "./Section";
import { cvData } from "@/data";
import { Mail, Phone, Linkedin, ExternalLink } from "lucide-react";

export function Contact() {
  return (
    <Section id="contact" title="Contact & Profiles">
      <div className="grid md:grid-cols-2 gap-6">
        <a
          href={`mailto:${cvData.personal.email}`}
          className="flex items-center p-6 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md hover:border-accent/30 transition-all group"
          data-testid="contact-email"
        >
          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-primary group-hover:text-accent group-hover:bg-orange-50 transition-colors mr-4">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Email</h4>
            <p className="text-primary font-medium">{cvData.personal.email}</p>
          </div>
        </a>

        <a
          href={`tel:${cvData.personal.phone}`}
          className="flex items-center p-6 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md hover:border-accent/30 transition-all group"
          data-testid="contact-phone"
        >
          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-primary group-hover:text-accent group-hover:bg-orange-50 transition-colors mr-4">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Phone</h4>
            <p className="text-primary font-medium">{cvData.personal.phone}</p>
          </div>
        </a>

        <a
          href={cvData.personal.linkedin}
          target="_blank"
          rel="noreferrer"
          className="flex items-center p-6 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md hover:border-[#0a66c2]/30 transition-all group"
          data-testid="contact-linkedin"
        >
          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-500 group-hover:text-[#0a66c2] group-hover:bg-blue-50 transition-colors mr-4">
            <Linkedin className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">LinkedIn</h4>
            <p className="text-primary font-medium flex items-center">
              Connect <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
            </p>
          </div>
        </a>

        <a
          href={cvData.personal.orcid}
          target="_blank"
          rel="noreferrer"
          className="flex items-center p-6 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md hover:border-[#A6CE39]/30 transition-all group"
          data-testid="contact-orcid"
        >
          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-500 group-hover:text-[#A6CE39] transition-colors mr-4 font-bold">
            iD
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">ORCID</h4>
            <p className="text-primary font-medium flex items-center">
              View Profile <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
            </p>
          </div>
        </a>
        
        <a
          href={cvData.personal.scopus}
          target="_blank"
          rel="noreferrer"
          className="flex items-center p-6 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md hover:border-[#E9711C]/30 transition-all group"
          data-testid="contact-scopus"
        >
          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-500 group-hover:text-[#E9711C] transition-colors mr-4 font-bold text-xl">
            S
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Scopus</h4>
            <p className="text-primary font-medium flex items-center">
              View Profile <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
            </p>
          </div>
        </a>
        
        <a
          href={cvData.personal.researchId}
          target="_blank"
          rel="noreferrer"
          className="flex items-center p-6 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md hover:border-accent/30 transition-all group"
          data-testid="contact-researchid"
        >
          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-500 group-hover:text-accent transition-colors mr-4 font-bold">
            R
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Research ID</h4>
            <p className="text-primary font-medium flex items-center">
              View Profile <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
            </p>
          </div>
        </a>
      </div>
    </Section>
  );
}
