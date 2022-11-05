export default function Button({ children, className, ...rest }) {
  return (
    <button
      className={`rounded-md bg-neutral-900 font-medium text-white transition-colors duration-150 hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 disabled:bg-neutral-900 dark:bg-neutral-100 dark:text-black dark:ring-offset-black dark:hover:bg-neutral-300 disabled:dark:bg-neutral-100 ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
