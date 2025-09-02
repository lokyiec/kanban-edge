<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { Board } from '@kanban-edge/types'

const route = useRoute()
const id = route.params.id as string
// Placeholder board reference
const board: Partial<Board> = { id, title: `Board ${id}` }
</script>

<template>
  <section class="space-y-4">
    <h1 class="text-2xl font-semibold">{{ board.title }}</h1>
    <p class="text-muted-foreground">Szczegóły tablicy (placeholder).</p>
  </section>
</template>

