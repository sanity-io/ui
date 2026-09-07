import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeExampleBlock} from '@/components/page/article/content/CodeExampleBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'
import {PropertyTable} from '@/components/page/article/content/PropertyTable'
import {PlainContent, PlainParagraph} from '@/components/page/article/PlainContent'

export const metadata: Metadata = {
  title: 'AvatarStack | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'AvatarStack',
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
      title="AvatarStack"
      isComponent
      headings={[{level: 2, slug: 'properties', text: 'Properties'}]}
    >
      <Paragraph>
        {'The '}
        <code>AvatarStack</code>
        {' component displays a horizontal overlapping list of '}
        <code>Avatar</code>
        {'  and '}
        <code>AvatarCounter</code>
        {' components.'}
      </Paragraph>

      <CodeExampleBlock
        code={`<Card padding={4}>
  <AvatarStack>
    <AvatarCounter count={2} />
    <Avatar
      color="magenta"
      initials="uq"
    />
    <Avatar
      color="blue"
      initials="uq"
    />
    <Avatar
      color="purple"
      src="https://source.unsplash.com/96x96/?face"
    />  
  </AvatarStack>
</Card>`}
      />

      <Heading2 id="properties">Properties</Heading2>

      <PropertyTable
        properties={[
          {
            name: 'maxLength',
            type: 'number',
            required: false,
            description: (
              <PlainContent>
                <PlainParagraph>
                  {
                    'The maximum number of items to render. If items are hidden, will also display the hidden item count as a separate '
                  }
                  <code>AvatarCounter</code>
                  {' component.'}
                </PlainParagraph>
              </PlainContent>
            ),
          },
          {name: 'size', type: '0 | 1 | 2 | 3 | Array<0 | 1 | 2 | 3>'},
        ]}
      />
    </Article>
  )
}
