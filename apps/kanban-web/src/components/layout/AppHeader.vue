<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeStore } from '../../stores/theme'
import { useBoardsStore } from '../../stores/boards'
import { useUiStore } from '../../stores/ui'

const theme = useThemeStore()
const boards = useBoardsStore()
const ui = useUiStore()
const route = useRoute()

const menuOpen = ref(false)
const menuRef = ref<HTMLElement | null>(null)

onMounted(() => {
  theme.init()
  document.addEventListener('click', handleOutsideClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
})

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
  },
)

const currentBoard = computed(() => {
  const slug = route.params.slug as string | undefined
  return boards.getBySlug(slug || '')
})

const currentBoardTitle = computed(() => currentBoard.value?.title ?? 'Kanban')
const hasBoard = computed(() => Boolean(currentBoard.value))
const canCreateTask = computed(() => Boolean(currentBoard.value && currentBoard.value.columns.length))

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function handleOutsideClick(event: MouseEvent) {
  if (!menuRef.value) return
  if (menuRef.value.contains(event.target as Node)) return
  menuOpen.value = false
}

function closeMenu() {
  menuOpen.value = false
}

function handleAddTask() {
  const board = currentBoard.value
  if (!board || !board.columns.length) return
  ui.openCreateTaskModal(board.id)
}

function handleEditBoard() {
  closeMenu()
  const board = currentBoard.value
  if (!board) return
  ui.openEditBoardModal(board.id)
}

function handleDeleteBoard() {
  closeMenu()
  const board = currentBoard.value
  if (!board) return
  ui.openDeleteBoardModal(board.id)
}
</script>

<template>
  <header class="flex items-center justify-between border-b px-4 py-3 bg-card/50 backdrop-blur">
    <div class="flex items-center gap-2">
      <span class="font-semibold">{{ currentBoardTitle }}</span>
    </div>
    <div class="flex items-center gap-2">
      <button class="btn-primary" :disabled="!canCreateTask" @click="handleAddTask">+ Add New Task</button>
      <div class="relative" ref="menuRef">
        <button class="btn-outline h-9 w-9 p-0" type="button" @click.stop="toggleMenu">⋯</button>
        <div
          v-if="menuOpen"
          class="absolute right-0 z-50 mt-2 w-44 rounded-md border bg-card py-2 text-sm shadow-lg"
          @click.stop
        >
          <button
            class="block w-full px-4 py-2 text-left text-muted-foreground hover:bg-muted disabled:opacity-50"
            type="button"
            :disabled="!hasBoard"
            @click="handleEditBoard"
          >
            Edit Board
          </button>
          <button
            class="block w-full px-4 py-2 text-left text-destructive hover:bg-destructive/10 disabled:opacity-50"
            type="button"
            :disabled="!hasBoard"
            @click="handleDeleteBoard"
          >
            Delete Board
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
