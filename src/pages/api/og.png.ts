import inter700 from '@/assets/fonts/Inter-Bold.ttf?raw-hex'
import ogIcon from '@/assets/images/logos/vinh-dev-og.png?raw-hex'
import type { APIRoute } from 'astro'
import htm from 'htm'
import type { SatoriOptions } from 'satori'
import satori from 'satori'
import sharp from 'sharp'

declare type Weight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
declare type Style$1 = 'normal' | 'italic'
interface FontOptions {
  data: Buffer | ArrayBuffer
  name: string
  weight?: Weight
  style?: Style$1
  lang?: string
}

const fromHexString = (hexString: { match: (arg0: RegExp) => any[] }) =>
  Uint8Array.from(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)))

function h(
  type: string | Function,
  props: Record<string, any>,
  ...children: any
) {
  if (typeof type === 'function') {
    return type({ ...props, children })
  }

  if (type === 'Fragment') {
    return children
  }

  return {
    type,
    props: {
      ...props,
      // Satori hates multiple/empty children
      children: children.length > 1 ? children : children[0],
    },
  }
}

const fonts: FontOptions[] = [
  {
    name: 'Inter',
    data: fromHexString(inter700),
    weight: 700,
    style: 'normal',
  },
]

const html = htm.bind(h)

export const get: APIRoute = async ({ url, site }) => {
  const title = url.searchParams.get('title') ?? 'Missing Title'
  const options: SatoriOptions = {
    // debug: true,
    width: 1200,
    height: 630,
    fonts,
  }

  const svg = await satori(
    html`
      <div
        style=${{
          backgroundColor: '#3CFFD0',
          backgroundSize: '150px 150px',
          height: '100%',
          width: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          flexWrap: 'nowrap',
        }}
      >
        <div
          style=${{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            justifyItems: 'center',
          }}
        >
          <img
            alt="Vinh.Dev"
            height=${200}
            width=${200}
            src=${`data:image/png;base64, ${Buffer.from(
              fromHexString(ogIcon)
            ).toString('base64')}`}
            style=${{ margin: '0 30px' }}
          />
        </div>
        <span
          style=${{
            marginTop: 30,
            padding: '0 120px',
          }}
        >
          <span
            style=${{
              fontSize: 60,
              fontStyle: 'normal',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              color: 'black',
              lineHeight: 1.2,
              whiteSpace: 'pre-wrap',
            }}
          >
            ${title}
          </span>
        </span>
      </div>
    `,
    options
  )

  // return new Response(svg, {
  //   status: 200,
  //   headers: {
  //     'Content-Type': 'image/svg+xml',
  //   },
  // })

  return new Response(await sharp(Buffer.from(svg)).png().toBuffer(), {
    status: 200,
    headers: {
      'Cache-Control': 'max-age=31536000, immutable',
      'Content-Type': 'image/png',
    },
  })
}
