import * as React from 'react'
import {
  Scripts,
  json,
  LinksFunction,
  LoaderFunction,
  useCatch,
  useLoaderData,
  useLocation,
} from 'remix'
import { Links, LiveReload, Meta, Outlet, ScrollRestoration, MetaFunction } from 'remix'

import globalStylesUrl from '~/styles/global.css'
import tailwindStylesUrl from '~/styles/tailwind.css'
import darkStylesUrl from '~/styles/dark.css'

import { Navbar, Footer, Four00, Banner } from '~/components'
import { getSession } from './utils/session.server'
import { BannerType } from './components/banner'
import * as gtag from '~/utils/gtags'

export const meta: MetaFunction = () => {
  return {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-transparent',
    'apple-mobile-web-app-title': 'Muthukumar',
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#000',
    image: '/images/og.jpg',
    'og:image': '/images/og.jpg',
    'og:locale': 'en',
    'og:site_name': 'Muthukumar',
    'og:type': 'website',
    'theme-color': '#000',
    'twitter:card': 'summary_large_image',
    'twitter:creator': '@am_muthukumar',
    'twitter:site': '@am_muthukumar',
    'X-UA-Compatible': 'IE=edge,chrome=1',
    author: 'Muthukumar',
    HandheldFriendly: 'True',
    language: 'en',
    MobileOptimized: '320',
    pagename: 'Muthukumar',
    title: 'Muthukumar',
    description:
      'Tutorials and notes on React, Javascript, CSS and more. Also Personal book reviews and personal thoughts on stuff and more!.',
    viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
    keywords: 'Learn Javascript, Learn Typescript and Learn CSS, Clean code',
  }
}

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: globalStylesUrl },
    { rel: 'stylesheet', href: tailwindStylesUrl },
    { rel: 'stylesheet', href: darkStylesUrl, media: '(prefers-color-scheme: dark)' },
    {
      rel: 'preload',
      as: 'font',
      href: '/fonts/inter-v7-latin-regular.woff',
      type: 'font/woff',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'preload',
      as: 'font',
      href: '/fonts/inter-v7-latin-regular.woff2',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },

    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/favicon/dark/apple-touch-icon.png',
      media: '(prefers-color-scheme: dark)',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon/dark/favicon-32x32.png',
      media: '(prefers-color-scheme: dark)',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon/dark/favicon-16x16.png',
      media: '(prefers-color-scheme: dark)',
    },
    {
      rel: 'manifest',
      href: '/favicon/dark/site.webmanifest',
      media: '(prefers-color-scheme: dark)',
    },

    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/favicon/light/apple-touch-icon.png',
      media: '(prefers-color-scheme: light)',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon/light/favicon-32x32.png',
      media: '(prefers-color-scheme: light)',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon/light/favicon-16x16.png',
      media: '(prefers-color-scheme: light)',
    },
    {
      rel: 'manifest',
      href: '/favicon/light/site.webmanifest',
      media: '(prefers-color-scheme: light)',
    },
    {
      rel: 'canonical',
      href: 'https://www.nullish.in',
    },
  ]
}

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'))

  const banner = session.get('banner') ?? { title: '', link: '', show: false }

  return json({ banner })
}

export default function App() {
  const { banner } = useLoaderData<{ banner: BannerType }>()

  const location = useLocation()

  React.useEffect(() => {
    gtag.pageview(location.pathname)
  }, [location])

  return (
    <Document>
      <Layout banner={banner}>
        <Outlet />
      </Layout>
    </Document>
  )
}

function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="color-scheme" content="dark light" />
        <Meta />
        <Links />
      </head>
      <body className="antialiased bg-color">
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`} />
        <script
          async
          id="gtag-init"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
        {children}
        <Scripts />
        <ScrollRestoration />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}

function Layout({ children, banner }: { banner?: BannerType; children: React.ReactNode }) {
  return (
    <div>
      {banner && banner.show && <Banner {...banner} />}
      <Navbar />
      <main>{children}</main>
      <Footer />
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
  return (
    <Document>
      <Layout>
        <Four00 title="500" message="Oopsies... Something went wrong." link="/" />
      </Layout>
    </Document>
  )
}
