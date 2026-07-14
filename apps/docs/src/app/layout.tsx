import {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {PropsWithChildren} from 'react'

import {StyledComponentsRegistry} from '@/lib/styled/registry'

import {AppProviders} from './AppProviders'
import {DEFAULT_META_DESCRIPTION, DEFAULT_META_OG_IMAGE} from './constants'

export const metadata: Metadata = {
  title: 'Sanity UI',
  description: DEFAULT_META_DESCRIPTION,
  icons: {
    icon: '/sanity-favicon-48.png',
    shortcut: '/sanity-favicon-32.png',
    apple: '/sanity-favicon-57.png',
  },
  openGraph: {
    type: 'website',
    title: 'Sanity UI',
    description: DEFAULT_META_DESCRIPTION,
    siteName: 'Sanity UI',
    images: [DEFAULT_META_OG_IMAGE],
  },
  twitter: {
    card: 'summary',
    site: '@sanity_io',
  },
}

const inter = Inter({subsets: ['latin']})

export default function RootLayout(props: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </head>
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <AppProviders
            dataset={process.env.SANITY_DATASET!}
            hintHiddenContent={process.env.APP_FEATURE_HINT_HIDDEN_CONTENT === 'true'}
            projectId={process.env.SANITY_PROJECT_ID!}
          >
            {props.children}
          </AppProviders>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
