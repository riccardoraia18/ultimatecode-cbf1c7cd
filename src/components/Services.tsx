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
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
      style={{
        padding: "2rem 2rem",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        background: "var(--navy-mid)",
        gap: "1rem",
      }}
    >
      {services.map((s, i) => (
        <div key={i} className="service-pill flex items-center gap-3">
          <div className="service-pill-icon w-8 text-center flex-shrink-0">{s.icon}</div>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Services;
