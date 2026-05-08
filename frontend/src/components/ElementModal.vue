<template>
  <div class="el-modal-overlay" @click.self="$emit('close')">
    <div class="el-modal">
      <button class="el-modal-close" @click="$emit('close')">✕</button>
      <div class="el-modal-header" :class="category">
        <span class="el-modal-an">{{ element.atomicNumber }}</span>
        <span class="el-modal-sym">{{ element.symbol }}</span>
        <span class="el-modal-nm">{{ element.name }}</span>
        <span class="el-modal-aw">{{ formatWeight(element.atomicWeight) }}</span>
      </div>
      <div class="el-modal-body">
        <div v-if="imageUrl" class="el-modal-img-wrap">
          <img :src="imageUrl" :alt="element.name" class="el-modal-img" />
        </div>
        <div class="el-modal-row"><span>Atomic Weight</span><span>{{ element.atomicWeight }}</span></div>
        <div class="el-modal-row"><span>Group</span><span>{{ element.group ?? '–' }}</span></div>
        <div class="el-modal-row"><span>Period</span><span>{{ element.period }}</span></div>
        <div class="el-modal-row"><span>Block</span><span>{{ element.block }}</span></div>
        <div class="el-modal-row"><span>Category</span><span>{{ categoryLabel }}</span></div>
        <a
          :href="'https://en.wikipedia.org/wiki/' + encodeURIComponent(element.name)"
          target="_blank"
          rel="noopener noreferrer"
          class="el-modal-wiki-btn"
        >
          <span class="wiki-btn-shimmer"></span>
<span class="wiki-btn-text">Open in Wikipedia</span>
          <svg class="wiki-btn-arrow" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ElementModal',
  props: {
    element: { type: Object, required: true },
    imageUrl: { type: String, default: null },
    category: { type: String, required: true },
    categoryLabel: { type: String, required: true },
  },
  emits: ['close'],
  methods: {
    formatWeight(w) {
      if (w == null) return ''
      const n = Number(w)
      if (isNaN(n)) return ''
      return n % 1 === 0 ? `(${n})` : parseFloat(n.toFixed(3)).toString()
    },
  },
}
</script>

<style scoped>
.el-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.el-modal {
  position: relative;
  background: #1a1a26;
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 10px;
  width: min(340px, 90vw);
  overflow: hidden;
  box-shadow: 0 8px 40px rgba(0,0,0,0.6);
}

.el-modal-close {
  position: absolute;
  top: 10px;
  right: 12px;
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.6);
  font-size: 1.1rem;
  cursor: pointer;
  line-height: 1;
  padding: 2px 6px;
  border-radius: 4px;
  z-index: 1;
}
.el-modal-close:hover { color: #fff; background: rgba(255,255,255,0.1); }

.el-modal-header {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 28px 16px 20px;
  gap: 2px;
}

.el-modal-an {
  position: absolute;
  top: 10px;
  left: 14px;
  font-size: 0.85rem;
  font-weight: 600;
  opacity: 0.85;
}

.el-modal-sym {
  font-size: 3.8rem;
  font-weight: 800;
  line-height: 1;
}

.el-modal-nm {
  font-size: 1.1rem;
  font-weight: 600;
  opacity: 0.9;
}

.el-modal-aw {
  font-size: 0.8rem;
  opacity: 0.7;
  margin-top: 2px;
}

.el-modal-body {
  padding: 16px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.el-modal-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  padding-bottom: 8px;
}
.el-modal-row:last-child { border-bottom: none; padding-bottom: 0; }
.el-modal-row span:first-child { color: #888; }
.el-modal-row span:last-child  { font-weight: 600; }

.el-modal-img-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 4px;
}
.el-modal-img {
  max-width: 200px;
  max-height: 160px;
  border-radius: 6px;
  object-fit: contain;
  background: rgba(255,255,255,0.05);
}

.el-modal-wiki-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 12px;
  padding: 11px 20px;
  border-radius: 8px;
  background: linear-gradient(135deg, #1a3a5c 0%, #0f2a45 50%, #1a3a5c 100%);
  border: 1px solid rgba(107, 164, 216, 0.35);
  color: #90c4f8;
  font-size: 0.88rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease, color 0.18s ease;
  box-shadow: 0 0 12px rgba(107, 164, 216, 0.18), inset 0 1px 0 rgba(255,255,255,0.07);
  animation: wiki-btn-pulse 2.8s ease-in-out infinite;
}

.el-modal-wiki-btn:hover {
  transform: translateY(-2px) scale(1.02);
  color: #fff;
  border-color: rgba(144, 196, 248, 0.7);
  box-shadow: 0 0 24px rgba(107, 164, 216, 0.5), 0 6px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12);
  animation: none;
}

.el-modal-wiki-btn:active {
  transform: translateY(0) scale(0.99);
  box-shadow: 0 0 10px rgba(107, 164, 216, 0.3);
}

.wiki-btn-shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(105deg, transparent 35%, rgba(144, 196, 248, 0.18) 50%, transparent 65%);
  background-size: 200% 100%;
  animation: wiki-shimmer 2.4s linear infinite;
  pointer-events: none;
}

.el-modal-wiki-btn:hover .wiki-btn-shimmer {
  animation: wiki-shimmer 1s linear infinite;
}

.wiki-btn-text {
  flex: 1;
  text-align: center;
}

.wiki-btn-arrow {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  transition: transform 0.22s ease;
}
.el-modal-wiki-btn:hover .wiki-btn-arrow { transform: translateX(4px); }

@keyframes wiki-shimmer {
  0%   { background-position: 200% center; }
  100% { background-position: -200% center; }
}

@keyframes wiki-btn-pulse {
  0%, 100% { box-shadow: 0 0 12px rgba(107, 164, 216, 0.18), inset 0 1px 0 rgba(255,255,255,0.07); }
  50%       { box-shadow: 0 0 20px rgba(107, 164, 216, 0.38), inset 0 1px 0 rgba(255,255,255,0.07); }
}
</style>

<style>
body.light-mode .el-modal {
  background: #ffffff;
  border-color: rgba(0,0,0,0.12);
  box-shadow: 0 8px 40px rgba(0,0,0,0.18);
}
body.light-mode .el-modal-close {
  color: rgba(0,0,0,0.45);
}
body.light-mode .el-modal-close:hover {
  color: #000;
  background: rgba(0,0,0,0.07);
}
body.light-mode .el-modal-row {
  border-bottom-color: rgba(0,0,0,0.07);
}
body.light-mode .el-modal-row span:first-child { color: #666; }
body.light-mode .el-modal-img { background: rgba(0,0,0,0.04); }
</style>
