import { useEffect, useRef } from "react";

// Three.js MacBook — loaded from CDN, transparent canvas, autorotate + floating + mouse parallax
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

const MacbookHero = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: any;
    let scene: any;
    let camera: any;
    let macbook: any;
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
      camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
      camera.position.set(0, 0.4, 6.5);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);
      renderer.domElement.style.pointerEvents = "none";
      renderer.domElement.style.display = "block";

      // Lights
      scene.add(new THREE.AmbientLight(0xffffff, 0.55));
      const key = new THREE.DirectionalLight(0xffffff, 0.9);
      key.position.set(3, 4, 5);
      scene.add(key);
      const rim = new THREE.PointLight(0x9b6dff, 1.6, 12);
      rim.position.set(-3, 2, 2);
      scene.add(rim);
      const fill = new THREE.PointLight(0x22d3ee, 0.8, 10);
      fill.position.set(3, -1, 2);
      scene.add(fill);

      // MacBook group
      macbook = new THREE.Group();

      const bodyMat = new THREE.MeshStandardMaterial({
        color: 0x2d2d2d,
        metalness: 0.85,
        roughness: 0.35,
      });
      const darkMat = new THREE.MeshStandardMaterial({
        color: 0x111111,
        metalness: 0.6,
        roughness: 0.4,
      });

      // Base (keyboard deck)
      const baseGeo = new THREE.BoxGeometry(4, 0.12, 2.7);
      const base = new THREE.Mesh(baseGeo, bodyMat);
      base.position.y = -0.06;
      macbook.add(base);

      // Trackpad
      const trackpad = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 0.005, 0.8),
        new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.4, roughness: 0.6 })
      );
      trackpad.position.set(0, 0.005, 0.75);
      macbook.add(trackpad);

      // Keyboard area
      const kb = new THREE.Mesh(
        new THREE.BoxGeometry(3.4, 0.005, 1.3),
        new THREE.MeshStandardMaterial({ color: 0x161616, metalness: 0.3, roughness: 0.7 })
      );
      kb.position.set(0, 0.005, -0.35);
      macbook.add(kb);

      // Screen group (lid)
      const lid = new THREE.Group();
      const lidBack = new THREE.Mesh(new THREE.BoxGeometry(4, 2.5, 0.08), bodyMat);
      lidBack.position.set(0, 1.25, 0);
      lid.add(lidBack);

      // Screen bezel (front, dark)
      const bezel = new THREE.Mesh(
        new THREE.PlaneGeometry(3.85, 2.38),
        new THREE.MeshStandardMaterial({ color: 0x000000, metalness: 0.2, roughness: 0.8 })
      );
      bezel.position.set(0, 1.25, 0.041);
      lid.add(bezel);

      // Screen content — canvas texture with brand gradient + animated grid
      const sc = document.createElement("canvas");
      sc.width = 1024;
      sc.height = 640;
      const ctx = sc.getContext("2d")!;
      const drawScreen = (t: number) => {
        const g = ctx.createLinearGradient(0, 0, sc.width, sc.height);
        g.addColorStop(0, "#0a0f2c");
        g.addColorStop(0.5, "#1a0f3d");
        g.addColorStop(1, "#0d0d1a");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, sc.width, sc.height);
        // glow
        const rg = ctx.createRadialGradient(
          sc.width / 2 + Math.sin(t * 0.0008) * 200,
          sc.height / 2 + Math.cos(t * 0.001) * 120,
          50,
          sc.width / 2,
          sc.height / 2,
          700
        );
        rg.addColorStop(0, "rgba(155,109,255,0.55)");
        rg.addColorStop(0.5, "rgba(34,211,238,0.15)");
        rg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = rg;
        ctx.fillRect(0, 0, sc.width, sc.height);
        // grid lines
        ctx.strokeStyle = "rgba(155,109,255,0.18)";
        ctx.lineWidth = 1;
        const offset = (t * 0.04) % 60;
        for (let x = -60 + offset; x < sc.width; x += 60) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, sc.height);
          ctx.stroke();
        }
        for (let y = -60 + offset; y < sc.height; y += 60) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(sc.width, y);
          ctx.stroke();
        }
        // logo text
        ctx.fillStyle = "rgba(255,255,255,0.92)";
        ctx.font = "italic 700 96px 'Playfair Display', serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("UltimateCode", sc.width / 2, sc.height / 2 - 20);
        ctx.fillStyle = "rgba(155,109,255,0.85)";
        ctx.font = "500 28px system-ui, sans-serif";
        ctx.fillText("digital · intelligent · senza compromessi", sc.width / 2, sc.height / 2 + 60);
      };
      drawScreen(0);
      const tex = new THREE.CanvasTexture(sc);
      tex.needsUpdate = true;
      const screen = new THREE.Mesh(
        new THREE.PlaneGeometry(3.6, 2.2),
        new THREE.MeshBasicMaterial({ map: tex })
      );
      screen.position.set(0, 1.25, 0.045);
      lid.add(screen);

      // Apple-ish logo on back (small accent)
      const logo = new THREE.Mesh(
        new THREE.CircleGeometry(0.18, 32),
        new THREE.MeshStandardMaterial({ color: 0x9b6dff, emissive: 0x9b6dff, emissiveIntensity: 0.5 })
      );
      logo.position.set(0, 1.4, -0.045);
      logo.rotation.y = Math.PI;
      lid.add(logo);

      // Hinge at base — lift the lid open
      lid.position.set(0, 0, -1.35);
      lid.rotation.x = -0.12; // slight backward tilt (open ~100°)
      macbook.add(lid);

      macbook.rotation.x = -0.18;
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

      // Intersection observer — pause when offscreen
      const io = new IntersectionObserver(
        ([e]) => {
          running = e.isIntersecting;
          if (running) animate();
        },
        { threshold: 0.05 }
      );
      io.observe(mount);
      running = true;

      const startT = performance.now();
      const animate = () => {
        if (!running || disposed) return;
        const t = performance.now() - startT;
        // autorotate
        macbook.rotation.y += 0.004;
        // float
        macbook.position.y = Math.sin(t * 0.0015) * 0.08;
        // parallax (desktop)
        if (!isMobile) {
          mouse.x += (mouse.tx - mouse.x) * 0.05;
          mouse.y += (mouse.ty - mouse.y) * 0.05;
          macbook.rotation.y += mouse.x * 0.002;
          macbook.rotation.x = -0.18 + mouse.y * 0.05;
        }
        // animate screen texture
        drawScreen(t);
        tex.needsUpdate = true;
        renderer.render(scene, camera);
        rafId = requestAnimationFrame(animate);
      };
      animate();

      // cleanup attach
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
      {/* purple glow backdrop */}
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
        style={{ height: "clamp(380px, 52vh, 560px)", touchAction: "pan-y" }}
      />
    </div>
  );
};

export default MacbookHero;
