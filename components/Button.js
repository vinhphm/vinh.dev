export default function Button({ children, className, ...rest }) {
  return (
    <button
      className={`transition-colors duration-150 bg-neutral-900 dark:bg-neutral-100 rounded-md font-medium text-white dark:text-black hover:bg-neutral-700 dark:hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 dark:ring-offset-black ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
