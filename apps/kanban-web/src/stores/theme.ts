import { defineStore } from 'pinia'
import { ref } from 'vue'

type Theme = 'light' | 'dark'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<Theme>('light')

  function applyDomClass() {
    document.documentElement.classList.toggle('dark', theme.value === 'dark')
  }

  function init() {
    try {
      const stored = localStorage.getItem('theme') as Theme | null
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      theme.value = stored ?? (prefersDark ? 'dark' : 'light')
      applyDomClass()
    } catch {
      theme.value = 'light'
    }
  }

  function toggle() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    applyDomClass()
    try { localStorage.setItem('theme', theme.value) } catch {}
  }

  return { theme, init, toggle }
})
