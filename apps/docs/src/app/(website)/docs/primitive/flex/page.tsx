import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeExampleBlock} from '@/components/page/article/content/CodeExampleBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'
import {PropertyTable} from '@/components/page/article/content/PropertyTable'

export const metadata: Metadata = {
  title: 'Flex | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'Flex',
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
      title="Flex"
      isComponent
      headings={[{level: 2, slug: 'properties', text: 'Properties'}]}
    >
      <Paragraph>
        {'The '}
        <code>{'<Flex />'}</code>
        {' component is a wrapper component for layout primitives.'}
      </Paragraph>

      <CodeExampleBlock
        title="Flex example"
        description="A basic example of using the Flex primitive in Sanity UI."
        code={`<Flex padding={4}>
  <Card flex={1}>
    <Text size={[2, 2, 3, 4]}>hello</Text>
  </Card>
  <Card flex={[1, 2, 3]} marginLeft={[2, 2, 3, 4]}>
    <Text size={[2, 2, 3, 4]}>world</Text>
  </Card>
</Flex>`}
      />

      <Heading2 id="properties">Properties</Heading2>

      <PropertyTable
        properties={[
          {name: 'as', type: 'React.ElementType | keyof JSX.IntrinsicElements'},
          {name: 'align', type: "'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'"},
          {
            name: 'direction',
            type: "'row' | 'row-reverse' | 'column' | 'column-reverse'",
            required: true,
          },
          {name: 'flex', type: 'number | number[]'},
          {name: 'gap', type: 'number | number[]'},
          {
            name: 'justify',
            type: "'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'",
          },
          {name: 'wrap', type: "'wrap' | 'wrap-reverse' | 'nowrap'"},
        ]}
      />
    </Article>
  )
}
