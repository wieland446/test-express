<template>
  <transition name="ls-fade">
    <div v-if="show" class="ls-screen">

      <!-- Floating element symbols (background ambience) -->
      <span
        v-for="s in bgSymbols"
        :key="s.key"
        class="ls-sym"
        :style="s.style"
        aria-hidden="true"
      >{{ s.t }}</span>

      <!-- Top-left satellite atom -->
      <svg class="ls-sat ls-sat-tl" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" overflow="visible">
        <g transform="translate(60,60) rotate(-15)">
          <ellipse rx="48" ry="16" fill="none" stroke="rgba(93,220,176,0.25)" stroke-width="1"/>
        </g>
        <g transform="translate(60,60) rotate(45)">
          <ellipse rx="48" ry="16" fill="none" stroke="rgba(240,166,202,0.25)" stroke-width="1"/>
        </g>
        <g transform="translate(60,60) rotate(-15)">
          <circle class="ls-el ls-el-teal" r="3.5">
            <animateMotion dur="1.9s" repeatCount="indefinite" path="M 48,0 A 48,16 0 0 1 -48,0 A 48,16 0 0 1 48,0"/>
          </circle>
        </g>
        <g transform="translate(60,60) rotate(45)">
          <circle class="ls-el ls-el-pink" r="3.5">
            <animateMotion dur="2.6s" repeatCount="indefinite" begin="-1s" path="M 48,0 A 48,16 0 0 1 -48,0 A 48,16 0 0 1 48,0"/>
          </circle>
        </g>
        <circle cx="60" cy="60" fill="#5ddcb0">
          <animate attributeName="r" values="5;11;5" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
          <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
        </circle>
        <circle cx="60" cy="60" r="6" fill="#5ddcb0" class="ls-nuc-teal"/>
      </svg>

      <!-- Top-right satellite atom -->
      <svg class="ls-sat ls-sat-tr" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" overflow="visible">
        <g transform="translate(60,60) rotate(20)">
          <ellipse rx="48" ry="16" fill="none" stroke="rgba(144,196,248,0.25)" stroke-width="1"/>
        </g>
        <g transform="translate(60,60) rotate(-50)">
          <ellipse rx="48" ry="16" fill="none" stroke="rgba(93,220,176,0.25)" stroke-width="1"/>
        </g>
        <g transform="translate(60,60) rotate(20)">
          <circle class="ls-el ls-el-blue" r="3.5">
            <animateMotion dur="2.1s" repeatCount="indefinite" begin="-0.5s" path="M 48,0 A 48,16 0 0 1 -48,0 A 48,16 0 0 1 48,0"/>
          </circle>
        </g>
        <g transform="translate(60,60) rotate(-50)">
          <circle class="ls-el ls-el-teal" r="3.5">
            <animateMotion dur="1.7s" repeatCount="indefinite" path="M 48,0 A 48,16 0 0 1 -48,0 A 48,16 0 0 1 48,0"/>
          </circle>
        </g>
        <circle cx="60" cy="60" fill="#90c4f8">
          <animate attributeName="r" values="5;12;5" dur="2.2s" repeatCount="indefinite" begin="-0.8s" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
          <animate attributeName="opacity" values="0.3;0;0.3" dur="2.2s" repeatCount="indefinite" begin="-0.8s" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
        </circle>
        <circle cx="60" cy="60" r="6" fill="#90c4f8" class="ls-nuc-blue"/>
      </svg>

      <!-- Bottom-left satellite atom -->
      <svg class="ls-sat ls-sat-bl" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" overflow="visible">
        <g transform="translate(60,60) rotate(30)">
          <ellipse rx="48" ry="16" fill="none" stroke="rgba(240,166,202,0.25)" stroke-width="1"/>
        </g>
        <g transform="translate(60,60) rotate(-60)">
          <ellipse rx="48" ry="16" fill="none" stroke="rgba(144,196,248,0.25)" stroke-width="1"/>
        </g>
        <g transform="translate(60,60) rotate(30)">
          <circle class="ls-el ls-el-pink" r="3.5">
            <animateMotion dur="2.3s" repeatCount="indefinite" begin="-1.5s" path="M 48,0 A 48,16 0 0 1 -48,0 A 48,16 0 0 1 48,0"/>
          </circle>
        </g>
        <g transform="translate(60,60) rotate(-60)">
          <circle class="ls-el ls-el-blue" r="3.5">
            <animateMotion dur="1.6s" repeatCount="indefinite" begin="-0.3s" path="M 48,0 A 48,16 0 0 1 -48,0 A 48,16 0 0 1 48,0"/>
          </circle>
        </g>
        <circle cx="60" cy="60" fill="#f0a6ca">
          <animate attributeName="r" values="5;11;5" dur="1.8s" repeatCount="indefinite" begin="-0.4s" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
          <animate attributeName="opacity" values="0.3;0;0.3" dur="1.8s" repeatCount="indefinite" begin="-0.4s" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
        </circle>
        <circle cx="60" cy="60" r="6" fill="#f0a6ca" class="ls-nuc-pink"/>
      </svg>

      <!-- Bottom-right satellite atom -->
      <svg class="ls-sat ls-sat-br" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" overflow="visible">
        <g transform="translate(60,60) rotate(-10)">
          <ellipse rx="48" ry="16" fill="none" stroke="rgba(255,213,128,0.25)" stroke-width="1"/>
        </g>
        <g transform="translate(60,60) rotate(80)">
          <ellipse rx="48" ry="16" fill="none" stroke="rgba(192,132,252,0.25)" stroke-width="1"/>
        </g>
        <g transform="translate(60,60) rotate(-10)">
          <circle class="ls-el ls-el-gold" r="3.5">
            <animateMotion dur="2.0s" repeatCount="indefinite" begin="-0.9s" path="M 48,0 A 48,16 0 0 1 -48,0 A 48,16 0 0 1 48,0"/>
          </circle>
        </g>
        <g transform="translate(60,60) rotate(80)">
          <circle class="ls-el ls-el-purple" r="3.5">
            <animateMotion dur="1.5s" repeatCount="indefinite" begin="-0.2s" path="M 48,0 A 48,16 0 0 1 -48,0 A 48,16 0 0 1 48,0"/>
          </circle>
        </g>
        <circle cx="60" cy="60" fill="#ffd580">
          <animate attributeName="r" values="5;12;5" dur="2.1s" repeatCount="indefinite" begin="-1.1s" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
          <animate attributeName="opacity" values="0.3;0;0.3" dur="2.1s" repeatCount="indefinite" begin="-1.1s" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
        </circle>
        <circle cx="60" cy="60" r="6" fill="#ffd580" class="ls-nuc-gold"/>
      </svg>

      <!-- Main centered content -->
      <div class="ls-body">

        <!-- 5-orbit central atom -->
        <svg class="ls-main-atom" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" overflow="visible">
          <defs>
            <filter id="ls-nuc-glow" x="-120%" y="-120%" width="340%" height="340%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="ls-el-glow" x="-250%" y="-250%" width="600%" height="600%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <radialGradient id="ls-nuc-grad" cx="36%" cy="30%" r="70%">
              <stop offset="0%"   stop-color="#ffffff"/>
              <stop offset="50%"  stop-color="#90c4f8"/>
              <stop offset="100%" stop-color="#2860a8"/>
            </radialGradient>
          </defs>

          <!-- 5 orbit rings at 36° intervals -->
          <g transform="translate(120,120) rotate(0)">
            <ellipse rx="100" ry="34" fill="none" stroke="rgba(144,196,248,0.22)" stroke-width="1.2"/>
          </g>
          <g transform="translate(120,120) rotate(36)">
            <ellipse rx="100" ry="34" fill="none" stroke="rgba(93,220,176,0.22)" stroke-width="1.2"/>
          </g>
          <g transform="translate(120,120) rotate(72)">
            <ellipse rx="100" ry="34" fill="none" stroke="rgba(240,166,202,0.22)" stroke-width="1.2"/>
          </g>
          <g transform="translate(120,120) rotate(108)">
            <ellipse rx="100" ry="34" fill="none" stroke="rgba(255,213,128,0.22)" stroke-width="1.2"/>
          </g>
          <g transform="translate(120,120) rotate(144)">
            <ellipse rx="100" ry="34" fill="none" stroke="rgba(192,132,252,0.22)" stroke-width="1.2"/>
          </g>

          <!-- Electrons — one per orbit -->
          <g transform="translate(120,120) rotate(0)">
            <circle r="5.5" fill="#90c4f8" filter="url(#ls-el-glow)">
              <animateMotion dur="2.2s" repeatCount="indefinite" begin="0s"
                path="M 100,0 A 100,34 0 0 1 -100,0 A 100,34 0 0 1 100,0"/>
            </circle>
          </g>
          <g transform="translate(120,120) rotate(36)">
            <circle r="5.5" fill="#5ddcb0" filter="url(#ls-el-glow)">
              <animateMotion dur="2.9s" repeatCount="indefinite" begin="-1.2s"
                path="M 100,0 A 100,34 0 0 1 -100,0 A 100,34 0 0 1 100,0"/>
            </circle>
          </g>
          <g transform="translate(120,120) rotate(72)">
            <circle r="5.5" fill="#f0a6ca" filter="url(#ls-el-glow)">
              <animateMotion dur="1.7s" repeatCount="indefinite" begin="-0.6s"
                path="M 100,0 A 100,34 0 0 1 -100,0 A 100,34 0 0 1 100,0"/>
            </circle>
          </g>
          <g transform="translate(120,120) rotate(108)">
            <circle r="5.5" fill="#ffd580" filter="url(#ls-el-glow)">
              <animateMotion dur="3.4s" repeatCount="indefinite" begin="-2s"
                path="M 100,0 A 100,34 0 0 1 -100,0 A 100,34 0 0 1 100,0"/>
            </circle>
          </g>
          <g transform="translate(120,120) rotate(144)">
            <circle r="5.5" fill="#c084fc" filter="url(#ls-el-glow)">
              <animateMotion dur="2.5s" repeatCount="indefinite" begin="-1.7s"
                path="M 100,0 A 100,34 0 0 1 -100,0 A 100,34 0 0 1 100,0"/>
            </circle>
          </g>

          <!-- Nucleus pulse halo -->
          <circle cx="120" cy="120" fill="#5aadff">
            <animate attributeName="r"       values="14;32;14" dur="2.4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
            <animate attributeName="opacity" values="0.4;0;0.4"   dur="2.4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
          </circle>

          <!-- Nucleus core -->
          <circle cx="120" cy="120" r="14" fill="url(#ls-nuc-grad)" filter="url(#ls-nuc-glow)"/>
        </svg>

        <h1 class="ls-title">Chemtrailblazed</h1>
        <p class="ls-sub">Periodic Table of the Elements</p>

        <div class="ls-bar-wrap">
          <div class="ls-bar"></div>
        </div>
      </div>

    </div>
  </transition>
</template>

<script>
const SYMS = [
  'H','He','Li','C','N','O','Ne','Na','Mg','Al',
  'Si','Cl','Ar','Fe','Cu','Ag','Au','Pb','U','Hg',
]
const POS = [
  [8,12],[92,8],[15,85],[85,88],[50,5],[5,50],[95,45],
  [30,20],[70,18],[20,65],[80,70],[45,92],[55,93],[10,38],
  [90,35],[38,7],[62,6],[25,78],[75,82],[48,48],
]

export default {
  name: 'LoadingScreen',
  props: {
    show: { type: Boolean, required: true },
  },
  data() {
    return {
      bgSymbols: SYMS.map((t, i) => ({
        key: i,
        t,
        style: [
          `left:${POS[i][0]}%`,
          `top:${POS[i][1]}%`,
          `animation-delay:${(i * 0.38).toFixed(2)}s`,
          `font-size:${(0.9 + (i % 5) * 0.22).toFixed(2)}rem`,
        ].join(';'),
      })),
    }
  },
}
</script>

<style scoped>
/* ── Full-screen overlay ── */
.ls-screen {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #0d0d14;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Radial ambient glow behind the main atom */
.ls-screen::before {
  content: '';
  position: absolute;
  width: 640px;
  height: 640px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(90,173,255,0.07) 0%, transparent 68%);
  pointer-events: none;
}

/* ── Floating element symbols ── */
.ls-sym {
  position: absolute;
  font-family: 'Segoe UI', Arial, sans-serif;
  font-weight: 700;
  color: #90c4f8;
  pointer-events: none;
  letter-spacing: 0.05em;
  opacity: 0;
  animation: ls-sym-float 5s ease-in-out infinite;
}

@keyframes ls-sym-float {
  0%, 100% { opacity: 0;    transform: translateY(0);    }
  50%       { opacity: 0.09; transform: translateY(-6px); }
}

/* ── Satellite atoms ── */
.ls-sat {
  position: absolute;
  overflow: visible;
}
.ls-sat-tl { width: 140px; height: 140px; top: 3%;    left: 3%;   transform: rotate(-15deg); animation: ls-sat-drift 8s ease-in-out infinite alternate; }
.ls-sat-tr { width: 130px; height: 130px; top: 3%;    right: 3%;  transform: rotate(20deg);  animation: ls-sat-drift 7s ease-in-out infinite alternate-reverse; }
.ls-sat-bl { width: 120px; height: 120px; bottom: 3%; left: 4%;   transform: rotate(10deg);  animation: ls-sat-drift 9s ease-in-out infinite alternate; }
.ls-sat-br { width: 120px; height: 120px; bottom: 3%; right: 4%;  transform: rotate(-25deg); animation: ls-sat-drift 6s ease-in-out infinite alternate-reverse; }

@keyframes ls-sat-drift {
  from { transform: rotate(var(--r, 0deg)) translateY(0px); }
  to   { transform: rotate(var(--r, 0deg)) translateY(-12px); }
}

/* Electron fills */
.ls-el-blue   { fill: #90c4f8; filter: drop-shadow(0 0 5px #90c4f8); }
.ls-el-teal   { fill: #5ddcb0; filter: drop-shadow(0 0 5px #5ddcb0); }
.ls-el-pink   { fill: #f0a6ca; filter: drop-shadow(0 0 5px #f0a6ca); }
.ls-el-gold   { fill: #ffd580; filter: drop-shadow(0 0 5px #ffd580); }
.ls-el-purple { fill: #c084fc; filter: drop-shadow(0 0 5px #c084fc); }

/* Satellite nucleus glows */
.ls-nuc-teal   { filter: drop-shadow(0 0 7px #5ddcb0); }
.ls-nuc-blue   { filter: drop-shadow(0 0 7px #90c4f8); }
.ls-nuc-pink   { filter: drop-shadow(0 0 7px #f0a6ca); }
.ls-nuc-gold   { filter: drop-shadow(0 0 7px #ffd580); }

/* ── Main content ── */
.ls-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  z-index: 1;
}

/* ── 5-orbit central atom ── */
.ls-main-atom {
  width: min(300px, 55vw);
  height: min(300px, 55vw);
  overflow: visible;
  animation: ls-atom-breathe 4s ease-in-out infinite;
}

@keyframes ls-atom-breathe {
  0%, 100% { filter: drop-shadow(0 0 22px rgba(90,173,255,0.28)); }
  50%       { filter: drop-shadow(0 0 42px rgba(90,173,255,0.50)); }
}

/* ── Title ── */
.ls-title {
  font-family: 'Segoe UI', Arial, sans-serif;
  font-size: clamp(1.8rem, 4.5vw, 3.2rem);
  font-weight: 900;
  letter-spacing: 0.04em;
  margin: 8px 0 0;
  background: linear-gradient(120deg, #90c4f8 0%, #5ddcb0 33%, #f0a6ca 66%, #ffd580 85%, #90c4f8 100%);
  background-size: 300% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation:
    ls-shimmer 3s linear infinite,
    ls-fade-up 0.9s cubic-bezier(0.22,1,0.36,1) both;
}

@keyframes ls-shimmer {
  from { background-position: 200% 0; }
  to   { background-position: 0%   0; }
}

/* ── Subtitle ── */
.ls-sub {
  font-family: 'Segoe UI', Arial, sans-serif;
  font-size: clamp(0.72rem, 1.8vw, 1rem);
  font-weight: 400;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(144,196,248,0.6);
  margin: 0;
  animation: ls-fade-up 0.9s 0.25s cubic-bezier(0.22,1,0.36,1) both;
}

@keyframes ls-fade-up {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Progress bar ── */
.ls-bar-wrap {
  margin-top: 24px;
  width: min(280px, 55vw);
  height: 3px;
  background: rgba(255,255,255,0.07);
  border-radius: 2px;
  overflow: hidden;
  animation: ls-fade-up 0.9s 0.45s cubic-bezier(0.22,1,0.36,1) both;
}

.ls-bar {
  height: 100%;
  width: 0%;
  border-radius: 2px;
  background: linear-gradient(90deg, #5ddcb0, #90c4f8, #f0a6ca, #ffd580, #c084fc);
  background-size: 300% 100%;
  box-shadow: 0 0 10px rgba(90,173,255,0.65);
  animation:
    ls-bar-fill    5s linear         forwards,
    ls-bar-shimmer 2s linear         infinite;
}

@keyframes ls-bar-fill {
  from { width: 0%; }
  to   { width: 100%; }
}

@keyframes ls-bar-shimmer {
  from { background-position: 200% 0; }
  to   { background-position: 0%   0; }
}

/* ── Screen exit transition ── */
.ls-fade-leave-active { transition: opacity 0.75s ease; }
.ls-fade-leave-to     { opacity: 0; }
.ls-fade-enter-active { transition: opacity 0.2s ease; }
.ls-fade-enter-from   { opacity: 0; }
</style>
