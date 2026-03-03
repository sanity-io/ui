import {Metadata} from 'next'
import {ReactElement} from 'react'

import {ArcadePage} from './ArcadePage'

interface ArcadeRouteProps {
  searchParams: Promise<{
    jsx?: string
    mode: 'jsx' | 'hook'
    width: string
    title?: string
    description?: string
  }>
}

export async function generateMetadata(props: ArcadeRouteProps): Promise<Metadata> {
  const {searchParams} = props

  const title = (await searchParams).title || 'Arcade'
  const description =
    (await searchParams).description || 'An interactive JSX playground for Sanity UI.'

  return {
    title: `${title} | Sanity UI`,
    description,
    openGraph: {
      type: 'website',
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default function ArcadeRoute(props: ArcadeRouteProps): ReactElement {
  return <ArcadePage {...props} />
}
