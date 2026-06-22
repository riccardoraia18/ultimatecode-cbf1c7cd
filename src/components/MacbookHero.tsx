import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const useIsMobile = () => {
  const [m, setM] = useState(false);
  useEffect(() => {
    const check = () => setM(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return m;
};

const DashboardUI = () => (
  <div
    className="w-full h-full flex text-[6px] sm:text-[8px] overflow-hidden"
    style={{
      background: "linear-gradient(135deg, #0a0f2c 0%, #131a3d 100%)",
      color: "#e6e9ff",
      fontFamily: "ui-sans-serif, system-ui",
    }}
  >
    {/* Sidebar */}
    <div className="flex flex-col gap-2 p-2" style={{ width: "18%", background: "rgba(255,255,255,0.04)", borderRight: "1px solid rgba(124,58,237,0.25)" }}>
      <div className="font-bold mb-1" style={{ color: "#7c3aed" }}>◆ ANALYTICS</div>
      {["Dashboard", "Traffic", "Revenue", "Users", "Reports", "Settings"].map((l, i) => (
        <div key={l} className="px-1.5 py-1 rounded" style={{ background: i === 0 ? "rgba(124,58,237,0.25)" : "transparent", color: i === 0 ? "#a78bfa" : "#9aa3c7" }}>
          • {l}
        </div>
      ))}
    </div>
    {/* Main */}
    <div className="flex-1 p-2 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="font-semibold" style={{ color: "#a78bfa" }}>Overview · Q4 2026</div>
        <div className="flex gap-1">
          <span style={{ background: "rgba(34,211,238,0.2)", color: "#22d3ee" }} className="px-1.5 py-0.5 rounded">LIVE</span>
        </div>
      </div>
      {/* KPI cards */}
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { l: "Revenue", v: "€128k", p: "+24%", c: "#22d3ee" },
          { l: "Conversions", v: "3.847", p: "+12%", c: "#7c3aed" },
          { l: "Sessions", v: "92k", p: "+8%", c: "#a78bfa" },
        ].map((k) => (
          <div key={k.l} className="p-1.5 rounded" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(124,58,237,0.2)" }}>
            <div style={{ color: "#9aa3c7" }}>{k.l}</div>
            <div className="font-bold" style={{ fontSize: "1.4em", color: "#fff" }}>{k.v}</div>
            <div style={{ color: k.c }}>{k.p}</div>
          </div>
        ))}
      </div>
      {/* Charts */}
      <div className="grid grid-cols-2 gap-1.5 flex-1">
        <div className="p-1.5 rounded flex flex-col" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(124,58,237,0.2)" }}>
          <div style={{ color: "#9aa3c7" }}>Traffic</div>
          <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full flex-1">
            <defs>
              <linearGradient id="lg" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,40 L15,30 L30,35 L45,20 L60,25 L75,10 L100,15 L100,50 L0,50 Z" fill="url(#lg)" />
            <path d="M0,40 L15,30 L30,35 L45,20 L60,25 L75,10 L100,15" stroke="#22d3ee" strokeWidth="1" fill="none" />
          </svg>
        </div>
        <div className="p-1.5 rounded flex flex-col" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(124,58,237,0.2)" }}>
          <div style={{ color: "#9aa3c7" }}>Conversions</div>
          <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full flex-1">
            {[10, 25, 18, 35, 28, 42, 38, 48].map((h, i) => (
              <rect key={i} x={i * 12 + 2} y={50 - h} width="8" height={h} fill="#7c3aed" opacity={0.7 + i * 0.03} rx="1" />
            ))}
          </svg>
        </div>
      </div>
    </div>
  </div>
);

const Macbook = () => {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const mobileRotateY = useTransform(scrollYProgress, [0, 0.5], [-30, 20]);

  return (
    <div ref={ref} className="relative w-full flex justify-center items-center" style={{ perspective: "1400px" }}>
      {/* Purple glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "120%",
          height: "120%",
          background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, rgba(124,58,237,0) 60%)",
          filter: "blur(40px)",
        }}
      />
      <motion.div
        initial={
          isMobile
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 300, rotateY: 45, rotateX: 15 }
        }
        animate={
          isMobile
            ? { y: [0, -8, 0, 8, 0] }
            : { opacity: 1, y: [0, -8, 0, 8, 0], rotateY: 20, rotateX: 5 }
        }
        transition={
          isMobile
            ? { y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }
            : {
                opacity: { duration: 1.2, ease: "easeOut" },
                rotateY: { duration: 2, ease: "easeOut" },
                rotateX: { duration: 2, ease: "easeOut" },
                y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 },
              }
        }
        style={{
          rotateY: isMobile ? mobileRotateY : undefined,
          transformStyle: "preserve-3d",
          width: "100%",
          maxWidth: "560px",
        }}
      >
        {/* Screen */}
        <div
          style={{
            background: "#1a1a1a",
            borderRadius: "14px 14px 4px 4px",
            padding: "14px 14px 22px",
            boxShadow: "0 30px 60px rgba(0,0,0,0.6), inset 0 0 0 1px #3a3a3a",
            transformOrigin: "bottom",
          }}
        >
          <div
            style={{
              background: "#000",
              borderRadius: "6px",
              overflow: "hidden",
              aspectRatio: "16/10",
              border: "1px solid #2d2d2d",
              position: "relative",
            }}
          >
            <DashboardUI />
            {/* camera notch */}
            <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "4px", height: "4px", background: "#222", borderRadius: "50%" }} />
          </div>
          {/* Apple logo area / bottom chin */}
          <div className="text-center mt-1.5" style={{ fontSize: "7px", color: "#555", letterSpacing: "0.2em" }}>MacBook Pro</div>
        </div>
        {/* Hinge */}
        <div
          style={{
            height: "6px",
            background: "linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)",
            margin: "0 -6px",
            borderRadius: "0 0 4px 4px",
          }}
        />
        {/* Base */}
        <div
          style={{
            background: "linear-gradient(180deg, #2d2d2d 0%, #1f1f1f 100%)",
            height: "14px",
            margin: "0 -14px",
            borderRadius: "0 0 18px 18px",
            position: "relative",
            boxShadow: "0 20px 30px rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "60px",
              height: "4px",
              background: "#0f0f0f",
              borderRadius: "2px",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Macbook;
