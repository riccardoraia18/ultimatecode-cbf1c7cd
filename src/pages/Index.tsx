import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      
      <About />
      <Portfolio />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
