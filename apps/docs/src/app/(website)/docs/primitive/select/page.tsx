import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeExampleBlock} from '@/components/page/article/content/CodeExampleBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'
import {PropertyTable} from '@/components/page/article/content/PropertyTable'

export const metadata: Metadata = {
  title: 'Select | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'Select',
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
      title="Select"
      isComponent
      headings={[{level: 2, slug: 'properties', text: 'Properties'}]}
    >
      <Paragraph>
        {'The '}
        <code>{'<Select />'}</code>
        {' component provides control of options.'}
      </Paragraph>

      <Paragraph>
        {'Use the '}
        <code>{'<Select />'}</code>
        {' component when you have a list of string options that the user may choose from.'}
      </Paragraph>

      <CodeExampleBlock
        title="Select example"
        description="A basic example of using the Select primitive in Sanity UI."
        code={`<Card padding={4}>
  <Stack>
    <Select
      fontSize={[2, 2, 3, 4]}
      padding={[3, 3, 4]}
      gap={[3, 3, 4]}
    >
      <optgroup label="Swedish cars">
        <option>Saab</option>
        <option>Volvo</option>
      </optgroup>

      <optgroup label="Norwegian cars">
        <option>Buddy</option>
        <option>Think</option>
      </optgroup>
    </Select>
  </Stack>
</Card>`}
      />

      <Heading2 id="properties">Properties</Heading2>

      <PropertyTable
        properties={[
          {name: 'fontSize', type: 'number | number[]'},
          {name: 'padding', type: 'number | number[]'},
          {name: 'radius', type: 'number | number[]'},
          {name: 'gap', type: 'number | number[]'},
          {
            name: 'space',
            type: 'number | number[]',
            deprecated: 'Use gap instead. Will be removed in v4.',
          },
        ]}
      />
    </Article>
  )
}
