<script setup lang="ts">
import { useThemeStore } from '../../stores/theme'
const theme = useThemeStore()
</script>

<template>
  <button
    class="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
    @click="theme.toggle()"
    aria-label="Toggle theme"
  >
    <span aria-hidden="true">{{ theme.theme === 'dark' ? '🌙' : '☀️' }}</span>
    <span class="hidden sm:inline">{{ theme.theme === 'dark' ? 'Dark' : 'Light' }}</span>
  </button>
</template>
