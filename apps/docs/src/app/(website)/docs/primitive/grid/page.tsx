import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeExampleBlock} from '@/components/page/article/content/CodeExampleBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'
import {PropertyTable} from '@/components/page/article/content/PropertyTable'

export const metadata: Metadata = {
  title: 'Grid | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'Grid',
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
      title="Grid"
      isComponent
      headings={[{level: 2, slug: 'properties', text: 'Properties'}]}
    >
      <Paragraph>
        {'The '}
        <code>Grid</code>
        {' component is for building 2-dimensional layers (based on CSS grid).'}
      </Paragraph>

      <CodeExampleBlock
        title="Grid example"
        description="A basic example of using the Grid primitive in Sanity UI."
        code={`<Grid
  gridTemplateColumns={[2, 3, 4, 6]}
  gap={[1, 1, 2, 3]}
  padding={4}
>
  <Card padding={3}>
    <Text>1</Text>
  </Card>
  <Card padding={3}>
    <Text>2</Text>
  </Card>
  <Card padding={3}>
    <Text>3</Text>
  </Card>
  <Card padding={3}>
    <Text>4</Text>
  </Card>
  <Card padding={3}>
    <Text>5</Text>
  </Card>
  <Card padding={3}>
    <Text>6</Text>
  </Card>
  <Card padding={3}>
    <Text>7</Text>
  </Card>
  <Card padding={3}>
    <Text>8</Text>
  </Card>
  <Card padding={3}>
    <Text>9</Text>
  </Card>
  <Card padding={3}>
    <Text>10</Text>
  </Card>
  <Card padding={3}>
    <Text>11</Text>
  </Card>
  <Card padding={3}>
    <Text>12</Text>
  </Card>
</Grid>`}
      />

      <Heading2 id="properties">Properties</Heading2>

      <PropertyTable
        properties={[
          {name: 'autoRows', type: "'auto' | 'min' | 'max' | 'fr'"},
          {name: 'autoCols', type: "'auto' | 'min' | 'max' | 'fr'"},
          {name: 'autoFlow', type: "'row' | 'column' | 'row dense' | 'column dense'"},
          {name: 'gridTemplateColumns', type: 'number | number[]'},
          {
            name: 'columns',
            type: 'number | number[]',
            deprecated: 'Use gridTemplateColumns instead. Will be removed in v4.',
          },
          {name: 'gap', type: 'number | number[]'},
          {name: 'gapX', type: 'number | number[]'},
          {name: 'gapY', type: 'number | number[]'},
          {name: 'gridTemplateRows', type: 'number | number[]'},
          {
            name: 'rows',
            type: 'number | number[]',
            deprecated: 'Use gridTemplateRows instead. Will be removed in v4.',
          },
        ]}
      />
    </Article>
  )
}
