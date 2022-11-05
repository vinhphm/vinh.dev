import { sortedBlogPost, allCoreContent } from 'pliny/utils/contentlayer'
import { formatDate } from 'pliny/utils/formatDate'
import { allBlogs } from 'contentlayer/generated'
import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import NewsletterForm from '@/components/NewsletterForm'
import InternalCard from '@/components/InternalCard'
import Hero from '@/components/Hero'

const MAX_DISPLAY = 3

export const getStaticProps = async () => {
  const sortedPosts = sortedBlogPost(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return {
    props: {
      posts,
    },
  }
}

export default function Home({ posts }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <Hero />
      <div>
        <div className="grid grid-flow-row grid-cols-1 grid-rows-2 justify-between gap-4 py-8 sm:grid-cols-2 sm:grid-rows-1">
          <InternalCard href={`/snippets`} title="Snippets Notebook">
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
            Where I share snippets I've been collecting.
          </InternalCard>
          <InternalCard href={`/about`} title="About">
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
            Learn about this website and me.
          </InternalCard>
        </div>
        <div className="py-4">
          <div>
            <div className="space-y-2 pt-3 pb-4 md:space-y-3">
              <h1 className="text-xl font-extrabold leading-5 tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-2xl sm:leading-7 md:text-3xl md:leading-9">
                Latest Posts
              </h1>
              <p className="leading-7 text-neutral-500 dark:text-neutral-400">
                Discover the what's new in the horizon.
              </p>
            </div>
            <div className="grid grid-flow-row grid-cols-1 grid-rows-3 justify-between gap-4 py-4 sm:grid-cols-2 sm:grid-rows-1 xl:grid-cols-3">
              {!posts.length && 'No posts found.'}
              {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
                const { slug, date, title, summary } = frontMatter
                return (
                  <InternalCard key={slug} href={`/blog/${slug}`} title={title}>
                    <div className="divide-y divide-solid divide-neutral-200 dark:divide-neutral-700">
                      <p>{summary}</p>
                      <p className="my-0 pt-2 text-neutral-500 dark:text-neutral-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </p>
                    </div>
                  </InternalCard>
                )
              })}
            </div>
          </div>
          {posts.length > MAX_DISPLAY && (
            <div className="flex justify-start pt-4 text-base font-medium leading-6">
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
            <NewsletterForm title="Subscribe to the newsletter" />
          </div>
        )}
      </div>
    </>
  )
}
