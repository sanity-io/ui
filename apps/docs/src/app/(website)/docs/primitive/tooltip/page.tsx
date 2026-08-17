import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeExampleBlock} from '@/components/page/article/content/CodeExampleBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'
import {PropertyTable} from '@/components/page/article/content/PropertyTable'
import {PlainContent, PlainParagraph} from '@/components/page/article/PlainContent'

export const metadata: Metadata = {
  title: 'Tooltip | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'Tooltip',
    description: 'An ergonomic toolkit to design with code.',
    siteName: 'Sanity UI',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@sanity_io',
  },
}

export default function Page() {
  return (
    <Article
      title="Tooltip"
      isComponent
      headings={[{level: 2, slug: 'properties', text: 'Properties'}]}
    >
      <Paragraph>Tooltips display information when hovering, focusing or tapping.</Paragraph>

      <CodeExampleBlock
        title="Tooltip example"
        description="A basic example of using the Tooltip primitive in Sanity UI."
        code={`<Card padding={4} style={{textAlign: 'center'}}>
  <Text>
    <Tooltip
      content={
        <Box padding={1}>
          <Text muted size={1}>
            Tooltip content
          </Text>
        </Box>
      }
      animate
      fallbackPlacements={['right', 'left']}
      placement="top"
      portal
    >
      <span style={{display: 'inline-block'}}>
        Hover here
      </span>
    </Tooltip>
  </Text>
</Card>`}
      />

      <Heading2 id="properties">Properties</Heading2>

      <PropertyTable
        properties={[
          {
            name: 'allowedAutoPlacements',
            type: 'Placement[]',
            deprecated: 'Use fallbackPlacements instead.',
          },
          {
            name: 'animate',
            type: 'boolean',
            required: false,
            description: (
              <PlainContent>
                <PlainParagraph>
                  {'Whether the '}
                  <code>Tooltip</code>
                  {' should animate in and out.'}
                </PlainParagraph>
              </PlainContent>
            ),
          },
          {name: 'arrow', type: 'boolean', required: false},
          {name: 'boundaryElement', type: 'HTMLElement | null'},
          {name: 'children', type: 'React.ReactElement'},
          {name: 'content', type: 'React.ReactNode'},
          {
            name: 'delay',
            type: 'number | Partial<{ open: number; close: number }>',
            description: (
              <PlainContent>
                <PlainParagraph>
                  An optional delay to apply to the tooltip. If a number is applied, it will be used
                  for both opening and closing.
                </PlainParagraph>
              </PlainContent>
            ),
          },
          {name: 'disabled', type: 'boolean'},
          {name: 'fallbackPlacements', type: 'Placement[]'},
          {name: 'placement', type: 'Placement'},
          {
            name: 'portal',
            type: 'boolean',
            description: (
              <PlainContent>
                <PlainParagraph>
                  Whether or not to render the tooltip in a portal element.
                </PlainParagraph>
              </PlainContent>
            ),
          },
          {name: 'shadow', type: 'number | number[]'},
        ]}
      />
    </Article>
  )
}
