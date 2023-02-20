import Head from 'next/head'

import { Card } from 'components/Card'
import { Section } from 'components/Section'
import { SimpleLayout } from 'components/SimpleLayout'

function RecommendSection({ children, ...props }) {
  return (
    <Section {...props}>
      <div className="space-y-16">{children}</div>
    </Section>
  )
}

function Appearance({ title, description, sub, cta, href }) {
  return (
    <Card as="article">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Eyebrow decorate>{sub}</Card.Eyebrow>
      <Card.Description>{description}</Card.Description>
      <Card.Cta>{cta}</Card.Cta>
    </Card>
  )
}

export default function Recommends() {
  return (
    <>
      <Head>
        <title>Recommends - Vinh Pham</title>
        <meta
          name="description"
          content="A list of recommended movies, books and more."
        />
      </Head>
      <SimpleLayout
        title="My list of recommended books, movies, podcasts and more."
        intro="What do you do in your spare time? For me, I would read a book, watch a movie, listen to a podcast. And sometimes, one of those is just too good to not to be shared."
      >
        <div className="space-y-20">
          <RecommendSection title="Books">
            <Appearance
              href="https://www.goodreads.com/book/show/840.The_Design_of_Everyday_Things"
              title="The Design of Everyday Things"
              description="Anyone who designs anything to be used by humans -- from physical objects to computer programs to conceptual tools -- must read this book, and it is an equally tremendous read for anyone who has to use anything created by another human. It could forever change how you experience and interact with your physical surroundings, open your eyes to the perversity of bad design and the desirability of good design, and raise your expectations about how things should be designed."
              sub="Donald A. Norman"
              cta="Goodreads"
            />
          </RecommendSection>
          <RecommendSection title="Movies">
            <Appearance
              href="https://www.imdb.com/title/tt3915174/"
              title="Puss in Boots: The Last Wish"
              description="I like how every DreamWorks' movies are always well-done and give out so many a good messages"
              sub="DreamWorks"
              cta="IMDb"
            />
          </RecommendSection>
        </div>
      </SimpleLayout>
    </>
  )
}
