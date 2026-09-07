import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeExampleBlock} from '@/components/page/article/content/CodeExampleBlock'
import {Heading2, Heading3} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'
import {PropertyTable} from '@/components/page/article/content/PropertyTable'

export const metadata: Metadata = {
  title: 'Checkbox | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'Checkbox',
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
      title="Checkbox"
      isComponent
      headings={[
        {level: 2, slug: 'examples', text: 'Examples'},
        {
          level: 3,
          slug: 'basic-example-of-controlling-state',
          text: 'Basic example of controlling state',
        },
        {level: 3, slug: 'with-label', text: 'With label'},
        {level: 2, slug: 'properties', text: 'Properties'},
      ]}
    >
      <Paragraph>Checkboxes allow the user to select one or more items from a set.</Paragraph>

      <Heading2 id="examples">Examples</Heading2>

      <Heading3 id="basic-example-of-controlling-state">
        Basic example of controlling state
      </Heading3>

      <CodeExampleBlock
        title="Controlling state of Checkbox"
        description="A basic example of using the Checkbox primitive in Sanity UI."
        code={`<Card padding={4} style={{textAlign: 'center'}}>
  <Inline gap={[3, 3, 4, 5]}>
    <Checkbox checked />
    <Checkbox checked={false} />
    <Checkbox indeterminate />
  </Inline>
</Card>`}
      />

      <Heading3 id="with-label">With label</Heading3>

      <CodeExampleBlock
        title="Checkbox with label"
        code={`<Card padding={4}>
  <Flex align="center">
    <Checkbox id="checkbox" style={{display: 'block'}} />
    <Box flex={1} paddingLeft={3}>
      <Text>
        <label htmlFor="checkbox">Label text</label>
      </Text>
    </Box>
  </Flex>
</Card>`}
      />

      <Heading2 id="properties">Properties</Heading2>

      <Paragraph>
        {'The '}
        <code>Checkbox</code>
        {' component’s properties extend all properties of an '}
        <code>{'<input type="checkbox" />'}</code>
        {' element, except '}
        <code>type</code>.
      </Paragraph>

      <PropertyTable properties={[{name: 'indeterminate', type: 'boolean', required: false}]} />
    </Article>
  )
}
