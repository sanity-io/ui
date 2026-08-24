import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeExampleBlock} from '@/components/page/article/content/CodeExampleBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'
import {PropertyTable} from '@/components/page/article/content/PropertyTable'
import {PlainContent, PlainParagraph} from '@/components/page/article/PlainContent'

export const metadata: Metadata = {
  title: 'Text | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'Text',
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
      title="Text"
      isComponent
      headings={[{level: 2, slug: 'properties', text: 'Properties'}]}
    >
      <Paragraph>
        {'The '}
        <code>Text</code>
        {' component is an agile, themed typographic element.'}
      </Paragraph>

      <CodeExampleBlock
        title="Text example"
        description="A basic example of using the Text primitive in Sanity UI."
        code={`<Stack padding={4} gap={[3, 3, 4, 5]}>
  <Card>
    <Text size={0}>Text 0</Text>
  </Card>
  <Card>
    <Text size={1}>Text 1</Text>
  </Card>
  <Card>
    <Text size={2}>Text 2</Text>
  </Card>
  <Card>
    <Text size={3}>Text 3</Text>
  </Card>
  <Card>
    <Text size={4}>Text 4</Text>
  </Card>
</Stack>`}
      />

      <Heading2 id="properties">Properties</Heading2>

      <PropertyTable
        properties={[
          {name: 'accent', type: 'boolean'},
          {name: 'as', type: 'React.ElementType | keyof JSX.IntrinsicElements'},
          {
            name: 'muted',
            type: 'boolean',
            description: (
              <PlainContent>
                <PlainParagraph>
                  {'When '}
                  <code>true</code>
                  {' the text color will be muted.'}
                </PlainParagraph>
              </PlainContent>
            ),
          },
          {name: 'size', type: 'number | number[]'},
          {name: 'textOverflow', type: "'ellipsis'", required: false},
          {
            name: 'trim',
            type: '0 | 1',
            required: false,
            description: (
              <PlainContent>
                <PlainParagraph>
                  {'When set to '}
                  <code>1</code>
                  {
                    ', removes the vertical whitespace above the cap-height and below the baseline introduced by line-height. Use when aligning text flush with icons or when spacing should be measured from the visible glyph edge rather than the line box.'
                  }
                </PlainParagraph>
              </PlainContent>
            ),
          },
          {name: 'weight', type: "'regular' | 'medium' | 'semibold' | 'bold'"},
        ]}
      />
    </Article>
  )
}
