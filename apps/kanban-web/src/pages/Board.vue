<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBoardsStore } from '../stores/boards'

const route = useRoute()
const boards = useBoardsStore()

const board = computed(() => boards.getBySlug((route.params.slug as string) || ''))

const colors = [
  'bg-violet-500',
  'bg-blue-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-pink-500',
]
</script>

<template>
  <section class="h-full">
    <!-- Empty state -->
    <div v-if="board && board.columns.length === 0" class="flex h-full items-center justify-center">
      <div class="text-center">
        <p class="text-muted-foreground">This board is empty. Create a new column to get started.</p>
        <button class="mt-4 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground">+ Add New Column</button>
      </div>
    </div>

    <!-- Columns -->
    <div v-else class="h-full overflow-x-auto">
      <div class="flex gap-6 pr-6">
        <div v-for="(col, i) in board?.columns" :key="col.id" class="min-w-[280px] flex-shrink-0">
          <div class="mb-3 flex items-center gap-2">
            <span class="h-2.5 w-2.5 rounded-full" :class="colors[i % colors.length]"></span>
            <h3 class="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              {{ col.title }} ({{ col.cards.length }})
            </h3>
          </div>
          <div class="grid gap-3">
            <article
              v-for="card in col.cards"
              :key="card.id"
              class="rounded-md bg-card p-4 text-sm shadow-sm border"
            >
              {{ card.title }}
              <div class="mt-2 text-xs text-muted-foreground">0 of 0 subtasks</div>
            </article>
          </div>
        </div>
        <button class="min-w-[280px] flex-shrink-0 self-start rounded-md bg-gradient-to-br from-accent/40 to-accent/20 p-4 text-left text-sm hover:from-accent/60">
          + New Column
        </button>
      </div>
    </div>
  </section>
</template>
