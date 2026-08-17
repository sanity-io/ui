import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeExampleBlock} from '@/components/page/article/content/CodeExampleBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'
import {PropertyTable} from '@/components/page/article/content/PropertyTable'

export const metadata: Metadata = {
  title: 'AvatarCounter | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'AvatarCounter',
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
      title="AvatarCounter"
      isComponent
      headings={[{level: 2, slug: 'properties', text: 'Properties'}]}
    >
      <Paragraph>
        {'The '}
        <code>AvatarCounter</code>
        {' component displays a number and is optimized to appear alongside existing '}
        <code>Avatar</code>
        {' components.'}
      </Paragraph>

      <CodeExampleBlock
        code={`<Card padding={4}>
  <Inline gap={3}>
    <AvatarCounter count={7} size={0} />
    <AvatarCounter count={42} size={1} />
    <AvatarCounter count={876} size={2} />
    <AvatarCounter count={2001} size={3} />
  </Inline>
</Card>`}
      />

      <Heading2 id="properties">Properties</Heading2>

      <PropertyTable
        properties={[
          {name: 'count', type: 'number', required: true},
          {name: 'size', type: '0 | 1 | 2 | 3 | Array<0 | 1 | 2 | 3>'},
        ]}
      />
    </Article>
  )
}
