import { Code, Palette, BarChart3, Smartphone, Globe, Zap } from "lucide-react";

const services = [
  { icon: Code, title: "Sviluppo Web", desc: "Siti e web app performanti" },
  { icon: Palette, title: "UI/UX Design", desc: "Interfacce intuitive e belle" },
  { icon: BarChart3, title: "SEO & Marketing", desc: "Visibilità e conversioni" },
  { icon: Smartphone, title: "App Mobile", desc: "iOS e Android nativi" },
  { icon: Globe, title: "E-Commerce", desc: "Negozi online su misura" },
  { icon: Zap, title: "Consulenza", desc: "Strategia digitale a 360°" },
];

const Services = () => {
  return (
    <section id="servizi" className="py-24 border-t border-border/40">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-primary font-body font-semibold text-sm tracking-widest uppercase mb-3">
            I Nostri Servizi
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold">
            Cosa <span className="gradient-text">facciamo</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.map((s, i) => (
            <div
              key={i}
              className="card-hover bg-card border border-border/50 rounded-xl p-6 text-center group"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-sm font-semibold mb-1">{s.title}</h3>
              <p className="text-muted-foreground text-xs">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
