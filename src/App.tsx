import Header from "./components/Header";
import Hero from "./components/Hero";
import ServiceCards from "./components/ServiceCards";
import FinalCTA from "./components/FinalCTA";
import { useScrollReveal } from "./lib/useScrollReveal";

function App() {
  useScrollReveal();

  return (
    <main className="page-shell">
      <Header />
      <Hero />
      <ServiceCards />
      <FinalCTA />
    </main>
  );
}

export default App;
