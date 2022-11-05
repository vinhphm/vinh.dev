import Link from '@/components/Link'

export default function InternalCard({ href, title, children }) {
  return (
    <Link
      href={href}
      title={title}
      className="row-span-1 flex w-full transform flex-col justify-between rounded-lg border-2 border-solid border-neutral-200 p-4 hover:border-primary-600 dark:border-neutral-800 dark:hover:border-primary-400"
    >
      <h2 className="text-lg font-bold leading-5 tracking-tight">{title}</h2>
      <div className="prose flex max-w-none items-center gap-1 pt-4 text-sm text-neutral-800 dark:text-neutral-200">
        {children}
      </div>
    </Link>
  )
}
