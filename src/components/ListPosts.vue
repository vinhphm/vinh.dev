<script lang="ts" setup>
interface Post {
  id: string
  slug: string
  body: string
  data: Record<string, any>
  collection: string
  render: any
}

withDefaults(defineProps<{
  list: Post[]
}>(), {
  list: () => [],
})

function getDate(date: string) {
  return new Date(date).toISOString()
}

function getHref(post: Post) {
  if (post.data.redirect)
    return post.data.redirect
  return `/posts/${post.slug}`
}

function getTarget(post: Post) {
  if (post.data.redirect)
    return '_blank'
  return '_self'
}

function isSameYear(a: Date | string | number, b: Date | string | number) {
  return a && b && getYear(a) === getYear(b)
}

function getYear(date: Date | string | number) {
  return new Date(date).getFullYear()
}
</script>

<template>
  <ul mb-18 min-h-28 sm:min-h-38>
    <template v-if="!list || list.length === 0">
      <div my-12 opacity-50>
        nothing here yet.
      </div>
    </template>
    <li v-for="(post, index) in list " :key="post.data.title" mb-8>
      <div v-if="!isSameYear(post.data.date, list[index - 1]?.data.date)" pointer-events-none relative h18 select-none>
        <span absolute top--0.2em text-7em color-transparent font-bold text-stroke-2 text-stroke-hex-aaa op14>
          {{ getYear(post.data.date) }}
        </span>
      </div>
      <a text-lg lh-tight nav-link flex="~ col gap-2" :aria-label="post.data.title" :target="getTarget(post)" :href="getHref(post)">
        <div flex="~ col md:row gap-2 md:items-center">
          <div flex="~ gap-2 items-center text-wrap">
            <span lh-normal>
              <i v-if="post.data.draft" i-ri-draft-line vertical-mid text-base />
              {{ post.data.title }}
            </span>
          </div>
          <div ws-nowrap text-sm opacity-50 flex="~ gap-2 items-center">
            <i v-if="post.data.redirect" i-ri-external-link-line text-base />
            <i v-if="post.data.recording || post.data.video" i-ri:film-line text-base />
            <time v-if="post.data.date" :datetime="getDate(post.data.date)">{{ post.data.date.split(',')[0] }}</time>
            <span v-if="post.data.duration">· {{ post.data.duration }}</span>
            <span v-if="post.data.tag">· {{ post.data.tag }}</span>
            <span v-if="post.data.lang && post.data.lang.includes('vi')">· Tiếng Việt</span>
          </div>
        </div>
        <div text-sm opacity-50>{{ post.data.description }}</div>
      </a>
    </li>
  </ul>
</template>
