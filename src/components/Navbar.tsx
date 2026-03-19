import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Servizi", href: "#servizi" },
  { label: "Chi Siamo", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contatti", href: "#contatti" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-nav py-3" : "py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        <a href="#home" className="font-heading text-2xl font-bold text-heading tracking-tight">
          Ultimate<span className="gradient-text">Code</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-foreground text-sm font-body font-medium hover:text-primary transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a href="#contatti" className="btn-primary text-xs">
            Inizia Ora
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass-nav border-t border-border/30 mt-3 animate-fade-up">
          <div className="container py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-foreground font-body text-lg hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a href="#contatti" className="btn-primary text-center mt-2" onClick={() => setMobileOpen(false)}>
              Inizia Ora
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
