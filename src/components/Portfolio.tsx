import { useMemo, useState } from "react";
import imgSanita from "@/assets/portfolio-sanita.jpg";
import imgFood from "@/assets/portfolio-food.jpg";
import imgSiti from "@/assets/portfolio-siti.jpg";
import imgAi from "@/assets/portfolio-ai.jpg";
import imgGestionale from "@/assets/portfolio-gestionale.jpg";
import imgPrenotazioni from "@/assets/portfolio-prenotazioni.jpg";

type Category = "Tutti" | "Siti Web" | "Gestionali" | "App & Food" | "AI & Automazioni";

const CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  Gestionali: { bg: "rgba(59,130,246,0.14)", border: "rgba(59,130,246,0.45)", text: "#60a5fa" },
  "App & Food": { bg: "rgba(34,197,94,0.14)", border: "rgba(34,197,94,0.45)", text: "#4ade80" },
  "Siti Web": { bg: "rgba(249,115,22,0.14)", border: "rgba(249,115,22,0.45)", text: "#fb923c" },
  "AI & Automazioni": { bg: "rgba(155,109,255,0.16)", border: "rgba(155,109,255,0.45)", text: "#a78bfa" },
};

type Project = {
  category: Exclude<Category, "Tutti">;
  catLabel: string;
  title: string;
  desc: string;
  result: string;
  tags: string[];
  image: string;
};

const PROJECTS: Project[] = [
  {
    category: "Gestionali",
    catLabel: "Gestionale · Sanità & Fitness",
    title: "La piattaforma completa per professionisti della salute e del benessere",
    desc: "Un unico sistema per gestire pazienti, clienti e appuntamenti. Il sito acquisisce nuove prenotazioni, mentre il gestionale centralizza agenda, cartelle, pagamenti, abbonamenti e comunicazioni. Tutto sincronizzato, tutto in un unico pannello.",
    result: "Meno tempo dedicato alla gestione, più tempo per i tuoi clienti.",
    tags: ["Prenotazioni online 24/7", "Agenda intelligente", "Schede clienti e pazienti", "Abbonamenti e pagamenti integrati", "Dashboard completa", "Accesso da smartphone e desktop"],
    image: imgSanita,
  },
  {
    category: "App & Food",
    catLabel: "Food App · Ristorazione",
    title: "L'app del tuo ristorante, senza commissioni",
    desc: "Smetti di dipendere dalle piattaforme di delivery. Realizziamo app personalizzate con il tuo brand che permettono ai clienti di ordinare direttamente da te, aumentando i margini e fidelizzando chi acquista.",
    result: "Ogni ordine è tuo. Nessuna commissione. Nessun intermediario.",
    tags: ["Ordini online", "Delivery e asporto", "Menu digitale", "App iOS e Android", "Gestione tavoli", "Pagamenti integrati"],
    image: imgFood,
  },
  {
    category: "Siti Web",
    catLabel: "Siti Web · Professionisti",
    title: "Siti web progettati per trasformare visitatori in clienti",
    desc: "Non realizziamo semplici siti vetrina. Progettiamo strumenti di acquisizione clienti, veloci, ottimizzati per Google e costruiti sulle esigenze del tuo settore. Ogni progetto è unico, senza template preconfezionati.",
    result: "Più visibilità, più richieste di contatto, più credibilità.",
    tags: ["Design personalizzato", "SEO tecnica", "Mobile First", "CMS semplice da gestire", "Prestazioni elevate"],
    image: imgSiti,
  },
  {
    category: "AI & Automazioni",
    catLabel: "AI & Automazioni",
    title: "Un assistente AI che lavora per la tua azienda, anche quando sei offline",
    desc: "Automatizziamo le attività ripetitive con agenti AI che rispondono ai clienti, qualificano richieste, fissano appuntamenti e gestiscono conversazioni su WhatsApp, email e altri canali. Sempre operativo, 24 ore su 24.",
    result: "Meno lavoro manuale, risposte immediate e nessuna opportunità persa.",
    tags: ["Agente AI personalizzato", "WhatsApp Business", "Email automatiche", "Prenotazioni autonome", "Operativo H24"],
    image: imgAi,
  },
  {
    category: "Gestionali",
    catLabel: "Gestionale · Retail & Servizi",
    title: "Software gestionali costruiti intorno al tuo modo di lavorare",
    desc: "Quando i software standard ti costringono ad adattarti, noi realizziamo il contrario: sviluppiamo gestionali personalizzati che seguono i processi della tua azienda. Niente fogli Excel, niente procedure duplicate, niente strumenti scollegati.",
    result: "Tutta l'azienda sotto controllo da un'unica piattaforma.",
    tags: ["CRM clienti", "Magazzino", "Cassa", "Turni e personale", "Report automatici", "Dashboard in tempo reale"],
    image: imgGestionale,
  },
  {
    category: "App & Food",
    catLabel: "App Mobile · Prenotazioni",
    title: "Prenotazioni online semplici per te e per i tuoi clienti",
    desc: "Realizziamo web app e applicazioni mobile che permettono ai clienti di prenotare in pochi secondi, ricevere conferme automatiche e modificare gli appuntamenti senza telefonate. Tu controlli tutto in tempo reale da un'unica dashboard.",
    result: "Prenotazioni sempre aperte, meno chiamate e agenda sempre aggiornata.",
    tags: ["Prenotazioni online 24/7", "Calendario sincronizzato", "Promemoria automatici", "Gestione disdette", "App iOS e Android"],
    image: imgPrenotazioni,
  },
];

const FILTERS: Category[] = ["Tutti", "Siti Web", "Gestionali", "App & Food", "AI & Automazioni"];

const Portfolio = () => {
  const [filter, setFilter] = useState<Category>("Tutti");

  const visible = useMemo(
    () => (filter === "Tutti" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter],
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
        <div className="text-center max-w-[760px] mx-auto mb-10">
          <div className="section-label">I nostri progetti</div>
          <h2 className="section-title">Cosa abbiamo costruito<br />— e per chi.</h2>
          <p className="section-sub mx-auto">
            Ogni progetto nasce da un problema reale. Ecco come lo abbiamo risolto.
          </p>
        </div>

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

        <div
          className="grid gap-6 max-w-[1280px] mx-auto"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 360px), 1fr))" }}
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
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
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
                {/* Image */}
                <div style={{ position: "relative", aspectRatio: "16 / 10", overflow: "hidden", background: "#0a0612" }}>
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(180deg, rgba(13,10,31,0) 40%, rgba(13,10,31,0.85) 100%)",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: 14,
                      left: 14,
                      padding: "0.3rem 0.75rem",
                      borderRadius: 999,
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      background: c.bg,
                      border: `1px solid ${c.border}`,
                      color: c.text,
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {p.catLabel}
                  </span>
                </div>

                {/* Content */}
                <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem", flex: 1 }}>
                  <h3
                    className="font-['Playfair_Display',serif]"
                    style={{ color: "var(--white, #fff)", fontSize: "1.3rem", fontWeight: 700, lineHeight: 1.25 }}
                  >
                    {p.title}
                  </h3>

                  <p style={{ color: "var(--silver, #9B8EC4)", fontSize: "0.92rem", lineHeight: 1.65 }}>{p.desc}</p>

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
