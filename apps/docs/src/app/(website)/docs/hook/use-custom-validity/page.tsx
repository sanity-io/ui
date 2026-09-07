import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {Callout} from '@/components/page/article/content/Callout'
import {CodeBlock} from '@/components/page/article/content/CodeBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'
import {PlainParagraph} from '@/components/page/article/PlainContent'

export const metadata: Metadata = {
  title: 'useCustomValidity | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'useCustomValidity',
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
      title="useCustomValidity"
      isHook
      headings={[{level: 2, slug: 'signature', text: 'Signature'}]}
    >
      <Callout icon="info-outline" tone="primary">
        <PlainParagraph>
          <strong>Beta</strong>: this hook is in beta — its API may change in a future release.
        </PlainParagraph>
      </Callout>

      <Paragraph>
        {'Sets a custom validity message on a form control using the '}constraint validation API
        {'. Form primitives such as '}
        <code>TextInput</code>
        {', '}
        <code>TextArea</code>
        {', '}
        <code>Select</code>
        {', '}
        <code>Checkbox</code>
        {', '}
        <code>Radio</code>
        {' and '}
        <code>Switch</code>
        {' expose this as their '}
        <code>customValidity</code>
        {' property.'}
      </Paragraph>

      <CodeBlock
        language="tsx"
        code={`import {useCustomValidity} from '@sanity/ui'
import {useRef} from 'react'

function App() {
  const inputRef = useRef(null)

  // Marks the input as invalid in the browser's
  // constraint validation API
  useCustomValidity(inputRef, 'This value is not valid')

  return <input ref={inputRef} />
}`}
      />

      <Heading2 id="signature">Signature</Heading2>

      <CodeBlock
        language="tsx"
        code={`(
  ref: {current: null | {setCustomValidity: (validity: string) => void}},
  customValidity: string | undefined
) => void`}
      />
    </Article>
  )
}
