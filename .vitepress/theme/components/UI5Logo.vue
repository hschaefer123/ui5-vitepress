<script setup lang="ts">
/**
 * Animated UI5 phoenix signet - "One geometry. Two elements."
 *
 * The signet is built from a gradient corpus plus several same-colored
 * shading layers (the feather swooshes). Each layer swings into place along
 * its own vector, following the phoenix' momentum. Light mode = water (blue),
 * dark mode = fire (orange); switching the theme replays the assembly.
 */
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useData } from "vitepress";

const { isDark } = useData();

const wrap = ref<HTMLElement | null>(null);
const play = ref(false);
const tilt = ref("");

let reduceMotion = false;

async function replay() {
  if (reduceMotion) return;
  play.value = false;
  await nextTick();
  void wrap.value?.offsetWidth; // force reflow -> restart the CSS animations
  play.value = true;
}

// subtle parallax towards the pointer
function onPointerMove(e: PointerEvent) {
  const dx = (e.clientX / window.innerWidth - 0.5) * 10;
  const dy = (e.clientY / window.innerHeight - 0.5) * 8;
  tilt.value = `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px)`;
}

onMounted(() => {
  reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;
  play.value = true;
  window.addEventListener("pointermove", onPointerMove, { passive: true });
});

onBeforeUnmount(() => window.removeEventListener("pointermove", onPointerMove));

// the logo reassembles itself in the new element
watch(isDark, replay);
</script>

<template>
  <div ref="wrap" class="ui5-logo logo-wrap" :class="{ play }" :style="{ transform: tilt }">
    <div class="pulse" />
    <svg viewBox="0 0 500 500" role="img" aria-label="UI5 Phoenix Logo">
      <defs>
        <clipPath id="ui5LogoClipWater"><path d="m244.45 0s-.06 20.81 54.34 53.86c105.62 64.14 105.26 122.99 105.26 135.34 0 52.44-54.58 86.34-79.9 58.9 0 0 24.85-18.44 24.85-46.8 0 0-18.22 12-27.75 14.08 0 0 12.42-21.95 6.63-60.46 0 0-9.94 19.46-41.83 35.2 0 0 12.42-27.75.83-54.25 0 0 2.48 33.13-72.9 68.33s-52.18 70.41-52.18 70.41 15-16 40.54-4.75c34.51 15.16 20.56 76-34.94 76-54 0-89.49-58.76-89.49-104.65 0-19 2.06-53.87 36.33-92.26 27.26-30.53 60.88-46.64 68.09-80.4-37.33 34.61-104.72 57.21-144.77 116.45-36 53.21-24.3 123.6-17.83 145.25 29.38 98.19 120.41 169.75 228.15 169.75 131.51 0 239.48-105.23 239.48-236.74 0-199.08-189.26-220.2-242.91-263.26zm-31.86 243.71c-4 .93-7.85-.75-14.25-2.69-6-1.82-8.11-1.48-8.11-1.48a101.62 101.62 0 0 1 12.67-7.26c6.36-2.93 11.8-3.08 14.32 2.74 1.66 3.83-1.35 7.92-4.63 8.69z" /></clipPath>
        <linearGradient id="ui5LogoGradWater" gradientUnits="userSpaceOnUse" x1="367.98" x2="134.4" y1="468.1" y2="63.53"><stop offset="0" stop-color="#146cd0" /><stop offset="1" stop-color="#0fa1ea" /></linearGradient>
        <clipPath id="ui5LogoClipFire"><path d="m244.45 0s-.06 20.81 54.34 53.86c105.62 64.14 105.26 122.99 105.26 135.34 0 52.44-54.58 86.34-79.9 58.9 0 0 24.85-18.44 24.85-46.8 0 0-18.22 12-27.75 14.08 0 0 12.42-21.95 6.63-60.46 0 0-9.94 19.46-41.83 35.2 0 0 12.42-27.75.83-54.25 0 0 2.48 33.13-72.9 68.33s-52.18 70.41-52.18 70.41 15-16 40.54-4.75c34.51 15.16 20.56 76-34.94 76-54 0-89.49-58.76-89.49-104.65 0-19 2.06-53.87 36.33-92.26 27.26-30.53 60.88-46.64 68.09-80.4-37.33 34.61-104.72 57.21-144.77 116.45-36 53.21-24.3 123.6-17.83 145.25 29.38 98.19 120.41 169.75 228.15 169.75 131.51 0 239.48-105.23 239.48-236.74 0-199.08-189.26-220.2-242.91-263.26zm-31.86 243.71c-4 .93-7.85-.75-14.25-2.69-6-1.82-8.11-1.48-8.11-1.48a101.62 101.62 0 0 1 12.67-7.26c6.36-2.93 11.8-3.08 14.32 2.74 1.66 3.83-1.35 7.92-4.63 8.69z" /></clipPath>
        <linearGradient id="ui5LogoGradFire" gradientUnits="userSpaceOnUse" x1="367.98" x2="134.4" y1="468.1" y2="63.53"><stop offset="0" stop-color="#fc4229" /><stop offset="1" stop-color="#ff7014" /></linearGradient>
      </defs>

      <!-- ===== Water (light) ===== -->
      <g class="variant water">
        <g clip-path="url(#ui5LogoClipWater)">
          <path class="lyr" style="--d: 0s; --dur: 1.2s; --o: 1; --r: -22deg; --s: 0.8; --ty: 40px; --ease: cubic-bezier(0.22, 1, 0.36, 1)" fill="url(#ui5LogoGradWater)" d="m244.45 0s-.06 20.81 54.34 53.86c105.62 64.14 105.26 122.99 105.26 135.34 0 52.44-54.58 86.34-79.9 58.9 0 0 24.85-18.44 24.85-46.8 0 0-18.22 12-27.75 14.08 0 0 12.42-21.95 6.63-60.46 0 0-9.94 19.46-41.83 35.2 0 0 12.42-27.75.83-54.25 0 0 2.48 33.13-72.9 68.33s-52.18 70.41-52.18 70.41 15-16 40.54-4.75c34.51 15.16 20.56 76-34.94 76-54 0-89.49-58.76-89.49-104.65 0-19 2.06-53.87 36.33-92.26 27.26-30.53 60.88-46.64 68.09-80.4-37.33 34.61-104.72 57.21-144.77 116.45-36 53.21-24.3 123.6-17.83 145.25 29.38 98.19 120.41 169.75 228.15 169.75 131.51 0 239.48-105.23 239.48-236.74 0-199.08-189.26-220.2-242.91-263.26z" />
          <g fill="#07c1f2">
            <path class="lyr" style="--d: 0.55s; --o: 0.6; --r: -28deg; --tx: -60px; --ty: -40px" opacity=".6" d="m230.78 248.69c41.93-21.61 55.37-58.64 55.37-58.64s12.42-27.76.82-54.29c0 0 2.48 33.16-73 68.39s-52.22 70.46-52.22 70.46c3.95-3.52 7.71-5.9 15.16-7.9 12.46-3.34 31.99-6.71 53.87-18.02z" />
            <path class="lyr" style="--d: 0.67s; --o: 0.4; --r: -24deg; --tx: 50px; --ty: -50px" opacity=".4" d="m232.94 264c32.4 0 69.89-15.06 88.44-48.7 2.9-5.25 5.48-13.78 6.77-21.81 2-12.8 2.25-22.32-.11-39.61 0 0-6.14 17.21-41.89 36.13-13 6.87-29.61 13.74-51.61 20.42-85.24 25.87-72.74 64.14-72.74 64.14 13.43-8.85 13.51-10.57 71.14-10.57z" />
            <path class="lyr" style="--d: 0.79s; --o: 0.2; --r: -20deg; --tx: 80px; --ty: -20px" opacity=".2" d="m232.94 264c29.79 0 70.29 1.68 91.33-16 12.9-10.81 24.68-25.1 24.9-46.88 0 0-17.65 11.65-27.79 14.15-14 3.46-39.29 8.78-62.39 7.47-78.41-4.45-97.19 51.79-97.19 51.79 10.81-9.92 23.97-10.53 71.14-10.53z" />
            <path class="lyr" style="--d: 0.91s; --o: 0.4; --r: -26deg; --tx: -50px; --ty: 30px" opacity=".4" d="m230.78 248.69c41.93-21.61 55.37-58.64 55.37-58.64-13 6.87-29.61 13.74-51.61 20.42-85.24 25.87-72.74 64.14-72.74 64.14 3.95-3.52 7.71-5.9 15.16-7.9 12.41-3.34 31.94-6.71 53.82-18.02z" />
            <path class="lyr" style="--d: 1.03s; --o: 1; --r: -30deg; --tx: -70px; --ty: 50px" d="m177 266.71c12.41-3.34 31.94-6.74 53.82-18a122.3 122.3 0 0 0 33.78-25.71c-1.88 0-3.75-.07-5.61-.17-78.41-4.45-97.19 51.79-97.19 51.79a30.39 30.39 0 0 1 12-7c1.01-.29 2.03-.62 3.2-.91z" />
            <path class="lyr" style="--d: 1.15s; --o: 0.4; --r: -35deg; --ty: 90px" opacity=".4" d="m487.36 263.26c0-39.7-7.54-72.31-20-99.45 1.19 3.59 25.3 79-35.06 139.33-34.46 34.46-93.09 46.39-140.23 8.71 0 0 6 94.58-106.06 108.53-73.17 9.11-130.75-37.51-155.73-96.89-17.38-41.3-19-88.77.9-128-28.11 51.63-17.5 114.51-11.45 134.76 29.38 98.19 120.41 169.75 228.15 169.75 131.51 0 239.48-105.23 239.48-236.74z" />
            <path class="lyr" style="--d: 1.27s; --o: 0.6; --r: -40deg; --tx: 90px; --ty: 60px" opacity=".6" d="m463.18 367.1c-12.42 3.36-109.76 26.52-171.13-55.25 0 0 28.58 110.85-92.9 183.15a238.53 238.53 0 0 0 48.73 5c94.17 0 176.27-54 215.3-132.9z" />
            <path class="lyr" style="--d: 1.39s; --o: 0.7; --r: -45deg; --tx: 60px; --ty: 110px" opacity=".7" d="m410.33 437.18c-76.11-39.18-118.28-125.33-118.28-125.33 33.92 82.73 19.22 147.29 4 183.34a240.24 240.24 0 0 0 114.28-58.01z" />
          </g>
        </g>
      </g>

      <!-- ===== Fire (dark) - identical layer structure and timing ===== -->
      <g class="variant fire">
        <g clip-path="url(#ui5LogoClipFire)">
          <path class="lyr" style="--d: 0s; --dur: 1.2s; --o: 1; --r: -22deg; --s: 0.8; --ty: 40px; --ease: cubic-bezier(0.22, 1, 0.36, 1)" fill="url(#ui5LogoGradFire)" d="m244.45 0s-.06 20.81 54.34 53.86c105.62 64.14 105.26 122.99 105.26 135.34 0 52.44-54.58 86.34-79.9 58.9 0 0 24.85-18.44 24.85-46.8 0 0-18.22 12-27.75 14.08 0 0 12.42-21.95 6.63-60.46 0 0-9.94 19.46-41.83 35.2 0 0 12.42-27.75.83-54.25 0 0 2.48 33.13-72.9 68.33s-52.18 70.41-52.18 70.41 15-16 40.54-4.75c34.51 15.16 20.56 76-34.94 76-54 0-89.49-58.76-89.49-104.65 0-19 2.06-53.87 36.33-92.26 27.26-30.53 60.88-46.64 68.09-80.4-37.33 34.61-104.72 57.21-144.77 116.45-36 53.21-24.3 123.6-17.83 145.25 29.38 98.19 120.41 169.75 228.15 169.75 131.51 0 239.48-105.23 239.48-236.74 0-199.08-189.26-220.2-242.91-263.26z" />
          <g fill="#ff961e">
            <path class="lyr" style="--d: 0.55s; --o: 0.6; --r: -28deg; --tx: -60px; --ty: -40px" opacity=".6" d="m230.78 248.69c41.93-21.61 55.37-58.64 55.37-58.64s12.42-27.76.82-54.29c0 0 2.48 33.16-73 68.39s-52.22 70.46-52.22 70.46c3.95-3.52 7.71-5.9 15.16-7.9 12.46-3.34 31.99-6.71 53.87-18.02z" />
            <path class="lyr" style="--d: 0.67s; --o: 0.4; --r: -24deg; --tx: 50px; --ty: -50px" opacity=".4" d="m232.94 264c32.4 0 69.89-15.06 88.44-48.7 2.9-5.25 5.48-13.78 6.77-21.81 2-12.8 2.25-22.32-.11-39.61 0 0-6.14 17.21-41.89 36.13-13 6.87-29.61 13.74-51.61 20.42-85.24 25.87-72.74 64.14-72.74 64.14 13.43-8.85 13.51-10.57 71.14-10.57z" />
            <path class="lyr" style="--d: 0.79s; --o: 0.2; --r: -20deg; --tx: 80px; --ty: -20px" opacity=".2" d="m232.94 264c29.79 0 70.29 1.68 91.33-16 12.9-10.81 24.68-25.1 24.9-46.88 0 0-17.65 11.65-27.79 14.15-14 3.46-39.29 8.78-62.39 7.47-78.41-4.45-97.19 51.79-97.19 51.79 10.81-9.92 23.97-10.53 71.14-10.53z" />
            <path class="lyr" style="--d: 0.91s; --o: 0.4; --r: -26deg; --tx: -50px; --ty: 30px" opacity=".4" d="m230.78 248.69c41.93-21.61 55.37-58.64 55.37-58.64-13 6.87-29.61 13.74-51.61 20.42-85.24 25.87-72.74 64.14-72.74 64.14 3.95-3.52 7.71-5.9 15.16-7.9 12.41-3.34 31.94-6.71 53.82-18.02z" />
            <path class="lyr" style="--d: 1.03s; --o: 1; --r: -30deg; --tx: -70px; --ty: 50px" d="m177 266.71c12.41-3.34 31.94-6.74 53.82-18a122.3 122.3 0 0 0 33.78-25.71c-1.88 0-3.75-.07-5.61-.17-78.41-4.45-97.19 51.79-97.19 51.79a30.39 30.39 0 0 1 12-7c1.01-.29 2.03-.62 3.2-.91z" />
            <path class="lyr" style="--d: 1.15s; --o: 0.4; --r: -35deg; --ty: 90px" opacity=".4" d="m487.36 263.26c0-39.7-7.54-72.31-20-99.45 1.19 3.59 25.3 79-35.06 139.33-34.46 34.46-93.09 46.39-140.23 8.71 0 0 6 94.58-106.06 108.53-73.17 9.11-130.75-37.51-155.73-96.89-17.38-41.3-19-88.77.9-128-28.11 51.63-17.5 114.51-11.45 134.76 29.38 98.19 120.41 169.75 228.15 169.75 131.51 0 239.48-105.23 239.48-236.74z" />
            <path class="lyr" style="--d: 1.27s; --o: 0.6; --r: -40deg; --tx: 90px; --ty: 60px" opacity=".6" d="m463.18 367.1c-12.42 3.36-109.76 26.52-171.13-55.25 0 0 28.58 110.85-92.9 183.15a238.53 238.53 0 0 0 48.73 5c94.17 0 176.27-54 215.3-132.9z" />
            <path class="lyr" style="--d: 1.39s; --o: 0.7; --r: -45deg; --tx: 60px; --ty: 110px" opacity=".7" d="m410.33 437.18c-76.11-39.18-118.28-125.33-118.28-125.33 33.92 82.73 19.22 147.29 4 183.34a240.24 240.24 0 0 0 114.28-58.01z" />
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.logo-wrap {
  position: relative;
  width: 100%;
  max-width: 320px;
  aspect-ratio: 1;
  margin: 0 auto;
  transition: transform 0.3s ease-out;
}

.logo-wrap svg {
  width: 100%;
  height: 100%;
  overflow: visible;
  filter: drop-shadow(0 12px 32px var(--ui5-el-logo-glow));
  animation: levitate 6.5s ease-in-out infinite;
}

@keyframes levitate {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-7px);
  }
}

/**
 * Layer assembly: every same-colored shading layer is a segment that rotates
 * gently into place, following the phoenix' momentum. No shards, no seams.
 * Opacity is fully there early so the MOVEMENT carries the effect.
 */
.lyr {
  transform-box: view-box;
  transform-origin: center;
}

.play .lyr {
  animation: layerIn var(--dur, 0.95s) var(--ease, cubic-bezier(0.3, 1.35, 0.45, 1)) both;
  animation-delay: var(--d, 0s);
}

@keyframes layerIn {
  0% {
    opacity: 0;
    transform: translate(var(--tx, 0px), var(--ty, 0px)) rotate(var(--r, -24deg)) scale(var(--s, 0.96));
  }
  45% {
    opacity: var(--o, 1);
  }
  100% {
    opacity: var(--o, 1);
    transform: translate(0, 0) rotate(0) scale(1);
  }
}

/* Impulse ring once the signet snaps into place */
.pulse {
  position: absolute;
  inset: 12%;
  border-radius: 50%;
  border: 2px solid var(--ui5-el-accent-soft);
  opacity: 0;
  pointer-events: none;
}

.play .pulse {
  animation: ring 1.1s ease-out 1.9s both;
}

@keyframes ring {
  0% {
    opacity: 0.8;
    transform: scale(0.55);
  }
  100% {
    opacity: 0;
    transform: scale(1.55);
  }
}

@media (prefers-reduced-motion: reduce) {
  .logo-wrap,
  .logo-wrap svg,
  .lyr,
  .pulse {
    animation: none !important;
    transition: none !important;
  }
}
</style>

<style>
/**
 * Not scoped: the variant switch keys off `html.dark`, which lives outside the
 * component. Doing it in CSS rather than v-if keeps SSR output and hydration
 * in sync (the server does not know the visitor's theme).
 * Blue = water (light), orange = fire (dark).
 */
.ui5-logo .variant.fire {
  display: none;
}

html.dark .ui5-logo .variant.fire {
  display: inline;
}

html.dark .ui5-logo .variant.water {
  display: none;
}
</style>
