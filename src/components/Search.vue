<script lang="ts" setup>
// @ts-expect-error package does not export types
import { animate } from 'motion'
import { onMounted, onUnmounted, ref } from 'vue'
import '@pagefind/default-ui/css/ui.css'

const dialog = ref<HTMLDialogElement | null>(null)
const dialogFrame = ref<HTMLElement | null>(null)
const isDev = ref(import.meta.env.DEV)

function openModal(event?: MouseEvent) {
  if (dialog.value) {
    dialog.value.showModal()

    animate(
      dialog.value,
      {
        clipPath: [
          'polygon(0 0, 100% 0, 100% -200%, -200% -200%)',
          'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
        ],
        opacity: [0, 1],
      },
      { duration: 0.2 },
    )
    document.body.classList.add('overflow-hidden')
    dialog.value.querySelector('input')?.focus()
    event?.stopPropagation()
    window.addEventListener('click', onWindowClick)
    window.addEventListener('keydown', handleEscKey)
  }
}

function closeModal() {
  if (dialog.value) {
    dialog.value.close()
    document.body.classList.remove('overflow-hidden')
    window.removeEventListener('click', onWindowClick)
    window.removeEventListener('keydown', handleEscKey)
  }
}

function onWindowClick(event: MouseEvent) {
  if (
    document.body.contains(event.target as Node) &&
    !dialogFrame.value?.contains(event.target as Node)
  ) {
    closeModal()
  }
}

function handleEscKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && dialog.value?.open) {
    closeModal()
  }
}

onMounted(() => {
  const openBtn = document.querySelector<HTMLButtonElement>('button[data-open-modal]')
  const closeBtn = document.querySelector<HTMLButtonElement>('button[data-close-modal]')

  if (openBtn) {
    openBtn.addEventListener('click', openModal)
    openBtn.disabled = false
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal)
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === '/' && !dialog.value?.open) {
      openModal()
      e.preventDefault()
    }
  })

  if (!isDev.value) {
    const onIdle = window.requestIdleCallback || (cb => setTimeout(cb, 1))
    onIdle(async () => {
      // @ts-expect-error package does not export types
      const { PagefindUI } = await import('@pagefind/default-ui')
      const _pagefindUI = new PagefindUI({
        element: '#pagefind__search',
        baseUrl: import.meta.env.BASE_URL,
        bundlePath: `${import.meta.env.BASE_URL.replace(/\/$/, '')}/pagefind/`,
        showImages: false,
      })
    })
  }
})

onUnmounted(() => {
  window.removeEventListener('click', onWindowClick)
  window.removeEventListener('keydown', handleEscKey)
})
</script>

<template>
  <site-search id="search" class="ms-auto">
    <button data-open-modal class="flex items-center justify-center gap-1 rounded-md">
      <span class="i-ri-search-line" />
    </button>
    <dialog
      ref="dialog"
      aria-label="search"
      class="h-full max-h-full max-w-full w-full border border-zinc-500/25 bg-[#ffffffec] opacity-0 shadow sm:mx-auto sm:mb-auto sm:mt-16 sm:h-max sm:max-h-[calc(100%-8rem)] sm:max-w-[48rem] sm:min-h-[15rem] sm:w-5/6 sm:rounded-md dark:bg-[#0a0910ec] backdrop:backdrop-blur"
    >
      <div ref="dialogFrame" class="dialog-frame flex flex-col gap-4 p-6 pt-12 sm:pt-6">
        <button
          data-close-modal
          class="ms-auto cursor-pointer rounded-full bg-zinc-200 px-4 py-2 dark:bg-zinc-700"
        >
          Close
        </button>
        <div v-if="isDev" class="mx-auto text-center dark:text-white">
          <p>
            Search is only available in production builds. <br>
            Try building and previewing the site to test it out locally.
          </p>
        </div>
        <div v-else class="search-container flex flex-grow flex-col overflow-hidden dark:text-white">
          <div id="pagefind__search" class="flex flex-grow flex-col overflow-hidden" />
        </div>
      </div>
    </dialog>
  </site-search>
</template>

<style>
.dark {
  --pagefind-ui-primary: #eeeeee;
  --pagefind-ui-text: #eeeeee;
  --pagefind-ui-background: #152028;
  --pagefind-ui-border: #152028;
  --pagefind-ui-tag: #152028;
}

.dialog-frame {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.search-container,
#pagefind__search {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
}

#pagefind__search .pagefind-ui__search-input {
  flex-shrink: 0;
}

#pagefind__search .pagefind-ui__results-container {
  flex-grow: 1;
  overflow-y: auto;
}
</style>
