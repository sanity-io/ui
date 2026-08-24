import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeExampleBlock} from '@/components/page/article/content/CodeExampleBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'
import {PropertyTable} from '@/components/page/article/content/PropertyTable'
import {PlainContent, PlainParagraph} from '@/components/page/article/PlainContent'

export const metadata: Metadata = {
  title: 'Label | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'Label',
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
      title="Label"
      isComponent
      headings={[{level: 2, slug: 'properties', text: 'Properties'}]}
    >
      <Paragraph>Typographic labels.</Paragraph>

      <CodeExampleBlock
        title="Label example"
        description="A basic example of using the Label primitive in Sanity UI."
        code={`<Grid gap={[3, 3, 4, 5]} padding={4}>
  <Card>
    <Label size={0}>Label 0</Label>
  </Card>
  <Card>
    <Label size={1}>Label 1</Label>
  </Card>
  <Card>
    <Label size={2}>Label 2</Label>
  </Card>
  <Card>
    <Label size={3}>Label 3</Label>
  </Card>
  <Card>
    <Label size={4}>Label 4</Label>
  </Card>
</Grid>`}
      />

      <Heading2 id="properties">Properties</Heading2>

      <PropertyTable
        properties={[
          {name: 'accent', type: 'boolean', required: false},
          {name: 'as', type: 'React.ElementType | keyof JSX.IntrinsicElements'},
          {name: 'muted', type: 'boolean'},
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
                    ', removes the vertical whitespace above the cap-height and below the baseline introduced by line-height. Useful when the label sits next to an icon and the spacing should be measured from the visible glyph edge.'
                  }
                </PlainParagraph>
              </PlainContent>
            ),
          },
          {name: 'weight', type: "'regular' | 'medium' | 'semibold' | 'bold'", required: false},
        ]}
      />
    </Article>
  )
}
