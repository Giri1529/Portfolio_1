import { cvData } from "@/data";

export function Hero() {
  return (
    <section id="home" className="pt-8 pb-16 md:pt-16 md:pb-24 scroll-mt-20">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="space-y-6 md:space-y-8">
          <h1 className="text-5xl md:text-6xl lg:text-[80px] font-serif italic text-primary leading-[1.05] tracking-tight uppercase">
            Visionary<br />Researcher
          </h1>
          <p className="text-base md:text-lg text-primary/70 leading-relaxed max-w-lg font-serif">
            {cvData.personal.name} has a rich history of academic contributions, with a focus on Diabetes Research, Computational Biology, and Clinical Pharmacy. Her work is globally recognized, setting new standards and inspiring the next generation of scholars.
          </p>
          <a
            href="#about"
            className="inline-block px-6 py-3 text-sm font-medium border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            data-testid="hero-explore-btn"
          >
            Explore More
          </a>
        </div>
        <div className="flex justify-end">
          <div className="w-full max-w-[420px] aspect-[3/4] overflow-hidden bg-primary/5 flex items-center justify-center">
            <div className="text-center px-8 space-y-4">
              <div className="w-32 h-32 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-primary/30">
                  <path d="M12 2L12 22M2 12L22 12M5.64 5.64L18.36 18.36M18.36 5.64L5.64 18.36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p className="text-xl font-serif font-semibold text-primary">{cvData.personal.name}</p>
                <p className="text-sm text-primary/50 mt-1">{cvData.personal.title}</p>
                <p className="text-xs text-primary/40 mt-2">{cvData.personal.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
