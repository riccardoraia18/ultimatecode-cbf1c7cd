import { useEffect, useRef, useState } from "react";
import NumberFlow from "@number-flow/react";

type Metric = {
  label: string;
  value: number;
  num: number;
  format?: { minimumFractionDigits?: number; maximumFractionDigits?: number };
  suffix?: string;
};

const metrics: Metric[] = [
  { label: "Velocità di caricamento", value: 97, num: 97, suffix: "/100" },
  { label: "Tempo risposta sito", value: 92, num: 0.8, format: { minimumFractionDigits: 1, maximumFractionDigits: 1 }, suffix: "s" },
  { label: "Valutazione App Store", value: 96, num: 4.8, format: { minimumFractionDigits: 1, maximumFractionDigits: 1 }, suffix: "★" },
  { label: "Precisione automazioni", value: 94, num: 94, suffix: "%" },
  { label: "Clienti soddisfatti", value: 98, num: 98, suffix: "%" },
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
            <div key={i} className="metric-row flex-col sm:flex-row">
              <div className="flex justify-between w-full sm:w-auto sm:contents">
                <div className="metric-name">{m.label}</div>
                <div
                  className="text-[0.95rem] font-semibold tabular-nums sm:min-w-[64px] sm:text-right sm:order-last inline-flex items-baseline justify-end gap-0.5"
                  style={{ color: "var(--gold)" }}
                >
                  <NumberFlow value={visible ? m.num : 0} format={m.format} />
                  {m.suffix && <span className="text-[0.78rem]">{m.suffix}</span>}
                </div>
              </div>
              <div className="metric-bar-wrap w-full">
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
