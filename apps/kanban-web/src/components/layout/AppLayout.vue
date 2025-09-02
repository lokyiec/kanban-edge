<script setup lang="ts">
import AppHeader from './AppHeader.vue'
import AppSidebar from './AppSidebar.vue'
</script>

<template>
  <div class="grid h-dvh grid-rows-[auto_1fr]">
    <AppHeader />
    <div class="grid grid-cols-[auto_1fr]">
      <AppSidebar />
      <main class="p-4">
        <slot />
      </main>
    </div>
  </div>
</template>

