import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeExampleBlock} from '@/components/page/article/content/CodeExampleBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'
import {PropertyTable} from '@/components/page/article/content/PropertyTable'

export const metadata: Metadata = {
  title: 'Hotkeys | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'Hotkeys',
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
      title="Hotkeys"
      isComponent
      headings={[{level: 2, slug: 'properties', text: 'Properties'}]}
    >
      <Paragraph>
        {'Represent hotkeys (a keyboard combination) with semantic '}
        <code>{'<kbd>'}</code>
        {' elements.'}
      </Paragraph>

      <CodeExampleBlock
        title="Hotkeys example"
        description="A basic example of using the Hotkeys component in Sanity UI."
        code={`<Card padding={4} style={{textAlign: 'center'}}>
  <Hotkeys keys={['Ctrl', 'Shift', 'P']} padding={2} />
</Card>`}
      />

      <Heading2 id="properties">Properties</Heading2>

      <PropertyTable
        properties={[
          {name: 'fontSize', type: 'number | number[]'},
          {name: 'keys', type: 'string[]'},
          {name: 'padding', type: 'number | number[]'},
          {name: 'radius', type: 'number | number[]'},
          {name: 'gap', type: 'number | number[]'},
          {
            name: 'space',
            type: 'number | number[]',
            deprecated: 'Use gap instead. Will be removed in v4.',
          },
        ]}
      />
    </Article>
  )
}
