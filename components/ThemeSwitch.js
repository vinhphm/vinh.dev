import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { isFirefox } from 'react-device-detect'
import { AnimatedThemeIcon } from './AnimatedThemeIcon'
import { StillThemeIcon } from './StillThemeIcon'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="p-2 sm:p-4"
      onClick={() => setTheme(theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="text-neutral-900 dark:text-neutral-100 w-5 h-5"
      >
        {isFirefox ? (
          <StillThemeIcon mounted={mounted} theme={theme} resolvedTheme={resolvedTheme} />
        ) : (
          <AnimatedThemeIcon checked={mounted && (theme === 'dark' || resolvedTheme === 'dark')} />
        )}
      </svg>
    </button>
  )
}

export default ThemeSwitch
