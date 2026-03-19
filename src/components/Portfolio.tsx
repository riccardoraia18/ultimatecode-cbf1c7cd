const projects = [
  {
    title: "Luxe Fashion",
    category: "E-Commerce",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop",
  },
  {
    title: "FinTech Dashboard",
    category: "Web App",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  },
  {
    title: "GreenLife App",
    category: "Mobile App",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
  },
  {
    title: "Artisan Café",
    category: "Branding",
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop",
  },
  {
    title: "TravelMate",
    category: "UI/UX Design",
    img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop",
  },
  {
    title: "SmartHome Hub",
    category: "IoT Platform",
    img: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&h=400&fit=crop",
  },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 border-t border-border/40">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-primary font-body font-semibold text-sm tracking-widest uppercase mb-3">
            Portfolio
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold">
            I nostri <span className="gradient-text">lavori</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div key={i} className="portfolio-card aspect-[3/2]">
              <img src={p.img} alt={p.title} loading="lazy" />
              <div className="portfolio-overlay">
                <span className="text-primary font-body text-xs font-semibold tracking-widest uppercase mb-1">
                  {p.category}
                </span>
                <h3 className="font-heading text-xl font-bold text-heading">{p.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
