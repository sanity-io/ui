import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeExampleBlock} from '@/components/page/article/content/CodeExampleBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'
import {PropertyTable} from '@/components/page/article/content/PropertyTable'

export const metadata: Metadata = {
  title: 'Stack | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'Stack',
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
      title="Stack"
      isComponent
      headings={[{level: 2, slug: 'properties', text: 'Properties'}]}
    >
      <Paragraph>
        {'The '}
        <code>Stack</code>
        {' component is used to place elements on top of each other.'}
      </Paragraph>

      <CodeExampleBlock
        title="Stack example"
        description="A basic example of using the Stack primitive in Sanity UI."
        code={`<Stack padding={4} gap={[3, 3, 4, 5]}>
  <Card>
    <Text size={[2, 2, 3, 4]}>foo</Text>
  </Card>
  <Card>
    <Text size={[2, 2, 3, 4]}>bar</Text>
  </Card>
  <Card>
    <Text size={[2, 2, 3, 4]}>baz</Text>
  </Card>
</Stack>`}
      />

      <Heading2 id="properties">Properties</Heading2>

      <PropertyTable
        properties={[
          {name: 'as', type: 'React.ElementType | keyof JSX.IntrinsicElements'},
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
