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
            height=${200}
            width=${200}
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDI1NiAyNTYiIHZlcnNpb249IjEuMSIKICAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWw6c3BhY2U9InByZXNlcnZlIgogICAgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyOyI+CiAgICA8ZyBpZD0iYmFja2dyb3VuZCI+CiAgICAgICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjI1NiIgaGVpZ2h0PSIyNTYiIHN0eWxlPSJmaWxsOndoaXRlIi8+CiAgICA8L2c+CiAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjYyOTI2NiwwLDAsMC42MjkyNjYsNTUuOTU4NSw0OC40MjYxKSI+CiAgICAgICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwtMTEzLjUsLTc5KSI+CiAgICAgICAgICAgIDxjaXJjbGUgY3g9IjMyNC4yOSIgY3k9IjEyMC42MiIgcj0iMzMuNjIiIHN0eWxlPSJmaWxsOmJsYWNrO3N0cm9rZTpibGFjaztzdHJva2Utd2lkdGg6Ny45NXB4OyIvPgogICAgICAgIDwvZz4KICAgICAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLDAsMCwxLC0xMTMuNSwtNzkpIj4KICAgICAgICAgICAgPHBhdGggZD0iTTE3Ni4wNiw5NS43MUMxODguNzA3LDk1Ljc3IDIwMS4zNTMsOTUuNzgzIDIxNCw5NS43NUMyMTQuMjc0LDk1Ljc1IDIxNC41LDk1Ljk3NiAyMTQuNSw5Ni4yNUwyMTQuNSwxMDIuNzdDMjE0LjUsMTAzLjE1OCAyMTQuMTg3LDEwMy40NzkgMjEzLjgsMTAzLjQ5QzIwMy45NzMsMTAzLjczNyAxOTguMTU3LDEwNy42NTcgMTk2LjM1LDExNS4yNUMxOTUuNDc3LDExOC45MTcgMTk1LjY2LDEyMy4zOTMgMTk2LjksMTI4LjY4QzE5Ny45LDEzMi45MzMgMTk5LjQxMywxMzcuMjI3IDIwMS40NCwxNDEuNTZDMjIyLjY3MywxODcuMDQ3IDI0My45NDcsMjMyLjQ2MyAyNjUuMjYsMjc3LjgxQzI2NS40MjYsMjc4LjE4MSAyNjUuNDM3LDI3OC42IDI2NS4yOSwyNzguOTdMMjQwLjM3LDM0Mi40N0MyNDAuMjU1LDM0Mi43NTkgMjM5Ljk4NiwzNDIuOTUzIDIzOS42OSwzNDIuOTZMMjMzLjc3LDM0Mi45OEMyMzMuMTgsMzQyLjk4NSAyMzIuNjM1LDM0Mi42MzIgMjMyLjM4LDM0Mi4wOEMyMDQuMDkzLDI4MS4wMDcgMTc1Ljg3MywyMjAuMjM3IDE0Ny43MiwxNTkuNzdDMTQyLjY1MywxNDguODk3IDEzNy40OTcsMTM4LjA2NyAxMzIuMjUsMTI3LjI4QzEzMC4xOSwxMjMuMDQgMTI3LjY1MywxMTkuMTYzIDEyNC42NCwxMTUuNjVDMTIxLjIyLDExMS42NjMgMTE3LjY3LDEwOC43NzcgMTEzLjk5LDEwNi45OUMxMDkuNTk3LDEwNC44NjMgMTA0LjY0NywxMDMuNzggOTkuMTQsMTAzLjc0Qzk4LjU0MiwxMDMuNzM0IDk4LjA1NSwxMDMuMjY5IDk4LjA2LDEwMi43MUw5OC4xNCw5Ni4xOUM5OC4xNCw5NS45MTQgOTguMzgyLDk1LjY4NSA5OC42OCw5NS42OEMxMjQuNDczLDk1LjU4IDE1MC4yNjcsOTUuNTkgMTc2LjA2LDk1LjcxWiIgc3R5bGU9ImZpbGw6YmxhY2s7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOmJsYWNrO3N0cm9rZS13aWR0aDo3Ljk1cHg7Ii8+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K"
            style=${{ margin: '0 30px' }}
          />
        </div>
        <div
          style=${{
            marginTop: 30,
            padding: '0 120px',
          }}
        >
          <div
            style=${{
              fontSize: 60,
              fontStyle: 'normal',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              color: 'black',
              boxShadow: 'inset 0 -30px 0 0 #3CFFD0',
              lineHeight: 1.4,
              whiteSpace: 'pre-wrap',
            }}
          >
            ${title}
          </div>
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
