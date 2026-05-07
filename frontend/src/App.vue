<template>
  <div class="pt-wrapper">
    <LoadingScreen :show="showLoader" />

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
import LoadingScreen from './components/LoadingScreen.vue'

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
  components: { ElementModal, FilterPanel, AtomAnimation, LoadingScreen },
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
      showLoader: true,
      loaderTimerDone: false,
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
          const pages = data?.query?.pages
          if (!pages) {
            this.imageCache[el.atomicNumber] = null
            this.elementImageUrl = null
            return
          }
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
    setTimeout(() => {
      this.loaderTimerDone = true
      if (!this.loading) this.showLoader = false
    }, 800)

    const apiUrl = process.env.VUE_APP_API_URL || 'http://localhost:3000'
    axios.get(`${apiUrl}/elements`)
      .then(res => {
        this.elements = res.data
        this.loading = false
        if (this.loaderTimerDone) this.showLoader = false
      })
      .catch(err => {
        console.error(err)
        this.error = 'Could not load elements from the server.'
        this.loading = false
        if (this.loaderTimerDone) this.showLoader = false
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

<style src="./assets/app.css" />
