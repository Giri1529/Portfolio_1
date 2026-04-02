import React from "react";
import { cvData } from "@/data";

export function Footer() {
  return (
    <footer className="bg-primary text-white py-8 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p className="font-serif text-lg mb-2">{cvData.personal.name}</p>
        <p className="text-gray-400 text-sm">© {new Date().getFullYear()} N.L. Swathi. All rights reserved.</p>
      </div>
    </footer>
  );
}
