import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'
import {PropertyTable} from '@/components/page/article/content/PropertyTable'

export const metadata: Metadata = {
  title: 'Layer | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'Layer',
    description: 'An ergonomic toolkit to design with code.',
    siteName: 'Sanity UI',
  },
  twitter: {
    card: 'summary',
    site: '@sanity_io',
  },
}

export default function Page() {
  return (
    <Article
      title="Layer"
      isComponent
      headings={[{level: 2, slug: 'properties', text: 'Properties'}]}
    >
      <Paragraph>
        {'The '}
        <code>Layer</code>
        {
          ' component is a utility for rendering DOM nodes on top of each other. Each layer are dynamically assigned a '
        }
        <code>z-index</code>
        {' value.'}
      </Paragraph>

      <Heading2 id="properties">Properties</Heading2>

      <PropertyTable properties={[{name: 'zOffset', type: 'number'}]} />
    </Article>
  )
}
