import useTranslation from 'next-translate/useTranslation'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import { PageSEO } from '@/components/SEO'
import PageTitle from '@/components/PageTitle'

export default function Author({ children, frontMatter, availableLocales }) {
  const { name, avatar, occupation, location, email, twitter, facebook, linkedin, github } =
    frontMatter
  const { t } = useTranslation()

  return (
    <>
      <PageSEO
        title={`${t('headerNavLinks:about')} - ${name}`}
        description={`${t('SEO:author')} - ${name}`}
        availableLocales={availableLocales}
      />
      <div className="pt-6 pb-8 space-y-2 md:space-y-5">
        <PageTitle>{t('headerNavLinks:about')}</PageTitle>
      </div>
      <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
        <div className="flex flex-col items-center xl:items-start pt-8 xl:sticky xl:top-12">
          <Image src={avatar} width={192} height={192} className="rounded-full xl:rounded-lg" />
          <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
          <div className="text-neutral-500 dark:text-neutral-400">{occupation}</div>
          <div className="text-neutral-500 dark:text-neutral-400">
            <span role="img" aria-label="location">
              📍
            </span>
            &nbsp;
            {location}
          </div>
          <div className="flex pt-6 space-x-3">
            <SocialIcon kind="mail" href={`mailto:${email}`} />
            <SocialIcon kind="github" href={github} />
            <SocialIcon kind="linkedin" href={linkedin} />
            <SocialIcon kind="twitter" href={twitter} />
            <SocialIcon kind="facebook" href={facebook} />
          </div>
        </div>
        <div className="pt-8 pb-8 prose dark:prose-dark max-w-none xl:col-span-2">{children}</div>
      </div>
    </>
  )
}
