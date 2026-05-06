<template>
  <div class="atom-wrap">
    <svg class="atom-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="atom-nuc-glow" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="atom-el-glow" x="-250%" y="-250%" width="600%" height="600%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <radialGradient id="atom-nuc-grad" cx="36%" cy="30%" r="70%">
          <stop offset="0%"   stop-color="#ffffff"/>
          <stop offset="50%"  stop-color="#90c4f8"/>
          <stop offset="100%" stop-color="#2860a8"/>
        </radialGradient>
      </defs>

      <!-- Orbit rings -->
      <g transform="translate(100,100) rotate(0)">
        <ellipse rx="78" ry="27" fill="none" stroke="rgba(144,196,248,0.22)" stroke-width="1"/>
      </g>
      <g transform="translate(100,100) rotate(60)">
        <ellipse rx="78" ry="27" fill="none" stroke="rgba(144,196,248,0.22)" stroke-width="1"/>
      </g>
      <g transform="translate(100,100) rotate(-60)">
        <ellipse rx="78" ry="27" fill="none" stroke="rgba(144,196,248,0.22)" stroke-width="1"/>
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

      <!-- Nucleus pulse halo -->
      <circle cx="100" cy="100" fill="#5aadff">
        <animate attributeName="r"       values="10;24;10" dur="2.4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
        <animate attributeName="opacity" values="0.35;0;0.35" dur="2.4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
      </circle>

      <!-- Nucleus core -->
      <circle cx="100" cy="100" r="10" fill="url(#atom-nuc-grad)" filter="url(#atom-nuc-glow)"/>
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
}
</style>
