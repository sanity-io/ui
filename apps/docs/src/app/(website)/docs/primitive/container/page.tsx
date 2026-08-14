import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeExampleBlock} from '@/components/page/article/content/CodeExampleBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'
import {PropertyTable} from '@/components/page/article/content/PropertyTable'

export const metadata: Metadata = {
  title: 'Container | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'Container',
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
      title="Container"
      isComponent
      headings={[{level: 2, slug: 'properties', text: 'Properties'}]}
    >
      <Paragraph>
        {'The '}
        <code>Container</code>
        {' component wraps content layout in a defined set of widths.'}
      </Paragraph>

      <CodeExampleBlock
        title="Container example"
        description="A basic example of using the Container primitive in Sanity UI."
        code={`<Container width={0}>
  <Card padding={4}>
    <Text size={[2, 2, 3, 4]}>Contained text</Text>
  </Card>
</Container>`}
      />

      <Heading2 id="properties">Properties</Heading2>

      <PropertyTable
        properties={[
          {name: 'as', type: 'React.ElementType | keyof JSX.IntrinsicElements'},
          {
            name: 'display',
            type: "'none' | 'block' | 'grid' | 'flex' | 'inline-block' | Array<'none' | 'block' | 'grid' | 'flex' | 'inline-block'>",
          },
          {name: 'height', type: "'stretch' | 'fill' | Array<'stretch' | 'fill'>"},
          {
            name: 'overflow',
            type: "'visible' | 'hidden' | 'auto' | Array<'visible' | 'hidden' | 'auto'>",
          },
          {name: 'sizing', type: "'content' | 'border'"},
          {name: 'width', type: 'number | number[]'},
        ]}
      />
    </Article>
  )
}
