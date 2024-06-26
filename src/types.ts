import type { CollectionEntry } from 'astro:content'

export type PostKey = 'blog'

export type CollectionPosts = CollectionEntry<PostKey>

export type Pages = 'pages'

export type CollectionPages = CollectionEntry<Pages>

export type ProjectData = Array<{
  title: string
  projects: Array<{
    text: string
    description?: string
    icon?: string
    href: string
  }>
}>

export interface SocialLink {
  text: string
  href: string
  icon: string
  header?: string
}

export interface NavLink {
  text: string
  href: string
}

export interface Image {
  src: string
  alt: string
}

export interface Header {
  logo: Image
  navLinks: NavLink[]
}

export interface Page {
  blogLinks: NavLink[]
}

export interface Footer {
  navLinks: NavLink[]
}

export interface SiteConfig {
  author: string
  title: string
  subtitle: string
  description: string
  image: Image
  email: string
  socialLinks: SocialLink[]
  header: Header
  page: Page
  footer: Footer
}
