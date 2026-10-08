import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeBlock} from '@/components/page/article/content/CodeBlock'
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
      headings={[
        {level: 2, slug: 'controlling-open', text: 'Controlling open'},
        {level: 2, slug: 'properties', text: 'Properties'},
      ]}
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

      <Heading2 id="controlling-open">Controlling open</Heading2>

      <Paragraph>
        {'The popover is controlled through '}
        <code>open</code>
        {'. Set it inside '}
        <code>startTransition</code>
        {'. A closed popover pre-renders its content hidden, in a transition, once the reference '}
        {'element shows intent to open it (focus, a pointer entering or pressing it). When '}
        <code>open</code>
        {' changes in a transition too, React keeps rendering that content in the background '}
        {'if the open comes before it is done, instead of rendering it synchronously in the '}
        {'click. Content that was pre-rendered already shows in the first frame after the click '}
        {'either way.'}
      </Paragraph>

      <CodeBlock
        language="tsx"
        code={`import {Button, Popover, Text} from '@sanity/ui'
import {startTransition, useState} from 'react'

function Example() {
  const [open, setOpen] = useState(false)

  return (
    <Popover content={<Text size={1}>Hello, world</Text>} open={open} padding={3}>
      <Button
        onClick={() => startTransition(() => setOpen((isOpen) => !isOpen))}
        text="Toggle"
      />
    </Popover>
  )
}`}
      />

      <Paragraph>
        {'Wrap the state update itself: a '}
        <code>startTransition</code>
        {' around code that schedules the update for later (a timeout) does not reach it. '}
        {'Reset '}
        <code>open</code>
        {' from an event handler or in a transition as well, not during render: a render-phase '}
        {'update is applied on top of the render in progress and is not rebased over a pending '}
        {'transition, so a '}
        <code>setOpen(false)</code>
        {' made during render while an opening transition has not committed yet (its render '}
        {'suspended on the content, say) is lost, and the open applies afterwards.'}
      </Paragraph>

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
          {
            name: 'open',
            type: 'boolean',
            description: (
              <PlainContent>
                <PlainParagraph>
                  {'Whether the popover is open. Set it inside '}
                  <code>startTransition</code>
                  {', see '}
                  <a href="#controlling-open">Controlling open</a>.
                </PlainParagraph>
              </PlainContent>
            ),
          },
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
