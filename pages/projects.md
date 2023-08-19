---
title: Projects - Vinh Pham
display: Projects
description: My creative endeavors, and a journey of making an impact
plum: true
wrapperClass: 'text-center'
projects:
  Current Focus:
    - name: 'Vinh.Dev'
      link: 'https://vinh.dev'
      desc: 'Current version of my personal website to share things out with the world'
      icon: 'vitest'

  Astro:
    - name: 'Placeholder'
      link: 'https://github.com/vinhphm'
      desc: 'Astro web'
      icon: 'i-simple-icons-astro saturate-0'

  Fresh/Deno:
    - name: 'Paste'
      link: 'https://paste.vinh.dev'
      desc: 'A minimal plain text storage service powered by Fresh framework, Deno, and Supabase'
      icon: 'i-tabler-brand-deno saturate-0'
      
  Next.js:
    - name: 'Vinh.Dev (2022)'
      link: 'https://vinh-dev-legacy.vercel.app/'
      desc: 'Previous version of this website with a different look and feel. This is also the first version I use Next.js and Tailwind CSS'
      icon: 'i-tabler-brand-nextjs saturate-0'

---

<!-- @layout-full-width -->

<ListProjects :projects="frontmatter.projects" />

