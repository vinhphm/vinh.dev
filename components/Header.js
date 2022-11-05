import { useState, useEffect } from 'react'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import headerNavLinks from '@/data/headerNavLinks'

function useIsScrollTop() {
  const [isTop, setIsTop] = useState(true)
  useEffect(() => {
    function onScroll() {
      setIsTop(window.scrollY <= 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return isTop
}

export default function Header() {
  const [navShow, setNavShow] = useState(false)
  const isTop = useIsScrollTop()

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  return (
    <>
      <header
        className={`sticky top-0 z-40 flex w-full items-center justify-between ${
          isTop ? 'border-none' : 'border-b border-neutral-200 dark:border-neutral-800'
        } bg-white bg-opacity-30 backdrop-blur-lg backdrop-saturate-150 backdrop-filter firefox:bg-opacity-100 dark:bg-black dark:bg-opacity-30 dark:firefox:bg-opacity-100`}
      >
        <nav className="mx-auto flex w-full max-w-2xl items-center justify-between px-8 py-2 sm:px-6 xl:max-w-3xl xl:px-0">
          <div className="flex w-full items-center justify-between text-base leading-5">
            <div className="hidden sm:block sm:space-x-8">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  title={link.title}
                  href={link.href}
                  className="font-medium text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <div className="flex items-center sm:hidden">
              <button
                type="button"
                className="ml-[-0.40rem] flex h-8 w-8 cursor-pointer rounded bg-transparent"
                onClick={onToggleNav}
                aria-label="Toggle Menu"
              >
                <svg
                  viewBox="0 0 100 100"
                  className="h-8 w-8 text-neutral-900 dark:text-neutral-100"
                >
                  <path
                    className={`${navShow ? 'opened' : ''} line line1`}
                    d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
                  />
                  <path className={`${navShow ? 'opened' : ''} line line2`} d="M 20,50 H 80" />
                  <path
                    className={`${navShow ? 'opened' : ''} line line3`}
                    d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
                  />
                </svg>
              </button>
            </div>
            <div className="mr-[-0.50rem] flex">
              <ThemeSwitch />
            </div>
          </div>
        </nav>
      </header>
      <MobileNav navShow={navShow} onToggleNav={onToggleNav} />
    </>
  )
}
