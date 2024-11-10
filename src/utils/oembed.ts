import type { OEmbedOptions } from '@/types'
import { extract } from '@extractus/oembed-extractor'

export async function getOembedData(url: string, options?: OEmbedOptions) {
  try {
    const data = await extract(url, options)
    return data
  } catch (error) {
    console.error('Error fetching oEmbed data:', error)
    return null
  }
}
