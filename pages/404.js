import useTranslation from 'next-translate/useTranslation'
import siteMetadata from '@/data/siteMetadata.mjs'
import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Button from '@/components/Button'

export default function FourZeroFour({ locale, availableLocales }) {
  const { t } = useTranslation()
  return (
    <>
      <PageSEO
        title={`Page Not Found - ${siteMetadata.title}`}
        description={siteMetadata.description[locale]}
        availableLocales={availableLocales}
      />
      <div className="flex flex-col items-start justify-start md:justify-center md:items-center md:flex-row md:space-x-6 md:mt-24">
        <div className="pt-6 pb-8 space-x-2 md:space-y-5">
          <h1 className="text-6xl font-extrabold leading-9 tracking-tight text-neutral-900 dark:text-neutral-100 md:text-8xl md:leading-14 md:border-r-2 md:px-6">
            404
          </h1>
        </div>
        <div className="max-w-md">
          <p className="mb-4 text-xl font-bold leading-normal md:text-2xl">{t('404:bigText')}</p>
          <p className="mb-8">{t('404:littleText')}</p>
          <Link href="/" aria-label={siteMetadata.headerTitle}>
            <Button className="inline px-4 py-3 text-sm leading-5">{t('404:backButton')}</Button>
          </Link>
        </div>
      </div>
    </>
  )
}
