import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeBlock} from '@/components/page/article/content/CodeBlock'
import {CodeExampleBlock} from '@/components/page/article/content/CodeExampleBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'
import {PropertyTable} from '@/components/page/article/content/PropertyTable'

export const metadata: Metadata = {
  title: 'Button | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'Button',
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
      title="Button"
      isComponent
      headings={[
        {level: 2, slug: 'properties', text: 'Properties'},
        {level: 2, slug: 'accessibility-considerations', text: 'Accessibility considerations'},
      ]}
    >
      <Paragraph>
        {'The '}
        <code>Button</code>
        {' component.'}
      </Paragraph>

      <CodeExampleBlock
        title="Button example"
        description="A basic example of using the Button primitive in Sanity UI."
        code={`<Card padding={4} style={{textAlign: 'center'}}>
  <Inline gap={[3, 3, 4]}>
    <Button
      fontSize={[2, 2, 3]}
      icon={AddIcon}
      mode="ghost"
      padding={[3, 3, 4]}
      text="Create"
    />
    <Button
      fontSize={[2, 2, 3]}
      icon={PublishIcon}
      padding={[3, 3, 4]}
      text="Publish"
      tone="primary"
    />
    <Button
      fontSize={[2, 2, 3]}
      iconRight={EditIcon}
      padding={[3, 3, 4]}
      radius="full"
      text="Edit"
      tone="caution"
    />    
  </Inline>
</Card>`}
      />

      <Heading2 id="properties">Properties</Heading2>

      <PropertyTable
        properties={[
          {name: 'as', type: 'React.ElementType | keyof JSX.IntrinsicElements'},
          {name: 'fontSize', type: 'number | number[]'},
          {name: 'mode', type: "'default' | 'ghost' | 'bleed'"},
          {name: 'icon', type: 'React.ComponentType | React.ReactNode'},
          {name: 'iconRight', type: 'React.ComponentType | React.ReactNode'},
          {
            name: 'justify',
            type: "'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'",
          },
          {name: 'padding', type: 'number | number[]'},
          {name: 'paddingX', type: 'number | number[]'},
          {name: 'paddingY', type: 'number | number[]'},
          {name: 'paddingTop', type: 'number | number[]'},
          {name: 'paddingRight', type: 'number | number[]'},
          {name: 'paddingBottom', type: 'number | number[]'},
          {name: 'paddingLeft', type: 'number | number[]'},
          {name: 'radius', type: "(number | 'full') | (number | 'full')[]"},
          {name: 'selected', type: 'boolean'},
          {name: 'gap', type: 'number | number[]'},
          {
            name: 'space',
            type: 'number | number[]',
            deprecated: 'Use gap instead. Will be removed in v4.',
          },
          {name: 'text', type: 'React.ReactNode'},
          {name: 'tone', type: "'default' | 'primary' | 'positive' | 'caution' | 'critical'"},
          {name: 'type', type: "'button' | 'reset' | 'submit'"},
          {name: 'width', type: "'fill'", required: false},
        ]}
      />

      <Heading2 id="accessibility-considerations">Accessibility considerations</Heading2>

      <Paragraph>
        {
          'All buttons need an “accessible name”, which is the name that screenreaders, voice control software and other assissistive technologies use to refer to this specific button (and distinguish it from others). '
        }
      </Paragraph>

      <Paragraph>
        {"If there's "}
        <code>text</code>
        {' in your button, that usually becomes the accessible name. When you use '}
        <code>{'<Button>'}</code>
        {' with just an icon and no '}
        <code>text</code>
        {', always add your accessible name manually. One method to do that is to use the '}
        <code>aria-label</code>
        {' attribute. '}
      </Paragraph>

      <Paragraph>
        For example, this would be a button that is visually just a “plus” icon, but has an
        accessible name of “Add content”:
      </Paragraph>

      <CodeBlock
        language="tsx"
        code={` <Button
    fontSize={[2, 2, 3]}
    icon={AddIcon}
    mode="ghost"
    padding={[3, 3, 4]}
    aria-label="Add content"
/>`}
      />

      <Paragraph>
        {'How accessible names are calculated exactly: '}
        <a
          href="https://www.w3.org/TR/accname-1.1/"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          Accessible Name and Description Computation 1.1
        </a>
        .
      </Paragraph>
    </Article>
  )
}
