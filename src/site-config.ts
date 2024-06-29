import type { SiteConfig } from '@/types'

export const siteConfig: SiteConfig = {
  author: 'Vinh Pham',
  title: 'Vinh Pham',
  subtitle: 'Thoughts and ideas',
  description: 'Thoughts and ideas',
  image: {
    src: '/hero.jpg',
    alt: 'Vinh Pham',
  },
  email: 'vinh@vinh.dev',
  socialLinks: [
    {
      text: 'Threads',
      href: 'https://threads.net/vinh.phm',
      icon: 'i-ri-threads-line',
      header: 'i-ri-threads-line',
    },
    {
      text: 'GitHub',
      href: 'https://github.com/vinhphm',
      icon: 'i-ri-github-line',
      header: 'i-ri-github-line',
    },
    {
      text: 'Linkedin',
      href: 'https://www.linkedin.com/in/vinhphm/',
      icon: 'i-ri-linkedin-box-line',
    },
    {
      text: 'Instagram',
      href: 'https://instagram.com/vinh.phm',
      icon: 'i-ri-instagram-line',
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
        text: 'Projects',
        href: '/projects',
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
