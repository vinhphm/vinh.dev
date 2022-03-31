const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')

module.exports = {
  experimental: {
    optimizeUniversalDefaults: true,
  },
  content: [
    './pages/**/*.js',
    './components/**/*.js',
    './layouts/**/*.js',
    './lib/**/*.js',
    './context/**/*.js',
    './data/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      letterSpacing: {
        tightest: '-.075em',
      },
      fontSize: {
        '8.5xl': '7rem',
      },
      spacing: {
        '9/16': '56.25%',
        0.75: '0.1875rem',
        'content-sm': 'calc(100vh - 4.5rem)',
        content: 'calc(100vh - 4rem)',
      },
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      backgroundImage: {
        'texture-pattern': "url('/static/images/right-dark-gradient.svg')",
      },
      fontFamily: {
        sans: ['InterVariable', ...defaultTheme.fontFamily.sans],
      },
      gradientColorStops: {
        // https://coolors.co/2d00f7-6a00f4-8900f2-a100f2-b100e8-bc00dd-d100d1-db00b6-e500a4-f20089
        'gradient-1-start': '#F20089',
        'gradient-1-end': '#D100D1',
        'gradient-2-start': '#D100D1',
        'gradient-2-end': '#A100F2',
        'gradient-3-start': '#A100F2',
        'gradient-3-end': '#2D00F7',
      },
      colors: {
        primary: {
          100: '#FDD1D9',
          200: '#FBA4BC',
          300: '#F575A5',
          400: '#EB519B',
          500: '#DE1D8D',
          600: '#BE1588',
          700: '#9F0E7F',
          800: '#800972',
          900: '#6A0568',
        },
        green: colors.emerald,
        yellow: colors.amber,
        purple: colors.violet,
        'spotify-green': '#1DB954',
      },
      hueRotate: {
        53: '53deg',
      },
      saturate: {
        1000: '10',
      },
      zIndex: {
        '-1': '-1',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.neutral.700'),
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.600')} !important`,
              },
              code: { color: theme('colors.primary.400') },
            },
            h1: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.neutral.900'),
            },
            h2: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.neutral.900'),
            },
            h3: {
              fontWeight: '600',
              color: theme('colors.neutral.900'),
            },
            'h4,h5,h6': {
              color: theme('colors.neutral.900'),
            },
            code: {
              color: theme('colors.neutral.900'),
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.25rem',
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            details: {
              backgroundColor: theme('colors.neutral.100'),
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.25rem',
            },
            hr: { borderColor: theme('colors.neutral.200') },
            'ol li::maker': {
              fontWeight: '600',
              color: theme('colors.neutral.500'),
            },
            'ul li::maker': {
              backgroundColor: theme('colors.neutral.500'),
            },
            strong: { color: theme('colors.neutral.600') },
            blockquote: {
              color: theme('colors.neutral.900'),
              borderLeftColor: theme('colors.neutral.200'),
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.neutral.300'),
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.400')} !important`,
              },
              code: { color: theme('colors.primary.400') },
            },
            h1: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.neutral.100'),
            },
            h2: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.neutral.100'),
            },
            h3: {
              fontWeight: '600',
              color: theme('colors.neutral.100'),
            },
            'h4,h5,h6': {
              color: theme('colors.neutral.100'),
            },
            code: {
              color: theme('colors.neutral.100'),
              backgroundColor: theme('colors.gray.800'),
            },
            details: {
              backgroundColor: theme('colors.neutral.800'),
            },
            hr: { borderColor: theme('colors.neutral.700') },
            'ol li::maker': {
              fontWeight: '600',
              color: theme('colors.neutral.400'),
            },
            'ul li::maker': {
              backgroundColor: theme('colors.neutral.400'),
            },
            strong: { color: theme('colors.neutral.100') },
            thead: {
              th: {
                color: theme('colors.neutral.100'),
              },
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.neutral.700'),
              },
            },
            blockquote: {
              color: theme('colors.neutral.100'),
              borderLeftColor: theme('colors.neutral.700'),
            },
          },
        },
      }),
      keyframes: {
        'bg-hue-animation': {
          '0%': { filter: 'hue-rotate(0deg)' },
          '50%': { filter: 'hue-rotate(180deg)' },
          '100%': { filter: 'hue-rotate(0deg)' },
        },
        'fade-away': {
          '0%': {
            opacity: 1,
          },
          '100%': {
            opacity: 0.2,
          },
        },
        shrink: {
          '0% , 100%': {
            height: '0.75rem',
          },
          '50%': {
            height: '0.375rem',
          },
        },
        expand: {
          '0% , 100%': {
            height: '0.375rem',
          },
          '50%': {
            height: '0.75rem',
          },
        },
        'gradient-foreground-1': {
          '0%, 16.667%, 100%': {
            opacity: 1,
          },
          '33.333%, 83.333%': {
            opacity: 0,
          },
        },
        'gradient-background-1': {
          '0%, 16.667%, 100%': {
            opacity: 0,
          },
          '25%, 91.667%': {
            opacity: 1,
          },
        },
        'gradient-foreground-2': {
          '0%, 100%': {
            opacity: 0,
          },
          '33.333%, 50%': {
            opacity: 1,
          },
          '16.667%, 66.667%': {
            opacity: 0,
          },
        },
        'gradient-background-2': {
          '0%, to': {
            opacity: 1,
          },
          '33.333%, 50%': {
            opacity: 0,
          },
          '25%, 58.333%': {
            opacity: 1,
          },
        },
        'gradient-foreground-3': {
          '0%, 50%, 100%': {
            opacity: 0,
          },
          '66.667%, 83.333%': {
            opacity: 1,
          },
        },
        'gradient-background-3': {
          '0%, 58.333%, 91.667%, 100%': {
            opacity: 1,
          },
          '66.667%, 83.333%': {
            opacity: 0,
          },
        },
      },
      animation: {
        'fade-text': '10s ease-in-out 3s 1 normal forwards running fade-away',
        shrink: 'shrink ease-in-out 1.5s infinite',
        expand: 'expand ease-in-out 1.5s infinite',
        'gradient-background-1': 'gradient-background-1 8s infinite',
        'gradient-foreground-1': 'gradient-foreground-1 8s infinite',
        'gradient-background-2': 'gradient-background-2 8s infinite',
        'gradient-foreground-2': 'gradient-foreground-2 8s infinite',
        'gradient-background-3': 'gradient-background-3 8s infinite',
        'gradient-foreground-3': 'gradient-foreground-3 8s infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    plugin(function ({ addVariant, e, postcss }) {
      addVariant('firefox', ({ container, separator }) => {
        const isFirefoxRule = postcss.atRule({
          name: '-moz-document',
          params: 'url-prefix()',
        })
        isFirefoxRule.append(container.nodes)
        container.append(isFirefoxRule)
        isFirefoxRule.walkRules((rule) => {
          rule.selector = `.${e(`firefox${separator}${rule.selector.slice(1)}`)}`
        })
      })
    }),
  ],
}
