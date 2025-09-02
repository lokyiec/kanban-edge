import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({ sidebarHidden: false }),
  actions: {
    toggleSidebar() { this.sidebarHidden = !this.sidebarHidden },
    showSidebar() { this.sidebarHidden = false },
    hideSidebar() { this.sidebarHidden = true },
  },
})

