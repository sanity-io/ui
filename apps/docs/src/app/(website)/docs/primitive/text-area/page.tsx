import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeExampleBlock} from '@/components/page/article/content/CodeExampleBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'
import {PropertyTable} from '@/components/page/article/content/PropertyTable'

export const metadata: Metadata = {
  title: 'TextArea | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'TextArea',
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
      title="TextArea"
      isComponent
      headings={[{level: 2, slug: 'properties', text: 'Properties'}]}
    >
      <Paragraph>A multiline text input.</Paragraph>

      <CodeExampleBlock
        title="TextArea example"
        description="A basic example of using the TextArea primitive in Sanity UI."
        code={`<Card padding={4}>
  <TextArea
    fontSize={[2, 2, 3, 4]}
    onChange={(event) =>
      setValue(event.currentTarget.value)
    }
    padding={[3, 3, 4]}
    placeholder="TextArea"
    value={value}
  />
</Card>`}
        hookCode={`const [value, setValue] = useState('')`}
      />

      <Heading2 id="properties">Properties</Heading2>

      <PropertyTable
        properties={[
          {name: 'border', type: 'boolean'},
          {name: 'customValidity', type: 'string', required: false},
          {name: 'fontSize', type: 'number | number[]'},
          {name: 'padding', type: 'number | number[]'},
          {name: 'paddingX', type: 'number | number[]'},
          {name: 'paddingY', type: 'number | number[]'},
          {name: 'paddingTop', type: 'number | number[]'},
          {name: 'paddingRight', type: 'number | number[]'},
          {name: 'paddingBottom', type: 'number | number[]'},
          {name: 'paddingLeft', type: 'number | number[]'},
          {name: 'placeholder', type: 'string', required: false},
          {name: 'radius', type: 'number | number[]'},
          {name: 'weight', type: "'regular' | 'medium' | 'semibold' | 'bold'"},
        ]}
      />
    </Article>
  )
}
