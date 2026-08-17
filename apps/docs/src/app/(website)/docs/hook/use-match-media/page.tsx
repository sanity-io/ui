import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeBlock} from '@/components/page/article/content/CodeBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'

export const metadata: Metadata = {
  title: 'useMatchMedia | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'useMatchMedia',
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
      title="useMatchMedia"
      isHook
      headings={[{level: 2, slug: 'signature', text: 'Signature'}]}
    >
      <Paragraph>
        {'Efficiently subscribes to a '}
        <code>window.matchMedia</code>
        {' query and returns whether it currently matches.'}
      </Paragraph>

      <CodeBlock
        language="tsx"
        code={`import {useMatchMedia} from '@sanity/ui'

function App() {
  // \`isWide\` updates when the viewport crosses 600px
  const isWide = useMatchMedia('(min-width: 600px)')

  return <>{isWide ? 'Wide viewport' : 'Narrow viewport'}</>
}`}
      />

      <Paragraph>
        {'The optional '}
        <code>getServerSnapshot</code>
        {
          ' parameter is only called during server-side rendering (and hydration), where the media query cannot be evaluated.'
        }
      </Paragraph>

      <Heading2 id="signature">Signature</Heading2>

      <CodeBlock
        language="tsx"
        code={`(
  mediaQueryString: \`(\${string})\`,
  getServerSnapshot?: () => boolean
) => boolean`}
      />
    </Article>
  )
}
