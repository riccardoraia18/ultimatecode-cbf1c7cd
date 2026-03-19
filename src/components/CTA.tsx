const CTA = () => {
  return (
    <section id="contatti" className="py-24 border-t border-border/40">
      <div className="container">
        <div className="relative rounded-3xl overflow-hidden glow-primary p-12 md:p-20 text-center"
          style={{ background: "linear-gradient(135deg, hsl(260 35% 10%), hsl(261 40% 14%))" }}
        >
          {/* Decorative orb */}
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-15 blur-[80px]"
            style={{ background: "hsl(261 100% 71%)" }} />

          <p className="text-primary font-body font-semibold text-sm tracking-widest uppercase mb-4">
            Pronto a iniziare?
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-heading mb-6 max-w-2xl mx-auto">
            Trasformiamo insieme la tua <span className="gradient-text">visione</span>
          </h2>
          <p className="text-foreground max-w-lg mx-auto mb-8">
            Contattaci per una consulenza gratuita. Raccontaci il tuo progetto 
            e scopri come possiamo aiutarti a raggiungere i tuoi obiettivi.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:info@ultimatecode.it" className="btn-primary">
              Scrivici Ora
            </a>
            <a href="#home" className="btn-outline">
              Torna Su
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
