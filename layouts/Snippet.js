import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import { BlogSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata.mjs'
import formatDate from '@/lib/utils/formatDate'
import Comments from '@/components/comments'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

const editUrl = (fileName) => `${siteMetadata.siteRepo}/blob/main/data/blog/${fileName}`
const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `${siteMetadata.siteUrl}/snippets/${slug}`
  )}`

export default function Snippet({ frontMatter, availableLocales, children }) {
  const { slug, fileName, date, title, type } = frontMatter
  const { t } = useTranslation()
  const { locale } = useRouter()

  return (
    <>
      <BlogSEO
        availableLocales={availableLocales}
        url={`${siteMetadata.siteUrl}/blog/${frontMatter.slug}`}
        {...frontMatter}
      />
      <ScrollTopAndComment />
      <article>
        <div>
          <header>
            <div className="py-10 space-y-1 text-center">
              <dl>
                <div>
                  <dt className="sr-only">{t('common:pub')}</dt>
                  <dd className="text-base font-medium leading-6 text-neutral-500 dark:text-neutral-400">
                    <time dateTime={date}>{formatDate(date, locale)}</time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div
            className="pb-8 divide-y divide-transparent xl:divide-y-0"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <div className="divide-y divide-transparent xl:pb-0 xl:col-span-3 xl:row-span-2">
              <div className="pt-10 pb-8 prose dark:prose-dark max-w-none">{children}</div>
            </div>
            <div className="pt-6 pb-6 text-sm text-neutral-700 dark:text-neutral-300">
              <Link href={discussUrl(slug)} rel="nofollow">
                {t('common:twitter')}
              </Link>
              {` • `}
              <Link href={editUrl(fileName)}>{t('common:github')}</Link>
            </div>
            <Comments frontMatter={frontMatter} />
          </div>
        </div>
      </article>
    </>
  )
}
