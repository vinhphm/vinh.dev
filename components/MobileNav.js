import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'

const MobileNav = ({ navShow, onToggleNav }) => {
  return (
    <div className="sm:hidden">
      <div
        className={`fixed top-12 right-0 z-30 h-screen w-full transform bg-white duration-500 ease-in-out dark:bg-black ${
          navShow ? 'translate-x-0' : '-translate-x-full'
        } bg-opacity-30 backdrop-blur-lg firefox:bg-opacity-100 dark:bg-opacity-30 dark:firefox:bg-opacity-100`}
      >
        <nav className="relative z-40 mt-8 space-y-8">
          {headerNavLinks.map((link) => (
            <div key={link.title} className="px-12">
              <Link
                href={link.href}
                title={link.title}
                className="text-xl font-semibold leading-8 tracking-wide text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white"
                onClick={onToggleNav}
              >
                {link.title}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default MobileNav
