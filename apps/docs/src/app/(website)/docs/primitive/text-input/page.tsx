import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeBlock} from '@/components/page/article/content/CodeBlock'
import {CodeExampleBlock} from '@/components/page/article/content/CodeExampleBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {BulletList, ListItem} from '@/components/page/article/content/lists'
import {Paragraph} from '@/components/page/article/content/Paragraph'
import {PropertyTable} from '@/components/page/article/content/PropertyTable'

export const metadata: Metadata = {
  title: 'TextInput | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'TextInput',
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
      title="TextInput"
      isComponent
      headings={[
        {level: 2, slug: 'properties', text: 'Properties'},
        {level: 2, slug: 'accessibility-considerations', text: 'Accessibility considerations'},
      ]}
    >
      <Paragraph>Single line text input.</Paragraph>

      <CodeExampleBlock
        title="TextInput example"
        description="A basic example of using the TextInput primitive in Sanity UI."
        code={`<Card padding={4}>
  <TextInput
    fontSize={[2, 2, 3, 4]}
    onChange={(event) =>
      setValue(event.currentTarget.value)
    }
    padding={[3, 3, 4]}
    placeholder="TextInput"
    value={value}
  />
</Card>`}
        hookCode={`const [value, setValue] = useState('')`}
      />

      <Heading2 id="properties">Properties</Heading2>

      <PropertyTable
        properties={[
          {name: 'border', type: 'boolean'},
          {name: 'clearButton', type: 'boolean', required: false},
          {name: 'customValidity', type: 'string', required: false},
          {name: 'fontSize', type: 'number | number[]'},
          {name: 'icon', type: 'React.ComponentType | React.ReactNode'},
          {name: 'iconRight', type: 'React.ComponentType | React.ReactNode'},
          {name: 'padding', type: 'number | number[]'},
          {name: 'paddingX', type: 'number | number[]'},
          {name: 'paddingY', type: 'number | number[]'},
          {name: 'paddingTop', type: 'number | number[]'},
          {name: 'paddingRight', type: 'number | number[]'},
          {name: 'paddingBottom', type: 'number | number[]'},
          {name: 'paddingLeft', type: 'number | number[]'},
          {name: 'prefix', type: 'React.ReactNode'},
          {name: 'radius', type: 'number | number[]'},
          {name: 'gap', type: 'number | number[]'},
          {
            name: 'space',
            type: 'number | number[]',
            deprecated: 'Use gap instead. Will be removed in v4.',
          },
          {name: 'suffix', type: 'React.ReactNode'},
          {name: 'weight', type: "'regular' | 'medium' | 'semibold' | 'bold'"},
        ]}
      />

      <Heading2 id="accessibility-considerations">Accessibility considerations</Heading2>

      <Paragraph>
        {'When using '}
        <code>TextInput</code>, assistive technologies like screenreaders and voice input will
        expect that they have an accessible name. For input fields, this is sometimes also referred
        to as a label.
      </Paragraph>

      <Paragraph>
        {
          'The preferred way to add an accessible name is to add a visible label, so that all users can benefit from it. To add a visible label, add an '
        }
        <code>id</code>
        {' to '}
        <code>TextInput</code>
        {', and then a '}
        <code>{'<label>'}</code>
        {' element with a '}
        <code>for</code>
        {" attribute that corresponds with the input's "}
        <code>id</code>:
      </Paragraph>

      <CodeBlock
        language="tsx"
        code={`<Card padding={4}>
  <label htmlFor="street-address">Street Address</label>
  <TextInput
    value={value}
    id="street-address"
  />
</Card>`}
      />

      <Paragraph>
        {'Alternatively, a hidden label can be added directly onto the input with '}
        <code>aria-label</code>:
      </Paragraph>

      <CodeBlock
        language="jsx"
        code={`<Card padding={4}>
  <TextInput
    value={value}
    aria-label="Street Address"
  />
</Card>`}
      />

      <Paragraph>For more information, see:</Paragraph>

      <BulletList>
        <ListItem>
          <a
            href="https://www.w3.org/TR/using-aria/#fifthrule"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            Fifth rule of ARIA: accessible name
          </a>
          {' (W3C)'}
        </ListItem>
        <ListItem>
          <a
            href="https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/#composingeffectiveanduser-friendlyaccessiblenames"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            Composing effective and user friendly names
          </a>
          {' (W3C)'}
        </ListItem>
      </BulletList>
    </Article>
  )
}
