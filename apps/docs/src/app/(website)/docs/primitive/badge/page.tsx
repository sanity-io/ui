import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeExampleBlock} from '@/components/page/article/content/CodeExampleBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'
import {PropertyTable} from '@/components/page/article/content/PropertyTable'

export const metadata: Metadata = {
  title: 'Badge | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'Badge',
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
      title="Badge"
      isComponent
      headings={[{level: 2, slug: 'properties', text: 'Properties'}]}
    >
      <Paragraph>Badges are used to tag resources.</Paragraph>

      <CodeExampleBlock
        title="Badge example"
        description="A basic example of using the Badge primitive in Sanity UI."
        code={`<Card padding={4} style={{lineHeight: 0, textAlign: 'center'}}>
  <Stack gap={3}>
    <Inline gap={2}>
      <Badge>Label</Badge>
      <Badge tone="primary">Label</Badge>
      <Badge tone="positive">Label</Badge>
      <Badge tone="caution">Label</Badge>
      <Badge tone="critical">Label</Badge>
    </Inline>
  </Stack>
</Card>`}
      />

      <Heading2 id="properties">Properties</Heading2>

      <PropertyTable
        properties={[
          {name: 'as', type: 'React.ElementType | keyof JSX.IntrinsicElements'},
          {name: 'fontSize', type: 'number | number[]'},
          {name: 'padding', type: 'number | number[]'},
          {name: 'paddingX', type: 'number | number[]'},
          {name: 'paddingY', type: 'number | number[]'},
          {name: 'paddingTop', type: 'number | number[]'},
          {name: 'paddingRight', type: 'number | number[]'},
          {name: 'paddingBottom', type: 'number | number[]'},
          {name: 'paddingLeft', type: 'number | number[]'},
          {name: 'radius', type: 'number | number[]'},
          {name: 'tone', type: "'default' | 'primary' | 'positive' | 'caution' | 'critical'"},
        ]}
      />
    </Article>
  )
}
