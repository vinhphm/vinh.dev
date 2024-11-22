import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    {
      'bg-main': 'bg-hex-ffffff dark:bg-hex-111010',
      'text-main': 'text-hex-555555 dark:text-hex-bbbbbb',
      'text-link': 'text-dark dark:text-white',
      'border-main': 'border-truegray-300 dark:border-truegray-600',
    },
    {
      'text-title': 'text-link text-4xl font-500 tracking-tighter',
      'nav-link': 'text-link opacity-70 hover:opacity-100 transition-opacity duration-200 cursor-pointer',
      'prose-link': 'text-link cursor-pointer border-b-1 !border-opacity-30 hover:!border-opacity-100 border-neutral-500 hover:border-truegray-600 dark:border-neutral-500 hover:dark:border-truegray-400 transition-border-color duration-200 decoration-none',
      'button-link': 'text-link px-2 py-0.5 cursor-pointer rounded-2xl border-1 !border-opacity-30 hover:!border-opacity-100 border-neutral-500 hover:border-truegray-600 dark:border-neutral-500 hover:dark:border-truegray-400 transition-border-color duration-200 decoration-none',
      'container-link': 'p-2 opacity-60 hover:opacity-100 cursor-pointer hover:bg-truegray-500 !bg-opacity-10 transition-colors transition-opacity duration-200',
    },
    {
      'hr-line': 'w-14 mx-auto my-8 border-solid border-1px !border-truegray-200 !dark:border-truegray-800',
    },
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      prefix: 'i-',
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'text-bottom',
      },
    }),
    presetTypography(),
    presetWebFonts({
      provider: 'none',
      fonts: {
        sans: 'Geist',
        mono: 'Geist Mono',
      },
    }),
  ],
  theme: {
    colors: {
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
      },
      secondary: {
        DEFAULT: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--secondary-foreground))',
      },
      muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))',
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        foreground: 'hsl(var(--accent-foreground))',
      },
      additive: {
        DEFAULT: 'hsl(var(--additive))',
        foreground: 'hsl(var(--additive-foreground))',
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))',
      },
      border: 'hsl(var(--border))',
      ring: 'hsl(var(--ring))',
      bluesky: 'rgb(10, 122, 255)',
    },
    extend: {
      maxWidth: {
        '65ch': '65ch',
      },
    },
  },
  transformers: [transformerDirectives(), transformerVariantGroup()],
  safelist: [
    'i-carbon-campsite',
    'i-codicon-vscode',
    'i-devicon-plain-astro',
    'i-logos-chrome',
    'i-ph-file-ts',
    'i-ph-file-vue',
    'i-ri-file-list-2-line',
    'i-ri-github-fill',
    'i-ri-github-line',
    'i-ri-linkedin-box-fill',
    'i-ri-bluesky-fill',
    'i-ri-bluesky-line',
    'i-ri-search-line',
    'i-ri-spotify-fill',
    'i-simple-icons-cloudflarepages',
    'i-simple-icons-github',
    'i-simple-icons-mdnwebdocs',
    'i-simple-icons-netlify',
    'i-tabler-brand-deno',
    'i-tabler-brand-nextjs',
    'i-tabler-brand-vite',
  ],
})
