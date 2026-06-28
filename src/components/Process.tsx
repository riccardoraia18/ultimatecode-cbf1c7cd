// Adattato da 21st.dev (Codehagen/display-cards) — riscritto sui token UltimateCode
import { useEffect, useRef, useState } from "react";
import { MessageSquare, Pencil, Rocket } from "lucide-react";

const STEPS = [
  {
    icon: MessageSquare,
    label: "Step 01 · Brief",
    title: "Ci racconti la tua idea",
    desc: "Una chiacchierata di 30 minuti, niente gergo tecnico. Capiamo il tuo obiettivo e ti diciamo subito se possiamo aiutarti.",
    when: "Giorno 1",
  },
  {
    icon: Pencil,
    label: "Step 02 · Design & Sviluppo",
    title: "Costruiamo (e ti facciamo vedere)",
    desc: "Mockup, prototipo navigabile, poi sviluppo. Tu vedi l'avanzamento ogni settimana — niente sorprese alla fine.",
    when: "2-6 settimane",
  },
  {
    icon: Rocket,
    label: "Step 03 · Lancio",
    title: "Online — e ti seguiamo dopo",
    desc: "Pubblicazione, test, training. Per 60 giorni siamo a disposizione gratis per qualsiasi aggiustamento.",
    when: "Go live",
  },
];

const Process = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="process"
      ref={ref}
      style={{ padding: "6rem 4rem", position: "relative" }}
      className="overflow-hidden"
    >
      <div className="text-center max-w-[640px] mx-auto mb-16">
        <div className="section-label">Come lavoriamo</div>
        <h2 className="section-title">Dall'idea<br />al prodotto digitale.</h2>
        <p className="section-sub mx-auto">
          Un processo trasparente in 3 passi. Niente preventivi a sorpresa, niente settimane di silenzio.
        </p>
      </div>

      {/* Desktop: stacked skew. Mobile: vertical stack */}
      <div className="relative max-w-[920px] mx-auto h-[440px] hidden md:block">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          // hover lifts target card to front
          return (
            <div
              key={i}
              className="group absolute left-1/2 top-1/2 w-[480px] transition-all duration-500"
              style={{
                transform: visible
                  ? `translate(-50%, -50%) translateX(${(i - 1) * 90}px) translateY(${(i - 1) * 40}px) skewY(-6deg)`
                  : `translate(-50%, -50%) translateY(40px) skewY(-6deg)`,
                opacity: visible ? 1 : 0,
                transitionDelay: `${i * 120}ms`,
                zIndex: 10 + i,
              }}
            >
              <div
                className="rounded-xl p-7 transition-all duration-500 hover:!translate-y-[-12px] group-hover:border-[rgba(155,109,255,0.45)] group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
                style={{
                  background: "linear-gradient(135deg, var(--navy-mid) 0%, var(--navy-light) 100%)",
                  border: "1px solid rgba(155,109,255,0.18)",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
                }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center"
                    style={{
                      background: "rgba(155,109,255,0.12)",
                      border: "1px solid rgba(155,109,255,0.25)",
                    }}
                  >
                    <Icon size={20} color="var(--gold)" />
                  </div>
                  <span
                    className="text-[0.65rem] tracking-[0.15em] uppercase font-medium"
                    style={{ color: "var(--silver)" }}
                  >
                    {s.when}
                  </span>
                </div>
                <div
                  className="text-[0.7rem] tracking-[0.18em] uppercase mb-2 font-medium"
                  style={{ color: "var(--gold)" }}
                >
                  {s.label}
                </div>
                <h3
                  className="font-['Playfair_Display',serif] text-[1.5rem] font-bold mb-3 leading-tight"
                  style={{ color: "var(--white)" }}
                >
                  {s.title}
                </h3>
                <p className="text-[0.88rem] leading-[1.65]" style={{ color: "var(--silver)" }}>
                  {s.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile: simple vertical cards */}
      <div className="md:hidden flex flex-col gap-5 max-w-[440px] mx-auto">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="rounded-xl p-6 transition-all duration-500"
              style={{
                background: "linear-gradient(135deg, var(--navy-mid) 0%, var(--navy-light) 100%)",
                border: "1px solid rgba(155,109,255,0.18)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transitionDelay: `${i * 120}ms`,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    background: "rgba(155,109,255,0.12)",
                    border: "1px solid rgba(155,109,255,0.25)",
                  }}
                >
                  <Icon size={18} color="var(--gold)" />
                </div>
                <span
                  className="text-[0.62rem] tracking-[0.15em] uppercase"
                  style={{ color: "var(--silver)" }}
                >
                  {s.when}
                </span>
              </div>
              <div
                className="text-[0.65rem] tracking-[0.18em] uppercase mb-2 font-medium"
                style={{ color: "var(--gold)" }}
              >
                {s.label}
              </div>
              <h3
                className="font-['Playfair_Display',serif] text-[1.3rem] font-bold mb-2 leading-tight"
                style={{ color: "var(--white)" }}
              >
                {s.title}
              </h3>
              <p className="text-[0.85rem] leading-[1.6]" style={{ color: "var(--silver)" }}>
                {s.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Process;
