<script setup lang="ts">
import type { Board } from '@kanban-edge/types'

const demo: Board = { id: 'b1', title: 'Demo Board' }
</script>

<template>
  <main style="font-family: system-ui, sans-serif; padding: 2rem">
    <h1>Kanban Web</h1>
    <p>Using shared types: {{ demo.title }} ({{ demo.id }})</p>
  </main>
  
</template>

<style>
html, body, #app { height: 100%; margin: 0; }
</style>

