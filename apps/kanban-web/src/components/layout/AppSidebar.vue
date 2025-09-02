<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBoardsStore } from '../../stores/boards'
import { useUiStore } from '../../stores/ui'
import ThemeToggle from './ThemeToggle.vue'

const boards = useBoardsStore()
const route = useRoute()
const ui = useUiStore()

const activeSlug = computed(() => route.params.slug as string | undefined)
</script>

<template>
  <aside
    class="hidden md:flex md:flex-col w-64 bg-card border-r"
    :class="{ 'md:hidden': ui.sidebarHidden }"
  >
    <!-- Logo / Brand -->
    <div class="h-14 flex items-center px-4 border-b">
      <div class="flex items-baseline gap-2">
        <div class="flex items-center gap-1">
          <span class="h-2 w-2 rounded-sm bg-primary"></span>
          <span class="h-2 w-2 rounded-sm bg-primary/80"></span>
          <span class="h-2 w-2 rounded-sm bg-primary/60"></span>
        </div>
        <span class="font-semibold tracking-tight">kanban</span>
      </div>
    </div>

    <!-- Boards list -->
    <div class="p-4 flex-1 overflow-auto">
      <div class="px-3 text-xs tracking-wider text-muted-foreground">ALL BOARDS ({{ boards.boards.length }})</div>
      <nav class="mt-2 space-y-1">
        <RouterLink
          v-for="b in boards.boards"
          :key="b.slug"
          :to="{ name: 'board', params: { slug: b.slug } }"
          class="block rounded-full px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
          :class="activeSlug === b.slug ? 'bg-primary text-primary-foreground hover:bg-primary' : ''"
        >
          {{ b.title }}
        </RouterLink>
        <button
          class="mt-2 w-full rounded-full px-3 py-2 text-left text-sm text-primary hover:underline"
          type="button"
        >
          + Create New Board
        </button>
      </nav>
    </div>

    <!-- Footer controls -->
    <div class="p-4 mt-auto grid gap-2 border-t">
      <div class="flex items-center justify-center"><ThemeToggle /></div>
      <button class="rounded-full px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground" @click="ui.toggleSidebar()">
        {{ ui.sidebarHidden ? 'Show Sidebar' : 'Hide Sidebar' }}
      </button>
    </div>
  </aside>
</template>
