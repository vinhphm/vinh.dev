import SnippetIcon from './snippet-icons'
import Link from './Link'

const SnippetCard = ({ type, title, summary, slug }) => {
  return (
    <Link
      href={`/snippets/${slug}`}
      title={title}
      className="row-span-1 flex w-full transform rounded-lg border-2 border-solid border-neutral-200 p-4 hover:border-primary-600 dark:border-neutral-800 dark:hover:border-primary-400"
    >
      <SnippetIcon type={type} />
      <div className="overflow-hidden pl-3 md:pl-4 lg:pl-4">
        <h3 className="overflow-hidden overflow-ellipsis whitespace-nowrap text-lg font-bold leading-8 tracking-tight lg:text-2xl">
          {title}
        </h3>
        <p className="text-md mt-2 text-neutral-700 dark:text-neutral-400 lg:text-base">
          {summary}
        </p>
      </div>
    </Link>
  )
}

export default SnippetCard
