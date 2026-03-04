import {Metadata} from 'next'
import {ReactElement} from 'react'

import {ArcadeScreen} from './ArcadeScreen'

export async function generateMetadata(props: PageProps<'/arcade'>): Promise<Metadata> {
  const searchParams = await props.searchParams

  const title = String(searchParams.title ?? 'Arcade')
  const description = String(
    searchParams.description ?? 'An interactive JSX playground for Sanity UI.',
  )

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

export default function ArcadePage(): ReactElement {
  return <ArcadeScreen />
}
