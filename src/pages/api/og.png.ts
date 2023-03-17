import type { APIRoute } from 'astro'
import htm from 'htm'
import satori from 'satori'
import sharp from 'sharp'
import inter700 from '../../fonts/Inter-Bold.ttf?raw-hex'

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

const fonts = [
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
          backgroundColor: 'white',
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
            height={200}
            width={200}
            src="data:image/svg+xml,%3Csvg width='100%25' height='100%25' viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xml:space='preserve' xmlns:serif='http://www.serif.com/' style='fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;'%3E%3Cg id='background'%3E%3Crect x='0' y='0' style='fill:white' width='256' height='256'/%3E%3C/g%3E%3Cg transform='matrix(0.629266,0,0,0.629266,55.9585,48.4261)'%3E%3Cg transform='matrix(1,0,0,1,-113.5,-79)'%3E%3Ccircle cx='324.29' cy='120.62' r='33.62' style='fill:black;stroke:black;stroke-width:7.95px;'/%3E%3C/g%3E%3Cg transform='matrix(1,0,0,1,-113.5,-79)'%3E%3Cpath d='M176.06,95.71C188.707,95.77 201.353,95.783 214,95.75C214.274,95.75 214.5,95.976 214.5,96.25L214.5,102.77C214.5,103.158 214.187,103.479 213.8,103.49C203.973,103.737 198.157,107.657 196.35,115.25C195.477,118.917 195.66,123.393 196.9,128.68C197.9,132.933 199.413,137.227 201.44,141.56C222.673,187.047 243.947,232.463 265.26,277.81C265.426,278.181 265.437,278.6 265.29,278.97L240.37,342.47C240.255,342.759 239.986,342.953 239.69,342.96L233.77,342.98C233.18,342.985 232.635,342.632 232.38,342.08C204.093,281.007 175.873,220.237 147.72,159.77C142.653,148.897 137.497,138.067 132.25,127.28C130.19,123.04 127.653,119.163 124.64,115.65C121.22,111.663 117.67,108.777 113.99,106.99C109.597,104.863 104.647,103.78 99.14,103.74C98.542,103.734 98.055,103.269 98.06,102.71L98.14,96.19C98.14,95.914 98.382,95.685 98.68,95.68C124.473,95.58 150.267,95.59 176.06,95.71Z' style='fill:black;fill-rule:nonzero;stroke:black;stroke-width:7.95px;'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
            style=${{ margin: '0 30px' }}
          />
        </div>
        <div
          style=${{
            fontSize: 60,
            fontStyle: 'normal',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            color: 'black',
            marginTop: 30,
            padding: '0 120px',
            boxShadow: 'inset 0 -.5em 0 0 #3CFFD0',
            lineHeight: 1.4,
            whiteSpace: 'pre-wrap',
          }}
        >
          ${title}
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
