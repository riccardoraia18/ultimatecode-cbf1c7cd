import { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => {
    setMobileOpen(false);
    document.body.style.overflow = "";
  };

  const toggleMenu = () => {
    setMobileOpen((prev) => {
      document.body.style.overflow = !prev ? "hidden" : "";
      return !prev;
    });
  };

  return (
    <>
      <nav
        className="fixed top-0 w-full z-[100] flex justify-between items-center glass-nav"
        style={{
          padding: scrolled ? "1rem 4rem" : "1.5rem 4rem",
          animation: "fadeDown 0.8s ease both",
          transition: "padding 0.3s",
        }}
      >
        <div className="font-['Playfair_Display',serif] text-2xl font-bold tracking-[0.02em]" style={{ color: "var(--white)" }}>
          Ultimate<span style={{ color: "var(--gold)" }}>Code</span>
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-10 list-none">
          <li>
            <a
              href="#about"
              className="text-[0.85rem] font-medium tracking-[0.12em] uppercase no-underline transition-colors duration-300 hover:text-[var(--gold)]"
              style={{ color: "var(--silver)" }}
            >
              Chi siamo
            </a>
          </li>
          <li>
            <a
              href="#portfolio"
              className="text-[0.85rem] font-medium tracking-[0.12em] uppercase no-underline transition-colors duration-300 hover:text-[var(--gold)]"
              style={{ color: "var(--silver)" }}
            >
              Portfolio
            </a>
          </li>
          <li>
            <a href="#cta" className="nav-cta">
              Contattaci
            </a>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className={`md:hidden flex flex-col gap-[5px] cursor-pointer p-1 bg-transparent border-none z-[200] ${mobileOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span
            className="block w-6 h-[2px] rounded-sm transition-transform duration-300"
            style={{
              background: "var(--white)",
              transform: mobileOpen ? "translateY(7px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="block w-6 h-[2px] rounded-sm transition-opacity duration-300"
            style={{
              background: "var(--white)",
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-6 h-[2px] rounded-sm transition-transform duration-300"
            style={{
              background: "var(--white)",
              transform: mobileOpen ? "translateY(-7px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className="md:hidden fixed inset-0 z-[150] flex flex-col items-center justify-center gap-10"
        style={{
          background: "var(--navy)",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "all" : "none",
          transition: "opacity 0.3s",
          display: "flex",
        }}
      >
        <a
          href="#about"
          onClick={closeMenu}
          className="font-['Playfair_Display',serif] text-4xl font-bold no-underline transition-colors duration-200 hover:text-[var(--gold)]"
          style={{ color: "var(--white)" }}
        >
          Chi siamo
        </a>
        <a
          href="#portfolio"
          onClick={closeMenu}
          className="font-['Playfair_Display',serif] text-4xl font-bold no-underline transition-colors duration-200 hover:text-[var(--gold)]"
          style={{ color: "var(--white)" }}
        >
          Portfolio
        </a>
        <a
          href="#cta"
          onClick={closeMenu}
          className="mt-4 px-10 py-4 border font-['DM_Sans',sans-serif] text-[0.85rem] font-semibold tracking-[0.12em] uppercase no-underline"
          style={{ borderColor: "var(--gold)", color: "var(--gold)" }}
        >
          Contattaci
        </a>
      </div>
    </>
  );
};

export default Navbar;
