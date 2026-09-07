import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeBlock} from '@/components/page/article/content/CodeBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'

export const metadata: Metadata = {
  title: 'usePrefersReducedMotion | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'usePrefersReducedMotion',
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
      title="usePrefersReducedMotion"
      isHook
      headings={[{level: 2, slug: 'signature', text: 'Signature'}]}
    >
      <Paragraph>
        {'Subscribes to '}
        <code>@media (prefers-reduced-motion: reduce)</code>
        {' to find out if the user prefers reduced motion at any given time.'}
      </Paragraph>

      <CodeBlock
        language="tsx"
        code={`import {usePrefersReducedMotion} from '@sanity/ui'

function App() {
  // This value will change when the system setting
  // for reduced motion is toggled.
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div style={{transition: prefersReducedMotion ? 'none' : 'transform 200ms'}}>
      ...
    </div>
  )
}`}
      />

      <Paragraph>
        {'The optional '}
        <code>getServerSnapshot</code>
        {' parameter is only called during server-side rendering, where '}
        <code>(prefers-reduced-motion: no-preference)</code>
        {' is assumed by default.'}
      </Paragraph>

      <Heading2 id="signature">Signature</Heading2>

      <CodeBlock language="tsx" code={`(getServerSnapshot = () => false) => boolean`} />
    </Article>
  )
}
