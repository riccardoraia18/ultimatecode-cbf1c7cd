import { useEffect, useRef, useState } from "react";

const metrics = [
  { label: "Velocità di caricamento", value: 97, display: "97" },
  { label: "Tempo risposta sito", value: 92, display: "0.8s" },
  { label: "Valutazione App Store", value: 96, display: "4.8★" },
  { label: "Precisione automazioni", value: 94, display: "94%" },
  { label: "Clienti soddisfatti", value: 98, display: "98%" },
];

const features = [
  {
    icon: "🌐",
    title: "Siti che funzionano (davvero)",
    desc: "Niente template. Creiamo siti web su misura: veloci, belli, ottimizzati per Google e perfetti su ogni schermo. Il tuo sito sarà il tuo miglior venditore.",
  },
  {
    icon: "📱",
    title: "App per smartphone",
    desc: "Progettiamo app iOS e Android che la gente vuole usare davvero. Dalle app per ordinare cibo a quelle per prenotare servizi — semplici, veloci e affidabili.",
  },
  {
    icon: "🤖",
    title: "Automatizza il tuo lavoro",
    desc: "Chatbot che rispondono ai clienti H24, sistemi che gestiscono ordini da soli, analisi automatiche dei dati. Tecnologia avanzata, risultati concreti.",
  },
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="grid grid-cols-1 lg:grid-cols-2 items-center"
      style={{ padding: "7rem 4rem", gap: "6rem" }}
    >
      {/* Left - Text */}
      <div>
        <div className="section-label">Chi siamo</div>
        <h2 className="section-title">
          Trasformiamo idee in<br />prodotti digitali.
        </h2>
        <p className="section-sub">
          Siamo un team di sviluppatori, designer e strateghi digitali con base a Catania. Aiutiamo aziende e professionisti a portare il proprio lavoro online — con siti, app e automazioni che funzionano davvero.
        </p>

        <div className="flex flex-col gap-6 mt-12">
          {features.map((f, i) => (
            <div key={i} className="feature-row">
              <div className="feature-icon">{f.icon}</div>
              <div>
                <div className="text-[0.9rem] font-semibold mb-1" style={{ color: "var(--white)" }}>
                  {f.title}
                </div>
                <div className="text-[0.82rem] leading-[1.6]" style={{ color: "var(--silver)" }}>
                  {f.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right - Metrics */}
      <div className="relative">
        <div className="metrics-card">
          <div
            className="text-[0.75rem] tracking-[0.1em] uppercase mb-6"
            style={{ color: "var(--silver)" }}
          >
            I nostri progetti in numeri
          </div>
          {metrics.map((m, i) => (
            <div key={i} className="metric-row">
              <div className="metric-name">{m.label}</div>
              <div className="metric-bar-wrap">
                <div
                  className="metric-bar-fill"
                  style={{
                    width: visible ? `${m.value}%` : "0%",
                    transitionDelay: `${i * 150}ms`,
                  }}
                />
              </div>
              <div
                className="text-[0.8rem] font-semibold w-10 text-right"
                style={{ color: "var(--gold)" }}
              >
                {m.display}
              </div>
            </div>
          ))}
        </div>
        <div className="ai-badge-card">
          <div className="ai-dot" />
          <div className="text-[0.75rem]">
            <strong className="block text-[0.82rem]" style={{ color: "#9B6DFF" }}>
              Automatizzato con AI
            </strong>
            <span style={{ color: "var(--silver)" }}>I tuoi processi lavorano da soli</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
