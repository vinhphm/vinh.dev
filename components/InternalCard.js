import Link from '@/components/Link'

export default function InternalCard({ href, title, children }) {
  return (
    <Link
      href={href}
      title={title}
      className="w-full flex flex-col justify-between row-span-1 p-4 border-2 border-solid rounded-lg border-neutral-200 dark:border-neutral-800 transform hover:border-primary-600 dark:hover:border-primary-400"
    >
      <h2 className="text-lg font-bold leading-4 tracking-tight">{title}</h2>
      <div className="pt-4 text-sm prose text-neutral-800 max-w-none dark:text-neutral-200 flex items-center gap-1">
        {children}
      </div>
    </Link>
  )
}
