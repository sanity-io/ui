import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeExampleBlock} from '@/components/page/article/content/CodeExampleBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'
import {PropertyTable} from '@/components/page/article/content/PropertyTable'
import {PlainContent, PlainParagraph} from '@/components/page/article/PlainContent'

export const metadata: Metadata = {
  title: 'Box | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'Box',
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
      title="Box"
      isComponent
      headings={[{level: 2, slug: 'properties', text: 'Properties'}]}
    >
      <Paragraph>
        {'The '}
        <code>Box</code>
        {
          ' component is a basic layout wrapper component which provides utility properties for flex, margins and padding.'
        }
      </Paragraph>

      <CodeExampleBlock
        title="Box"
        description="A basic example of using the Box primitive in Sanity UI."
        code={`<Card padding={4}>
  <Box
    padding={[3, 3, 4, 5]}
    style={{outline: '1px solid red'}}
  >
    <Stack gap={[3, 3, 4, 5]}>
      <Text align="center" size={[2, 2, 3, 4]}>
        Text in a box with responsive padding
      </Text>
      <Text align="center" muted size={[1, 1, 2]}>
        (The red outline is a custom style)
      </Text>
    </Stack>
  </Box>
</Card>`}
      />

      <Heading2 id="properties">Properties</Heading2>

      <PropertyTable
        properties={[
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
          {
            name: 'flex',
            type: 'number | number[]',
            description: (
              <PlainContent>
                <PlainParagraph>
                  {'Sets the '}
                  <code>flex</code>
                  {' CSS attribute. The property is responsive.'}
                </PlainParagraph>
              </PlainContent>
            ),
          },
          {name: 'height', type: "'stretch' | 'fill' | Array<'stretch' | 'fill'>"},
          {
            name: 'margin',
            type: 'number | number[]',
            description: (
              <PlainContent>
                <PlainParagraph>
                  Applies margins to all sides. The property is responsive.
                </PlainParagraph>
              </PlainContent>
            ),
          },
          {
            name: 'marginX',
            type: 'number | number[]',
            description: (
              <PlainContent>
                <PlainParagraph>
                  Applies margins to the left and right sides. The property is responsive.
                </PlainParagraph>
              </PlainContent>
            ),
          },
          {
            name: 'marginY',
            type: 'number | number[]',
            description: (
              <PlainContent>
                <PlainParagraph>
                  Applies margins to the top and bottom sides. The property is responsive.
                </PlainParagraph>
              </PlainContent>
            ),
          },
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
          {name: 'sizing', type: "'content' | 'border'"},
        ]}
      />
    </Article>
  )
}
