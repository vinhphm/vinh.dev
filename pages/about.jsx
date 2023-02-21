import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from 'components/Container'
import {
  TwitterIcon,
  InstagramIcon,
  GitHubIcon,
  LinkedInIcon,
} from 'components/SocialIcons'
import portraitImage from 'images/portrait.jpg'
import NowPlaying from 'components/NowPlaying'

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-rose-500 dark:text-zinc-200 dark:hover:text-rose-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-rose-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export default function About() {
  return (
    <>
      <Head>
        <title>About - Vinh Pham</title>
        <meta
          name="description"
          content="I’m Vinh Pham. I live in Ho Chi Minh City, where I build the future."
        />
      </Head>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={portraitImage}
                alt="Vinh Pham's portrait"
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              I’m Vinh Pham. I live in Ho Chi Minh City, where I build the
              future.
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              <p>
                I have always loved making things. Since I learned about
                computers in secondary school, I have been fascinated by the
                possibilities of creating and exploring with technology. I
                convinced my mom that it was a worthwhile investment for my
                future, and she bought me a computer rig to pursue my passion.
                Although I started with simple tools like Microsoft Word, Excel,
                PowerPoint, and Pascal, they helped me develop the skills that I
                have today.
              </p>
              <p>
                Another thing that I loved more than computers as a kid was
                drawing. When I was 8, I was selected for a gifted drawing class
                at my primary school. I did not have a clear sense of aesthetics
                back then. I just followed my intuition. My teacher said I had a
                good eye for what looked good and what did not.
              </p>
              <p>
                Now, I am a software developer and an explorer with a passion
                for design. I still have a lot to learn, but that does not stop
                me from sharing what I know. I have created many blogs, but I
                never had enough time to maintain them or stay consistent. With
                Vinh.Dev, I want to change that and have my own presence on the
                internet. This site is a blog where I share my thoughts, code,
                and experiences, and my opinions are mine alone. It also serves
                as a portfolio, where I showcase my work.
              </p>
            </div>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              <NowPlaying />
              <SocialLink
                href="https://instagram.com/vinh.phm"
                icon={InstagramIcon}
                className="mt-4"
              >
                Follow on Instagram
              </SocialLink>
              <SocialLink
                href="https://github.com/vinhphm"
                icon={GitHubIcon}
                className="mt-4"
              >
                Follow on GitHub
              </SocialLink>
              <SocialLink
                href="https://twitter.com/vinhphh"
                icon={TwitterIcon}
                className="mt-4"
              >
                Follow on Twitter
              </SocialLink>
              <SocialLink
                href="https://linkedin.com/in/vinhphm"
                icon={LinkedInIcon}
                className="mt-4"
              >
                Follow on LinkedIn
              </SocialLink>
              <SocialLink
                href="mailto:vinh@vinh.dev"
                icon={MailIcon}
                className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
              >
                vinh@vinh.dev
              </SocialLink>
            </ul>
          </div>
        </div>
      </Container>
    </>
  )
}
