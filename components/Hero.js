import useTranslation from 'next-translate/useTranslation'

const Hero = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col justify-around w-full h-content sm:h-content-sm">
      <h1 className="my-28 sm:my-10 text-center select-none text-6xl sm:text-8.5xl leading-none tracking-tightest font-extrabold">
        <span
          data-content={t('hero:first')}
          className="relative block before:content-[attr(data-content)] dark:before:content-[attr(data-content)] before:w-full before:block before:absolute before:top-0 before:bottom-0 before:left-0 before:px-2 before:text-center before:text-black dark:before:text-white before:animate-gradient-background-1"
        >
          <span className="px-2 text-transparent bg-clip-text bg-gradient-to-br from-gradient-1-start to-gradient-1-end animate-gradient-foreground-1">
            {t('hero:first')}
          </span>
        </span>
        <span
          data-content={t('hero:second')}
          className="relative block before:content-[attr(data-content)] dark:before:content-[attr(data-content)] before:w-full before:block before:absolute before:top-0 before:bottom-0 before:left-0 before:px-2 before:text-center before:text-black dark:before:text-white before:animate-gradient-background-2"
        >
          <span className="px-2 text-transparent bg-clip-text bg-gradient-to-br from-gradient-2-start to-gradient-2-end animate-gradient-foreground-2">
            {t('hero:second')}
          </span>
        </span>
        <span
          data-content={t('hero:third')}
          className="relative block before:content-[attr(data-content)] dark:before:content-[attr(data-content)] before:w-full before:block before:absolute before:top-0 before:bottom-0 before:left-0 before:px-2 before:text-center before:text-black dark:before:text-white before:animate-gradient-background-3"
        >
          <span className="px-2 text-transparent bg-clip-text bg-gradient-to-br from-gradient-3-start to-gradient-3-end animate-gradient-foreground-3">
            {t('hero:third')}
          </span>
        </span>
      </h1>
      <div className="space-y-2 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
          {t('common:hi')}
          <span className="animate-fade-text"> Vinh Ph</span>
          <span>a</span>
          <span className="animate-fade-text">m</span>
        </h1>
        <p className="text-lg leading-7 prose text-gray-500 max-w-none dark:text-gray-400">
          {t('common:mini-bio')}
        </p>
      </div>
    </div>
  )
}

export default Hero
