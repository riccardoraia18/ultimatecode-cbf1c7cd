import { useMemo, useState } from "react";

type Category = "Tutti" | "Siti Vetrina" | "Gestionali" | "App & Food" | "AI & Automazioni";

const CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  Gestionali: { bg: "rgba(59,130,246,0.14)", border: "rgba(59,130,246,0.45)", text: "#60a5fa" },
  "App & Food": { bg: "rgba(34,197,94,0.14)", border: "rgba(34,197,94,0.45)", text: "#4ade80" },
  "Siti Vetrina": { bg: "rgba(249,115,22,0.14)", border: "rgba(249,115,22,0.45)", text: "#fb923c" },
  "AI & Automazioni": { bg: "rgba(155,109,255,0.16)", border: "rgba(155,109,255,0.45)", text: "#a78bfa" },
};

type Project = {
  category: Exclude<Category, "Tutti">;
  catLabel: string;
  title: string;
  desc: string;
  result: string;
  tags: string[];
};

const PROJECTS: Project[] = [
  {
    category: "Gestionali",
    catLabel: "Gestionale · Sanità & Fitness",
    title: "Piattaforma integrata per professioni sanitarie e personal trainer",
    desc: "Abbiamo costruito un sistema che unisce il sito pubblico con un gestionale completo: i pazienti o clienti prenotano online, il professionista gestisce agenda, schede, pagamenti e abbonamenti tutto da un unico pannello. Niente più WhatsApp per gli appuntamenti, niente più Excel per i pagamenti.",
    result: "Zero telefonate per le prenotazioni. Gestione completa da smartphone.",
    tags: ["Prenotazioni online", "Schede clienti/pazienti", "Abbonamenti", "Pagamenti integrati", "App mobile", "Dashboard"],
  },
  {
    category: "App & Food",
    catLabel: "Food App · Ristorazione",
    title: "App di ordinazione per ristoranti e pizzerie senza commissioni",
    desc: "I ristoratori pagano fino al 30% di commissioni a Glovo e Deliveroo. Abbiamo sviluppato app brandizzate con logo e colori del locale, ordini diretti, gestione tavoli e consegne — senza intermediari.",
    result: "Il ristorante incassa il 100% di ogni ordine.",
    tags: ["Ordini online", "Consegna a domicilio", "Menu digitale", "iOS & Android", "Gestione tavoli"],
  },
  {
    category: "Siti Vetrina",
    catLabel: "Sito Vetrina · Professionisti",
    title: "Siti vetrina per studi professionali, artigiani e attività locali",
    desc: "Dal dentista all'avvocato, dal fotografo al centro estetico: progettiamo siti veloci, curati e trovabili su Google. Ogni sito è pensato per il settore specifico del cliente, non copiato da un template generico.",
    result: "Presenti su Google in meno di 30 giorni.",
    tags: ["Design su misura", "SEO", "Mobile first", "CMS autonomo"],
  },
  {
    category: "AI & Automazioni",
    catLabel: "AI & Automazioni",
    title: "Assistente AI per rispondere ai clienti su WhatsApp e email",
    desc: "Abbiamo integrato agenti AI che rispondono automaticamente alle domande frequenti, raccolgono richieste di preventivo, fissano appuntamenti e smistano le comunicazioni — anche di notte e nei weekend.",
    result: "Fino a 15 ore a settimana risparmiate sulla gestione messaggi.",
    tags: ["WhatsApp Business", "Email automatica", "Prenotazioni autonome", "H24"],
  },
  {
    category: "Gestionali",
    catLabel: "Gestionale · Retail & Servizi",
    title: "Gestionali personalizzati per ogni tipo di attività",
    desc: "Dalla pizzeria con 10 tavoli alla clinica con 15 medici: costruiamo software gestionale su misura che sostituisce fogli Excel, quaderni cartacei e app generiche che non fanno mai esattamente quello che serve.",
    result: "Tutto sotto controllo da un unico schermo.",
    tags: ["Magazzino", "Cassa", "Turni", "CRM clienti", "Report automatici"],
  },
  {
    category: "App & Food",
    catLabel: "App Mobile · Prenotazioni",
    title: "Web app e app mobile per centri sportivi, hotel e beauty",
    desc: "I tuoi clienti prenotano dal telefono in 30 secondi, ricevono conferma e promemoria automatici, e possono disdire senza chiamarti. Tu vedi tutto in tempo reale dal tuo pannello.",
    result: "Prenotazioni attive 24/7, disdette gestite in automatico.",
    tags: ["Prenotazioni real-time", "Promemoria SMS/email", "iOS & Android", "Calendario integrato"],
  },
];

const FILTERS: Category[] = ["Tutti", "Siti Vetrina", "Gestionali", "App & Food", "AI & Automazioni"];

const Portfolio = () => {
  const [filter, setFilter] = useState<Category>("Tutti");

  const visible = useMemo(
    () => (filter === "Tutti" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section
      id="portfolio"
      style={{
        background: "#000000",
        position: "relative",
        overflow: "hidden",
        padding: "6rem 0 5rem",
      }}
    >
      {/* radial glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(155,109,255,0.12), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", padding: "0 clamp(1.25rem, 4vw, 4rem)" }}>
        {/* Header */}
        <div className="text-center max-w-[760px] mx-auto mb-10">
          <div className="section-label">I nostri progetti</div>
          <h2 className="section-title">Cosa abbiamo costruito<br />— e per chi.</h2>
          <p className="section-sub mx-auto">
            Ogni progetto nasce da un problema reale. Ecco come lo abbiamo risolto.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {FILTERS.map((f) => {
            const active = f === filter;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="transition-all duration-300"
                style={{
                  padding: "0.55rem 1.1rem",
                  borderRadius: 999,
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                  cursor: "pointer",
                  border: active ? "1px solid #9B6DFF" : "1px solid rgba(255,255,255,0.15)",
                  background: active ? "#9B6DFF" : "rgba(255,255,255,0.03)",
                  color: active ? "#0a0612" : "rgba(255,255,255,0.75)",
                  boxShadow: active ? "0 8px 24px rgba(155,109,255,0.35)" : "none",
                }}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div
          className="grid gap-6 max-w-[1280px] mx-auto"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
          }}
        >
          {visible.map((p) => {
            const c = CATEGORY_COLORS[p.category];
            return (
              <article
                key={p.title}
                className="animate-fade-in"
                style={{
                  background: "linear-gradient(135deg, var(--navy-mid, #15102b) 0%, var(--navy-light, #0d0a1f) 100%)",
                  border: "1px solid rgba(155,109,255,0.18)",
                  borderRadius: 20,
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  willChange: "transform",
                  transition: "transform 350ms ease, border-color 350ms ease, box-shadow 350ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "rgba(155,109,255,0.4)";
                  e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "rgba(155,109,255,0.18)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <span
                  style={{
                    alignSelf: "flex-start",
                    padding: "0.3rem 0.75rem",
                    borderRadius: 999,
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    background: c.bg,
                    border: `1px solid ${c.border}`,
                    color: c.text,
                  }}
                >
                  {p.catLabel}
                </span>

                <h3
                  className="font-['Playfair_Display',serif]"
                  style={{ color: "var(--white, #fff)", fontSize: "1.35rem", fontWeight: 700, lineHeight: 1.25 }}
                >
                  {p.title}
                </h3>

                <p style={{ color: "var(--silver, #9B8EC4)", fontSize: "0.92rem", lineHeight: 1.65 }}>
                  {p.desc}
                </p>

                <div
                  style={{
                    padding: "0.85rem 1rem",
                    borderRadius: 12,
                    background: "rgba(155,109,255,0.08)",
                    border: "1px solid rgba(155,109,255,0.22)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#a78bfa",
                      marginBottom: 4,
                    }}
                  >
                    Risultato
                  </div>
                  <div style={{ color: "#fff", fontSize: "0.92rem", fontWeight: 500, lineHeight: 1.45 }}>
                    {p.result}
                  </div>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "auto" }}>
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: "0.72rem",
                        padding: "0.3rem 0.65rem",
                        borderRadius: 999,
                        background: "rgba(255,255,255,0.06)",
                        color: "rgba(255,255,255,0.7)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
