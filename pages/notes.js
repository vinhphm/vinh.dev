import useTranslation from 'next-translate/useTranslation'
import { getAllFilesFrontMatter, getFileBySlug } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata.mjs'
import ListNotesLayout from '@/layouts/ListNotesLayout'
import { PageSEO } from '@/components/SEO'

export const POSTS_PER_PAGE = 1

export async function getStaticProps({ locale, defaultLocale, locales }) {
  const otherLocale = locale !== defaultLocale ? locale : ''
  const posts = await getAllFilesFrontMatter('notes', otherLocale)
  const post = await getFileBySlug('notes', posts[0].slug, otherLocale)
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return {
    props: { initialDisplayPosts, posts, post, pagination, locale, availableLocales: locales },
  }
}

export default function Notes({
  posts,
  post,
  initialDisplayPosts,
  pagination,
  locale,
  availableLocales,
}) {
  const { t } = useTranslation()
  return (
    <>
      <PageSEO
        title={`${t('common:notes')} - ${siteMetadata.author}`}
        description={siteMetadata.description[locale]}
        availableLocales={availableLocales}
      />
      <ListNotesLayout
        posts={posts}
        post={post}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title={t('common:notes')}
      />
    </>
  )
}
