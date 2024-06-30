import type { ProjectData } from '@/types'

export const projectData: ProjectData = [
  {
    title: 'Current Focus',
    projects: [
      {
        text: 'Vinh.Dev',
        description: 'My place to share things out with the world. Astro/Vite edition',
        icon: 'vinh-dev',
        href: '/',
      },
    ],
  },
  {
    title: 'VS Code Extension',
    projects: [
      {
        text: 'Subessense Theme',
        description: 'A subjectively revamped, more electrifying version of awesome `Subliminal Next` theme made by Konrad Keska.',
        icon: 'i-codicon-vscode',
        href: 'https://marketplace.visualstudio.com/items?itemName=vinhphm.subessence',
      },
    ],
  },
  {
    title: 'Personal Websites',
    projects: [
      {
        text: 'Vinh.Dev - Vite version',
        description: 'The website but powered by Vite from mid-2023 to mid-2024.',
        icon: 'i-tabler-brand-vite',
        href: 'https://vp-vite.pages.dev',
      },
      {
        text: 'Vinh.Dev - Astro version',
        description: 'The Astro version of my website in the first half of 2023.',
        icon: 'i-devicon-plain-astro',
        href: 'https://github.com/vinhphm/vp-astro',
      },
      {
        text: 'Vinh.Dev (2022)',
        description: 'Previous version of this website with a different look and feel. This is also the first version I use Next.js and Tailwind CSS.',
        icon: 'i-tabler-brand-nextjs',
        href: 'https://github.com/vinhphm/vinh-dev-legacy',
      },
    ],
  },
  {
    title: 'Fresh/Deno',
    projects: [
      {
        text: 'Paste',
        description: 'A minimal plain text storage service powered by Fresh framework, Deno, and Supabase',
        icon: 'i-tabler-brand-deno',
        href: 'https://paste.vinh.dev',
      },
    ],
  },
]
