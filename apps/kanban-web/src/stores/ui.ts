import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const sidebarHidden = ref(false)
  const createBoardModalOpen = ref(false)

  function toggleSidebar() { sidebarHidden.value = !sidebarHidden.value }
  function showSidebar() { sidebarHidden.value = false }
  function hideSidebar() { sidebarHidden.value = true }
  function openCreateBoardModal() { createBoardModalOpen.value = true }
  function closeCreateBoardModal() { createBoardModalOpen.value = false }

  return {
    sidebarHidden,
    createBoardModalOpen,
    toggleSidebar,
    showSidebar,
    hideSidebar,
    openCreateBoardModal,
    closeCreateBoardModal,
  }
})
