<template>
  <div class="pt-wrapper">
    <h1 class="pt-title">Periodic Table of the Elements</h1>

    <div v-if="loading" class="status-msg">Loading elements…</div>
    <div v-else-if="error" class="status-msg error">{{ error }}</div>

    <template v-else>
      <div class="search-wrap">
        <input
          v-model="searchQuery"
          class="search-input"
          type="search"
          placeholder="Search by name, symbol or number…"
          autocomplete="off"
          spellcheck="false"
        />
      </div>

      <AtomAnimation />

      <div class="pt-outer">
        <div class="pt-grid">

          <!-- Main-table elements -->
          <div
            v-for="el in mainElements"
            :key="el.atomicNumber"
            class="el-cell"
            :class="[getCategory(el), { 'filtered-out': !activeFilters.includes(getCategory(el)) || (searchQuery && !matchesSearch(el)) }]"
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
            :class="{ 'filtered-out': !activeFilters.includes('lanthanide') || (searchQuery && !matchesSearch(el)) }"
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
            :class="{ 'filtered-out': !activeFilters.includes('actinide') || (searchQuery && !matchesSearch(el)) }"
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

      <transition name="fade">
        <ElementModal
          v-if="selectedElement"
          :element="selectedElement"
          :image-url="elementImageUrl"
          :category="getCategory(selectedElement)"
          :category-label="getCategoryLabel(selectedElement)"
          @close="selectedElement = null"
        />
      </transition>

      <FilterPanel
        :categories="categories"
        v-model="activeFilters"
      />
    </template>
  </div>
</template>

<script>
import axios from 'axios'
import ElementModal from './components/ElementModal.vue'
import FilterPanel from './components/FilterPanel.vue'
import AtomAnimation from './components/AtomAnimation.vue'

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

const IMAGE_CACHE_MAX = 50

export default {
  name: 'App',
  components: { ElementModal, FilterPanel, AtomAnimation },
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
      searchQuery: '',
    }
  },
  computed: {
    mainElements() {
      return this.elements.filter(el => {
        const n = el.atomicNumber
        return el.group != null && el.period != null &&
          !(n >= 57 && n <= 71) && !(n >= 89 && n <= 103)
      })
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
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)
      fetch(
        `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(el.name)}&prop=pageimages&format=json&pithumbsize=300&origin=*`,
        { signal: controller.signal },
      )
        .then(r => r.json())
        .then(data => {
          clearTimeout(timeoutId)
          const pages = data.query.pages
          const page = pages[Object.keys(pages)[0]]
          const url = page.thumbnail?.source ?? null
          const keys = Object.keys(this.imageCache)
          if (keys.length >= IMAGE_CACHE_MAX) delete this.imageCache[keys[0]]
          this.imageCache[el.atomicNumber] = url
          this.elementImageUrl = url
        })
        .catch(() => {
          clearTimeout(timeoutId)
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
      if (e.key === 'Escape') {
        this.selectedElement = null
        this.searchQuery = ''
      }
    },
    matchesSearch(el) {
      const q = this.searchQuery.trim().toLowerCase()
      if (!q) return true
      return (
        el.name.toLowerCase().includes(q) ||
        el.symbol.toLowerCase().includes(q) ||
        String(el.atomicNumber).startsWith(q)
      )
    },
    getCategoryLabel(el) {
      const key = this.getCategory(el)
      return CATEGORIES.find(c => c.key === key)?.label ?? key
    },
    getCategory(el) {
      const n = el.atomicNumber
      if (n >= 57 && n <= 71)                                               return 'lanthanide'
      if (n >= 89 && n <= 103)                                              return 'actinide'
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

.search-wrap {
  width: min(420px, 90vw);
}

.search-input {
  width: 100%;
  padding: 10px 16px;
  background: #1a1a26;
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 8px;
  color: #e0e0e0;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.search-input::placeholder { color: #555; }
.search-input:focus {
  border-color: rgba(144, 196, 248, 0.5);
  box-shadow: 0 0 0 3px rgba(144, 196, 248, 0.08);
}
.search-input::-webkit-search-cancel-button { cursor: pointer; }

/* ── Horizontal scroll wrapper ── */
.pt-outer {
  overflow-x: auto;
  width: 100%;
  padding-bottom: 6px;
}

/* ── Periodic table grid ── */
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
.el-cell:not(.placeholder) { cursor: pointer; }

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

/* ── Series labels ── */
.series-label {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: clamp(8px, 0.62vw, 11px);
  color: #777;
  line-height: 1.45;
}

/* ── Category colours (global — used by grid cells and modal header) ── */
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

/* ── Legend swatches in FilterPanel ── */
.legend-swatch.alkali-metal     { background: #b03a2e; }
.legend-swatch.alkaline-earth   { background: #ca6f1e; }
.legend-swatch.transition-metal { background: #9a7d0a; }
.legend-swatch.post-transition  { background: #1e8449; }
.legend-swatch.metalloid        { background: #117a65; }
.legend-swatch.nonmetal         { background: #6c3483; }
.legend-swatch.halogen          { background: #935116; }
.legend-swatch.noble-gas        { background: #943476; }
.legend-swatch.lanthanide       { background: #1a5276; }
.legend-swatch.actinide         { background: #0e3460; }

/* ── Modal transition ── */
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
