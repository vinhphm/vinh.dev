import { useRef, useState } from 'preact/compat'
import { NewsletterIcon } from './Icons'
import Button from './Button'

export default function Newsletter() {
  const inputEl = useRef(null)
  const [error, setError] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  const subscribe = async (e: Event) => {
    e.preventDefault()

    const res = await fetch(`/api/newsletter.json`, {
      body: JSON.stringify({
        email: inputEl.current && (inputEl.current as HTMLInputElement).value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const { error } = await res.json()
    if (error) {
      setError(true)
      return
    }

    if (inputEl.current) {
      ;(inputEl.current as HTMLInputElement).value = ''
    }

    setError(false)
    setSubscribed(true)
  }

  return (
    <form
      onSubmit={subscribe}
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
    >
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <NewsletterIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Stay up to date</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Get notified when I publish something new, and unsubscribe at any time.
      </p>
      <div className="mt-6 flex">
        <input
          id="email-input"
          name="email"
          ref={inputEl}
          type="email"
          placeholder={
            subscribed ? "You're subscribed !  🎉" : 'Enter your email'
          }
          aria-label="Email address"
          required
          disabled={subscribed}
          className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-aquamarine-500 focus:outline-none focus:ring-4 focus:ring-aquamarine-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-aquamarine-400 dark:focus:ring-aquamarine-400/10 sm:text-sm"
        />
        <Button type="submit" className="ml-4 flex-none" disabled={subscribed}>
          Join
        </Button>
      </div>
      {error && (
        <div className="w-72 pt-2 text-sm text-red-500 dark:text-red-400 sm:w-96">
          Your e-mail adress is invalid or you are already subscribed!
        </div>
      )}
    </form>
  )
}