<script setup lang="ts">
import { showSearch } from '@/stores/search'
import { onMounted, ref, watch } from 'vue'

interface SearchResult {
  title: string
  content: string
  href: string
}

const _props = withDefaults(defineProps<{
  placeholder?: string
  noResults?: string
}>(), {
  placeholder: 'Search...',
  noResults: 'No results found',
})

const input = ref<HTMLInputElement>()
const value = ref('')
const showResults = ref(true)
const currentSelection = ref(0)
const results = ref<SearchResult[]>([])
let pagefind: any

async function setupSearch() {
  try {
    // @ts-expect-error test '/pagefind/pagefind.js'.
    pagefind = await import('/pagefind/pagefind.js')
  // eslint-disable-next-line unused-imports/no-unused-vars
  } catch (error) {
    console.error('Pagefind module not found, will retry after build')
  }
}

async function search() {
  if (!value.value.trim())
    return

  showResults.value = true
  results.value = []

  const searchResults = await pagefind.debouncedSearch(value.value)
  if (!searchResults)
    return

  const newResults = []

  for (let i = 0; i < searchResults.results.length && i < 5; i++) {
    const result = await searchResults.results[i].data()
    let excerpt = result.excerpt
    excerpt = excerpt.replaceAll(
      '<mark>',
      '<span class="bg-accent-500/20 rounded-md p-0.5">',
    )
    excerpt = excerpt.replaceAll('</mark>', '</span>')

    newResults[i] = {
      title: result.meta.title,
      content: excerpt,
      href: result.url,
    }
  }

  results.value = newResults
}

watch(() => value.value, (newValue) => {
  if (!newValue.trim()) {
    results.value = []
    showResults.value = false
  } else {
    search()
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
          class="bg-base-500/30 dark:bg-base-950/70 fixed inset-0 z-0 cursor-default backdrop-blur-sm transition-opacity"
          @click="showSearch = false"
        >
          <span class="sr-only">hide search</span>
        </button>

        <div class="divide-base-100 dark:bg-base-900 mx-auto max-w-xl transform overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all divide-y dark:ring-white/20 dark:divide-white/10">
          <div class="relative flex flex-grow items-stretch focus-within:z-10">
            <input
              ref="input"
              v-model="value"
              type="text"
              :placeholder="placeholder"
              class="text-base-900 placeholder:text-base-400 dark:text-base-100 h-12 w-full border-0 bg-transparent pl-4 pr-4 sm:text-sm focus:ring-0"
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
          </div>

          <Transition name="slide">
            <div v-if="showResults && value.trim()">
              <div v-if="results.length > 0" class="divide-base-100 text-base-800 dark:text-base-200 flex flex-col scroll-py-2 overflow-y-auto text-sm divide-y dark:divide-white/5">
                <a
                  v-for="(result, i) in results"
                  :key="i"
                  :href="result.href"
                  class="w-full select-none px-4 py-2 text-left" :class="[
                    currentSelection === i ? 'bg-white/5' : 'hover:bg-white/5',
                  ]"
                >
                  <div class="font-semibold">{{ result.title }}</div>
                  <div class="line-clamp-2 mt-2 text-xs" v-html="result.content" />
                </a>
              </div>
              <p v-else class="text-base-500 dark:text-base-400 p-4 text-sm">
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
