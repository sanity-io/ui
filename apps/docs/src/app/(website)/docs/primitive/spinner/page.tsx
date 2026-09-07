import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeExampleBlock} from '@/components/page/article/content/CodeExampleBlock'
import {Heading2, Heading3} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'
import {PropertyTable} from '@/components/page/article/content/PropertyTable'

export const metadata: Metadata = {
  title: 'Spinner | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'Spinner',
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
      title="Spinner"
      isComponent
      headings={[
        {level: 2, slug: 'properties', text: 'Properties'},
        {level: 2, slug: 'examples', text: 'Examples'},
        {level: 3, slug: 'centered-spinner', text: 'Centered spinner'},
        {level: 3, slug: 'centered-with-text', text: 'Centered with text'},
      ]}
    >
      <Paragraph>Indicate that something is loading for an indeterminate amount of time.</Paragraph>

      <CodeExampleBlock
        title="Spinner example"
        description="A basic example of using the Spinner primitive in Sanity UI."
        code={`<Card padding={4}>
  <Flex justify="center">
    <Spinner muted />
  </Flex>
</Card>`}
      />

      <Heading2 id="properties">Properties</Heading2>

      <PropertyTable
        properties={[
          {name: 'muted', type: 'boolean'},
          {name: 'size', type: 'number | number[]'},
        ]}
      />

      <Heading2 id="examples">Examples</Heading2>

      <Heading3 id="centered-spinner">Centered spinner</Heading3>

      <CodeExampleBlock
        code={`<Card padding={4}>
  <Flex align="center" height="fill" justify="center">
    <Spinner muted />
  </Flex>
</Card>`}
      />

      <Heading3 id="centered-with-text">Centered with text</Heading3>

      <CodeExampleBlock
        code={`<Card padding={4}>
  <Flex
    align="center"
    direction="column"
    gap={3}
    height="fill"
    justify="center"
  >
    <Spinner muted />
    <Text muted size={1}>
      Loading some content…
    </Text>
  </Flex>
</Card>`}
      />

      <Paragraph>
        {'Or if you want to horizontally align, you can change to '}
        <code>direction="row"</code>.
      </Paragraph>

      <CodeExampleBlock
        code={`<Card padding={4}>
  <Flex
    align="center"
    direction="row" // <-
    gap={3}
    height="fill"
    justify="center"
  >
    <Spinner muted />
    <Text muted size={1}>
      Loading some content…
    </Text>
  </Flex>
</Card>`}
      />
    </Article>
  )
}
