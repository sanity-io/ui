import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeExampleBlock} from '@/components/page/article/content/CodeExampleBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'
import {PropertyTable} from '@/components/page/article/content/PropertyTable'
import {PlainContent, PlainParagraph} from '@/components/page/article/PlainContent'

export const metadata: Metadata = {
  title: 'Inline | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'Inline',
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
      title="Inline"
      isComponent
      headings={[{level: 2, slug: 'properties', text: 'Properties'}]}
    >
      <Paragraph>
        {'The '}
        <code>Inline</code>
        {' component is a layout utility for aligning and spacing items horizontally.'}
      </Paragraph>

      <CodeExampleBlock
        title="Inline example"
        description="A basic example of using the Inline primitive in Sanity UI."
        code={`<Box padding={4} style={{textAlign: 'center'}}>
  <Inline gap={[3, 3, 4, 5]}>
    <Card padding={1}>
      <Text size={[2, 2, 3, 4]}>foo</Text>
    </Card>
    <Card padding={2}>
      <Text size={[2, 2, 3, 4]}>bar</Text>
    </Card>
    <Card padding={3}>
      <Text size={[2, 2, 3, 4]}>baz</Text>
    </Card>
    <Card padding={4}>
      <Text size={[2, 2, 3, 4]}>baz</Text>
    </Card>
    <Card padding={5}>
      <Text size={[2, 2, 3, 4]}>baz</Text>
    </Card>
  </Inline>
</Box>`}
      />

      <Heading2 id="properties">Properties</Heading2>

      <PropertyTable
        properties={[
          {name: 'as', type: 'React.ElementType | keyof JSX.IntrinsicElements'},
          {
            name: 'gap',
            type: 'number | number[]',
            description: (
              <PlainContent>
                <PlainParagraph>The spacing between the children.</PlainParagraph>
              </PlainContent>
            ),
          },
          {
            name: 'space',
            type: 'number | number[]',
            deprecated: 'Use gap instead. Will be removed in v4.',
            description: (
              <PlainContent>
                <PlainParagraph>The spacing between the children.</PlainParagraph>
              </PlainContent>
            ),
          },
        ]}
      />
    </Article>
  )
}
