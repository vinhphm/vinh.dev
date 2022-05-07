import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const Tag = ({ text }) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a className="mr-3 px-1 py-0.5 border border-neutral-100 dark:border-neutral-900 rounded-lg text-sm">
        <span className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
          #
        </span>
        {text.split(' ').join('-')}
      </a>
    </Link>
  )
}

export default Tag
