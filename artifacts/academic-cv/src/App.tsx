import { Switch, Route, Router as WouterRouter } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Publications } from "@/components/Publications";
import { Awards } from "@/components/Awards";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import NotFound from "@/pages/not-found";

function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans selection:bg-accent/20 selection:text-primary">
      <Navbar />
      <main className="container mx-auto px-4 md:px-8 max-w-5xl">
        <Hero />
        <About />
        <Education />
        <Experience />
        <Publications />
        <Awards />
        <Contact />
      </main>
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
