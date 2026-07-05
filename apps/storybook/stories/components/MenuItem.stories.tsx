import {Card, Container, LayerProvider, Menu, MenuDivider, MenuItem, Stack, Text} from '@sanity/ui'
import type {Meta, StoryFn, StoryObj} from '@storybook/react'
import {forwardRef} from 'react'

import {getSpaceControls} from '../controls'

const meta: Meta<typeof MenuItem> = {
  args: {
    text: 'Menu item',
  },
  argTypes: {
    disabled: {control: 'boolean'},
    padding: getSpaceControls(),
    paddingX: getSpaceControls(),
    paddingY: getSpaceControls(),
    paddingBottom: getSpaceControls(),
    paddingLeft: getSpaceControls(),
    paddingRight: getSpaceControls(),
    paddingTop: getSpaceControls(),
    gap: getSpaceControls(),
    space: getSpaceControls(),
  },
  component: MenuItem,
  decorators: [
    (Story: StoryFn): React.JSX.Element => (
      <Container width={0}>
        <Card radius={3} shadow={2}>
          <LayerProvider>
            <Menu>
              {/* @ts-expect-error fix later */}
              <Story />
            </Menu>
          </LayerProvider>
        </Card>
      </Container>
    ),
  ],
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof MenuItem>

export const Default: Story = {
  render: (props) => {
    return <MenuItem {...props} />
  },
}

export const Custom: Story = {
  parameters: {controls: {include: []}},
  render: () => (
    <>
      <MenuItem padding={3}>
        {/* oxlint-disable-next-line no-deprecated */}
        <Stack space={3}>
          <Text weight="medium" size={1}>
            First option
          </Text>
          <Text muted size={1}>
            Description
          </Text>
        </Stack>
      </MenuItem>
      <MenuItem padding={3}>
        {/* oxlint-disable-next-line no-deprecated */}
        <Stack space={3}>
          <Text weight="medium" size={1}>
            Second option
          </Text>
          <Text muted size={1}>
            Description
          </Text>
        </Stack>
      </MenuItem>
      <MenuDivider />
      <MenuItem padding={3} tone="critical">
        {/* oxlint-disable-next-line no-deprecated */}
        <Stack space={3}>
          <Text weight="medium" size={1}>
            Dangerous option
          </Text>
          <Text muted size={1}>
            Description
          </Text>
        </Stack>
      </MenuItem>
    </>
  ),
}

const CustomLink = forwardRef(function CustomLink(
  props: {req: string} & Omit<React.HTMLProps<HTMLAnchorElement>, 'as' | 'href'>,
  ref: React.ForwardedRef<HTMLAnchorElement>,
): React.JSX.Element {
  const {children, req, ...restProps} = props

  return (
    <a data-required={req} {...restProps} href="#" ref={ref}>
      {children}
    </a>
  )
})

export const AsComponent: Story = {
  parameters: {controls: {include: []}},
  render: () => {
    const props = {href: '#', req: 'example'}

    return (
      <>
        <MenuItem as={CustomLink} data-as="a" {...props} padding={3}>
          <Text>Component 1</Text>
        </MenuItem>
        <MenuItem as={CustomLink} data-as="a" {...props} padding={3}>
          <Text>Component 2</Text>
        </MenuItem>
        <MenuItem as={CustomLink} data-as="a" {...props} padding={3}>
          <Text>Component 3</Text>
        </MenuItem>
      </>
    )
  },
}
