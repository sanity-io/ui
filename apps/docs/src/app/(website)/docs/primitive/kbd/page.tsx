import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeExampleBlock} from '@/components/page/article/content/CodeExampleBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'
import {PropertyTable} from '@/components/page/article/content/PropertyTable'

export const metadata: Metadata = {
  title: 'KBD | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'KBD',
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
      title="KBD"
      isComponent
      headings={[{level: 2, slug: 'properties', text: 'Properties'}]}
    >
      <Paragraph>Used to define some text as keyboard input.</Paragraph>

      <CodeExampleBlock
        title="KBD example"
        description="A basic example of using the KBD primitive in Sanity UI."
        code={`<Card padding={4} style={{textAlign: 'center'}}>
  <KBD
    padding={[1, 1, 2]}
    size={[1, 1, 2]}
    style={{verticalAlign: 'top'}}
  >
    Ctrl
  </KBD>
</Card>
`}
      />

      <Heading2 id="properties">Properties</Heading2>

      <PropertyTable
        properties={[
          {name: 'fontSize', type: 'number | number[]'},
          {name: 'padding', type: 'number | number[]'},
          {name: 'radius', type: 'number | number[]'},
          {name: 'size', type: 'number | number[]'},
        ]}
      />
    </Article>
  )
}
