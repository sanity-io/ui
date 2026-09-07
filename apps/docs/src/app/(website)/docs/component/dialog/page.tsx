import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeBlock} from '@/components/page/article/content/CodeBlock'
import {CodeExampleBlock} from '@/components/page/article/content/CodeExampleBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'
import {PropertyTable} from '@/components/page/article/content/PropertyTable'
import {PlainContent, PlainParagraph} from '@/components/page/article/PlainContent'

export const metadata: Metadata = {
  title: 'Dialog | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'Dialog',
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
      title="Dialog"
      isComponent
      headings={[
        {level: 2, slug: 'basic-example', text: 'Basic example'},
        {level: 2, slug: 'properties', text: 'Properties'},
      ]}
    >
      <Paragraph>
        {'The '}
        <code>Dialog</code>
        {' component.'}
      </Paragraph>

      <Heading2 id="basic-example">Basic example</Heading2>

      <Paragraph>
        {'The '}
        <code>Dialog</code>
        {' component is typically rendered conditionally. It also needs an '}
        <code>onClose</code>
        {' property to function as expected:'}
      </Paragraph>

      <CodeBlock
        language="tsx"
        code={`import {useCallback, useState} from 'react'

const [open, setOpen] = useState(false)
const onClose = useCallback(() => setOpen(false), [])
const onOpen = useCallback(() => setOpen(true), [])
`}
      />

      <Paragraph>
        {'With that in place, it’s straight-forward to build a basic open/close flow using the '}
        <code>Dialog</code>
        {' component:'}
      </Paragraph>

      <CodeExampleBlock
        title="Dialog example"
        description="A basic example of using the Dialog component in Sanity UI."
        code={`<Card padding={4} style={{textAlign: 'center'}}>
  <Button onClick={onOpen} text="Open dialog" />
</Card>

{
  open && (
    <Dialog
      animate
      header="Example"
      id="dialog-example"
      onClose={onClose}
      zOffset={1000}
    >
      <Box padding={4}>
        <Text>Content</Text>
      </Box>
    </Dialog>
  )
}
`}
        hookCode={`const {useCallback, useState} = React
const [open, setOpen] = useState(false)

const onClose = useCallback(() => setOpen(false), [])
const onOpen = useCallback(() => setOpen(true), [])`}
      />

      <Heading2 id="properties">Properties</Heading2>

      <PropertyTable
        properties={[
          {
            name: 'animate',
            type: 'boolean',
            required: false,
            description: (
              <PlainContent>
                <PlainParagraph>Whether the dialog should animate in on mount</PlainParagraph>
              </PlainContent>
            ),
          },
          {name: 'cardRadius', type: 'number | number[]'},
          {name: 'cardShadow', type: 'number | number[]'},
          {name: 'footer', type: 'React.ReactNode'},
          {name: 'header', type: 'React.ReactNode'},
          {name: 'id', type: 'string', required: true},
          {name: 'onClose', type: '() => void'},
          {name: 'scheme', type: "'dark' | 'light'"},
          {name: 'width', type: 'number | number[]'},
          {name: 'zOffset', type: 'number'},
        ]}
      />
    </Article>
  )
}
