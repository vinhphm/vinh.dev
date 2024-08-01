import fs from 'node:fs/promises'
import Git from 'simple-git'
import calculateReadingTime from 'reading-time'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { toString } from 'mdast-util-to-string'

const git = Git()
const BLOG_DIR = 'src/content/blog'

function getReadingTime(text: string): string | undefined {
  if (!text || !text.length)
    return undefined
  try {
    const { minutes } = calculateReadingTime(toString(fromMarkdown(text)))
    if (minutes && minutes > 0) {
      return `${Math.ceil(minutes)} min read`
    }
    return undefined
  // eslint-disable-next-line unused-imports/no-unused-vars
  } catch (e) {
    return undefined
  }
}

async function calculateAndAddReadingTimes(): Promise<void> {
  try {
    const stagedFiles = (await git.diff(['--cached', '--name-only']))
      .split('\n')
      .map(i => i.trim())
      .filter(Boolean)

    const contentFiles = stagedFiles.filter(file =>
      file.startsWith(BLOG_DIR) &&
      (file.endsWith('.md') || file.endsWith('.mdx')),
    )

    if (contentFiles.length === 0) {
      console.log('No content files to process')
      return
    }

    console.log(`Found ${contentFiles.length} content file(s) to process`)

    for (const file of contentFiles) {
      await processFile(file)
    }

    console.log('Finished processing all staged content files')
  } catch (error) {
    console.error('Error in calculateAndAddReadingTimes:', error)
  }
}

async function processFile(file: string): Promise<void> {
  try {
    const content = await fs.readFile(file, 'utf-8')

    if (hasDurationInFrontmatter(content)) {
      console.log(`Skipping ${file}: duration already exists`)
      return
    }

    const readingTime = getReadingTime(content)

    if (readingTime) {
      const updatedContent = updateFrontmatter(content, readingTime)
      await fs.writeFile(file, updatedContent, 'utf-8')
      await git.add(file)
      console.log(`Updated ${file} with reading time: ${readingTime}`)
    } else {
      console.log(`Skipping ${file}: couldn't calculate reading time`)
    }
  } catch (error) {
    console.error(`Error processing file ${file}:`, error)
  }
}

function hasDurationInFrontmatter(content: string): boolean {
  const frontmatterRegex = /^---\r?\n([\s\S]+?)\r?\n---/
  const frontmatterMatch = content.match(frontmatterRegex)

  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1]
    return /^duration:/m.test(frontmatter)
  }

  return false
}

function updateFrontmatter(content: string, readingTime: string): string {
  const frontmatterRegex = /^---\r?\n([\s\S]+?)\r?\n---/
  const frontmatterMatch = content.match(frontmatterRegex)

  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1]
    const updatedFrontmatter = `${frontmatter.trim()}\nduration: ${readingTime}`
    return content.replace(frontmatterRegex, `---\n${updatedFrontmatter}\n---`)
  }

  // If no frontmatter found, add it
  return `---\nduration: ${readingTime}\n---\n\n${content}`
}

calculateAndAddReadingTimes()
