const Footer = () => {
  return (
    <footer className="border-t border-border/40 py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <span className="font-heading text-xl font-bold text-heading">
              Ultimate<span className="gradient-text">Code</span>
            </span>
            <p className="text-muted-foreground text-sm mt-3 leading-relaxed max-w-xs">
              Agenzia digitale italiana specializzata in design, sviluppo e strategia digitale.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold mb-4">Link Rapidi</h4>
            <ul className="space-y-2 text-sm">
              {["Home", "Servizi", "Chi Siamo", "Portfolio", "Contatti"].map((l) => (
                <li key={l}>
                  <a
                    href={`#${l === "Home" ? "home" : l === "Servizi" ? "servizi" : l === "Chi Siamo" ? "about" : l === "Portfolio" ? "portfolio" : "contatti"}`}
                    className="text-foreground hover:text-primary transition-colors duration-300"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold mb-4">Contatti</h4>
            <ul className="space-y-2 text-sm text-foreground">
              <li>info@ultimatecode.it</li>
              <li>+39 02 1234 5678</li>
              <li>Milano, Italia</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 pt-6 text-center">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} UltimateCode. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
