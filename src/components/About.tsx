import { useEffect, useRef, useState } from "react";

const metrics = [
  { label: "Soddisfazione Clienti", value: 98 },
  { label: "Progetti Consegnati", value: 95 },
  { label: "Performance Web", value: 92 },
  { label: "Retention Rate", value: 88 },
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-24 border-t border-border/40" ref={sectionRef}>
      <div className="container grid lg:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div>
          <p className="text-primary font-body font-semibold text-sm tracking-widest uppercase mb-3">
            Chi Siamo
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Passione per il <span className="gradient-text">digitale</span>
          </h2>
          <p className="text-foreground leading-relaxed mb-4">
            Siamo un team di designer, sviluppatori e strateghi digitali con sede in Italia. 
            Da oltre 5 anni aiutiamo aziende e startup a costruire la loro presenza online 
            con soluzioni creative e tecnologicamente avanzate.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Ogni progetto è un'opportunità per innovare. Combiniamo estetica e funzionalità 
            per creare prodotti digitali che lasciano il segno.
          </p>
        </div>

        {/* Metrics */}
        <div className="space-y-6">
          {metrics.map((m, i) => (
            <div key={i}>
              <div className="flex justify-between mb-2">
                <span className="font-body text-sm text-heading font-medium">{m.label}</span>
                <span className="font-body text-sm text-primary font-semibold">{m.value}%</span>
              </div>
              <div className="metric-bar h-2.5">
                <div
                  className="metric-bar-fill"
                  style={{
                    width: visible ? `${m.value}%` : "0%",
                    transitionDelay: `${i * 150}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
