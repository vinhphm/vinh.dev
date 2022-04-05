import useTranslation from 'next-translate/useTranslation'
import Pagination from '@/components/Pagination'
import PageTitle from '@/components/PageTitle'
import SnippetCard from '@/components/SnippetCard'

export default function SnippetsLayout({ posts, title, initialDisplayPosts = [], pagination }) {
  const { t } = useTranslation()

  return (
    <>
      <div className="divide-y divide-transparent">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <PageTitle>{title}</PageTitle>
          <p className="text-lg leading-7 text-neutral-500 dark:text-neutral-400">
            {t('snippets:subtitle')}
          </p>
        </div>
        <div className="container py-12">
          <div className="lg:grid grid-cols-2 gap-6">
            {initialDisplayPosts.map(({ type, title, summary, slug }) => (
              <SnippetCard key={title} type={type} title={title} summary={summary} slug={slug} />
            ))}
          </div>
        </div>
      </div>
      {pagination && pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          pageSlug={'snippets'}
        />
      )}
    </>
  )
}
