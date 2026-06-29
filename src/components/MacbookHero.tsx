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

      // Apple logo on back (etched, subtle glow)
      const logoGeo = new THREE.CircleGeometry(0.22, 48);
      const logoMat = new THREE.MeshStandardMaterial({
        color: 0x2a2a2c,
        metalness: 0.8,
        roughness: 0.3,
        emissive: 0x9b6dff,
        emissiveIntensity: 0.18,
      });
      const logo = new THREE.Mesh(logoGeo, logoMat);
      logo.position.set(0, BODY_D / 2, -0.045);
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
        // base dark
        ctx.fillStyle = "#08070d";
        ctx.fillRect(0, 0, sc.width, sc.height);

        // flowing "M3"-style swooping ribbons
        const cx = sc.width / 2 + Math.sin(t * 0.0004) * 60;
        const cy = sc.height / 2 + Math.cos(t * 0.0005) * 30;

        const grad = ctx.createRadialGradient(cx, cy, 40, cx, cy, 700);
        grad.addColorStop(0, "rgba(155,109,255,0.85)");
        grad.addColorStop(0.35, "rgba(80,40,160,0.45)");
        grad.addColorStop(0.7, "rgba(20,10,50,0.2)");
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, sc.width, sc.height);

        // sweeping curved ribbon (mimic Apple M3 wallpaper)
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(t * 0.0002);
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          const radius = 180 + i * 80;
          ctx.arc(0, 0, radius, 0.2, Math.PI - 0.2);
          ctx.lineWidth = 30 - i * 4;
          ctx.strokeStyle = `rgba(${180 - i * 20},${130 + i * 10},255,${0.18 - i * 0.025})`;
          ctx.stroke();
        }
        ctx.restore();

        // menu bar
        ctx.fillStyle = "rgba(255,255,255,0.06)";
        ctx.fillRect(0, 0, sc.width, 28);
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.font = "600 14px system-ui, -apple-system, sans-serif";
        ctx.textAlign = "left";
        ctx.fillText("", 16, 20);
        ctx.fillText("UltimateCode", 36, 19);

        // dock at bottom
        const dockW = 560, dockH = 64, dockY = sc.height - 88;
        ctx.fillStyle = "rgba(255,255,255,0.08)";
        ctx.beginPath();
        const dx = (sc.width - dockW) / 2;
        const dy = dockY;
        const dr = 18;
        ctx.moveTo(dx + dr, dy);
        ctx.lineTo(dx + dockW - dr, dy);
        ctx.quadraticCurveTo(dx + dockW, dy, dx + dockW, dy + dr);
        ctx.lineTo(dx + dockW, dy + dockH - dr);
        ctx.quadraticCurveTo(dx + dockW, dy + dockH, dx + dockW - dr, dy + dockH);
        ctx.lineTo(dx + dr, dy + dockH);
        ctx.quadraticCurveTo(dx, dy + dockH, dx, dy + dockH - dr);
        ctx.lineTo(dx, dy + dr);
        ctx.quadraticCurveTo(dx, dy, dx + dr, dy);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        ctx.stroke();

        // dock icons
        const colors = ["#9b6dff", "#22d3ee", "#f472b6", "#fbbf24", "#34d399", "#60a5fa", "#fb923c"];
        for (let i = 0; i < 7; i++) {
          ctx.fillStyle = colors[i];
          const ix = dx + 32 + i * 72;
          const iy = dy + dockH / 2;
          ctx.beginPath();
          ctx.roundRect ? ctx.roundRect(ix - 22, iy - 22, 44, 44, 10) : ctx.rect(ix - 22, iy - 22, 44, 44);
          ctx.fill();
        }
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

      // ---- Hinge cylinder (between base back edge and lid) ----
      const hinge = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, BODY_W * 0.92, 16),
        spaceBlackMatte,
      );
      hinge.rotation.z = Math.PI / 2;
      hinge.position.set(0, 0.03, -BODY_D / 2 + 0.05);
      macbook.add(hinge);

      // Position lid: pivot at hinge, open ~105°
      lid.position.set(0, 0.04, -BODY_D / 2);
      lid.rotation.x = -Math.PI / 2 + 0.28; // slight backward open
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
