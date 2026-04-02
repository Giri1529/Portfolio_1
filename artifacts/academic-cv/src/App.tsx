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
import { TechnicalExpertise } from "@/components/TechnicalExpertise";
import NotFound from "@/pages/not-found";

function SectionBand({ children, variant = "light" }: { children: React.ReactNode; variant?: "light" | "warm" }) {
  return (
    <div className={variant === "warm" ? "bg-section-warm" : "bg-background"}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {children}
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="min-h-screen text-foreground font-sans">
      <Navbar />

      <SectionBand variant="light">
        <Hero />
      </SectionBand>

      <SectionBand variant="warm">
        <About />
      </SectionBand>

      <SectionBand variant="light">
        <Experience />
      </SectionBand>

      <SectionBand variant="warm">
        <Education />
      </SectionBand>

      <SectionBand variant="light">
        <TechnicalExpertise />
      </SectionBand>

      <SectionBand variant="warm">
        <Publications />
      </SectionBand>

      <SectionBand variant="light">
        <Awards />
      </SectionBand>

      <div className="bg-section-warm">
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
