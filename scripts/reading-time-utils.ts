import fs from 'node:fs/promises'
import path from 'node:path'
import calculateReadingTime from 'reading-time'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { toString } from 'mdast-util-to-string'

export const BLOG_DIR = 'src/content/blog'

export function getReadingTime(text: string): string | undefined {
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

export function hasDurationInFrontmatter(content: string): boolean {
  const frontmatterRegex = /^---\r?\n([\s\S]+?)\r?\n---/
  const frontmatterMatch = content.match(frontmatterRegex)

  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1]
    return /^duration:/m.test(frontmatter)
  }

  return false
}

export function updateFrontmatter(content: string, readingTime: string): string {
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

export async function processFile(filePath: string): Promise<void> {
  const content = await fs.readFile(filePath, 'utf-8')

  if (hasDurationInFrontmatter(content)) {
    console.log(`Skipping ${filePath}: duration already exists`)
    return
  }

  const readingTime = getReadingTime(content)

  if (readingTime) {
    const updatedContent = updateFrontmatter(content, readingTime)
    await fs.writeFile(filePath, updatedContent, 'utf-8')
    console.log(`Updated ${filePath} with reading time: ${readingTime}`)
  } else {
    console.log(`Skipping ${filePath}: couldn't calculate reading time`)
  }
}

export async function scanAndUpdateFiles(dir: string): Promise<void> {
  const entries = await fs.readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      await scanAndUpdateFiles(fullPath)
    } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
      await processFile(fullPath)
    }
  }
}
