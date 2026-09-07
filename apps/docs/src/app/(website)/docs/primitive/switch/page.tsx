import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeExampleBlock} from '@/components/page/article/content/CodeExampleBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'
import {PropertyTable} from '@/components/page/article/content/PropertyTable'

export const metadata: Metadata = {
  title: 'Switch | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'Switch',
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
      title="Switch"
      isComponent
      headings={[{level: 2, slug: 'properties', text: 'Properties'}]}
    >
      <Paragraph>
        {'The '}
        <code>Switch</code>
        {' component allows the user to toggle a setting on and off.'}
      </Paragraph>

      <CodeExampleBlock
        title="Switch example"
        description="A basic example of using the Switch primitive in Sanity UI."
        code={`<Card padding={4} style={{textAlign: 'center'}}>
  <Inline gap={[3, 3, 4, 5]}>
    <Switch checked />
    <Switch checked={false} />
    <Switch />
  </Inline>
</Card>`}
      />

      <Heading2 id="properties">Properties</Heading2>

      <Paragraph>
        {'The '}
        <code>Switch</code>
        {' component’s properties extend all properties of an '}
        <code>{'<input type="checkbox" />'}</code>
        {' element, except '}
        <code>type</code>.
      </Paragraph>

      <PropertyTable properties={[{name: 'indeterminate', type: 'boolean'}]} />
    </Article>
  )
}
