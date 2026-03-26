import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useTheme = defineStore(
  'theme',
  () => {
    const isDark = ref(false)

    function toggle() {
      isDark.value = !isDark.value
    }

    function applyTheme(dark: boolean) {
      document.documentElement.classList.toggle('dark', dark)
    }

    watch(isDark, applyTheme, { immediate: true })

    return { isDark, toggle }
  },
  { persist: true },
)
