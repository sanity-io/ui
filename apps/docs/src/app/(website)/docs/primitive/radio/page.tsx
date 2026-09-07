import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeExampleBlock} from '@/components/page/article/content/CodeExampleBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'
import {PropertyTable} from '@/components/page/article/content/PropertyTable'

export const metadata: Metadata = {
  title: 'Radio | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'Radio',
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
      title="Radio"
      isComponent
      headings={[{level: 2, slug: 'properties', text: 'Properties'}]}
    >
      <Paragraph>
        {'The '}
        <code>{'<Radio />'}</code>
        {' component allows the user to select one option from a set.'}
      </Paragraph>

      <CodeExampleBlock
        title="Radio example"
        description="A basic example of using the Radio primitive in Sanity UI."
        code={`<Card padding={4} style={{textAlign: 'center'}}>
  <Inline gap={3}>
    <Radio
      checked={value === 'a'}
      name="foo"
      onChange={handleChange}
      value="a"
    />
    <Radio
      checked={value === 'b'}
      name="foo"
      onChange={handleChange}
      value="b"
    />
    <Radio
      checked={value === 'c'}
      name="foo"
      onChange={handleChange}
      value="c"
    />
  </Inline>
</Card>`}
        hookCode={`const [value, setValue] = useState('a')

const handleChange = useCallback((event) => {
  setValue(event.currentTarget.value)
}, [])`}
      />

      <Heading2 id="properties">Properties</Heading2>

      <Paragraph>
        {'The '}
        <code>Radio</code>
        {' component’s properties extend all properties of an '}
        <code>{'<input type="radio" />'}</code>
        {' element, except '}
        <code>type</code>.
      </Paragraph>

      <PropertyTable properties={[{name: 'customValidity', type: 'string', required: false}]} />
    </Article>
  )
}
