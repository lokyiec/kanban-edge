<script setup lang="ts">
import ThemeToggle from './ThemeToggle.vue'
import { onMounted } from 'vue'
import { useThemeStore } from '../../stores/theme'
const theme = useThemeStore()
onMounted(() => theme.init())
</script>

<template>
  <header class="flex items-center justify-between border-b px-4 py-2">
    <div class="flex items-center gap-2">
      <span class="font-semibold">Kanban</span>
      <span class="text-xs text-muted-foreground">edge</span>
    </div>
    <ThemeToggle />
  </header>
</template>

