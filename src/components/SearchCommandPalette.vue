<script setup lang="ts">
import type { Pagefind } from 'vite-plugin-pagefind/types'
import { showSearch } from '@/stores/search'
import { debounce } from 'lodash-es'
import { onMounted, ref, watch } from 'vue'

const _props = withDefaults(defineProps<{
  placeholder?: string
  noResults?: string
}>(), {
  placeholder: 'Search...',
  noResults: 'No results found',
})

declare const window: Window & typeof globalThis

interface SearchResult {
  title: string
  content: string
  href: string
}

const input = ref<HTMLInputElement>()
const value = ref('')
const isLoading = ref(false)
const showResults = ref(true)
const currentSelection = ref(0)
const results = ref<SearchResult[]>([])
let pagefind: Pagefind

async function setupSearch() {
  try {
    // @ts-expect-error - dynamic import
    pagefind = await import('/pagefind/pagefind.js')
  } catch (error) {
    console.error('Pagefind module not found, will retry after build:', error)
  }
}

async function search() {
  if (!value.value.trim())
    return

  showResults.value = true
  results.value = []
  isLoading.value = true

  try {
    const searchResults = await pagefind.debouncedSearch(value.value)
    if (!searchResults)
      return

    const processedResults = await Promise.all(
      searchResults.results
        .slice(0, 5)
        .map(async (result) => {
          const data = await result.data()
          const excerpt = data.excerpt
            .replace(/<mark>/g, '<span class="bg-blue-500/20 rounded-md p-0.5">')
            .replace(/<\/mark>/g, '</span>')

          return {
            title: data.meta.title,
            content: excerpt,
            href: data.url,
          }
        }),
    )

    results.value = processedResults
  } catch (error) {
    console.error('Search failed:', error)
  } finally {
    isLoading.value = false
  }
}

const debouncedSearch = debounce(search, 300) // 300ms delay

watch(() => value.value, (newValue) => {
  if (!newValue.trim()) {
    results.value = []
    showResults.value = false
  } else {
    debouncedSearch()
  }
})

watch(showSearch, (newValue) => {
  if (newValue) {
    currentSelection.value = 0
    setTimeout(() => {
      input.value?.focus()
    }, 200)
  } else {
    value.value = ''
  }
})

onMounted(() => {
  setupSearch()

  window.addEventListener('keydown', (event) => {
    if (event.key === 'k' && event.metaKey) {
      showSearch.value = !showSearch.value
      event.preventDefault()
    }

    if (event.key === 'Escape' && showSearch.value) {
      showSearch.value = false
    }
  })
})
</script>

<template>
  <Transition name="fade">
    <div v-if="showSearch" class="relative z-50">
      <div
        role="dialog"
        aria-modal="true"
        class="fixed inset-0 z-10 w-screen overflow-y-auto p-4 pt-20 md:p-20"
      >
        <button
          class="fixed inset-0 z-0 cursor-default bg-stone-500/30 backdrop-blur-sm transition-opacity dark:bg-stone-950/70"
          @click="showSearch = false"
        >
          <span class="sr-only">hide search</span>
        </button>

        <div class="mx-auto max-w-xl transform overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all divide-y divide-stone-100 dark:bg-stone-900 dark:ring-white/20 dark:divide-white/10">
          <div class="relative flex flex-grow items-stretch focus-within:z-10">
            <input
              ref="input"
              v-model="value"
              type="text"
              :placeholder="placeholder"
              class="h-12 w-full border-0 bg-transparent pl-4 pr-4 text-stone-900 sm:text-sm dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-0"
              role="combobox"
              aria-expanded="false"
              aria-controls="options"
              @keydown="(event) => {
                if (event.key === 'Enter') {
                  if (!value.trim()) {
                    showSearch = false
                    return
                  }
                  if (currentSelection >= 0 && currentSelection < results.length) {
                    window.location.href = results[currentSelection].href
                  }
                  else {
                    showSearch = false
                  }
                }
                if (event.key === 'ArrowDown') {
                  currentSelection++
                  if (currentSelection >= results.length) currentSelection = 0
                }
                if (event.key === 'ArrowUp') {
                  currentSelection--
                  if (currentSelection < 0) currentSelection = results.length - 1
                }
              }"
            >
            <button
              type="button"
              class="relative inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm text-stone-900 font-semibold -ml-px dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800"
              @click="search"
            >
              <slot name="icon">
                <span class="i-ri-search-line text-stone-400" />
              </slot>
              <slot />
            </button>
          </div>

          <Transition name="slide">
            <div v-if="isLoading" class="flex items-center justify-center p-4 text-sm text-stone-500 dark:text-stone-400">
              <span class="i-ri-loader-4-line mr-2 animate-spin" />
              Searching...
            </div>
            <div v-else-if="showResults && value.trim()">
              <div v-if="results.length > 0" class="flex flex-col scroll-py-2 overflow-y-auto text-sm text-stone-800 divide-y divide-stone-100 dark:text-stone-200 dark:divide-white/5">
                <a
                  v-for="(result, i) in results"
                  :key="i"
                  :href="result.href"
                  class="w-full select-none px-4 py-2 text-left" :class="[
                    currentSelection === i ? 'bg-white/5' : 'hover:bg-white/5',
                  ]"
                  @click="showSearch = false"
                >
                  <div class="font-semibold">{{ result.title }}</div>
                  <div class="line-clamp-2 mt-2 text-xs" v-html="result.content" />
                </a>
              </div>
              <p v-else class="p-4 text-sm text-stone-500 dark:text-stone-400">
                {{ noResults }}
              </p>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.1s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
