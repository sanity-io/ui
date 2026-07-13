import {Metadata} from 'next'
import {connection} from 'next/server'
import {ReactElement, Suspense} from 'react'

import {ArcadePage} from './ArcadePage'

interface ArcadeRouteProps {
  searchParams: Promise<{
    jsx?: string
    mode?: 'jsx' | 'hook'
    width?: string
    title?: string
    description?: string
  }>
}

export async function generateMetadata(props: ArcadeRouteProps): Promise<Metadata> {
  const searchParams = await props.searchParams

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

// `generateMetadata` reads `searchParams` (runtime data), so the route must
// render a dynamic marker inside `<Suspense>` for the rest of the page to be
// prerenderable with Cache Components
async function DynamicMetadataMarker() {
  await connection()
  return null
}

export default function ArcadeRoute(): ReactElement {
  return (
    <>
      <Suspense>
        <DynamicMetadataMarker />
      </Suspense>
      <ArcadePage />
    </>
  )
}
