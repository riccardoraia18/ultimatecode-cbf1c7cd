import heroImg from "@/assets/hero-devices.png";

const Hero = () => {
  return (
    <section
      id="hero"
      className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center relative overflow-hidden px-4 sm:px-16"
      style={{ paddingTop: "8rem", paddingBottom: "4rem" }}
    >
      <div className="hero-bg" />
      <div className="hero-grid-lines" />

      <div className="relative z-[1] text-left">
        <div className="hero-badge animate-fade-up">
          🇮🇹 Agenzia digitale italiana · Catania, Sicilia
        </div>
        <h1
          className="font-['Playfair_Display',serif] font-black leading-[1.05] tracking-[-0.02em] mb-6 animate-fade-up-delay-1"
          style={{ fontSize: "clamp(3rem, 5vw, 5.5rem)", color: "var(--white)" }}
        >
          Digitale.<br />
          <em className="not-italic block" style={{ color: "var(--gold)" }}>Intelligente.</em>
          Senza compromessi.
        </h1>
        <p
          className="text-[1.05rem] leading-[1.8] max-w-[480px] mb-12 animate-fade-up-delay-2"
          style={{ color: "var(--silver)" }}
        >
          Hai un'idea, un prodotto o un'azienda da portare online? Noi realizziamo siti, app per smartphone e sistemi automatizzati che lavorano per te — anche mentre dormi.
        </p>
        <div className="flex gap-5 flex-wrap animate-fade-up-delay-3">
          <a href="#portfolio" className="btn-primary">I nostri progetti</a>
          <a href="#cta" className="btn-outline">Parlaci del tuo progetto →</a>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:gap-12 mt-16 mb-16 lg:mb-0 animate-fade-up-delay-4">
          <div>
            <div className="font-['Playfair_Display',serif] text-3xl sm:text-4xl font-bold" style={{ color: "var(--white)" }}>
              50<span style={{ color: "var(--gold)" }}>+</span>
            </div>
            <div className="text-[0.7rem] sm:text-[0.75rem] tracking-[0.1em] uppercase mt-1" style={{ color: "var(--silver)" }}>
              Progetti consegnati
            </div>
          </div>
          <div>
            <div className="font-['Playfair_Display',serif] text-3xl sm:text-4xl font-bold" style={{ color: "var(--white)" }}>
              98<span style={{ color: "var(--gold)" }}>%</span>
            </div>
            <div className="text-[0.7rem] sm:text-[0.75rem] tracking-[0.1em] uppercase mt-1" style={{ color: "var(--silver)" }}>
              Clienti soddisfatti
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-[1] flex justify-center items-center" style={{ animation: "fadeIn 1.2s 0.5s ease both" }}>
        <div className="hero-img-wrap">
          <img src={heroImg} alt="UltimateCode portfolio showcase" />
          <div className="hero-img-overlay" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
