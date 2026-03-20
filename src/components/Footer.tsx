const Footer = () => {
  return (
    <footer
      className="flex flex-col md:flex-row justify-between items-center gap-4"
      style={{
        padding: "3rem 4rem",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="font-['Playfair_Display',serif] text-xl font-bold" style={{ color: "var(--white)" }}>
        Ultimate<span style={{ color: "var(--gold)" }}>Code</span>
      </div>
      <div className="text-[0.78rem]" style={{ color: "var(--silver)" }}>
        © {new Date().getFullYear()} UltimateCode. Tutti i diritti riservati.
      </div>
      <div className="flex gap-8">
        <a
          href="#"
          className="text-[0.78rem] no-underline tracking-[0.05em] transition-colors duration-200 hover:text-[var(--gold)]"
          style={{ color: "var(--silver)" }}
        >
          Privacy Policy
        </a>
        <a
          href="#"
          className="text-[0.78rem] no-underline tracking-[0.05em] transition-colors duration-200 hover:text-[var(--gold)]"
          style={{ color: "var(--silver)" }}
        >
          Cookie
        </a>
        <a
          href="#"
          className="text-[0.78rem] no-underline tracking-[0.05em] transition-colors duration-200 hover:text-[var(--gold)]"
          style={{ color: "var(--silver)" }}
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
};

export default Footer;
