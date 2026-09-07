import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeExampleBlock} from '@/components/page/article/content/CodeExampleBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'
import {PropertyTable} from '@/components/page/article/content/PropertyTable'

export const metadata: Metadata = {
  title: 'Code | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'Code',
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
      title="Code"
      isComponent
      headings={[
        {level: 2, slug: 'size', text: 'Size'},
        {level: 2, slug: 'language', text: 'Language'},
        {level: 2, slug: 'properties', text: 'Properties'},
      ]}
    >
      <Heading2 id="size">Size</Heading2>

      <CodeExampleBlock
        title="Code example"
        description="A basic example of using the Code primitive in Sanity UI."
        code={`<Stack padding={4} gap={[3, 3, 4, 5]}>
  <Card>
    <Code size={0}>Code 0</Code>
  </Card>
  <Card>
    <Code size={1}>Code 1</Code>
  </Card>
  <Card>
    <Code size={2}>Code 2</Code>
  </Card>
  <Card>
    <Code size={3}>Code 3</Code>
  </Card>
  <Card>
    <Code size={4}>Code 4</Code>
  </Card>
</Stack>`}
      />

      <Heading2 id="language">Language</Heading2>

      <Paragraph>
        {'The '}
        <code>language</code>
        {' property is used to define the language to use for syntax highlighting.'}
      </Paragraph>

      <CodeExampleBlock
        code={`<Card padding={4}>
  <Code language="typescript">
    console.log('Hello, world')
  </Code>
</Card>`}
      />

      <Heading2 id="properties">Properties</Heading2>

      <PropertyTable
        properties={[
          {name: 'as', type: 'React.ElementType | keyof JSX.IntrinsicElements'},
          {name: 'language', type: 'string'},
          {name: 'muted', type: 'boolean'},
          {name: 'size', type: 'number | number[]'},
          {name: 'weight', type: 'string'},
        ]}
      />
    </Article>
  )
}
