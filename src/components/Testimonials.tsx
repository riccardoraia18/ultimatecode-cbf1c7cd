// Adattato da 21st.dev (efferd/testimonials-columns-1) — riscritto sui token UltimateCode
// Nota: key uniche tra duplicazioni (${dup}-${id}) come da skill 21st-components
import { motion } from "framer-motion";

type Item = { name: string; role: string; quote: string; initials: string };

const COL_1: Item[] = [
  {
    name: "Marco R.",
    role: "Titolare ristorante · Catania",
    quote:
      "In 3 settimane avevamo il sito online con prenotazioni automatiche. Le serate sold-out sono raddoppiate. Investimento ripagato in due mesi.",
    initials: "MR",
  },
  {
    name: "Giulia D.",
    role: "Studio dentistico · Acireale",
    quote:
      "Il chatbot risponde ai pazienti H24 e prende gli appuntamenti da solo. Risparmiamo 2 ore al giorno di telefonate.",
    initials: "GD",
  },
  {
    name: "Antonio L.",
    role: "Founder startup · Palermo",
    quote:
      "Cercavamo qualcuno che capisse il prodotto, non solo il codice. UltimateCode è entrata nel team come fossero soci.",
    initials: "AL",
  },
];

const COL_2: Item[] = [
  {
    name: "Sara M.",
    role: "E-commerce moda · Siracusa",
    quote:
      "Sito veloce, ordini cresciuti del 40% rispetto al vecchio Shopify. E quando ho un dubbio rispondono in giornata.",
    initials: "SM",
  },
  {
    name: "Davide P.",
    role: "Consulente fiscale · Messina",
    quote:
      "App mobile per i miei clienti. Semplice, veloce, e si è ripagata da sola con i nuovi contatti del primo mese.",
    initials: "DP",
  },
  {
    name: "Federica B.",
    role: "Wedding planner · Taormina",
    quote:
      "Hanno automatizzato preventivi, contratti e fatture. Posso finalmente concentrarmi sui clienti, non sulla burocrazia.",
    initials: "FB",
  },
];

const COL_3: Item[] = [
  {
    name: "Luca T.",
    role: "Palestra · Catania",
    quote:
      "Sistema di abbonamenti online e app per prenotare le lezioni. I miei iscritti adorano la semplicità.",
    initials: "LT",
  },
  {
    name: "Roberta C.",
    role: "Hotel boutique · Noto",
    quote:
      "Sito tradotto in 4 lingue, booking integrato, design da rivista. Le prenotazioni dirette sono triplicate.",
    initials: "RC",
  },
  {
    name: "Salvo G.",
    role: "Studio legale · Catania",
    quote:
      "Professionali, puntuali, e ti spiegano tutto come se fossi un bambino. Esattamente quello che serviva a uno come me.",
    initials: "SG",
  },
];

const Card = ({ item }: { item: Item }) => (
  <div
    className="rounded-xl p-6 mb-5"
    style={{
      background: "linear-gradient(135deg, var(--navy-mid) 0%, var(--navy-light) 100%)",
      border: "1px solid rgba(155,109,255,0.15)",
      boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
    }}
  >
    <p
      className="text-[0.92rem] leading-[1.7] mb-5"
      style={{ color: "var(--white)" }}
    >
      "{item.quote}"
    </p>
    <div className="flex items-center gap-3">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-[0.78rem] font-semibold flex-shrink-0"
        style={{
          background: "rgba(155,109,255,0.15)",
          border: "1px solid rgba(155,109,255,0.3)",
          color: "var(--gold)",
        }}
      >
        {item.initials}
      </div>
      <div>
        <div className="text-[0.85rem] font-semibold" style={{ color: "var(--white)" }}>
          {item.name}
        </div>
        <div className="text-[0.75rem]" style={{ color: "var(--silver)" }}>
          {item.role}
        </div>
      </div>
    </div>
  </div>
);

const Column = ({
  items,
  duration,
  direction = "up",
}: {
  items: Item[];
  duration: number;
  direction?: "up" | "down";
}) => {
  const distance = direction === "up" ? "-50%" : "50%";
  return (
    <div className="relative overflow-hidden h-full">
      <motion.div
        animate={{ y: [direction === "up" ? "0%" : distance, direction === "up" ? distance : "0%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        className="flex flex-col"
      >
        {[0, 1].map((dup) => (
          <div key={dup} aria-hidden={dup === 1 ? "true" : undefined}>
            {items.map((item, i) => (
              <Card key={`${dup}-${item.initials}-${i}`} item={item} />
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      style={{ padding: "6rem 4rem", position: "relative" }}
      className="overflow-hidden"
    >
      <div className="text-center max-w-[640px] mx-auto mb-14">
        <div className="section-label">Dicono di noi</div>
        <h2 className="section-title">
          Clienti reali.<br />Risultati reali.
        </h2>
        <p className="section-sub mx-auto">
          Aziende e professionisti siciliani che hanno scelto di portare il loro lavoro online con noi.
        </p>
      </div>

      <div
        className="relative max-w-[1080px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 h-[560px]"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        <Column items={COL_1} duration={32} direction="up" />
        <div className="hidden md:block">
          <Column items={COL_2} duration={40} direction="down" />
        </div>
        <div className="hidden md:block">
          <Column items={COL_3} duration={36} direction="up" />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
