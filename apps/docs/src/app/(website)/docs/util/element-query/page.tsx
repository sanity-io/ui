import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeBlock} from '@/components/page/article/content/CodeBlock'
import {Paragraph} from '@/components/page/article/content/Paragraph'

export const metadata: Metadata = {
  title: 'ElementQuery | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'ElementQuery',
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
    <Article title="ElementQuery" isComponent>
      <Paragraph>
        A utility React component for styling elements based on the width of the parent element.
      </Paragraph>

      <CodeBlock
        language="tsx"
        code={`import {ElementQuery} from '@sanity/ui'
import styled from 'styled-components'

const Responsive = styled.div\`
  padding: 10px;

  [data-eq-min~="0"] > & {
    padding: 20px;
  }
  
  [data-eq-min~="1"] > & {
    padding: 30px;
  }
\`

function ResponsiveItems () {
  return (
    <ElementQuery>
      <Responsive>foo</Responsive>
      <Responsive>bar</Responsive>
    </ElementQuery>
  )
}`}
      />
    </Article>
  )
}
