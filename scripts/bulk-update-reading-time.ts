import { BLOG_DIR, scanAndUpdateFiles } from './reading-time-utils'

async function main(): Promise<void> {
  try {
    console.log('Starting to scan and update files...')
    await scanAndUpdateFiles(BLOG_DIR)
    console.log('Finished processing all files')
  } catch (error) {
    console.error('Error scanning and updating files:', error)
  }
}

main()
