import { defineStore } from 'pinia'

type Theme = 'light' | 'dark'

export const useThemeStore = defineStore('theme', {
  state: () => ({ theme: 'light' as Theme }),
  actions: {
    init() {
      try {
        const stored = localStorage.getItem('theme') as Theme | null
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        this.theme = stored ?? (prefersDark ? 'dark' : 'light')
        document.documentElement.classList.toggle('dark', this.theme === 'dark')
      } catch {
        this.theme = 'light'
      }
    },
    toggle() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
      document.documentElement.classList.toggle('dark', this.theme === 'dark')
      try { localStorage.setItem('theme', this.theme) } catch {}
    },
  },
})

