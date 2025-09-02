<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBoardsStore } from '../stores/boards'

const router = useRouter()
const boards = useBoardsStore()

const hasBoards = computed(() => boards.boards.length > 0)

onMounted(() => {
  if (hasBoards.value) {
    const first = boards.firstBoardSlug
    if (first) router.replace({ name: 'board', params: { slug: first } })
  }
})
</script>

<template>
  <div v-if="hasBoards" class="p-4 text-muted-foreground">Redirecting…</div>
  <div v-else class="flex h-full items-center justify-center">
    <div class="text-center">
      <p class="text-muted-foreground">No boards yet. Create a board to get started.</p>
      <button class="mt-4 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground">+ Create New Board</button>
    </div>
  </div>
</template>
