"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Persistent full-viewport WebGL wash. Domain-warped fbm noise flowing between
 * paper / glacier / burgundy, nudged by pointer velocity and scroll. This layer
 * never unmounts (it lives in the root layout) so page transitions can ripple
 * it instead of tearing it down.
 *
 * Budget: DPR capped, paused when the tab is hidden, single static frame under
 * prefers-reduced-motion.
 */
const FRAG = /* glsl */ `
precision highp float;

uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPointer;   // 0..1, smoothed
uniform float uPointerV; // pointer speed 0..1
uniform float uScroll;   // page scroll in "screens"
uniform float uScrollV;  // signed scroll velocity, smoothed, ~-1..1

// palette (paper / glacier / burgundy / nightsky)
const vec3 PAPER   = vec3(0.968, 0.952, 0.921);
const vec3 GLACIER = vec3(0.667, 0.788, 0.851);
const vec3 BURG    = vec3(0.486, 0.169, 0.231);
const vec3 NIGHT   = vec3(0.118, 0.165, 0.227);

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 5; i++) {
    v += amp * noise(p);
    p *= 2.02;
    amp *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  vec2 p = uv;
  p.x *= uRes.x / uRes.y;

  float t = uTime * 0.045;
  float sv = uScrollV;
  float sva = abs(sv);

  // scroll drags the flow and, when fast, smears the field vertically
  vec2 flow = vec2(t, -t * 0.6 + uScroll * 0.25 - sv * 0.35);
  p.y -= sv * 0.10;
  p.y *= 1.0 - sva * 0.22;

  // domain warp — amplitude swells with scroll speed
  float warp = 1.0 + sva * 1.6;
  vec2 q = vec2(fbm(p * 1.6 + flow), fbm(p * 1.6 - flow + 3.1));
  vec2 r = vec2(
    fbm(p * 2.3 + q * 1.4 * warp + flow * 1.3 + 1.7),
    fbm(p * 2.3 + q * 1.4 * warp - flow * 0.7 + 9.2)
  );
  float n = fbm(p * 2.0 + r * 1.6 * warp);

  // fine horizontal ripple while scrolling
  n += sin(p.y * 42.0 + uTime * 3.0) * sva * 0.05;

  // pointer bloom
  vec2 pp = uPointer;
  pp.x *= uRes.x / uRes.y;
  float d = distance(p, pp);
  float bloom = smoothstep(0.55, 0.0, d) * (0.15 + uPointerV * 0.5);
  n += bloom * 0.35;

  vec3 col = PAPER;
  col = mix(col, GLACIER, smoothstep(0.35, 0.72, n) * (0.7 + sva * 0.3));
  col = mix(col, BURG, smoothstep(0.62, 0.95, n + r.x * 0.15) * (0.5 + sva * 0.25));
  col = mix(col, NIGHT, smoothstep(0.80, 1.05, n) * 0.25);

  // keep it light enough for text on top — a touch richer while scrolling
  col = mix(PAPER, col, 0.62 + sva * 0.12);

  // grain
  float g = hash(gl_FragCoord.xy + uTime) - 0.5;
  col += g * 0.02;

  gl_FragColor = vec4(col, 1.0);
}
`;

const VERT = /* glsl */ `
void main() {
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export function BackgroundCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
    } catch {
      return; // no WebGL — CSS fallback background stays visible
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    renderer.setPixelRatio(dpr);

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    const geo = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
      uRes: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0.5, 0.5) },
      uPointerV: { value: 0 },
      uScroll: { value: 0 },
      uScrollV: { value: 0 },
    };

    let lastScrollY = window.scrollY;
    let lastScrollT = performance.now();
    let scrollVelRaw = 0;
    const onScroll = () => {
      const now = performance.now();
      const dt = Math.max(now - lastScrollT, 16) / 1000;
      const dy = window.scrollY - lastScrollY;
      // px/sec normalised so a brisk flick ~= 1, clamped
      scrollVelRaw = Math.max(-1.6, Math.min(1.6, dy / dt / 2600));
      lastScrollY = window.scrollY;
      lastScrollT = now;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
    });
    scene.add(new THREE.Mesh(geo, mat));

    const target = { x: 0.5, y: 0.5, v: 0 };
    let last = { x: 0.5, y: 0.5, t: performance.now() };

    const onPointer = (e: PointerEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = 1 - e.clientY / window.innerHeight;
      const now = performance.now();
      const dt = Math.max(now - last.t, 16) / 1000;
      const speed = Math.hypot(x - last.x, y - last.y) / dt;
      target.x = x;
      target.y = y;
      target.v = Math.min(target.v + speed * 0.4, 1);
      last = { x, y, t: now };
    };

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      uniforms.uRes.value.set(w * dpr, h * dpr);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });

    let raf = 0;
    let running = true;
    const start = performance.now();

    const loop = () => {
      if (!running) return;
      const time = (performance.now() - start) / 1000;
      uniforms.uTime.value = time;
      uniforms.uPointer.value.x += (target.x - uniforms.uPointer.value.x) * 0.06;
      uniforms.uPointer.value.y += (target.y - uniforms.uPointer.value.y) * 0.06;
      target.v *= 0.94;
      uniforms.uPointerV.value += (target.v - uniforms.uPointerV.value) * 0.1;
      uniforms.uScroll.value = window.scrollY / window.innerHeight;
      // decay the raw reading, then ease the uniform toward it (settles when idle)
      scrollVelRaw *= 0.86;
      uniforms.uScrollV.value += (scrollVelRaw - uniforms.uScrollV.value) * 0.12;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };

    if (reduced) {
      // one frame, then stop
      uniforms.uTime.value = 12.0;
      renderer.render(scene, camera);
    } else {
      loop();
    }

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduced && !running) {
        running = true;
        loop();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, [reduced]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="fixed inset-0 -z-10 h-[100dvh] w-full"
      style={{ background: "var(--paper)" }}
    />
  );
}
