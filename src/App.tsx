import Header from "./components/Header";
import Hero from "./components/Hero";
import ServiceCards from "./components/ServiceCards";
import FinalCTA from "./components/FinalCTA";
import Blocked from "./components/Blocked";
import { useScrollReveal } from "./lib/useScrollReveal";
import { useAccessBlock } from "./lib/ipBlock";

function App() {
  const blocked = useAccessBlock();
  useScrollReveal();

  if (blocked) {
    return <Blocked />;
  }

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
