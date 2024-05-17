import { defineStore } from 'pinia'
import { getHighlighterCore } from 'shiki/core'
import type { HighlighterCore } from 'shiki/core'
import { isDark } from '../logics'

export const useShikiStore = defineStore('pinia', () => {
  const highlighter = shallowRef<HighlighterCore>()
  const theme = computed(() => isDark.value ? 'rose-pine-moon' : 'rose-pine-dawn')

  if (typeof window !== 'undefined') {
    getHighlighterCore({
      themes: [
        import('shiki/themes/rose-pine-moon.mjs'),
        import('shiki/themes/rose-pine-dawn.mjs'),
      ],
      langs: [
        import('shiki/langs/vue.mjs'),
      ],
      loadWasm: import('shiki/wasm'),
    })
      .then((h) => {
        highlighter.value = h
      })
  }

  return {
    highlighter,
    theme,
  }
})
