import {type Metadata, type Viewport} from 'next'
import {Inter} from 'next/font/google'
import {PropsWithChildren} from 'react'

import {StyledComponentsRegistry} from '@/lib/styled/registry'

import {AppProviders} from './AppProviders'
import {ColorSchemeProvider} from './ColorSchemeProvider'
import {DEFAULT_META_DESCRIPTION, DEFAULT_META_OG_IMAGE} from './constants'

export const metadata = {
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
} satisfies Metadata

const inter = Inter({subsets: ['latin']})

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
} satisfies Viewport

export default function RootLayout(props: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <ColorSchemeProvider>
            <AppProviders
              projectId={process.env.SANITY_PROJECT_ID!}
              hintHiddenContent={process.env.APP_FEATURE_HINT_HIDDEN_CONTENT === 'true'}
            >
              {props.children}
            </AppProviders>
          </ColorSchemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
