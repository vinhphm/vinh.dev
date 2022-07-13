import useTranslation from 'next-translate/useTranslation'
import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata.mjs'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import NewsletterForm from '@/components/NewsletterForm'
import InternalCard from '@/components/InternalCard'
import Hero from '@/components/Hero'

const MAX_DISPLAY = 3

export async function getStaticProps({ locale, defaultLocale, locales }) {
  const otherLocale = locale !== defaultLocale ? locale : ''
  const posts = await getAllFilesFrontMatter('blog', otherLocale)

  return { props: { posts, locale, availableLocales: locales } }
}

export default function Home({ posts, locale, availableLocales }) {
  const { t } = useTranslation()

  return (
    <>
      <PageSEO
        title={siteMetadata.title[locale]}
        description={siteMetadata.description[locale]}
        availableLocales={availableLocales}
      />
      <Hero />
      <div>
        <div className="py-8 grid grid-cols-1 grid-rows-2 grid-flow-row sm:grid-rows-1 sm:grid-cols-2 justify-between gap-4">
          <InternalCard href={`/snippets`} title={t('common:snippets')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
            {t('snippets:description')}
          </InternalCard>
          <InternalCard href={`/about`} title={t('common:about')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>
            </svg>
            {t('common:about-description')}
          </InternalCard>
        </div>
        <div className="py-4">
          <div>
            <div className="space-y-2 pt-3 pb-4 md:space-y-3">
              <h1 className="text-xl font-extrabold leading-5 tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-2xl sm:leading-7 md:text-3xl md:leading-9">
                {t('common:latest')}
              </h1>
              <p className="leading-7 text-neutral-500 dark:text-neutral-400">
                {t('common:latest-description')}
              </p>
            </div>
            <div className="py-4 grid grid-cols-1 grid-rows-3 grid-flow-row sm:grid-rows-1 sm:grid-cols-2 xl:grid-cols-3 justify-between gap-4">
              {!posts.length && 'No posts found.'}
              {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
                const { slug, date, title, summary } = frontMatter
                return (
                  <InternalCard key={slug} href={`/blog/${slug}`} title={title}>
                    <div className="divide-solid divide-y divide-neutral-200 dark:divide-neutral-700">
                      <p>{summary}</p>
                      <p className="my-0 pt-2 text-neutral-500 dark:text-neutral-400">
                        <time dateTime={date}>{formatDate(date, locale)}</time>
                      </p>
                    </div>
                  </InternalCard>
                )
              })}
            </div>
          </div>
          {posts.length > MAX_DISPLAY && (
            <div className="pt-4 flex justify-start text-base font-medium leading-6">
              <Link
                href="/blog"
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label="all posts"
              >
                {t('common:all')} &rarr;
              </Link>
            </div>
          )}
        </div>
        {siteMetadata.newsletter.provider !== '' && (
          <div className="flex items-center justify-center pt-4">
            <NewsletterForm title={t('newsletter:title')} />
          </div>
        )}
      </div>
    </>
  )
}
