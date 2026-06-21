import { useRef, useState } from "react";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import StickyCTA from "./components/StickyCTA";
import ThankYouPage from "./components/ThankYouPage";
import PainSection from "./sections/PainSection";
import SolutionSection from "./sections/SolutionSection";
import WhatsInsideSection from "./sections/WhatsInsideSection";
import WhoItsForSection from "./sections/WhoItsForSection";
import CTASection from "./sections/CTASection";
import Footer from "./sections/Footer";

function SectionDivider() {
  return (
    <div className="mx-auto h-[3px] w-24 rounded-full bg-ink/10 sm:w-32" />
  );
}

function App() {
  const ctaRef = useRef(null);
  const [registeredName, setRegisteredName] = useState(null);

  function scrollToForm() {
    ctaRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (registeredName !== null) {
    return (
      <ThankYouPage
        name={registeredName}
        onBack={() => setRegisteredName(null)}
      />
    );
  }

  return (
    <div className="relative">
      <Hero onCtaClick={scrollToForm} />
      <SectionDivider />
      <PainSection />
      <SectionDivider />
      <SolutionSection />
      <SectionDivider />
      <WhatsInsideSection />
      <SectionDivider />
      <WhoItsForSection />
      <SectionDivider />
      <AboutSection />
      <SectionDivider />
      <CTASection ref={ctaRef} onSignupSuccess={setRegisteredName} />
      <Footer />
      <StickyCTA onClick={scrollToForm} />
    </div>
  );
}

export default App;
