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
          <InternalCard href={`/notes`} title={t('common:notes')}>
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
            {t('notes:description')}
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
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            {t('common:about-description')}
          </InternalCard>
        </div>
        <div className="py-4">
          {/* <h2 className="text-xl font-extrabold leading-5 tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-2xl sm:leading-7 md:text-3xl md:leading-9">{t('common:latest')}</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">{t('common:latest-description')}</p>
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary } = frontMatter
            return (
              <div className="w-full border-b border-neutral-200 dark:border-neutral-700 py-3">
                <div className="flex flex-col sm:flex-row justify-between items-baseline">
                  <div className="flex items-center">
                    <div>
                      <h3 className="text-lg text-left font-bold w-full text-neutral-800 dark:text-neutral-100">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-neutral-900 dark:text-neutral-100"
                        >
                          {title}
                        </Link>
                      </h3>
                      <div className="prose py-1 text-sm max-w-none text-neutral-500 dark:text-neutral-400">
                        {summary}&nbsp;
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read "${title}"`}
                        >
                          {t('common:more')} &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center mt-2 sm:mt-0 w-full sm:w-auto justify-between">
                    <p className="text-neutral-500 dark:text-neutral-400 text-left sm:text-right w-32 md:mb-0 mr-2 ml-10 sm:ml-0">
                      <time dateTime={date}>{formatDate(date, locale)}</time>
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
          {posts.length > MAX_DISPLAY && (
            <div className="pt-2 flex justify-end text-base font-medium leading-6">
              <Link
                href="/blog"
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label="all posts"
              >
                {t('common:all')} &rarr;
              </Link>
            </div>
          )} */}
          <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
            <div className="space-y-2 pt-3 pb-4 md:space-y-3">
              <h2 className="text-xl font-extrabold leading-5 tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-2xl sm:leading-7 md:text-3xl md:leading-9">
                {t('common:latest')}
              </h2>
              <p className="leading-7 text-neutral-500 dark:text-neutral-400">
                {t('common:latest-description')}
              </p>
            </div>
            <ul className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {!posts.length && 'No posts found.'}
              {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
                const { slug, date, title, summary } = frontMatter
                return (
                  <li key={slug} className="py-4">
                    <article>
                      <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                        <dl>
                          <dt className="sr-only">Published on</dt>
                          <dd className="text-base font-medium leading-6 text-neutral-500 dark:text-neutral-400">
                            <time dateTime={date}>{formatDate(date, locale)}</time>
                          </dd>
                        </dl>
                        <div className="space-y-3 xl:col-span-3">
                          <div className="space-y-2">
                            <div>
                              <h3 className="text-lg font-bold leading-8 tracking-tight">
                                <Link
                                  href={`/blog/${slug}`}
                                  className="text-neutral-900 dark:text-neutral-100"
                                >
                                  {title}
                                </Link>
                              </h3>
                              {/* <div className="text-sm flex flex-wrap">
                                {tags.map((tag) => (
                                  <Tag key={tag} text={tag} />
                                ))}
                              </div> */}
                            </div>
                            <div className="prose text-sm max-w-none text-neutral-500 dark:text-neutral-400">
                              {summary}
                            </div>
                          </div>
                          <div className="text-sm font-medium leading-6">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                              aria-label={`Read "${title}"`}
                            >
                              Read more &rarr;
                            </Link>
                          </div>
                        </div>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
          </div>
          {posts.length > MAX_DISPLAY && (
            <div className="flex justify-end text-base font-medium leading-6">
              <Link
                href="/blog"
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label="all posts"
              >
                All Posts &rarr;
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
