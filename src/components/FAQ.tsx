import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

const ITEMS = [
  {
    q: "Quanto costa un sito o un'app?",
    a: "Dipende da cosa ti serve. Un sito vetrina parte da 1.500€, un e-commerce da 3.500€, un'app mobile da 6.000€. Fissiamo una chiamata gratuita e ti diamo un preventivo chiaro entro 48 ore — niente sorprese.",
  },
  {
    q: "Quanto tempo serve per andare online?",
    a: "Un sito vetrina è online in 2-3 settimane. Un e-commerce o un gestionale 4-6 settimane. Un'app mobile 6-10 settimane. Ti diciamo la data al brief iniziale e la rispettiamo.",
  },
  {
    q: "Devo capire qualcosa di tecnico per lavorare con voi?",
    a: "No. Parliamo italiano, non gergo da programmatori. Ti spieghiamo solo quello che serve sapere per decidere, e ti facciamo vedere tutto man mano che lo costruiamo.",
  },
  {
    q: "Cosa succede dopo il lancio? Se si rompe qualcosa?",
    a: "Per 60 giorni dal lancio rispondiamo gratis a qualsiasi richiesta — bug, modifiche piccole, dubbi. Dopo, puoi attivare un piano di assistenza mensile o chiamarci all'occorrenza.",
  },
  {
    q: "Lavorate solo a Catania o anche fuori Sicilia?",
    a: "Lavoriamo con clienti in tutta Italia (e qualcuno all'estero). Le riunioni si fanno via video call, e il risultato è esattamente lo stesso. La sede è a Catania, ma il codice viaggia veloce.",
  },
  {
    q: "Posso modificare il sito da solo dopo?",
    a: "Sì. Ti consegniamo un pannello semplice da usare per cambiare testi, immagini, prezzi e prodotti senza chiamarci. E se preferisci che ce ne occupiamo noi, ti facciamo un piano su misura.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      style={{ padding: "6rem 4rem", position: "relative" }}
    >
      <div className="text-center max-w-[640px] mx-auto mb-14">
        <div className="section-label">Domande frequenti</div>
        <h2 className="section-title">
          Le risposte<br />ai dubbi più comuni.
        </h2>
      </div>

      <div className="max-w-[760px] mx-auto flex flex-col gap-3">
        {ITEMS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className="rounded-lg overflow-hidden transition-colors duration-300"
              style={{
                background: "var(--navy-mid)",
                border: `1px solid ${isOpen ? "rgba(155,109,255,0.4)" : "rgba(155,109,255,0.12)"}`,
              }}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors"
                aria-expanded={isOpen}
              >
                <span
                  className="font-semibold text-[0.98rem]"
                  style={{ color: "var(--white)" }}
                >
                  {item.q}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex-shrink-0"
                >
                  <Plus size={20} color="var(--gold)" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div
                      className="px-6 pb-5 text-[0.92rem] leading-[1.75]"
                      style={{ color: "var(--silver)" }}
                    >
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
