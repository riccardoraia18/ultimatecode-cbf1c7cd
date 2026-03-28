const CTA = () => {
  return (
    <section
      id="cta"
      className="text-center"
      style={{
        padding: "5rem 4rem",
        background: "linear-gradient(135deg, var(--navy-light) 0%, rgba(155,109,255,0.08) 100%)",
        borderTop: "1px solid rgba(155,109,255,0.15)",
        borderBottom: "1px solid rgba(155,109,255,0.15)",
      }}
    >
      <div className="section-label">Inizia oggi</div>
      <h2 className="section-title mx-auto max-w-[600px]">
        Hai un’idea?<br />Parliamone.
      </h2>
      <p className="section-sub mx-auto mb-8">
        Non serve sapere nulla di tecnico. Raccontaci cosa vorresti fare — pensiamo noi al resto. Risposta garantita entro 24 ore.
      </p>
      <div className="flex gap-4 justify-center flex-wrap mt-8">
        <a href="mailto:ultimatecode26@gmail.com" className="btn-primary">
          ✉ ultimatecode26@gmail.com
        </a>
        <a href="tel:+393317504676" className="btn-outline">
          📞 3317504676
        </a>
      </div>
    </section>
  );
};

export default CTA;
