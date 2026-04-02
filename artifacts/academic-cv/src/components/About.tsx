import { Section } from "./Section";
import { cvData } from "@/data";

export function About() {
  return (
    <Section id="about" title="About">
      <div className="space-y-12">
        <p className="text-lg md:text-xl text-primary/80 leading-relaxed font-serif max-w-3xl">
          {cvData.personal.name} is a dedicated PhD Scholar and Pharm D graduate with a wealth of experience in both research and academic mentoring. Her expertise encompasses Diabetes Research, Computational Biology, Drug Discovery, and Clinical Pharmacy. Throughout her career, she has mentored numerous researchers, guiding them towards successful academic paths.
        </p>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div className="aspect-[4/3] overflow-hidden bg-primary/5 flex items-center justify-center">
            <div className="text-center px-8 space-y-3">
              <div className="flex justify-center gap-3">
                <span className="text-3xl font-serif font-bold text-primary">{cvData.stats.articles}</span>
                <span className="text-sm text-primary/50 self-end pb-1">Articles</span>
              </div>
              <div className="flex justify-center gap-3">
                <span className="text-3xl font-serif font-bold text-primary">{cvData.stats.bookChapters}</span>
                <span className="text-sm text-primary/50 self-end pb-1">Book Chapters</span>
              </div>
              <div className="flex justify-center gap-3">
                <span className="text-3xl font-serif font-bold text-primary">{cvData.stats.ongoingProjects}</span>
                <span className="text-sm text-primary/50 self-end pb-1">Ongoing Projects</span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <p className="text-base md:text-lg text-primary/70 leading-relaxed font-serif">
              A highly respected scholar, she has made seminal contributions to the field, particularly in areas such as Diabetes Management, Molecular Docking, Epigenetics, and Drug Development. Her work has not only advanced theoretical foundations but has also led to practical applications in clinical and pharmaceutical sectors.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 pt-4">
          <div>
            <h3 className="text-xl font-serif font-semibold text-primary mb-4">Key Competencies</h3>
            <ul className="space-y-2 text-primary/70">
              {cvData.competencies.map((comp, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 shrink-0" />
                  <span>{comp}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-serif font-semibold text-primary mb-4">Thesis Research</h3>
            <ul className="space-y-3 text-primary/70">
              {cvData.thesis.map((thesis, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-primary/40 font-serif font-bold mt-0.5 shrink-0">{i + 1}.</span>
                  <span className="leading-relaxed">{thesis}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
