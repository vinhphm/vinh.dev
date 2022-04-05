import SnippetIcon from './snippet-icons'
import Link from './Link'

const SnippetCard = ({ type, title, summary, slug }) => {
  return (
    <Link
      href={`/snippets/${slug}`}
      title={title}
      className="w-full flex row-span-1 p-4 border-2 border-solid rounded-lg border-neutral-200 dark:border-neutral-800 transform hover:border-primary-600 dark:hover:border-primary-400"
    >
      <SnippetIcon type={type} />
      <div className="pl-3 lg:pl-4 md:pl-4 overflow-hidden">
        <h3 className="text-lg lg:text-2xl font-bold leading-8 tracking-tight whitespace-nowrap overflow-hidden overflow-ellipsis">
          {title}
        </h3>
        <p className="text-md lg:text-base mt-2 text-gray-700 dark:text-gray-400">{summary}</p>
      </div>
    </Link>
  )
}

export default SnippetCard
