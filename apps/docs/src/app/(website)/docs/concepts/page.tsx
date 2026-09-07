import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'

export const metadata: Metadata = {
  title: 'Concepts | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'Concepts',
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
      title="Concepts"
      isComponent
      headings={[
        {level: 2, slug: 'primitives', text: 'Primitives'},
        {level: 2, slug: 'components', text: 'Components'},
        {level: 2, slug: 'hooks', text: 'Hooks'},
        {level: 2, slug: 'utils', text: 'Utils'},
        {level: 2, slug: 'responsive-properties', text: 'Responsive properties'},
      ]}
    >
      <Heading2 id="primitives">Primitives</Heading2>

      <Paragraph>
        {'The most basic elements in Sanity UI are called '}
        <em>primitives</em>. These are React components which do not build on other components, but
        are considered as fundamental building blocks.
      </Paragraph>

      <Heading2 id="components">Components</Heading2>

      <Paragraph>
        <em>Components</em>
        {' are React components which are typically composed using primitives.'}
      </Paragraph>

      <Heading2 id="hooks">Hooks</Heading2>

      <Paragraph>React hooks that are commonly used in most UIs.</Paragraph>

      <Heading2 id="utils">Utils</Heading2>

      <Paragraph>UI utilities.</Paragraph>

      <Heading2 id="responsive-properties">Responsive properties</Heading2>

      <Paragraph>
        {
          'Used to accommodate for various devices sizes. Responsive properties take an array of values, e.g. '
        }
        <code>{'<Box padding={[1, 2, 3]}>'}</code>.
      </Paragraph>
    </Article>
  )
}
