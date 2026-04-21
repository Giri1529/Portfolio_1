import { Switch, Route, Router as WouterRouter } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Publications } from "@/components/Publications";
import { Awards } from "@/components/Awards";
import { InvitedTalks } from "@/components/InvitedTalks";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Skills } from "@/components/Skills";
import { OngoingProjects } from "@/components/OngoingProjects";
import NotFound from "@/pages/not-found";
import { CustomCursor } from "@/components/global/CustomCursor";
import { ScrollProgress } from "@/components/global/ScrollProgress";
import { GrainOverlay } from "@/components/global/GrainOverlay";
import { PageCurtain } from "@/components/global/PageCurtain";
import { useLenis } from "@/hooks/useLenis";

function SectionBand({ children, variant = "light" }: { children: React.ReactNode; variant?: "light" | "warm" | "dark" }) {
  const bgClass = variant === "dark"
    ? "bg-[#0d1b2a]"
    : variant === "warm"
    ? "bg-white"
    : "bg-[#f5f0e8]";

  return (
    <div className={bgClass}>
      <div className="max-w-[1280px] mx-auto px-8 md:px-12">
        {children}
      </div>
    </div>
  );
}

function Home() {
  useLenis();
  return (
    <div className="min-h-screen font-sans cursor-luxe" style={{ background: "#f5f0e8", color: "#1a1a2e" }}>
      <PageCurtain />
      <ScrollProgress />
      <GrainOverlay />
      <CustomCursor />

      <Navbar />

      <Hero />

      <SectionBand variant="light">
        <About />
      </SectionBand>

      <SectionBand variant="warm">
        <Experience />
      </SectionBand>

      <SectionBand variant="light">
        <Education />
      </SectionBand>

      <SectionBand variant="warm">
        <Publications />
      </SectionBand>

      <SectionBand variant="light">
        <OngoingProjects />
      </SectionBand>

      <SectionBand variant="dark">
        <Awards />
      </SectionBand>

      <SectionBand variant="light">
        <Skills />
      </SectionBand>

      <div className="bg-[#f5f0e8]">
        <InvitedTalks />
      </div>

      <SectionBand variant="light">
        <Contact />
      </SectionBand>

      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}

export default App;
