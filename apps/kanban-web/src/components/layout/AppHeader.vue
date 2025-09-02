<script setup lang="ts">
import ThemeToggle from './ThemeToggle.vue'
import { onMounted, computed } from 'vue'
import { useThemeStore } from '../../stores/theme'
import { useBoardsStore } from '../../stores/boards'
import { useRoute } from 'vue-router'

const theme = useThemeStore()
const boards = useBoardsStore()
const route = useRoute()

onMounted(() => theme.init())

const currentBoardTitle = computed(() => {
  const slug = route.params.slug as string | undefined
  return boards.getBySlug(slug || '')?.title ?? 'Kanban'
})
</script>

<template>
  <header class="flex items-center justify-between border-b px-4 py-3">
    <div class="flex items-center gap-2">
      <span class="font-semibold">{{ currentBoardTitle }}</span>
    </div>
    <div class="flex items-center gap-2">
      <button class="rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground">+ Add New Task</button>
      <button class="h-9 w-9 rounded-full border">⋯</button>
      <ThemeToggle />
    </div>
  </header>
</template>
