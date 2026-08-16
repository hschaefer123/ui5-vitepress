<script setup lang="ts">
/**
 * Animated hero backdrop - "One geometry. Two elements."
 *
 * Same geometry in both themes: engineering grid, ambient blobs (caustics /
 * ember glow), a three-layer horizon and a particle canvas that renders
 * rising bubbles in light mode and sparks in dark mode. Clicking spawns a
 * ripple (water) or a burst of sparks (fire).
 *
 * The whole thing is decorative, sits behind the page content (z-index: -1)
 * and covers the first viewport only, so it scrolls away with the hero.
 */
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useData } from "vitepress";

type Particle = {
  m: "water" | "fire";
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  t: number;
  life: number;
  decay: number;
  dying: boolean;
  burst: boolean;
  sway: number;
  freq: number;
  alpha: number;
  hue: number;
};

const { isDark } = useData();

const root = ref<HTMLElement | null>(null);
const fx = ref<HTMLCanvasElement | null>(null);

let ctx: CanvasRenderingContext2D | null = null;
let raf = 0;
let W = 0;
let H = 0;
let reduceMotion = false;

const particles: Particle[] = [];

const mode = () => (isDark.value ? "fire" : "water");
const targetCount = () => Math.round((mode() === "fire" ? 90 : 55) * (W / 1400));

function resize() {
  const el = root.value;
  const canvas = fx.value;
  if (!el || !canvas || !ctx) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  W = el.clientWidth;
  H = el.clientHeight;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width = `${W}px`;
  canvas.style.height = `${H}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function spawn(m: "water" | "fire", burst?: { x: number; y: number }): Particle {
  const p = { m, dying: false, burst: false, t: Math.random() * 1000 } as Particle;

  if (burst) {
    // shower of sparks on click (fire)
    const a = Math.random() * Math.PI * 2;
    const sp = 1 + Math.random() * 3;
    p.x = burst.x;
    p.y = burst.y;
    p.vx = Math.cos(a) * sp;
    p.vy = Math.sin(a) * sp - 1.2;
    p.r = 0.8 + Math.random() * 2;
    p.life = 1;
    p.decay = 0.02 + Math.random() * 0.02;
    p.alpha = 0.8;
    p.hue = 15 + Math.random() * 32;
    p.burst = true;
    return p;
  }

  p.x = Math.random() * W;
  p.y = H + Math.random() * H * 0.25;
  p.life = 1;
  p.decay = 0;
  p.vx = 0;

  if (m === "water") {
    p.r = 1.5 + Math.random() * 3.5;
    p.vy = -(0.15 + Math.random() * 0.45);
    p.sway = 8 + Math.random() * 22;
    p.freq = 0.003 + Math.random() * 0.004;
    p.alpha = 0.12 + Math.random() * 0.25;
  } else {
    p.r = 0.8 + Math.random() * 2.4;
    p.vy = -(0.6 + Math.random() * 1.7);
    p.sway = 4 + Math.random() * 14;
    p.freq = 0.006 + Math.random() * 0.008;
    p.alpha = 0.35 + Math.random() * 0.5;
    p.hue = 15 + Math.random() * 32;
  }
  return p;
}

/** particles fade out softly when the element changes */
function retireParticles() {
  particles.forEach((p) => (p.dying = true));
}

function step() {
  raf = requestAnimationFrame(step);
  if (!ctx) return;

  if (document.hidden) return; // no need to burn frames in a background tab

  ctx.clearRect(0, 0, W, H);
  const m = mode();
  while (particles.length < targetCount()) particles.push(spawn(m));

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.t++;

    if (p.dying) p.life -= 0.03;
    if (p.burst) {
      p.life -= p.decay;
      p.vy += 0.03;
      p.x += p.vx;
      p.y += p.vy;
    } else {
      p.y += p.vy;
      p.x += Math.sin(p.t * p.freq * 10) * p.sway * 0.01;
    }

    if (p.life <= 0 || p.y < -20) {
      particles.splice(i, 1);
      continue;
    }

    const fadeTop = Math.min(1, p.y / (H * 0.18)); // fade out towards the top
    const a = Math.max(0, p.alpha) * p.life * fadeTop;

    if (p.m === "water") {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(120,200,245,${a})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      // highlight of the bubble
      ctx.beginPath();
      ctx.arc(p.x - p.r * 0.35, p.y - p.r * 0.35, p.r * 0.25, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${a * 0.9})`;
      ctx.fill();
    } else {
      const flicker = 0.7 + 0.3 * Math.sin(p.t * 0.3 + p.x);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue},100%,60%,${a * flicker})`;
      ctx.shadowColor = "rgba(255,120,40,.8)";
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }
}

/** ripple (water) / shower of sparks (fire) */
function onPointerDown(e: PointerEvent) {
  const el = root.value;
  if (!el || reduceMotion) return;
  if ((e.target as Element | null)?.closest("a,button,input,select,textarea,[contenteditable]")) return;

  const x = e.pageX;
  const y = e.pageY;
  if (y > H) return; // click happened below the backdrop

  if (mode() === "water") {
    const r = document.createElement("div");
    r.className = "ripple";
    const size = 160 + Math.random() * 80;
    r.style.cssText = `left:${x}px;top:${y}px;width:${size}px;height:${size}px`;
    el.appendChild(r);
    setTimeout(() => r.remove(), 950);
  } else {
    for (let i = 0; i < 16; i++) particles.push(spawn("fire", { x, y }));
  }
}

onMounted(() => {
  reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  ctx = fx.value?.getContext("2d") ?? null;
  resize();
  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("pointerdown", onPointerDown);

  if (!reduceMotion) raf = requestAnimationFrame(step);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(raf);
  window.removeEventListener("resize", resize);
  window.removeEventListener("pointerdown", onPointerDown);
});

// theme switch: let the old element dissolve instead of hard-swapping
watch(isDark, retireParticles);
</script>

<template>
  <div ref="root" class="ui5-elements" aria-hidden="true">
    <!-- ambient blobs: caustics (water) / ember glow (fire) -->
    <div class="blob a" />
    <div class="blob b" />

    <!-- particle canvas: bubbles / sparks -->
    <canvas ref="fx" class="fx" />

    <!-- ember horizon at the bottom (only visible in fire) -->
    <div class="horizon" />

    <!-- same wave geometry in both themes: waterline / ember horizon -->
    <div class="waves">
      <svg v-for="n in 3" :key="n" :class="`w${n}`" viewBox="0 0 2880 140" preserveAspectRatio="none">
        <path
          :fill="`var(--ui5-el-wave-${n})`"
          d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 C1680,100 1920,20 2160,60 C2400,100 2640,20 2880,60 L2880,140 L0,140 Z"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.ui5-elements {
  /* spans the whole page (see the .Layout rule in custom.css), so the waves
  ** end up behind the footer instead of at the fold */
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
  background: linear-gradient(180deg, var(--ui5-el-sky), transparent 70%);
  transition: background 1s ease;
}

/* fine engineering grid - precision behind the element */
.ui5-elements::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(0deg, var(--ui5-el-grid) 0 1px, transparent 1px 64px),
    repeating-linear-gradient(90deg, var(--ui5-el-grid) 0 1px, transparent 1px 64px);
  mask-image: radial-gradient(120% 90% at 50% 40%, #000 30%, transparent 75%);
  -webkit-mask-image: radial-gradient(120% 90% at 50% 40%, #000 30%, transparent 75%);
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  transition: background 1s ease;
}

.blob.a {
  width: 55vw;
  height: 55vw;
  top: -15%;
  left: -10%;
  background: var(--ui5-el-blob-1);
  animation: driftA 26s ease-in-out infinite alternate;
}

.blob.b {
  width: 45vw;
  height: 45vw;
  bottom: -20%;
  right: -8%;
  background: var(--ui5-el-blob-2);
  animation: driftB 34s ease-in-out infinite alternate;
}

@keyframes driftA {
  from {
    transform: translate(0, 0) scale(1);
  }
  to {
    transform: translate(8vw, 6vh) scale(1.15);
  }
}

@keyframes driftB {
  from {
    transform: translate(0, 0) scale(1.1);
  }
  to {
    transform: translate(-6vw, -8vh) scale(0.95);
  }
}

.fx {
  position: absolute;
  inset: 0;
}

.horizon {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 38vh;
  background: radial-gradient(70% 100% at 50% 100%, var(--ui5-el-horizon), transparent 70%);
  transition: background 1s ease;
  animation: smolder 4.5s ease-in-out infinite alternate;
}

@keyframes smolder {
  from {
    opacity: 0.85;
  }
  to {
    opacity: 1;
  }
}

.waves {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 150px;
}

.waves svg {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 2880px;
  height: 140px;
}

.waves path {
  transition: fill 1s ease;
}

.waves .w1 {
  animation: slide 42s linear infinite;
  opacity: 0.45;
}

.waves .w2 {
  animation: slide 26s linear infinite reverse;
  opacity: 0.6;
  bottom: -14px;
}

.waves .w3 {
  animation: slide 18s linear infinite;
  opacity: 0.9;
  bottom: -30px;
}

@keyframes slide {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-1440px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .blob,
  .horizon,
  .waves svg {
    animation: none !important;
  }
}
</style>

<style>
/* not scoped: the ripple is created imperatively */
.ui5-elements .ripple {
  position: absolute;
  border-radius: 50%;
  border: 2px solid var(--ui5-el-accent-soft);
  animation: ui5-ripple 0.9s ease-out both;
}

@keyframes ui5-ripple {
  0% {
    opacity: 0.7;
    transform: translate(-50%, -50%) scale(0.1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
