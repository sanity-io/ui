import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {Callout} from '@/components/page/article/content/Callout'
import {CodeBlock} from '@/components/page/article/content/CodeBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'
import {PlainParagraph} from '@/components/page/article/PlainContent'

export const metadata: Metadata = {
  title: 'useMediaIndex | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'useMediaIndex',
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
      title="useMediaIndex"
      isHook
      headings={[{level: 2, slug: 'signature', text: 'Signature'}]}
    >
      <Callout icon="info-outline" tone="primary">
        <PlainParagraph>
          <strong>Beta</strong>: this hook is in beta — its API may change in a future release.
        </PlainParagraph>
      </Callout>

      <Paragraph>
        {'Returns the index of the current media breakpoint, based on the '}
        <code>media</code>
        {
          ' values of the current theme. Useful for picking values from responsive property arrays outside of CSS.'
        }
      </Paragraph>

      <CodeBlock
        language="tsx"
        code={`import {useMediaIndex} from '@sanity/ui'

function App() {
  // With the default theme breakpoints
  // ([360, 600, 900, 1200, 1800, 2400]),
  // \`mediaIndex\` is 0 below 360px wide,
  // 1 between 360px and 599px, and so on.
  const mediaIndex = useMediaIndex()

  return <>{mediaIndex >= 2 ? 'Wide layout' : 'Narrow layout'}</>
}`}
      />

      <Heading2 id="signature">Signature</Heading2>

      <CodeBlock language="tsx" code={`() => number`} />
    </Article>
  )
}
