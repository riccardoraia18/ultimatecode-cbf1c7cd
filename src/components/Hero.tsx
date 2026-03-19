const stats = [
  { value: "50+", label: "Progetti Completati" },
  { value: "98%", label: "Clienti Soddisfatti" },
  { value: "5+", label: "Anni di Esperienza" },
];

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-24 pb-16 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, hsl(261 100% 71%), transparent)" }} />
      <div className="absolute bottom-0 -left-32 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]"
        style={{ background: "radial-gradient(circle, hsl(280 80% 65%), transparent)" }} />

      <div className="container grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        {/* Left */}
        <div>
          <p className="text-primary font-body font-semibold text-sm tracking-widest uppercase mb-4 animate-fade-up">
            Agenzia Digitale Italiana
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6 animate-fade-up-delay-1">
            Creiamo{" "}
            <span className="gradient-text">esperienze</span>{" "}
            digitali uniche
          </h1>
          <p className="text-foreground text-lg leading-relaxed max-w-lg mb-8 animate-fade-up-delay-2">
            Trasformiamo le tue idee in prodotti digitali straordinari. 
            Design, sviluppo e strategia per far crescere il tuo business online.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-up-delay-3">
            <a href="#contatti" className="btn-primary">Parliamone</a>
            <a href="#portfolio" className="btn-outline">Vedi i Lavori</a>
          </div>
        </div>

        {/* Right — Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6 animate-fade-up-delay-2">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="card-hover bg-card border border-border/60 rounded-2xl p-8 text-center lg:text-left glow-primary"
            >
              <span className="block font-heading text-5xl lg:text-6xl font-bold gradient-text mb-2">
                {stat.value}
              </span>
              <span className="text-foreground font-body text-sm tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
