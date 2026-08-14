import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeBlock} from '@/components/page/article/content/CodeBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'

export const metadata: Metadata = {
  title: 'useClickOutsideEvent | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'useClickOutsideEvent',
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
      title="useClickOutsideEvent"
      isHook
      headings={[{level: 2, slug: 'signature', text: 'Signature'}]}
    >
      <Paragraph>
        {'The '}
        <code>useClickOutsideEvent()</code>
        {
          ' hook calls a listener when clicking outside one or more elements. It replaces the deprecated '
        }
        <code>useClickOutside()</code>
        {
          ' hook: elements are read from refs (or any function returning elements) instead of element state, so the event listener is not re-subscribed on every render.'
        }
      </Paragraph>

      <CodeBlock
        language="tsx"
        code={`import {useClickOutsideEvent} from '@sanity/ui'
import {useRef} from 'react'

function App() {
  const buttonRef = useRef(null)

  useClickOutsideEvent(
    (event) => {
      // Called when clicking outside of the button
    },
    () => [buttonRef.current],
  )

  return <button ref={buttonRef}>...</button>
}`}
      />

      <Heading2 id="signature">Signature</Heading2>

      <CodeBlock
        language="tsx"
        code={`(
  listener: ((event: MouseEvent) => void) | false | undefined,
  elements?: () => (HTMLElement | null | (HTMLElement | null)[])[],
  boundaryElement?: () => HTMLElement | null
) => void`}
      />
    </Article>
  )
}
