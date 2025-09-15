<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBoardsStore } from '../stores/boards'
import { VueDraggable } from 'vue-draggable-plus'
import type { Column } from '../stores/boards'

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

function handleAdd(targetCol: Column, evt: any) {
  // When a card is dropped into a new column, update its columnId
  const index = typeof evt?.newIndex === 'number' ? evt.newIndex : -1
  const card = targetCol.cards?.[index]
  if (card) card.columnId = targetCol.id
}
</script>

<template>
  <section class="h-full">
    <!-- Empty state -->
    <div v-if="board && board.columns.length === 0" class="flex h-full items-center justify-center">
      <div class="text-center">
        <p class="text-muted-foreground">This board is empty. Create a new column to get started.</p>
        <button class="btn-primary mt-4">+ Add New Column</button>
      </div>
    </div>

    <!-- Columns -->
    <div v-else class="h-full overflow-x-auto">
      <!-- board content area padding to match design -->
      <div class="flex h-full gap-6 px-6 py-6">
        <div v-for="(col, i) in board?.columns" :key="col.id" class="min-w-[280px] flex-shrink-0">
          <div class="mb-3 flex items-center gap-2">
            <span class="h-2.5 w-2.5 rounded-full" :class="colors[i % colors.length]"></span>
            <h3 class="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              {{ col.title }} ({{ col.cards.length }})
            </h3>
          </div>
          <VueDraggable
            v-model="col.cards"
            :animation="200"
            group="kanban-cards"
            item-key="id"
            ghost-class="opacity-50"
            tag="div"
            class="grid gap-4 min-h-10"
            @add="handleAdd(col, $event)"
          >
            <article
              v-for="card in col.cards"
              :key="card.id"
              class="rounded-lg bg-card p-4 text-sm shadow-md border transition-shadow hover:shadow-lg cursor-move"
            >
              {{ card.title }}
              <div class="mt-2 text-xs text-muted-foreground">0 of 0 subtasks</div>
            </article>
          </VueDraggable>
        </div>
        <!-- New Column placeholder matching design -->
        <button
          class="group min-w-[280px] h-full flex-shrink-0 self-stretch mt-7 rounded-lg border border-dashed border-muted-foreground/20 bg-muted/20 p-4 text-lg font-medium text-primary/70 transition-colors hover:bg-muted/30 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          type="button"
        >
          <div class="h-full w-full grid place-content-center">
            + New Column
          </div>
        </button>
      </div>
    </div>
  </section>
</template>
