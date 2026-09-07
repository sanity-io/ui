import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeExampleBlock} from '@/components/page/article/content/CodeExampleBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'
import {PropertyTable} from '@/components/page/article/content/PropertyTable'

export const metadata: Metadata = {
  title: 'Card | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'Card',
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
      title="Card"
      isComponent
      headings={[
        {level: 2, slug: 'isn-t-this-the-same-as-a-box', text: 'Isn’t this the same as a Box?'},
        {level: 2, slug: 'properties', text: 'Properties'},
      ]}
    >
      <Paragraph>
        {'The '}
        <code>Card</code>
        {
          ' component acts much like a Box, but with a background and foreground color. Components within a '
        }
        <code>Card</code>
        {' inherit its colors.'}
      </Paragraph>

      <CodeExampleBlock
        title="Cards with tones"
        description="A basic example of using the Card primitive in Sanity UI."
        code={`<Card padding={4}>
  <Stack gap={[3, 3, 4]}>
    <Card padding={[3, 3, 4]} radius={2} shadow={1}>
      <Text align="center" size={[2, 2, 3]}>
        Text in a card with <a href="#">link</a>
      </Text>
    </Card>

    <Card
      padding={[3, 3, 4]}
      radius={2}
      shadow={1}
      tone="primary"
    >
      <Text align="center" size={[2, 2, 3]}>
        Text in a card with <a href="#">link</a>
      </Text>
    </Card>

    <Card
      padding={[3, 3, 4]}
      radius={2}
      shadow={1}
      tone="positive"
    >
      <Text align="center" size={[2, 2, 3]}>
        Text in a card with <a href="#">link</a>
      </Text>
    </Card>

    <Card
      padding={[3, 3, 4]}
      radius={2}
      shadow={1}
      tone="caution"
    >
      <Text align="center" size={[2, 2, 3]}>
        Text in a card with <a href="#">link</a>
      </Text>
    </Card>

    <Card
      padding={[3, 3, 4]}
      radius={2}
      shadow={1}
      tone="critical"
    >
      <Text align="center" size={[2, 2, 3]}>
        Text in a card with <a href="#">link</a>
      </Text>
    </Card>
  </Stack>
</Card>`}
      />

      <Heading2 id="isn-t-this-the-same-as-a-box">
        {'Isn’t this the same as a '}
        <code>Box</code>?
      </Heading2>

      <Paragraph>
        {'Almost – the '}
        <code>Card</code>
        {' component is exactly like a '}
        <code>Box</code>
        {' except it also has color, border, radius, and shadow properties. So the '}
        <code>Card</code>
        {' is typically used when needing a background and foreground color on an element.'}
      </Paragraph>

      <Heading2 id="properties">Properties</Heading2>

      <PropertyTable
        properties={[
          {name: 'as', type: 'React.ElementType | keyof JSX.IntrinsicElements'},
          {name: 'border', type: 'boolean'},
          {name: 'borderTop', type: 'boolean'},
          {name: 'borderRight', type: 'boolean'},
          {name: 'borderBottom', type: 'boolean'},
          {name: 'borderLeft', type: 'boolean'},
          {name: 'gridColumn', type: "'auto' | 'full' | number | Array<'auto' | 'full' | number>"},
          {
            name: 'column',
            type: "'auto' | 'full' | number | Array<'auto' | 'full' | number>",
            deprecated: 'Use gridColumn instead. Will be removed in v4.',
          },
          {name: 'gridColumnStart', type: "'auto' | number | Array<'auto' | number>"},
          {
            name: 'columnStart',
            type: "'auto' | number | Array<'auto' | number>",
            deprecated: 'Use gridColumnStart instead. Will be removed in v4.',
          },
          {name: 'gridColumnEnd', type: "'auto' | number | Array<'auto' | number>"},
          {
            name: 'columnEnd',
            type: "'auto' | number | Array<'auto' | number>",
            deprecated: 'Use gridColumnEnd instead. Will be removed in v4.',
          },
          {
            name: 'display',
            type: "'none' | 'block' | 'grid' | 'flex' | 'inline-block' | Array<'none' | 'block' | 'grid' | 'flex' | 'inline-block'>",
          },
          {name: 'flex', type: 'number | number[]'},
          {name: 'height', type: "'stretch' | 'fill' | Array<'stretch' | 'fill'>"},
          {name: 'margin', type: 'number | number[]'},
          {name: 'marginX', type: 'number | number[]'},
          {name: 'marginY', type: 'number | number[]'},
          {name: 'marginTop', type: 'number | number[]'},
          {name: 'marginRight', type: 'number | number[]'},
          {name: 'marginBottom', type: 'number | number[]'},
          {name: 'marginLeft', type: 'number | number[]'},
          {
            name: 'overflow',
            type: "'visible' | 'hidden' | 'auto' | Array<'visible' | 'hidden' | 'auto'>",
          },
          {name: 'padding', type: 'number | number[]'},
          {name: 'paddingX', type: 'number | number[]'},
          {name: 'paddingY', type: 'number | number[]'},
          {name: 'paddingTop', type: 'number | number[]'},
          {name: 'paddingRight', type: 'number | number[]'},
          {name: 'paddingBottom', type: 'number | number[]'},
          {name: 'paddingLeft', type: 'number | number[]'},
          {name: 'radius', type: 'number | number[]'},
          {name: 'gridRow', type: "'auto' | 'full' | number | Array<'auto' | 'full' | number>"},
          {
            name: 'row',
            type: "'auto' | 'full' | number | Array<'auto' | 'full' | number>",
            deprecated: 'Use gridRow instead. Will be removed in v4.',
          },
          {name: 'gridRowStart', type: "'auto' | number | Array<'auto' | number>"},
          {
            name: 'rowStart',
            type: "'auto' | number | Array<'auto' | number>",
            deprecated: 'Use gridRowStart instead. Will be removed in v4.',
          },
          {name: 'gridRowEnd', type: "'auto' | number | Array<'auto' | number>"},
          {
            name: 'rowEnd',
            type: "'auto' | number | Array<'auto' | number>",
            deprecated: 'Use gridRowEnd instead. Will be removed in v4.',
          },
          {name: 'scheme', type: "'light' | 'dark'"},
          {name: 'shadow', type: 'number | number[]'},
          {name: 'sizing', type: "'content' | 'border'"},
          {
            name: 'tone',
            type: "'default' | 'transparent' | 'positive' | 'caution' | 'critical' | 'brand'",
          },
        ]}
      />
    </Article>
  )
}
