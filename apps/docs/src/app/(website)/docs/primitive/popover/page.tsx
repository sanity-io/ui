import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeExampleBlock} from '@/components/page/article/content/CodeExampleBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'
import {PropertyTable} from '@/components/page/article/content/PropertyTable'
import {PlainContent, PlainParagraph} from '@/components/page/article/PlainContent'

export const metadata: Metadata = {
  title: 'Popover | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'Popover',
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
      title="Popover"
      isComponent
      headings={[{level: 2, slug: 'properties', text: 'Properties'}]}
    >
      <Paragraph>
        {'The '}
        <code>Popover</code>
        {' component is used to display some content on top of another.'}
      </Paragraph>

      <CodeExampleBlock
        title="Popover example"
        description="A basic example of using the Popover primitive in Sanity UI."
        code={`<Box padding={4} style={{textAlign: 'center'}}>
  <Popover
    content={<Text size={[2, 2, 3, 4]}>Hello, world</Text>}
    padding={4}
    placement="top"
    portal
    open
  >
    <Button
      mode="ghost"
      padding={[3, 3, 4]}
      text="Reference"
    />
  </Popover>
</Box>`}
      />

      <Heading2 id="properties">Properties</Heading2>

      <PropertyTable
        properties={[
          {
            name: 'animate',
            type: 'boolean',
            required: false,
            description: (
              <PlainContent>
                <PlainParagraph>
                  {'Whether the '}
                  <code>Popover</code>
                  {' should animate in and out.'}
                </PlainParagraph>
              </PlainContent>
            ),
          },
          {name: 'arrow', type: 'boolean', required: false},
          {name: 'floatingBoundary', type: 'HTMLElement | null'},
          {name: 'referenceBoundary', type: 'HTMLElement | null'},
          {
            name: 'boundaryElement',
            type: 'HTMLElement | null',
            deprecated: 'Use floatingBoundary and/or referenceBoundary instead.',
          },
          {name: 'children', type: 'React.ReactElement'},
          {name: 'constrainSize', type: 'boolean'},
          {name: 'content', type: 'React.ReactNode'},
          {name: 'disabled', type: 'boolean'},
          {name: 'open', type: 'boolean'},
          {name: 'padding', type: 'number | number[]'},
          {
            name: 'placement',
            type: "'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'left' | 'left-start' | 'left-end' | 'bottom' | 'bottom-start' | 'bottom-end'",
          },
          {
            name: 'portal',
            type: 'boolean',
            description: (
              <PlainContent>
                <PlainParagraph>
                  Whether or not to render the popover in a portal element.
                </PlainParagraph>
              </PlainContent>
            ),
          },
          {name: 'preventOverflow', type: 'boolean'},
          {name: 'radius', type: 'number | number[]'},
          {name: 'referenceElement', type: 'HTMLElement | null'},
          {name: 'scheme', type: "'dark' | 'light'"},
        ]}
      />
    </Article>
  )
}
