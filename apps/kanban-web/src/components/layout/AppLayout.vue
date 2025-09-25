<script setup lang="ts">
import AppHeader from './AppHeader.vue'
import AppSidebar from './AppSidebar.vue'
import AddBoardModal from '../boards/AddBoardModal.vue'
import ConfirmDeleteBoardModal from '../boards/ConfirmDeleteBoardModal.vue'
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
  <AddBoardModal v-model="ui.createBoardModalOpen" />
  <AddBoardModal v-model="ui.editBoardModalOpen" mode="edit" :board-id="ui.editingBoardId || undefined" />
  <ConfirmDeleteBoardModal
    v-model="ui.deleteBoardModalOpen"
    :board-id="ui.deletingBoardId || undefined"
  />
</template>
