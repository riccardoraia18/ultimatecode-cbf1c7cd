import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import portfolio1 from "@/assets/portfolio-1.png";
import portfolio3 from "@/assets/portfolio-3.png";
import portfolio4 from "@/assets/portfolio-4.png";
import portfolio5 from "@/assets/portfolio-5.png";
import portfolio6 from "@/assets/portfolio-6.png";
import portfolio7 from "@/assets/portfolio-7.png";

const PROJECTS = [
  { img: portfolio1, tag: "NEGOZIO ONLINE", title: "Shop Online AI", desc: "E-commerce su misura con assistente AI integrato che suggerisce i prodotti giusti a ogni visitatore, aumentando le conversioni.", tech: ["Next.js", "Node", "AI"] },
  { img: portfolio3, tag: "HEALTH & FITNESS", title: "App Fitness & Wellness", desc: "App mobile cross-platform per il benessere personale con coach AI, tracking biometrico e piani personalizzati per ogni utente.", tech: ["Flutter", "Python", "GPT-4"] },
  { img: portfolio4, tag: "GESTIONE CLIENTI", title: "CRM Aziendale", desc: "Software gestionale per tracciare clienti e opportunità di vendita in tempo reale — senza che il team debba fare nulla a mano.", tech: ["React", "Claude", "PgSQL"] },
  { img: portfolio5, tag: "FOOD & DELIVERY", title: "Food App & Delivery", desc: "Piattaforma di food delivery con gestione real-time degli ordini, mappe live e chatbot per l'assistenza clienti 24/7.", tech: ["Vue.js", "Firebase", "Maps"] },
  { img: portfolio6, tag: "ANALISI DATI", title: "Dashboard Analytics", desc: "Dashboard aziendale che trasforma dati complessi in grafici chiari e intuitivi — così sai sempre come va il tuo business.", tech: ["React", "D3.js", "Python"] },
  { img: portfolio7, tag: "FIRMA DIGITALE", title: "Firma Digitale Online", desc: "Sistema per firmare contratti online in pochi secondi, da qualsiasi dispositivo. Niente più stampe, scanner o attese.", tech: ["Next.js", "Go", "Stripe"] },
];

const TRANSITION = "transform 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1)";

const Portfolio = () => {
  const [index, setIndex] = useState(0);
  const lockRef = useRef(false);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);
  const n = PROJECTS.length;

  const go = (dir: 1 | -1) => {
    if (lockRef.current) return;
    lockRef.current = true;
    setIndex((i) => (i + dir + n) % n);
    setTimeout(() => { lockRef.current = false; }, 650);
  };

  const goTo = (target: number) => {
    if (lockRef.current || target === index) return;
    lockRef.current = true;
    setIndex(target);
    setTimeout(() => { lockRef.current = false; }, 650);
  };

  const getRole = (i: number): "center" | "left" | "right" | "hidden" => {
    if (i === index) return "center";
    if (i === (index - 1 + n) % n) return "left";
    if (i === (index + 1) % n) return "right";
    return "hidden";
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };
  const onTouchEnd = () => {
    if (Math.abs(touchDeltaX.current) > 50) {
      go(touchDeltaX.current < 0 ? 1 : -1);
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const styleFor = (role: ReturnType<typeof getRole>): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transition: TRANSITION,
      willChange: "transform, opacity, filter",
    };
    if (role === "center") return { ...base, transform: "translate(-50%, -50%) scale(1)", opacity: 1, zIndex: 20, filter: "blur(0px)" };
    if (role === "left") return { ...base, transform: "translate(-50%, -50%) translateX(-70%) scale(0.72)", opacity: 0.45, zIndex: 10, filter: "blur(3px)", cursor: "pointer" };
    if (role === "right") return { ...base, transform: "translate(-50%, -50%) translateX(70%) scale(0.72)", opacity: 0.45, zIndex: 10, filter: "blur(3px)", cursor: "pointer" };
    return { ...base, transform: "translate(-50%, -50%) scale(0.6)", opacity: 0, zIndex: 0, pointerEvents: "none", filter: "blur(6px)" };
  };

  return (
    <section
      id="portfolio"
      style={{
        background: "#000000",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        padding: "6rem 0 4rem",
      }}
    >
      {/* Section title */}
      <div className="flex justify-between items-end mb-8 flex-wrap gap-4" style={{ padding: "0 4rem" }}>
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

      {/* Carousel viewport */}
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          position: "relative",
          width: "100%",
          height: "70vh",
          minHeight: 520,
          touchAction: "pan-y",
        }}
      >
        {/* radial glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(139,92,246,0.15), transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Cards */}
        {PROJECTS.map((p, i) => {
          const role = getRole(i);
          return (
            <article
              key={i}
              onClick={() => {
                if (role === "left") go(-1);
                else if (role === "right") go(1);
              }}
              style={{
                ...styleFor(role),
                width: "min(500px, 86vw)",
                background: "linear-gradient(135deg, #1a0533, #0d0d1a)",
                border: "1px solid rgba(139,92,246,0.3)",
                borderRadius: 24,
                padding: 20,
                boxShadow: role === "center" ? "0 30px 80px rgba(0,0,0,0.5)" : "none",
              }}
            >
              <img
                src={p.img}
                alt={p.title}
                style={{
                  width: "100%",
                  height: 200,
                  objectFit: "cover",
                  borderRadius: 16,
                  display: "block",
                }}
              />
              <div style={{ marginTop: 18 }}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 12px",
                    border: "1px solid #9B6DFF",
                    color: "#9B6DFF",
                    borderRadius: 999,
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    fontWeight: 600,
                  }}
                >
                  {p.tag}
                </span>
                <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 22, marginTop: 12 }}>{p.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.5, marginTop: 8 }}>{p.desc}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {p.tech.map((t, j) => (
                      <span
                        key={j}
                        style={{
                          fontSize: 11,
                          padding: "4px 10px",
                          borderRadius: 999,
                          background: "rgba(255,255,255,0.08)",
                          color: "rgba(255,255,255,0.7)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <ArrowUpRight size={20} color="#fff" />
                </div>
              </div>
            </article>
          );
        })}

        {/* Arrows (desktop) */}
        <button
          aria-label="Precedente"
          onClick={() => go(-1)}
          className="hidden md:flex"
          style={{
            position: "absolute",
            left: 20,
            top: "50%",
            transform: "translateY(-50%)",
            width: 56,
            height: 56,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.6)",
            background: "rgba(0,0,0,0.4)",
            color: "#fff",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 30,
            backdropFilter: "blur(8px)",
          }}
        >
          <ArrowLeft size={22} />
        </button>
        <button
          aria-label="Successivo"
          onClick={() => go(1)}
          className="hidden md:flex"
          style={{
            position: "absolute",
            right: 20,
            top: "50%",
            transform: "translateY(-50%)",
            width: 56,
            height: 56,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.6)",
            background: "rgba(0,0,0,0.4)",
            color: "#fff",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 30,
            backdropFilter: "blur(8px)",
          }}
        >
          <ArrowRight size={22} />
        </button>
      </div>

      {/* Pagination dots */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 12,
          marginTop: 32,
        }}
      >
        {PROJECTS.map((_, i) => {
          const active = i === index;
          return (
            <button
              key={i}
              aria-label={`Vai al progetto ${i + 1}`}
              onClick={() => goTo(i)}
              style={{
                width: active ? 10 : 8,
                height: active ? 10 : 8,
                borderRadius: "50%",
                border: "none",
                padding: 0,
                background: active ? "#fff" : "rgba(255,255,255,0.3)",
                transform: active ? "scale(1.1)" : "scale(1)",
                transition: "all 300ms cubic-bezier(0.4,0,0.2,1)",
                cursor: "pointer",
              }}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Portfolio;
