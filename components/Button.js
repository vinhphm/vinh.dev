export default function Button({ children, className, ...rest }) {
  return (
    <button
      className={`py-2 sm:py-0 w-full bg-neutral-900 dark:bg-neutral-100 px-4 rounded-md font-medium text-white dark:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 dark:ring-offset-black ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
