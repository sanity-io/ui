import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {Callout} from '@/components/page/article/content/Callout'
import {CodeBlock} from '@/components/page/article/content/CodeBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'
import {PlainParagraph} from '@/components/page/article/PlainContent'

export const metadata: Metadata = {
  title: 'useElementSize | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'useElementSize',
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
      title="useElementSize"
      isHook
      headings={[{level: 2, slug: 'signature', text: 'Signature'}]}
    >
      <Callout icon="info-outline" tone="primary">
        <PlainParagraph>
          <strong>Beta</strong>: this hook is in beta — its API may change in a future release.
        </PlainParagraph>
      </Callout>

      <Paragraph>
        {'Subscribes to the size of a DOM element using '}
        <code>ResizeObserver</code>
        {', and returns its latest content and border box sizes. It replaces the deprecated '}
        <code>useElementRect()</code>
        {' hook.'}
      </Paragraph>

      <CodeBlock
        language="tsx"
        code={`import {useElementSize} from '@sanity/ui'
import {useState} from 'react'

function App() {
  const [element, setElement] = useState(null)
  const size = useElementSize(element)

  return (
    <div ref={setElement}>
      {size?.border.width} x {size?.border.height}
    </div>
  )
}`}
      />

      <Heading2 id="signature">Signature</Heading2>

      <CodeBlock
        language="tsx"
        code={`(element: HTMLElement | null) => {
  content: {width: number; height: number}
  border: {width: number; height: number}
} | null`}
      />
    </Article>
  )
}
