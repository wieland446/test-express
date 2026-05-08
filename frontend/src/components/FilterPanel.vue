<template>
  <div class="filters">
    <div class="filters-header">
      <span class="filters-title">Filter by category</span>
      <button class="filters-toggle" @click="toggleAll">
        {{ modelValue.length === categories.length ? 'Deselect all' : 'Select all' }}
      </button>
    </div>
    <label v-for="cat in categories" :key="cat.key" class="filter-item">
      <input type="checkbox" :value="cat.key" :checked="modelValue.includes(cat.key)" @change="toggle(cat.key)" />
      <div class="legend-swatch" :class="cat.key"></div>
      <span>{{ cat.label }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'FilterPanel',
  props: {
    categories: { type: Array, required: true },
    modelValue: { type: Array, required: true },
  },
  emits: ['update:modelValue'],
  methods: {
    toggle(key) {
      const next = this.modelValue.includes(key)
        ? this.modelValue.filter(k => k !== key)
        : [...this.modelValue, key]
      this.$emit('update:modelValue', next)
    },
    toggleAll() {
      const next = this.modelValue.length === this.categories.length
        ? []
        : this.categories.map(c => c.key)
      this.$emit('update:modelValue', next)
    },
  },
}
</script>

<style scoped>
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
</style>

<style>
body.light-mode .filters {
  background: rgba(0,0,0,0.04);
}
body.light-mode .filters-title {
  color: #666;
}
body.light-mode .filters-toggle {
  border-color: rgba(0,0,0,0.18);
  color: #444;
}
body.light-mode .filters-toggle:hover {
  background: rgba(0,0,0,0.07);
  color: #111;
}
</style>
