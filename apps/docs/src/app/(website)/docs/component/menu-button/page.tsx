import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeExampleBlock} from '@/components/page/article/content/CodeExampleBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'
import {PropertyTable} from '@/components/page/article/content/PropertyTable'
import {PlainContent, PlainParagraph} from '@/components/page/article/PlainContent'

export const metadata: Metadata = {
  title: 'MenuButton | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'MenuButton',
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
      title="MenuButton"
      isComponent
      headings={[{level: 2, slug: 'properties', text: 'Properties'}]}
    >
      <Paragraph>
        {'The '}
        <code>MenuButton</code>
        {' component follows '}
        <a
          href="https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          the WAI-ARIA specification
        </a>
        {' for menu buttons.'}
      </Paragraph>

      <CodeExampleBlock
        title="MenuButton example"
        description="A basic example of using the MenuButton component in Sanity UI."
        code={`<Card padding={4} style={{textAlign: 'center'}}>
  <MenuButton
    button={<Button text="Open menu" />}
    id="menu-button-example"
    menu={(
      <Menu>
        <MenuItem text="Option 1" />
        <MenuItem text="Option 2" />
        <MenuDivider />
        <MenuItem text="Option 3" />
      </Menu>
    )}
    placement="right"
    popover={{portal: true}}
  />
</Card>`}
      />

      <Heading2 id="properties">Properties</Heading2>

      <PropertyTable
        properties={[
          {
            name: 'boundaryElement',
            type: 'HTMLElement | null',
            deprecated: 'Use popover={{boundaryElement: element}} instead.',
          },
          {name: 'button', type: 'React.ReactElement', required: true},
          {name: 'id', type: 'string', required: true},
          {name: 'menu', type: 'React.ReactElement'},
          {name: 'popover', type: "Omit<PopoverProps, 'content' | 'open'>"},
          {
            name: 'placement',
            type: 'Placement',
            deprecated: "Use popover={{placement: 'top'}} instead.",
          },
          {
            name: 'popoverScheme',
            type: "'dark' | 'light'",
            deprecated: "Use popover={{scheme: 'dark'}} instead.",
          },
          {
            name: 'popoverRadius',
            type: 'number | number[]',
            deprecated: 'Use popover={{radius: 2}} instead.',
          },
          {
            name: 'portal',
            type: 'boolean',
            deprecated: 'Use popover={{portal: true}} instead.',
            description: (
              <PlainContent>
                <PlainParagraph>
                  {'Whether or not to render the popover in a portal element (defaults to '}
                  <code>false</code>).
                </PlainParagraph>
              </PlainContent>
            ),
          },
        ]}
      />
    </Article>
  )
}
