import type {Metadata} from 'next'

import {ArcadePage} from './ArcadePage'

export const metadata: Metadata = {
  title: 'Arcade | Sanity UI',
  description: 'An interactive JSX playground for Sanity UI.',
  openGraph: {
    type: 'website',
    title: 'Arcade',
    description: 'An ergonomic toolkit to design with code.',
    siteName: 'Sanity UI',
  },
  twitter: {
    card: 'summary',
    site: '@sanity_io',
  },
}

export default function Page() {
  return <ArcadePage />
}
