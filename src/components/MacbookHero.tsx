import { useEffect, useRef } from "react";

// Realistic MacBook Pro (Space Black) — Three.js from CDN
const THREE_CDN = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";

const loadThree = (): Promise<any> => {
  if ((window as any).THREE) return Promise.resolve((window as any).THREE);
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${THREE_CDN}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve((window as any).THREE));
      existing.addEventListener("error", reject);
      return;
    }
    const s = document.createElement("script");
    s.src = THREE_CDN;
    s.async = true;
    s.onload = () => resolve((window as any).THREE);
    s.onerror = reject;
    document.head.appendChild(s);
  });
};

// Rounded rectangle shape helper
const roundedRectShape = (THREE: any, w: number, h: number, r: number) => {
  const s = new THREE.Shape();
  const x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
};

const MacbookHero = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: any, scene: any, camera: any, macbook: any;
    let rafId = 0;
    let running = false;
    let disposed = false;
    const isMobile = window.innerWidth < 768;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    const onMouse = (e: MouseEvent) => {
      if (isMobile) return;
      const r = mount.getBoundingClientRect();
      mouse.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      mouse.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };

    loadThree().then((THREE: any) => {
      if (disposed) return;
      const width = mount.clientWidth;
      const height = mount.clientHeight || 480;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(28, width / height, 0.1, 100);
      camera.position.set(0, 1.4, 8.5);
      camera.lookAt(0, 0.4, 0);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      mount.appendChild(renderer.domElement);
      renderer.domElement.style.pointerEvents = "none";
      renderer.domElement.style.display = "block";

      // Lights — studio setup
      scene.add(new THREE.AmbientLight(0xffffff, 0.35));
      const key = new THREE.DirectionalLight(0xffffff, 1.1);
      key.position.set(4, 6, 5);
      scene.add(key);
      const rim = new THREE.PointLight(0x9b6dff, 2.2, 14);
      rim.position.set(-4, 3, 1);
      scene.add(rim);
      const fill = new THREE.PointLight(0x22d3ee, 0.9, 12);
      fill.position.set(4, -1, 3);
      scene.add(fill);
      const top = new THREE.DirectionalLight(0xffffff, 0.5);
      top.position.set(0, 8, 2);
      scene.add(top);

      // === MATERIALS — Space Black ===
      const spaceBlack = new THREE.MeshPhysicalMaterial({
        color: 0x1c1c1e,
        metalness: 0.95,
        roughness: 0.32,
        clearcoat: 0.6,
        clearcoatRoughness: 0.4,
        reflectivity: 0.6,
      });
      const spaceBlackMatte = new THREE.MeshPhysicalMaterial({
        color: 0x151517,
        metalness: 0.7,
        roughness: 0.55,
      });
      const bezelMat = new THREE.MeshStandardMaterial({
        color: 0x000000,
        metalness: 0.1,
        roughness: 0.9,
      });
      const keyMat = new THREE.MeshStandardMaterial({
        color: 0x0a0a0c,
        metalness: 0.2,
        roughness: 0.85,
      });

      // === DIMENSIONS (16" MBP proportions) ===
      const BODY_W = 4.4;
      const BODY_D = 3.0; // depth
      const BODY_H = 0.13; // thinness
      const CORNER_R = 0.18;

      macbook = new THREE.Group();

      // ---- BASE (keyboard deck) — extruded rounded rect ----
      const baseShape = roundedRectShape(THREE, BODY_W, BODY_D, CORNER_R);
      const baseGeo = new THREE.ExtrudeGeometry(baseShape, {
        depth: BODY_H,
        bevelEnabled: true,
        bevelThickness: 0.025,
        bevelSize: 0.025,
        bevelSegments: 4,
        curveSegments: 24,
      });
      baseGeo.rotateX(-Math.PI / 2);
      const base = new THREE.Mesh(baseGeo, spaceBlack);
      base.position.y = -BODY_H;
      macbook.add(base);

      // ---- Keyboard well (recessed dark area) ----
      const wellShape = roundedRectShape(THREE, BODY_W * 0.82, BODY_D * 0.5, 0.05);
      const wellGeo = new THREE.ShapeGeometry(wellShape);
      wellGeo.rotateX(-Math.PI / 2);
      const well = new THREE.Mesh(wellGeo, spaceBlackMatte);
      well.position.set(0, 0.001, -BODY_D * 0.18);
      macbook.add(well);

      // ---- Individual keys grid ----
      const keyRows = 5;
      const keyCols = 14;
      const keyAreaW = BODY_W * 0.78;
      const keyAreaD = BODY_D * 0.42;
      const keyW = keyAreaW / keyCols - 0.025;
      const keyD = keyAreaD / keyRows - 0.025;
      const keyGeo = new THREE.BoxGeometry(keyW, 0.025, keyD);
      for (let r = 0; r < keyRows; r++) {
        for (let c = 0; c < keyCols; c++) {
          const k = new THREE.Mesh(keyGeo, keyMat);
          k.position.set(
            -keyAreaW / 2 + keyW / 2 + 0.0125 + c * (keyAreaW / keyCols),
            0.014,
            -BODY_D * 0.18 - keyAreaD / 2 + keyD / 2 + 0.0125 + r * (keyAreaD / keyRows),
          );
          macbook.add(k);
        }
      }

      // ---- Trackpad ----
      const tpShape = roundedRectShape(THREE, BODY_W * 0.38, BODY_D * 0.28, 0.04);
      const tpGeo = new THREE.ShapeGeometry(tpShape);
      tpGeo.rotateX(-Math.PI / 2);
      const tp = new THREE.Mesh(
        tpGeo,
        new THREE.MeshPhysicalMaterial({ color: 0x0e0e10, metalness: 0.3, roughness: 0.45, clearcoat: 0.5 }),
      );
      tp.position.set(0, 0.006, BODY_D * 0.28);
      macbook.add(tp);

      // ---- SCREEN LID (group, pivots from back edge) ----
      const lid = new THREE.Group();

      const lidShape = roundedRectShape(THREE, BODY_W, BODY_D, CORNER_R);
      const lidGeo = new THREE.ExtrudeGeometry(lidShape, {
        depth: 0.08,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelSegments: 3,
        curveSegments: 24,
      });
      // orient as vertical screen: shape is in XY, extruded along Z
      const lidBack = new THREE.Mesh(lidGeo, spaceBlack);
      // shift so it stands up; pivot at bottom
      lidBack.position.set(0, BODY_D / 2, -0.04);
      lid.add(lidBack);

      // Apple logo on back lid — built from canvas texture for crisp shape
      const lc = document.createElement("canvas");
      lc.width = 256; lc.height = 256;
      const lctx = lc.getContext("2d")!;
      lctx.clearRect(0, 0, 256, 256);
      lctx.fillStyle = "#0a0a0c";
      // Body of apple
      lctx.beginPath();
      lctx.ellipse(128, 148, 70, 78, 0, 0, Math.PI * 2);
      lctx.fill();
      // Notch (bite) on right
      lctx.globalCompositeOperation = "destination-out";
      lctx.beginPath();
      lctx.ellipse(208, 138, 28, 32, 0, 0, Math.PI * 2);
      lctx.fill();
      // Top notch above (between leaf and body)
      lctx.beginPath();
      lctx.ellipse(140, 70, 22, 14, -0.6, 0, Math.PI * 2);
      lctx.fill();
      lctx.globalCompositeOperation = "source-over";
      // Leaf
      lctx.fillStyle = "#0a0a0c";
      lctx.beginPath();
      lctx.ellipse(150, 58, 16, 26, -0.7, 0, Math.PI * 2);
      lctx.fill();
      const logoTex = new THREE.CanvasTexture(lc);
      logoTex.anisotropy = 8;
      const logoGeo = new THREE.PlaneGeometry(0.7, 0.7);
      const logoMat = new THREE.MeshStandardMaterial({
        map: logoTex,
        transparent: true,
        color: 0xffffff,
        metalness: 0.9,
        roughness: 0.25,
        emissive: 0xffffff,
        emissiveMap: logoTex,
        emissiveIntensity: 0.55,
      });
      const logo = new THREE.Mesh(logoGeo, logoMat);
      logo.position.set(0, BODY_D / 2, -0.05);
      logo.rotation.y = Math.PI;
      lid.add(logo);

      // Front bezel (black frame around screen)
      const frontBezel = new THREE.Mesh(
        new THREE.PlaneGeometry(BODY_W - 0.18, BODY_D - 0.18),
        bezelMat,
      );
      frontBezel.position.set(0, BODY_D / 2, 0.041);
      lid.add(frontBezel);

      // Notch (small rect at top center)
      const notch = new THREE.Mesh(
        new THREE.PlaneGeometry(0.55, 0.09),
        new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 1 }),
      );
      notch.position.set(0, BODY_D - 0.12, 0.043);
      lid.add(notch);

      // Camera dot in notch
      const cam = new THREE.Mesh(
        new THREE.CircleGeometry(0.018, 16),
        new THREE.MeshStandardMaterial({ color: 0x151518, metalness: 0.5, roughness: 0.4 }),
      );
      cam.position.set(0, BODY_D - 0.12, 0.044);
      lid.add(cam);

      // ---- SCREEN CONTENT (canvas texture: macOS-style wallpaper) ----
      const sc = document.createElement("canvas");
      sc.width = 1280;
      sc.height = 800;
      const ctx = sc.getContext("2d")!;
      const drawScreen = (t: number) => {
        const W = sc.width, H = sc.height;
        // Dashboard background
        ctx.fillStyle = "#0b1024";
        ctx.fillRect(0, 0, W, H);

        // Sidebar
        const sbW = 200;
        ctx.fillStyle = "#0a0f1f";
        ctx.fillRect(0, 0, sbW, H);
        ctx.fillStyle = "#9b6dff";
        ctx.beginPath(); ctx.arc(28, 36, 12, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.font = "700 16px system-ui, -apple-system, sans-serif";
        ctx.fillText("UltimateCode", 50, 42);
        const navItems = ["Dashboard", "Analytics", "Progetti", "Clienti", "Fatture", "Automazioni", "Impostazioni"];
        navItems.forEach((n, i) => {
          const y = 90 + i * 44;
          if (i === 0) {
            ctx.fillStyle = "rgba(155,109,255,0.18)";
            ctx.fillRect(10, y - 18, sbW - 20, 32);
          }
          ctx.fillStyle = i === 0 ? "#fff" : "rgba(255,255,255,0.55)";
          ctx.font = "500 13px system-ui";
          ctx.fillRect(22, y - 6, 10, 10);
          ctx.fillStyle = i === 0 ? "#fff" : "rgba(255,255,255,0.65)";
          ctx.fillText(n, 44, y + 4);
        });

        // Top bar
        ctx.fillStyle = "#fff";
        ctx.font = "700 22px system-ui";
        ctx.fillText("Enterprise Analytics", sbW + 24, 44);
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.font = "400 12px system-ui";
        ctx.fillText("Panoramica · Ultimi 30 giorni", sbW + 24, 64);

        // KPI cards
        const kpis = [
          { label: "Ricavi", val: "€47.2K", delta: "+12.4%", c: "#fb7185" },
          { label: "Clienti", val: "1.284", delta: "+5.6%", c: "#9b6dff" },
          { label: "Conversioni", val: "8.9%", delta: "+2.1%", c: "#22d3ee" },
          { label: "Tasks AI", val: "342", delta: "+24%", c: "#34d399" },
        ];
        const cardW = (W - sbW - 24 - 24 - 18 * 3) / 4;
        kpis.forEach((k, i) => {
          const x = sbW + 24 + i * (cardW + 18);
          const y = 86;
          ctx.fillStyle = "#141a33";
          ctx.beginPath();
          (ctx as any).roundRect?.(x, y, cardW, 100, 12);
          ctx.fill();
          ctx.fillStyle = "rgba(255,255,255,0.5)";
          ctx.font = "500 11px system-ui";
          ctx.fillText(k.label, x + 14, y + 22);
          ctx.fillStyle = "#fff";
          ctx.font = "700 24px system-ui";
          ctx.fillText(k.val, x + 14, y + 54);
          ctx.fillStyle = k.c;
          ctx.font = "600 11px system-ui";
          ctx.fillText(k.delta, x + 14, y + 78);
          // mini sparkline
          ctx.strokeStyle = k.c;
          ctx.lineWidth = 2;
          ctx.beginPath();
          for (let p = 0; p < 12; p++) {
            const px = x + cardW - 90 + p * 7;
            const py = y + 60 - 8 - Math.sin(p * 0.6 + i + t * 0.001) * 10 - p * 1.2;
            p === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
          }
          ctx.stroke();
        });

        // Bar chart card
        const bx = sbW + 24, by = 210, bw = (W - sbW - 24 - 24 - 18) * 0.62, bh = 270;
        ctx.fillStyle = "#141a33";
        ctx.beginPath(); (ctx as any).roundRect?.(bx, by, bw, bh, 12); ctx.fill();
        ctx.fillStyle = "#fff"; ctx.font = "600 14px system-ui";
        ctx.fillText("Performance per Categoria", bx + 16, by + 26);
        const cats = 8;
        const barW = (bw - 60) / cats;
        for (let i = 0; i < cats; i++) {
          const h1 = 60 + Math.abs(Math.sin(i * 0.9 + t * 0.0008)) * 130;
          const h2 = 40 + Math.abs(Math.cos(i * 0.7 + t * 0.0006)) * 100;
          const x0 = bx + 30 + i * barW;
          ctx.fillStyle = "#9b6dff";
          ctx.fillRect(x0, by + bh - 30 - h1, barW * 0.4, h1);
          ctx.fillStyle = "#22d3ee";
          ctx.fillRect(x0 + barW * 0.45, by + bh - 30 - h2, barW * 0.4, h2);
        }

        // Donut chart card
        const dx2 = bx + bw + 18, dy2 = by, dw = W - dx2 - 24, dh = bh;
        ctx.fillStyle = "#141a33";
        ctx.beginPath(); (ctx as any).roundRect?.(dx2, dy2, dw, dh, 12); ctx.fill();
        ctx.fillStyle = "#fff"; ctx.font = "600 14px system-ui";
        ctx.fillText("Distribuzione Servizi", dx2 + 16, dy2 + 26);
        const ccx = dx2 + dw / 2, ccy = dy2 + dh / 2 + 10;
        const segs = [{ v: 0.42, c: "#9b6dff" }, { v: 0.28, c: "#22d3ee" }, { v: 0.18, c: "#fb7185" }, { v: 0.12, c: "#fbbf24" }];
        let a0 = -Math.PI / 2;
        segs.forEach(s => {
          ctx.beginPath();
          ctx.arc(ccx, ccy, 70, a0, a0 + s.v * Math.PI * 2);
          ctx.arc(ccx, ccy, 45, a0 + s.v * Math.PI * 2, a0, true);
          ctx.closePath();
          ctx.fillStyle = s.c;
          ctx.fill();
          a0 += s.v * Math.PI * 2;
        });

        // Line chart at bottom
        const lx = sbW + 24, ly = by + bh + 18, lw = W - sbW - 48, lh = H - ly - 24;
        ctx.fillStyle = "#141a33";
        ctx.beginPath(); (ctx as any).roundRect?.(lx, ly, lw, lh, 12); ctx.fill();
        ctx.fillStyle = "#fff"; ctx.font = "600 14px system-ui";
        ctx.fillText("Andamento Ricavi", lx + 16, ly + 26);
        ctx.strokeStyle = "#9b6dff"; ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let i = 0; i <= 60; i++) {
          const px = lx + 24 + i * ((lw - 48) / 60);
          const py = ly + lh - 30 - (Math.sin(i * 0.18 + t * 0.0009) * 22 + i * 1.2 + 20);
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.stroke();
        ctx.lineTo(lx + lw - 24, ly + lh - 20);
        ctx.lineTo(lx + 24, ly + lh - 20);
        ctx.closePath();
        ctx.fillStyle = "rgba(155,109,255,0.18)";
        ctx.fill();
      };
      drawScreen(0);
      const tex = new THREE.CanvasTexture(sc);
      tex.anisotropy = 8;
      const screen = new THREE.Mesh(
        new THREE.PlaneGeometry(BODY_W - 0.22, BODY_D - 0.22),
        new THREE.MeshBasicMaterial({ map: tex }),
      );
      screen.position.set(0, BODY_D / 2, 0.042);
      lid.add(screen);

      // ---- Hinge cylinder ----
      const hinge = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, BODY_W * 0.92, 16),
        spaceBlackMatte,
      );
      hinge.rotation.z = Math.PI / 2;
      hinge.position.set(0, 0.03, -BODY_D / 2 + 0.05);
      macbook.add(hinge);

      // Position lid: ~100° open from keyboard (10° tilted back from vertical)
      lid.position.set(0, 0.04, -BODY_D / 2);
      lid.rotation.x = 0.175;
      macbook.add(lid);

      // overall pose
      macbook.rotation.x = -0.12;
      macbook.position.y = -0.2;
      scene.add(macbook);

      // Resize
      const onResize = () => {
        if (!mount || !renderer || !camera) return;
        const w = mount.clientWidth;
        const h = mount.clientHeight || 480;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", onResize);
      if (!isMobile) window.addEventListener("mousemove", onMouse);

      const io = new IntersectionObserver(
        ([e]) => {
          running = e.isIntersecting;
          if (running) animate();
        },
        { threshold: 0.05 },
      );
      io.observe(mount);
      running = true;

      const startT = performance.now();
      const animate = () => {
        if (!running || disposed) return;
        const t = performance.now() - startT;
        macbook.rotation.y += 0.0035;
        macbook.position.y = -0.2 + Math.sin(t * 0.0014) * 0.07;
        if (!isMobile) {
          mouse.x += (mouse.tx - mouse.x) * 0.05;
          mouse.y += (mouse.ty - mouse.y) * 0.05;
          macbook.rotation.y += mouse.x * 0.002;
          macbook.rotation.x = -0.12 + mouse.y * 0.04;
        }
        drawScreen(t);
        tex.needsUpdate = true;
        renderer.render(scene, camera);
        rafId = requestAnimationFrame(animate);
      };
      animate();

      (mount as any).__cleanup = () => {
        io.disconnect();
        window.removeEventListener("resize", onResize);
        window.removeEventListener("mousemove", onMouse);
      };
    }).catch((err) => console.error("Three.js load failed", err));

    return () => {
      disposed = true;
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      if ((mount as any).__cleanup) (mount as any).__cleanup();
      if (renderer) {
        renderer.dispose?.();
        if (renderer.domElement && renderer.domElement.parentNode === mount) {
          mount.removeChild(renderer.domElement);
        }
      }
      if (scene) {
        scene.traverse((obj: any) => {
          if (obj.geometry) obj.geometry.dispose?.();
          if (obj.material) {
            if (Array.isArray(obj.material)) obj.material.forEach((m: any) => m.dispose?.());
            else obj.material.dispose?.();
          }
        });
      }
    };
  }, []);

  return (
    <div className="relative w-full flex justify-center items-center" style={{ minHeight: 380 }}>
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          width: "110%",
          height: "110%",
          background: "radial-gradient(circle, rgba(155,109,255,0.18) 0%, rgba(155,109,255,0) 60%)",
          filter: "blur(40px)",
        }}
      />
      <div
        ref={mountRef}
        className="relative w-full"
        style={{ height: "clamp(380px, 56vh, 600px)", touchAction: "pan-y" }}
      />
    </div>
  );
};

export default MacbookHero;
