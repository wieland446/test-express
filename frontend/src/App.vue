<template>
  <div class="pt-wrapper">
    <h1 class="pt-title">Periodic Table of the Elements</h1>

    <div v-if="loading" class="status-msg">Loading elements…</div>
    <div v-else-if="error" class="status-msg error">{{ error }}</div>

    <template v-else>
      <div class="pt-outer">
        <div class="pt-grid">

          <!-- Main-table elements -->
          <div
            v-for="el in mainElements"
            :key="el.atomicNumber"
            class="el-cell"
            :class="[getCategory(el), { 'filtered-out': !activeFilters.includes(getCategory(el)) }]"
            :style="{ gridRow: Number(el.period), gridColumn: Number(el.group) }"
            @click="selectElement(el)"
          >
            <span class="el-an">{{ el.atomicNumber }}</span>
            <span class="el-sym">{{ el.symbol }}</span>
            <span class="el-nm">{{ el.name }}</span>
            <span class="el-aw">{{ formatWeight(el.atomicWeight) }}</span>
          </div>

          <!-- Lanthanide range placeholder at (period 6, group 3) -->
          <div class="el-cell lanthanide placeholder"
               :class="{ 'filtered-out': !activeFilters.includes('lanthanide') }"
               :style="{ gridRow: 6, gridColumn: 3 }">
            <span class="el-sym" style="font-size:0.65em">Ln</span>
            <span class="el-nm">57 – 71</span>
          </div>

          <!-- Actinide range placeholder at (period 7, group 3) -->
          <div class="el-cell actinide placeholder"
               :class="{ 'filtered-out': !activeFilters.includes('actinide') }"
               :style="{ gridRow: 7, gridColumn: 3 }">
            <span class="el-sym" style="font-size:0.65em">An</span>
            <span class="el-nm">89 – 103</span>
          </div>

          <!-- row 8 is a 20px spacer defined in grid-template-rows -->

          <!-- Lanthanide series -->
          <div class="series-label" :style="{ gridRow: 9, gridColumn: '1 / 3' }">
            Lanthanide<br>Series
          </div>
          <div
            v-for="(el, i) in lanthanides"
            :key="el.atomicNumber"
            class="el-cell lanthanide"
            :class="{ 'filtered-out': !activeFilters.includes('lanthanide') }"
            :style="{ gridRow: 9, gridColumn: i + 3 }"
            @click="selectElement(el)"
          >
            <span class="el-an">{{ el.atomicNumber }}</span>
            <span class="el-sym">{{ el.symbol }}</span>
            <span class="el-nm">{{ el.name }}</span>
            <span class="el-aw">{{ formatWeight(el.atomicWeight) }}</span>
          </div>

          <!-- Actinide series -->
          <div class="series-label" :style="{ gridRow: 10, gridColumn: '1 / 3' }">
            Actinide<br>Series
          </div>
          <div
            v-for="(el, i) in actinides"
            :key="el.atomicNumber"
            class="el-cell actinide"
            :class="{ 'filtered-out': !activeFilters.includes('actinide') }"
            :style="{ gridRow: 10, gridColumn: i + 3 }"
            @click="selectElement(el)"
          >
            <span class="el-an">{{ el.atomicNumber }}</span>
            <span class="el-sym">{{ el.symbol }}</span>
            <span class="el-nm">{{ el.name }}</span>
            <span class="el-aw">{{ formatWeight(el.atomicWeight) }}</span>
          </div>

        </div>
      </div>

      <!-- Element info modal -->
      <transition name="fade">
        <div v-if="selectedElement" class="el-modal-overlay" @click.self="selectedElement = null">
          <div class="el-modal">
            <button class="el-modal-close" @click="selectedElement = null">✕</button>
            <div class="el-modal-header" :class="getCategory(selectedElement)">
              <span class="el-modal-an">{{ selectedElement.atomicNumber }}</span>
              <span class="el-modal-sym">{{ selectedElement.symbol }}</span>
              <span class="el-modal-nm">{{ selectedElement.name }}</span>
              <span class="el-modal-aw">{{ formatWeight(selectedElement.atomicWeight) }}</span>
            </div>
            <div class="el-modal-body">
              <div v-if="elementImageUrl" class="el-modal-img-wrap">
                <img :src="elementImageUrl" :alt="selectedElement.name" class="el-modal-img" />
              </div>
              <div class="el-modal-row"><span>Atomic Weight</span><span>{{ selectedElement.atomicWeight }}</span></div>
              <div class="el-modal-row"><span>Group</span><span>{{ selectedElement.group ?? '–' }}</span></div>
              <div class="el-modal-row"><span>Period</span><span>{{ selectedElement.period }}</span></div>
              <div class="el-modal-row"><span>Block</span><span>{{ selectedElement.block }}</span></div>
              <div class="el-modal-row"><span>Category</span><span>{{ getCategoryLabel(selectedElement) }}</span></div>
              <a
                :href="'https://en.wikipedia.org/wiki/' + selectedElement.name"
                target="_blank"
                rel="noopener"
                class="el-modal-wiki-btn"
              >
                <span class="wiki-btn-shimmer"></span>
                <svg class="wiki-btn-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.09 13.119c-.936 1.932-2.217 4.548-2.853 5.728-.616 1.092-1.017 1.808-1.153 2.109-.139.310-.202.546-.202.703 0 .498.387.866.886.866.405 0 .744-.229.996-.684l3.906-7.897 3.906 7.897c.252.455.591.684.997.684.499 0 .886-.368.886-.866 0-.157-.063-.393-.202-.703-.136-.301-.537-1.017-1.153-2.109-.636-1.18-1.917-3.796-2.853-5.728-.273-.548-.523-1.058-.747-1.524l-1.358-2.749-1.358 2.749c-.224.466-.474.976-.747 1.524zM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm1.5 0C3.5 16.687 7.313 20.5 12 20.5S20.5 16.687 20.5 12 16.687 3.5 12 3.5 3.5 7.313 3.5 12z"/>
                </svg>
                <span class="wiki-btn-text">Open in Wikipedia</span>
                <svg class="wiki-btn-arrow" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </transition>

      <!-- Filters -->
      <div class="filters">
        <div class="filters-header">
          <span class="filters-title">Filter by category</span>
          <button class="filters-toggle" @click="activeFilters = activeFilters.length === categories.length ? [] : categories.map(c => c.key)">
            {{ activeFilters.length === categories.length ? 'Deselect all' : 'Select all' }}
          </button>
        </div>
        <label v-for="cat in categories" :key="cat.key" class="filter-item">
          <input type="checkbox" :value="cat.key" v-model="activeFilters" />
          <div class="legend-swatch" :class="cat.key"></div>
          <span>{{ cat.label }}</span>
        </label>
      </div>
    </template>
  </div>
</template>

<script>
import axios from 'axios'

const CATEGORIES = [
  { key: 'alkali-metal',     label: 'Alkali Metal' },
  { key: 'alkaline-earth',   label: 'Alkaline Earth' },
  { key: 'transition-metal', label: 'Transition Metal' },
  { key: 'post-transition',  label: 'Post-Transition Metal' },
  { key: 'metalloid',        label: 'Metalloid' },
  { key: 'nonmetal',         label: 'Nonmetal' },
  { key: 'halogen',          label: 'Halogen' },
  { key: 'noble-gas',        label: 'Noble Gas' },
  { key: 'lanthanide',       label: 'Lanthanide' },
  { key: 'actinide',         label: 'Actinide' },
]

export default {
  name: 'App',
  data() {
    return {
      elements: [],
      loading: true,
      error: null,
      categories: CATEGORIES,
      selectedElement: null,
      elementImageUrl: null,
      activeFilters: CATEGORIES.map(c => c.key),
      imageCache: {},
    }
  },
  computed: {
    mainElements() {
      return this.elements.filter(
        el =>
          !((el.atomicNumber >= 57 && el.atomicNumber <= 71) ||
            (el.atomicNumber >= 89 && el.atomicNumber <= 103)) &&
          el.group != null && el.period != null
      )
    },
    lanthanides() {
      return [...this.elements]
        .filter(el => el.atomicNumber >= 57 && el.atomicNumber <= 71)
        .sort((a, b) => a.atomicNumber - b.atomicNumber)
    },
    actinides() {
      return [...this.elements]
        .filter(el => el.atomicNumber >= 89 && el.atomicNumber <= 103)
        .sort((a, b) => a.atomicNumber - b.atomicNumber)
    },
  },
  watch: {
    selectedElement(el) {
      this.elementImageUrl = null
      if (!el) return
      if (this.imageCache[el.atomicNumber] !== undefined) {
        this.elementImageUrl = this.imageCache[el.atomicNumber]
        return
      }
      fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(el.name)}&prop=pageimages&format=json&pithumbsize=300&origin=*`)
        .then(r => r.json())
        .then(data => {
          const pages = data.query.pages
          const page = pages[Object.keys(pages)[0]]
          const url = page.thumbnail?.source ?? null
          this.imageCache[el.atomicNumber] = url
          this.elementImageUrl = url
        })
        .catch(() => {
          this.imageCache[el.atomicNumber] = null
          this.elementImageUrl = null
        })
    },
  },
  mounted() {
    const apiUrl = process.env.VUE_APP_API_URL || 'http://localhost:3000'
    axios.get(`${apiUrl}/elements`)
      .then(res => {
        this.elements = res.data
        this.loading = false
      })
      .catch(err => {
        console.error(err)
        this.error = 'Could not load elements from the server.'
        this.loading = false
      })
    window.addEventListener('keydown', this.onKeydown)
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.onKeydown)
  },
  methods: {
    selectElement(el) {
      this.selectedElement = el
    },
    onKeydown(e) {
      if (e.key === 'Escape') this.selectedElement = null
    },
    getCategoryLabel(el) {
      const key = this.getCategory(el)
      return CATEGORIES.find(c => c.key === key)?.label ?? key
    },
    getCategory(el) {
      const n = el.atomicNumber
      if ([2, 10, 18, 36, 54, 86, 118].includes(n))                        return 'noble-gas'
      if ([9, 17, 35, 53, 85, 117].includes(n))                            return 'halogen'
      if ([3, 11, 19, 37, 55, 87].includes(n))                             return 'alkali-metal'
      if ([4, 12, 20, 38, 56, 88].includes(n))                             return 'alkaline-earth'
      if (el.block === 'd')                                                 return 'transition-metal'
      if ([5, 14, 32, 33, 51, 52, 84].includes(n))                         return 'metalloid'
      if ([1, 6, 7, 8, 15, 16, 34].includes(n))                            return 'nonmetal'
      if ([13, 31, 49, 50, 81, 82, 83, 113, 114, 115, 116].includes(n))   return 'post-transition'
      return 'unknown'
    },
    formatWeight(w) {
      if (w == null) return ''
      const n = Number(w)
      if (isNaN(n)) return ''
      return n % 1 === 0 ? `(${n})` : parseFloat(n.toFixed(3)).toString()
    },
  },
}
</script>

<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: #0d0d14;
  color: #e0e0e0;
  font-family: 'Segoe UI', Arial, sans-serif;
  min-height: 100vh;
}

#app { width: 100%; }

.pt-wrapper {
  padding: 24px 12px 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.pt-title {
  font-size: clamp(1.1rem, 2.4vw, 2rem);
  font-weight: 700;
  letter-spacing: 0.06em;
  color: #fff;
  text-align: center;
}

.status-msg { font-size: 1.1rem; color: #aaa; padding: 48px; }
.status-msg.error { color: #e74c3c; }

/* ── Horizontal scroll wrapper ── */
.pt-outer {
  overflow-x: auto;
  width: 100%;
  padding-bottom: 6px;
}

/* ── Periodic table grid ──
   18 columns for groups 1-18.
   Rows 1-7  → periods 1-7
   Row  8    → 20px spacer
   Rows 9-10 → lanthanide / actinide f-block series
*/
.pt-grid {
  display: grid;
  grid-template-columns: repeat(18, clamp(52px, 4.15vw, 72px));
  grid-template-rows:
    repeat(7, clamp(52px, 4.15vw, 72px))
    20px
    repeat(2, clamp(52px, 4.15vw, 72px));
  gap: 2px;
  width: max-content;
  margin: 0 auto;
}

/* ── Cell base ── */
.el-cell {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 2px 3px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.07);
  cursor: default;
  transition: transform 0.12s ease, filter 0.12s ease, border-color 0.12s ease;
}

.el-cell:hover {
  transform: scale(1.2);
  z-index: 20;
  filter: brightness(1.3);
  border-color: rgba(255,255,255,0.45);
}

.el-cell.placeholder { opacity: 0.5; }
.el-cell.filtered-out { opacity: 0.1; pointer-events: none; }

.el-an {
  position: absolute;
  top: 3px;
  left: 4px;
  font-size: clamp(7px, 0.62vw, 10px);
  font-weight: 600;
  opacity: 0.9;
}

.el-sym {
  font-size: clamp(15px, 1.55vw, 23px);
  font-weight: 800;
  line-height: 1;
  margin-top: 8px;
}

.el-nm {
  font-size: clamp(5px, 0.52vw, 8px);
  opacity: 0.88;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  padding: 0 2px;
}

.el-aw {
  font-size: clamp(5px, 0.48vw, 7px);
  opacity: 0.72;
}

/* ── Series labels (Lanthanide / Actinide) ── */
.series-label {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: clamp(8px, 0.62vw, 11px);
  color: #777;
  line-height: 1.45;
}

/* ── Category colours ── */
.alkali-metal     { background: #b03a2e; color: #fff; }
.alkaline-earth   { background: #ca6f1e; color: #fff; }
.transition-metal { background: #9a7d0a; color: #fff; }
.post-transition  { background: #1e8449; color: #fff; }
.metalloid        { background: #117a65; color: #fff; }
.nonmetal         { background: #6c3483; color: #fff; }
.halogen          { background: #935116; color: #fff; }
.noble-gas        { background: #943476; color: #fff; }
.lanthanide       { background: #1a5276; color: #fff; }
.actinide         { background: #0e3460; color: #fff; }
.unknown          { background: #3d3d3d; color: #ccc; }

/* ── Filters ── */
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 18px;
  justify-content: center;
  align-items: center;
  padding: 14px 22px;
  background: rgba(255,255,255,0.04);
  border-radius: 8px;
  max-width: 960px;
  width: 100%;
}

.filters-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.filters-title {
  font-size: 0.78rem;
  color: #888;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.filters-toggle {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.18);
  color: #bbb;
  font-size: 0.75rem;
  padding: 3px 10px;
  border-radius: 4px;
  cursor: pointer;
}
.filters-toggle:hover { background: rgba(255,255,255,0.08); color: #fff; }

.filter-item {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: clamp(10px, 0.85vw, 13px);
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
}
.filter-item input[type="checkbox"] { accent-color: #6ba4d8; cursor: pointer; }

.legend-swatch {
  width: 16px;
  height: 16px;
  border-radius: 3px;
  flex-shrink: 0;
}

/* ── Element cells: pointer cursor ── */
.el-cell:not(.placeholder) { cursor: pointer; }

/* ── Info modal ── */
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

.wiki-btn-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  opacity: 0.85;
  transition: opacity 0.18s;
}
.el-modal-wiki-btn:hover .wiki-btn-icon { opacity: 1; }

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

/* ── Modal fade + pop transition ── */
.fade-enter-active { transition: opacity 0.25s ease; }
.fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.fade-enter-active .el-modal {
  animation: modal-pop-in 0.38s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
}
.fade-leave-active .el-modal {
  animation: modal-pop-out 0.2s ease-in both;
}

@keyframes modal-pop-in {
  from { opacity: 0; transform: scale(0.72) translateY(48px); }
  to   { opacity: 1; transform: scale(1)    translateY(0); }
}
@keyframes modal-pop-out {
  from { opacity: 1; transform: scale(1)    translateY(0); }
  to   { opacity: 0; transform: scale(0.85) translateY(24px); }
}
</style>
