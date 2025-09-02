<script setup lang="ts">
import AppHeader from './AppHeader.vue'
import AppSidebar from './AppSidebar.vue'
import { useUiStore } from '../../stores/ui'
const ui = useUiStore()
</script>

<template>
  <div
    class="grid h-dvh"
    :class="ui.sidebarHidden ? 'grid-cols-1' : 'grid-cols-[auto_1fr]'"
  >
    <AppSidebar />

    <div class="grid grid-rows-[auto_1fr]" :class="ui.sidebarHidden ? '' : 'border-l'">
      <AppHeader />
      <main class="p-4 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>
