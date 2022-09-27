import {Metadata} from 'next'
import {ReactElement} from 'react'

import {ArcadePage} from './ArcadePage'

interface ArcadeRouteProps {
  searchParams: {
    jsx?: string
    mode: 'jsx' | 'hook'
    width: string
    title?: string
    description?: string
  }
}

export function generateMetadata(props: ArcadeRouteProps): Metadata {
  const {searchParams} = props

  const title = searchParams.title || 'Arcade'
  const description = searchParams.description || 'An interactive JSX playground for Sanity UI.'

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
