import Header from "./components/Header";
import Hero from "./components/Hero";
import ServiceCards from "./components/ServiceCards";
import FinalCTA from "./components/FinalCTA";
import { useScrollReveal } from "./lib/useScrollReveal";
import { useAccessBlock } from "./lib/ipBlock";

function App() {
  const blocked = useAccessBlock();
  useScrollReveal();

  // Visitante bloqueado está sendo redirecionado para o Google: não mostra o site.
  if (blocked) {
    return null;
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
