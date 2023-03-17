import type { APIRoute } from 'astro'
import htm from 'htm'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import inter700 from '@/fonts/Inter-Bold.ttf?raw-hex'

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
            height=${200}
            width=${200}
            src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjU2IDI1NiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWw6c3BhY2U9InByZXNlcnZlIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiPgogICAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTAgMEgyNTZWMjU2SDB6Ii8+CiAgICA8Y2lyY2xlIGN4PSIzMjQuMyIgY3k9IjEyMC42IiByPSIzMy42IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iOCIgdHJhbnNmb3JtPSJtYXRyaXgoLjYyOTI3IDAgMCAuNjI5MjcgNTYgNDguNCkgdHJhbnNsYXRlKC0xMTMuNSAtNzkpIi8+CiAgICA8cGF0aCBkPSJNMTc2IDk1LjdoMzhjLjMgMCAuNS4zLjUuNXY2LjZjMCAuNC0uMy43LS43LjctOS44LjItMTUuNiA0LjItMTcuNSAxMS44LS44IDMuNi0uNiA4IC42IDEzLjQgMSA0LjIgMi41IDguNSA0LjUgMTIuOSAyMS4zIDQ1LjQgNDIuNSA5MC45IDYzLjkgMTM2LjJ2MS4ybC0yNSA2My41YzAgLjMtLjMuNS0uNi41aC02Yy0uNSAwLTEtLjQtMS4zLTEtMjguMy02MS01Ni41LTEyMS44LTg0LjctMTgyLjItNS0xMC45LTEwLjItMjEuNy0xNS40LTMyLjVhNTQgNTQgMCAwIDAtNy43LTExLjZjLTMuNC00LTctNy0xMC42LTguN2EzNC4yIDM0LjIgMCAwIDAtMTQuOS0zLjNjLS42IDAtMS0uNC0xLTF2LTYuNWMwLS4zLjMtLjUuNi0uNUgxNzZaIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSI4IiB0cmFuc2Zvcm09Im1hdHJpeCguNjI5MjcgMCAwIC42MjkyNyA1NiA0OC40KSB0cmFuc2xhdGUoLTExMy41IC03OSkiLz4KPC9zdmc+Cg=="
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
              boxShadow: 'inset 0 -30px 0 0 #3CFFD0',
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

  return new Response(new Resvg(svg).render().asPng(), {
    status: 200,
    headers: {
      'Cache-Control': 'max-age=31536000, immutable',
      'Content-Type': 'image/png',
    },
  })
}
