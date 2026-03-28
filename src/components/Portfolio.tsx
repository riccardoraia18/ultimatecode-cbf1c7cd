import portfolio1 from "@/assets/portfolio-1.png";
import portfolio2 from "@/assets/portfolio-2.png";
import portfolio3 from "@/assets/portfolio-3.png";
import portfolio4 from "@/assets/portfolio-4.png";
import portfolio5 from "@/assets/portfolio-5.png";
import portfolio6 from "@/assets/portfolio-6.png";
import portfolio7 from "@/assets/portfolio-7.png";

const projects = [
  {
    img: portfolio1,
    tag: "Negozio Online",
    title: "Shop Online AI",
    desc: "E-commerce su misura con assistente AI integrato che suggerisce i prodotti giusti a ogni visitatore, aumentando le conversioni.",
    tech: ["Next.js", "Node", "AI"],
  },
  {
    img: portfolio3,
    tag: "Health & Fitness",
    title: "App Fitness & Wellness",
    desc: "App mobile cross-platform per il benessere personale con coach AI, tracking biometrico e piani personalizzati per ogni utente.",
    tech: ["Flutter", "Python", "GPT-4"],
  },
  {
    img: portfolio4,
    tag: "Gestione Clienti",
    title: "CRM Aziendale",
    desc: "Software gestionale per tracciare clienti e opportunità di vendita in tempo reale — senza che il team debba fare nulla a mano.",
    tech: ["React", "Claude", "PgSQL"],
  },
  {
    img: portfolio5,
    tag: "Food & Delivery",
    title: "Food App & Delivery",
    desc: "Piattaforma di food delivery con gestione real-time degli ordini, mappe live e chatbot per l’assistenza clienti 24/7.",
    tech: ["Vue.js", "Firebase", "Maps"],
  },
  {
    img: portfolio6,
    tag: "Analisi Dati",
    title: "Dashboard Analytics",
    desc: "Dashboard aziendale che trasforma dati complessi in grafici chiari e intuitivi — così sai sempre come va il tuo business.",
    tech: ["React", "D3.js", "Python"],
  },
  {
    img: portfolio7,
    tag: "Firma Digitale",
    title: "Firma Digitale Online",
    desc: "Sistema per firmare contratti online in pochi secondi, da qualsiasi dispositivo. Niente più stampe, scanner o attese.",
    tech: ["Next.js", "Go", "Stripe"],
  },
];

const Portfolio = () => {
  return (
    <section id="portfolio" style={{ padding: "7rem 4rem", background: "var(--navy-mid)" }}>
      <div className="flex justify-between items-end mb-14 flex-wrap gap-4">
        <div>
          <div className="section-label">Cosa realizziamo</div>
          <h2 className="section-title">
            Cosa possiamo<br />realizzare
          </h2>
        </div>
        <a href="#cta" className="btn-outline">
          Parliamo del tuo →
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <div key={i} className="project-card">
            <div
              className="project-thumb"
              style={{ backgroundImage: `url(${p.img})` }}
            />
            <div className="project-body">
              <div className="project-tag">{p.tag}</div>
              <div className="project-title" style={{ color: "var(--white)" }}>
                {p.title}
              </div>
              <div className="project-desc">{p.desc}</div>
            </div>
            <div className="project-footer">
              <div className="flex gap-1.5">
                {p.tech.map((t, j) => (
                  <span key={j} className="tech-chip">{t}</span>
                ))}
              </div>
              <span className="project-arrow">↗</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
