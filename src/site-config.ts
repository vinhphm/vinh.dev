import type { SiteConfig } from '@/types'

export const siteConfig: SiteConfig = {
  author: 'Vinh Pham',
  title: 'vinh.dev',
  site: 'https://vinh.dev',
  subtitle: 'Thoughts and ideas',
  description: 'Thoughts and ideas',
  image: {
    src: '/hero.jpg',
    alt: 'Vinh Pham',
  },
  email: 'vinh@vinh.dev',
  socialLinks: [
    {
      text: '@vinh.dev',
      href: 'https://bsky.app/profile/vinh.dev',
      icon: 'i-ri-bluesky-fill',
      header: 'i-ri-bluesky-line',
    },
    {
      text: 'github',
      href: 'https://github.com/vinhphm',
      icon: 'i-ri-github-fill',
      header: 'i-ri-github-line',
    },
    {
      text: 'linkedin',
      href: 'https://www.linkedin.com/in/vinhphm/',
      icon: 'i-ri-linkedin-box-fill',
    },
  ],
  header: {
    logo: {
      src: '/logo.svg',
      alt: 'Logo Image',
    },
    navLinks: [
      {
        text: 'Blog',
        href: '/blog',
      },
      {
        text: 'Notes',
        href: '/blog/notes',
      },
      {
        text: 'Works',
        href: '/works',
      },
    ],
  },
  page: {
    blogLinks: [
      {
        text: 'Blog',
        href: '/blog',
      },
      {
        text: 'Notes',
        href: '/blog/notes',
      },
    ],
  },
  footer: {
    navLinks: [],
  },
}

export default siteConfig
