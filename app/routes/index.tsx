import type { MetaFunction } from 'remix'
import { Link, useCatch } from 'remix'

import { LinkButton, Four00, Container } from '~/components'

export const meta: MetaFunction = () => {
  return {
    title: 'Muthukumar',
  }
}

export default function Blog() {
  return (
    <div className="py-16">
      <Container>
        <div className="text-lg">
          <p>Hey, I&apos;m</p>
          <h1 className="text-2xl font-bold md:text-6xl">Muthukumar</h1>
          <div className="flex flex-col mt-4 space-y-2 text-base md:text-lg">
            <p>Welcome to my Personal website.</p>
            <p>
              I write <strong>code</strong>. I listen to <strong>music</strong>. Loves to read{' '}
              <strong>books</strong>. And I occasionally write articles on React, Javascript and
              other stuff.
            </p>
            <p>
              Feel free to poke around. There are some{' '}
              <Link to="/login" className="link-font-color">
                easter eggs
              </Link>{' '}
              I added in the website. If you find any of them, let me know on{' '}
              <a
                href="https://rd.nullish.in/twitter"
                target="_blank"
                rel="noreferrer"
                aria-label="twitter"
                className="link-font-color"
              >
                Twitter
              </a>
              .
            </p>
          </div>
        </div>
        <div className="mt-16">
          <h2 className="text-xl font-bold md:text-center md:text-2xl">Website map</h2>
          <div className="flex items-center justify-center mt-8">
            <div className="flex flex-col justify-center w-full space-y-2 md:space-y-0 md:flex-row">
              <LinkButton to="/blog" className="w-full md:rounded-r-none md:w-auto">
                Read articles
              </LinkButton>
              <LinkButton
                to="/about"
                className="inline-block w-full md:rounded-l-none md:rounded-r-none md:w-auto"
              >
                More about me
              </LinkButton>
              <LinkButton
                to="/changelog"
                className="inline-block w-full md:rounded-l-none md:w-auto"
              >
                Website changelog
              </LinkButton>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export function CatchBoundary() {
  const caught = useCatch()

  const message = caught.status === 404 ? caught.data.message : 'Oopsies.. Something went wrong.'

  if (caught.status === 404) {
    return <Four00 title="404" message={message} link="/blog" />
  }

  return <Four00 title="500" message={message} link="/blog" />
}

export function ErrorBoundary() {
  return <Four00 title="500" message="Oopsies... Something went wrong." link="/" />
}
