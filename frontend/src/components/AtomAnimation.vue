<template>
  <div class="atom-wrap">
    <svg class="atom-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Fire glow filter for nucleus -->
        <filter id="fire-nuc-glow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur-wide"/>
          <feColorMatrix in="blur-wide" type="matrix"
            values="1.8 0.8 0 0 0  0.6 0.3 0 0 0  0 0 0 0 0  0 0 0 0.85 0" result="fire-outer"/>
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur-tight"/>
          <feColorMatrix in="blur-tight" type="matrix"
            values="1.5 1.2 0 0 0  0.9 0.7 0 0 0  0 0 0 0 0  0 0 0 1 0" result="fire-inner"/>
          <feMerge>
            <feMergeNode in="fire-outer"/>
            <feMergeNode in="fire-inner"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        <!-- Electron glow -->
        <filter id="atom-el-glow" x="-250%" y="-250%" width="600%" height="600%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        <!-- Flame particle glow -->
        <filter id="flame-particle-glow" x="-300%" y="-300%" width="700%" height="700%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur"/>
          <feColorMatrix in="blur" type="matrix"
            values="1.8 0.5 0 0 0  0.6 0.2 0 0 0  0 0 0 0 0  0 0 0 0.9 0" result="fire"/>
          <feMerge>
            <feMergeNode in="fire"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        <!-- Fire nucleus gradient -->
        <radialGradient id="fire-nuc-grad" cx="38%" cy="32%" r="68%">
          <stop offset="0%"   stop-color="#ffffff"/>
          <stop offset="20%"  stop-color="#fff59d"/>
          <stop offset="45%"  stop-color="#ffa726"/>
          <stop offset="72%"  stop-color="#e53935"/>
          <stop offset="100%" stop-color="#6a0000"/>
        </radialGradient>
      </defs>

      <!-- Fire corona — 4 concentric pulsing rings, staggered -->
      <circle cx="100" cy="100" fill="#ff6600">
        <animate attributeName="r"       values="11;44;11" dur="2.2s" repeatCount="indefinite" begin="0s"     calcMode="spline" keySplines="0.2 0.8 0.4 1;0.8 0 1 0.2"/>
        <animate attributeName="opacity" values="0.5;0;0.5"  dur="2.2s" repeatCount="indefinite" begin="0s"     calcMode="spline" keySplines="0.2 0.8 0.4 1;0.8 0 1 0.2"/>
      </circle>
      <circle cx="100" cy="100" fill="#ff9500">
        <animate attributeName="r"       values="11;36;11" dur="2.2s" repeatCount="indefinite" begin="-0.55s"  calcMode="spline" keySplines="0.2 0.8 0.4 1;0.8 0 1 0.2"/>
        <animate attributeName="opacity" values="0.6;0;0.6"  dur="2.2s" repeatCount="indefinite" begin="-0.55s" calcMode="spline" keySplines="0.2 0.8 0.4 1;0.8 0 1 0.2"/>
      </circle>
      <circle cx="100" cy="100" fill="#ffcc00">
        <animate attributeName="r"       values="11;27;11" dur="2.2s" repeatCount="indefinite" begin="-1.1s"   calcMode="spline" keySplines="0.2 0.8 0.4 1;0.8 0 1 0.2"/>
        <animate attributeName="opacity" values="0.65;0;0.65" dur="2.2s" repeatCount="indefinite" begin="-1.1s" calcMode="spline" keySplines="0.2 0.8 0.4 1;0.8 0 1 0.2"/>
      </circle>
      <circle cx="100" cy="100" fill="#fff176">
        <animate attributeName="r"       values="11;19;11" dur="2.2s" repeatCount="indefinite" begin="-1.65s"  calcMode="spline" keySplines="0.2 0.8 0.4 1;0.8 0 1 0.2"/>
        <animate attributeName="opacity" values="0.7;0;0.7"  dur="2.2s" repeatCount="indefinite" begin="-1.65s" calcMode="spline" keySplines="0.2 0.8 0.4 1;0.8 0 1 0.2"/>
      </circle>

      <!-- Orbit rings — warm amber tint -->
      <g transform="translate(100,100) rotate(0)">
        <ellipse rx="78" ry="27" fill="none" stroke="rgba(255,165,60,0.30)" stroke-width="1.2"/>
      </g>
      <g transform="translate(100,100) rotate(60)">
        <ellipse rx="78" ry="27" fill="none" stroke="rgba(255,165,60,0.30)" stroke-width="1.2"/>
      </g>
      <g transform="translate(100,100) rotate(-60)">
        <ellipse rx="78" ry="27" fill="none" stroke="rgba(255,165,60,0.30)" stroke-width="1.2"/>
      </g>

      <!-- Flame particles — 6 jets from nucleus at evenly spaced angles -->
      <g transform="translate(100,100)">
        <g transform="rotate(0)">
          <ellipse cx="0" cy="0" rx="0" ry="0" fill="#ff8c00" filter="url(#flame-particle-glow)">
            <animate attributeName="cy"      values="0;-28"      dur="1.30s" repeatCount="indefinite" begin="0s"     calcMode="spline" keySplines="0.2 0.8 0.4 1"/>
            <animate attributeName="rx"      values="0;4;0"      dur="1.30s" repeatCount="indefinite" begin="0s"     calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
            <animate attributeName="ry"      values="0;7;0"      dur="1.30s" repeatCount="indefinite" begin="0s"     calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
            <animate attributeName="opacity" values="0;0.9;0"    dur="1.30s" repeatCount="indefinite" begin="0s"/>
          </ellipse>
        </g>
        <g transform="rotate(60)">
          <ellipse cx="0" cy="0" rx="0" ry="0" fill="#ff6600" filter="url(#flame-particle-glow)">
            <animate attributeName="cy"      values="0;-26"      dur="1.50s" repeatCount="indefinite" begin="-0.50s" calcMode="spline" keySplines="0.2 0.8 0.4 1"/>
            <animate attributeName="rx"      values="0;4;0"      dur="1.50s" repeatCount="indefinite" begin="-0.50s" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
            <animate attributeName="ry"      values="0;8;0"      dur="1.50s" repeatCount="indefinite" begin="-0.50s" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
            <animate attributeName="opacity" values="0;0.85;0"   dur="1.50s" repeatCount="indefinite" begin="-0.50s"/>
          </ellipse>
        </g>
        <g transform="rotate(120)">
          <ellipse cx="0" cy="0" rx="0" ry="0" fill="#ffab00" filter="url(#flame-particle-glow)">
            <animate attributeName="cy"      values="0;-24"      dur="1.10s" repeatCount="indefinite" begin="-0.90s" calcMode="spline" keySplines="0.2 0.8 0.4 1"/>
            <animate attributeName="rx"      values="0;3.5;0"    dur="1.10s" repeatCount="indefinite" begin="-0.90s" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
            <animate attributeName="ry"      values="0;6;0"      dur="1.10s" repeatCount="indefinite" begin="-0.90s" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
            <animate attributeName="opacity" values="0;0.9;0"    dur="1.10s" repeatCount="indefinite" begin="-0.90s"/>
          </ellipse>
        </g>
        <g transform="rotate(180)">
          <ellipse cx="0" cy="0" rx="0" ry="0" fill="#ff5722" filter="url(#flame-particle-glow)">
            <animate attributeName="cy"      values="0;-28"      dur="1.60s" repeatCount="indefinite" begin="-0.30s" calcMode="spline" keySplines="0.2 0.8 0.4 1"/>
            <animate attributeName="rx"      values="0;4;0"      dur="1.60s" repeatCount="indefinite" begin="-0.30s" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
            <animate attributeName="ry"      values="0;7;0"      dur="1.60s" repeatCount="indefinite" begin="-0.30s" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
            <animate attributeName="opacity" values="0;0.80;0"   dur="1.60s" repeatCount="indefinite" begin="-0.30s"/>
          </ellipse>
        </g>
        <g transform="rotate(240)">
          <ellipse cx="0" cy="0" rx="0" ry="0" fill="#ff8c00" filter="url(#flame-particle-glow)">
            <animate attributeName="cy"      values="0;-25"      dur="1.40s" repeatCount="indefinite" begin="-1.10s" calcMode="spline" keySplines="0.2 0.8 0.4 1"/>
            <animate attributeName="rx"      values="0;3.5;0"    dur="1.40s" repeatCount="indefinite" begin="-1.10s" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
            <animate attributeName="ry"      values="0;6.5;0"    dur="1.40s" repeatCount="indefinite" begin="-1.10s" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
            <animate attributeName="opacity" values="0;0.85;0"   dur="1.40s" repeatCount="indefinite" begin="-1.10s"/>
          </ellipse>
        </g>
        <g transform="rotate(300)">
          <ellipse cx="0" cy="0" rx="0" ry="0" fill="#ffd600" filter="url(#flame-particle-glow)">
            <animate attributeName="cy"      values="0;-27"      dur="1.25s" repeatCount="indefinite" begin="-0.70s" calcMode="spline" keySplines="0.2 0.8 0.4 1"/>
            <animate attributeName="rx"      values="0;4;0"      dur="1.25s" repeatCount="indefinite" begin="-0.70s" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
            <animate attributeName="ry"      values="0;7;0"      dur="1.25s" repeatCount="indefinite" begin="-0.70s" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
            <animate attributeName="opacity" values="0;0.9;0"    dur="1.25s" repeatCount="indefinite" begin="-0.70s"/>
          </ellipse>
        </g>
      </g>

      <!-- Electron 1 — blue, orbit 0° -->
      <g transform="translate(100,100) rotate(0)">
        <circle r="4.5" fill="#90c4f8" filter="url(#atom-el-glow)">
          <animateMotion dur="2.4s" repeatCount="indefinite" begin="0s"
            path="M 78,0 A 78,27 0 0 1 -78,0 A 78,27 0 0 1 78,0"/>
        </circle>
      </g>

      <!-- Electron 2 — teal, orbit 60° -->
      <g transform="translate(100,100) rotate(60)">
        <circle r="4.5" fill="#5ddcb0" filter="url(#atom-el-glow)">
          <animateMotion dur="3.2s" repeatCount="indefinite" begin="-1.4s"
            path="M 78,0 A 78,27 0 0 1 -78,0 A 78,27 0 0 1 78,0"/>
        </circle>
      </g>

      <!-- Electron 3 — pink, orbit -60° -->
      <g transform="translate(100,100) rotate(-60)">
        <circle r="4.5" fill="#f0a6ca" filter="url(#atom-el-glow)">
          <animateMotion dur="1.85s" repeatCount="indefinite" begin="-0.7s"
            path="M 78,0 A 78,27 0 0 1 -78,0 A 78,27 0 0 1 78,0"/>
        </circle>
      </g>

      <!-- Nucleus core -->
      <circle cx="100" cy="100" r="10" fill="url(#fire-nuc-grad)" filter="url(#fire-nuc-glow)"/>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'AtomAnimation',
}
</script>

<style scoped>
.atom-wrap {
  display: flex;
  justify-content: center;
}

.atom-svg {
  width: 340px;
  height: 340px;
  overflow: visible;
  animation: fire-breathe 3s ease-in-out infinite;
}

@keyframes fire-breathe {
  0%, 100% {
    filter:
      drop-shadow(0 0 18px rgba(255, 100, 0, 0.45))
      drop-shadow(0 0 50px rgba(255, 50, 0, 0.20));
  }
  50% {
    filter:
      drop-shadow(0 0 30px rgba(255, 150, 0, 0.65))
      drop-shadow(0 0 72px rgba(255, 80, 0, 0.35));
  }
}
</style>
