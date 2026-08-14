import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeExampleBlock} from '@/components/page/article/content/CodeExampleBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'
import {PropertyTable} from '@/components/page/article/content/PropertyTable'

export const metadata: Metadata = {
  title: 'Heading | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'Heading',
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
      title="Heading"
      isComponent
      headings={[
        {level: 2, slug: 'properties', text: 'Properties'},
        {level: 2, slug: 'accessibility-considerations', text: 'Accessibility considerations'},
      ]}
    >
      <Paragraph>Typographic headings.</Paragraph>

      <CodeExampleBlock
        title="Heading"
        description="A basic example of using the Heading primitive in Sanity UI."
        code={`<Stack padding={4} gap={[3, 3, 4, 5]}>
  <Card>
    <Heading as="h6" size={0}>Heading 0</Heading>
  </Card>
  <Card>
    <Heading as="h5" size={1}>Heading 1</Heading>
  </Card>
  <Card>
    <Heading as="h4" size={2}>Heading 2</Heading>
  </Card>
  <Card>
    <Heading as="h3" size={3}>Heading 3</Heading>
  </Card>
  <Card>
    <Heading as="h2" size={4}>Heading 4</Heading>
  </Card>
  <Card>
    <Heading as="h1" size={5}>Heading 5</Heading>
  </Card>
</Stack>`}
      />

      <Heading2 id="properties">Properties</Heading2>

      <PropertyTable
        properties={[
          {name: 'as', type: 'React.ElementType | keyof JSX.IntrinsicElements'},
          {name: 'size', type: 'number | number[]'},
          {name: 'weight', type: 'string'},
        ]}
      />

      <Heading2 id="accessibility-considerations">Accessibility considerations</Heading2>

      <Paragraph>
        {
          'Many users of assistive technologies use headings as a way to navigate (“navigate by heading” functionality). Tools like screenreaders can display a list of headings, which is '
        }
        <a
          href="https://hiddedevries.nl/en/blog/2018-09-01-heading-structures-are-tables-of-contents"
          target="_blank"
          rel="noindex nofollow"
        >
          a bit like a table of contents
        </a>
        .
      </Paragraph>

      <Paragraph>
        {'For this reason, use the '}
        <code>as</code>
        {
          ' property with a level whenever your heading is something users might want to navigate to. This ensures your heading can be recognised as a heading.'
        }
      </Paragraph>
    </Article>
  )
}
