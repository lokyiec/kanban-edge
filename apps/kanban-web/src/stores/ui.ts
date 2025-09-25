import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const sidebarHidden = ref(false)
  const createBoardModalOpen = ref(false)
  const editBoardModalOpen = ref(false)
  const editingBoardId = ref<string | null>(null)
  const deleteBoardModalOpen = ref(false)
  const deletingBoardId = ref<string | null>(null)

  function toggleSidebar() { sidebarHidden.value = !sidebarHidden.value }
  function showSidebar() { sidebarHidden.value = false }
  function hideSidebar() { sidebarHidden.value = true }
  function openCreateBoardModal() { createBoardModalOpen.value = true }
  function closeCreateBoardModal() { createBoardModalOpen.value = false }
  function openEditBoardModal(boardId: string) {
    editingBoardId.value = boardId
    editBoardModalOpen.value = true
  }
  function closeEditBoardModal() {
    editBoardModalOpen.value = false
  }
  function openDeleteBoardModal(boardId: string) {
    deletingBoardId.value = boardId
    deleteBoardModalOpen.value = true
  }
  function closeDeleteBoardModal() {
    deleteBoardModalOpen.value = false
  }

  watch(editBoardModalOpen, value => {
    if (!value) editingBoardId.value = null
  })
  watch(deleteBoardModalOpen, value => {
    if (!value) deletingBoardId.value = null
  })

  return {
    sidebarHidden,
    createBoardModalOpen,
    editBoardModalOpen,
    editingBoardId,
    deleteBoardModalOpen,
    deletingBoardId,
    toggleSidebar,
    showSidebar,
    hideSidebar,
    openCreateBoardModal,
    closeCreateBoardModal,
    openEditBoardModal,
    closeEditBoardModal,
    openDeleteBoardModal,
    closeDeleteBoardModal,
  }
})
