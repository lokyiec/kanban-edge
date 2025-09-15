import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const sidebarHidden = ref(false)

  function toggleSidebar() { sidebarHidden.value = !sidebarHidden.value }
  function showSidebar() { sidebarHidden.value = false }
  function hideSidebar() { sidebarHidden.value = true }

  return { sidebarHidden, toggleSidebar, showSidebar, hideSidebar }
})
