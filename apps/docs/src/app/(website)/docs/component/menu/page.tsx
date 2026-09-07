import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeExampleBlock} from '@/components/page/article/content/CodeExampleBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'
import {PropertyTable} from '@/components/page/article/content/PropertyTable'
import {PlainContent, PlainParagraph} from '@/components/page/article/PlainContent'

export const metadata: Metadata = {
  title: 'Menu | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'Menu',
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
      title="Menu"
      isComponent
      headings={[
        {level: 2, slug: 'properties', text: 'Properties'},
        {level: 2, slug: 'basic-example', text: 'Basic example'},
        {level: 2, slug: 'example-with-custom-menu-items', text: 'Example with custom menu items'},
      ]}
    >
      <Paragraph>
        {'The '}
        <code>Menu</code>
        {' component is a building block for application menus.'}
      </Paragraph>

      <Heading2 id="properties">Properties</Heading2>

      <PropertyTable
        properties={[
          {name: 'shouldFocus', type: "'first' | 'last' | null"},
          {
            name: 'focusLast',
            type: 'boolean',
            deprecated: "Use shouldFocus='last' instead.",
            description: (
              <PlainContent>
                <PlainParagraph>
                  {'When '}
                  <code>true</code>, the last element will be focused on mount.
                </PlainParagraph>
              </PlainContent>
            ),
          },
          {name: 'onClickOutside', type: '() => void'},
          {name: 'onEscape', type: '() => void'},
          {name: 'onItemClick', type: '() => void'},
          {name: 'gap', type: 'number | number[]'},
          {
            name: 'space',
            type: 'number | number[]',
            deprecated: 'Use gap instead. Will be removed in v4.',
          },
        ]}
      />

      <Heading2 id="basic-example">Basic example</Heading2>

      <Paragraph>Hover the menu to see the focused item changing.</Paragraph>

      <CodeExampleBlock
        title="Menu example"
        description="A basic example of using the Menu component in Sanity UI."
        code={`<Box padding={4}>
  <Card radius={3} shadow={2}>
    <Menu>
      <MenuItem
        fontSize={[2, 2, 3, 4]}
        text="First option"
      />
      <MenuItem
        fontSize={[2, 2, 3, 4]}
        text="Second option"
      />
      <MenuItem
        fontSize={[2, 2, 3, 4]}
        text="Third option"
      />
    </Menu>
  </Card>
</Box>`}
      />

      <Heading2 id="example-with-custom-menu-items">Example with custom menu items</Heading2>

      <Paragraph>
        {'The '}
        <code>MenuItem</code>
        {' component takes a '}
        <code>children</code>
        {' property for rendering custom menu item .'}
      </Paragraph>

      <CodeExampleBlock
        title="Menu with custom options"
        description="A basic example of using the Menu component in Sanity UI."
        code={`<Box padding={4}>
  <Card radius={3} shadow={2}>
    <Menu>
      <MenuItem>
        <Box padding={3}>
          <Stack space={3}>
            <Text weight="semibold">First option</Text>
            <Text muted size={1}>
              Description
            </Text>
          </Stack>
        </Box>
      </MenuItem>
      <MenuItem>
        <Box padding={3}>
          <Stack space={3}>
            <Text weight="semibold">Second option</Text>
            <Text muted size={1}>
              Description
            </Text>
          </Stack>
        </Box>
      </MenuItem>
      <MenuDivider />
      <MenuItem tone="critical">
        <Box padding={3}>
          <Stack space={3}>
            <Text weight="semibold">Dangerous option</Text>
            <Text muted size={1}>
              Description
            </Text>
          </Stack>
        </Box>
      </MenuItem>
    </Menu>
  </Card>
</Box>`}
      />
    </Article>
  )
}
