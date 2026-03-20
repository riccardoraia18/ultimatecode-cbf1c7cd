const services = [
  { icon: "🌐", label: "Siti Web" },
  { icon: "📱", label: "App Mobile" },
  { icon: "🤖", label: "Automazioni AI" },
  { icon: "🛒", label: "E-Commerce" },
  { icon: "📊", label: "Dashboard" },
  { icon: "✍️", label: "Branding" },
];

const Services = () => {
  return (
    <div
      className="flex justify-center flex-wrap"
      style={{
        padding: "2rem 4rem",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        background: "var(--navy-mid)",
        gap: "5rem",
      }}
    >
      {services.map((s, i) => (
        <div key={i} className="service-pill">
          <div className="service-pill-icon">{s.icon}</div>
          {s.label}
        </div>
      ))}
    </div>
  );
};

export default Services;
