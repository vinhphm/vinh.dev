import fs from 'node:fs'
import path from 'node:path'
import type { SatoriOptions } from 'satori'
import satori from 'satori'
import sharp from 'sharp'

// Read the SVG file
const ogSVG = fs.readFileSync(path.resolve(__dirname, '../scripts/og-template.svg'), 'utf-8')

// Read the font file
const inter400 = fs.readFileSync(path.resolve(__dirname, '../scripts/fonts/Inter-Bold.ttf'))

declare type Weight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
declare type Style$1 = 'normal' | 'italic'
interface FontOptions {
  data: Buffer | ArrayBuffer
  name: string
  weight?: Weight
  style?: Style$1
  lang?: string
}

const fonts: FontOptions[] = [
  {
    name: 'Inter',
    data: inter400,
    weight: 400,
    style: 'normal',
  },
]

export async function handleRequest(request: Request) {
  const url = new URL(request.url)

  const title = url.searchParams.get('title') ?? 'Missing Title'

  // Split the title into lines of max 25 characters
  const lines = title.trim().split(/(.{0,25})(?:\s|$)/g).filter(Boolean)

  // Map the lines to your placeholders
  const data: Record<string, string> = {
    line1: lines[0],
    line2: lines[1],
    line3: lines[2],
  }

  // Replace placeholders in the SVG with the title lines
  let svg = ogSVG.replace(/\{\{([^}]+)}}/g, (_, name) => data[name] || '')

  const options: SatoriOptions = {
    // debug: true,
    width: 1200,
    height: 630,
    fonts,
  }

  // Use satori to render the fonts correctly
  svg = await satori(svg, options)

  return new Response(await sharp(Buffer.from(svg)).png().toBuffer(), {
    status: 200,
    headers: {
      'Cache-Control': 'max-age=31536000, immutable',
      'Content-Type': 'image/png',
    },
  })
}
