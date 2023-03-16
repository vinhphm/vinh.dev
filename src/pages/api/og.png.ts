import type { APIRoute } from 'astro'
import htm from 'htm'
import satori from 'satori'
import sharp from 'sharp'
import inter700 from '../../fonts/Inter-Bold.ttf'
import inter400 from '../../fonts/Inter-Regular.ttf'

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

const fonts = [
  {
    name: 'Inter',
    data: inter400,
    weight: 400,
    style: 'normal',
  },
  {
    name: 'Inter',
    data: inter700,
    weight: 700,
    style: 'normal',
  },
]

const html = htm.bind(h)

export const get: APIRoute = async ({ url, site }) => {
  const title = url.searchParams.get('title') ?? 'Missing Title'
  const options = {
    // debug: true,
    width: 1200,
    height: 630,
    fonts,
  }

  const svg = await satori(
    html`
      <div
        style=${{
          fontFamily: 'Inter',
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
            fontSize: 84,
            letterSpacing: '-0.025em',
            color: 'black',
            marginTop: 30,
            padding: '0 120px',
            lineHeight: 1.25,
            fontWeight: 700,
            whiteSpace: 'pre-wrap',
          }}
        >
          ${title}
        </div>

        <div
          style=${{
            position: 'absolute',
            bottom: '5%',
            right: '5%',
            color: 'transparent',
            fontSize: 24,
            fontWeight: 400,
            letterSpacing: '0.05em',
            background: 'linear-gradient(to bottom right, #f472b6, #dc2626)',
            backgroundClip: 'text',
          }}
        >
          vinh.dev
        </div>
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
