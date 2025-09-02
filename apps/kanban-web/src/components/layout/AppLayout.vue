<script setup lang="ts">
import AppHeader from './AppHeader.vue'
import AppSidebar from './AppSidebar.vue'
import { useUiStore } from '../../stores/ui'
const ui = useUiStore()
</script>

<template>
  <div class="grid h-dvh grid-rows-[auto_1fr]">
    <AppHeader />
    <div class="grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr]">
      <AppSidebar />
      <main class="p-4" :class="ui.sidebarHidden ? 'md:col-span-2' : ''">
        <slot />
      </main>
    </div>
  </div>
</template>
