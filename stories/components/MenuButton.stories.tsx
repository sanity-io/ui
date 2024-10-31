import {
  ClockIcon,
  CommentIcon,
  EllipsisHorizontalIcon,
  ExpandIcon,
  LaunchIcon,
  SearchIcon,
} from '@sanity/icons'
import {
  Box,
  Button,
  Card,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  Stack,
  Text,
} from '@sanity/ui'
import type {Meta, StoryObj} from '@storybook/react'
import {expect, fn, userEvent, within} from '@storybook/test'

const meta: Meta<typeof MenuButton> = {
  args: {
    onOpen: fn(),
    onClose: fn(),
    button: <Button text="Open" />,
    menu: (
      <Menu>
        <MenuItem icon={SearchIcon} id="menu-item-1" text="Search" />
        <MenuItem icon={ClockIcon} id="menu-item-2" text="Clock" />
        <MenuItem disabled icon={CommentIcon} id="menu-item-3" text="Comment" />
        <MenuDivider />
        <MenuItem icon={ExpandIcon} id="menu-item-4" text="Expand" />
      </Menu>
    ),
  },
  component: MenuButton,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof MenuButton>

export const Default: Story = {
  render: (props) => {
    return <MenuButton {...props} />
  },
}

export const AnimatedPopover: Story = {
  args: {
    popover: {animate: true},
  },
  render: (props) => {
    return <MenuButton {...props} />
  },
}

export const PopoverRadius: Story = {
  parameters: {
    controls: {
      include: [],
    },
  },
  render: (props) => (
    <Flex gap={4} wrap="wrap">
      <MenuButton {...props} button={<Button text="0" />} popover={{radius: 0}} />
      <MenuButton {...props} button={<Button text="1" />} popover={{radius: 1}} />
      <MenuButton {...props} button={<Button text="2" />} popover={{radius: 2}} />
      <MenuButton {...props} button={<Button text="3" />} popover={{radius: 3}} />
      <MenuButton {...props} button={<Button text="4" />} popover={{radius: 4}} />
      <MenuButton {...props} button={<Button text="5" />} popover={{radius: 5}} />
      <MenuButton {...props} button={<Button text="6" />} popover={{radius: 6}} />
      <MenuButton {...props} button={<Button text="full" />} popover={{radius: 'full'}} />
    </Flex>
  ),
}

export const WithMenuGroup: Story = {
  args: {
    menu: (
      <Menu>
        <MenuItem id="menu-item-1" text="Search" />
        <MenuItem id="menu-item-2" text="Clock" />
        <MenuGroup text="More">
          <MenuItem text="Email link" />
          <MenuItem text="Messages" />
        </MenuGroup>
        <MenuItem id="menu-item-3" text="Comment" />
        <MenuDivider />
        <MenuItem id="menu-item-4" text="Expand" />
      </Menu>
    ),
  },
  render: (props) => {
    return <MenuButton {...props} />
  },
}

export const WithSelectedItem: Story = {
  args: {
    menu: (
      <Menu data-testid="menu">
        <MenuItem id="menu-item-1" selected text="Search" />
        <MenuItem id="menu-item-2" text="Clock" />
        <MenuDivider />
        <MenuItem id="menu-item-3" text="Comment" />
        <MenuItem id="menu-item-4" text="Expand" />
      </Menu>
    ),
  },
  render: (props) => {
    return <MenuButton {...props} />
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)

    const button = canvas.getByRole('button', {name: 'Open'})

    await userEvent.click(button)
    await userEvent.click(button)

    const menu = within(document.documentElement).queryByTestId('menu')

    // Assertion: <Menu> with a selected item should not be visible when clicking the original <MenuButton> to close
    await expect(menu).toBeNull()
  },
}

export const PopoverModal: Story = {
  args: {
    menu: (
      <Menu data-testid="menu">
        <MenuItem id="menu-item-1" selected text="Search" />
        <MenuItem id="menu-item-2" text="Clock" />
        <MenuDivider />
        <MenuItem id="menu-item-3" text="Comment" />
        <MenuItem id="menu-item-4" text="Expand" />
      </Menu>
    ),
  },
  render: (props) => {
    return (
      <Stack gap={4}>
        <Flex gap={4} wrap="wrap">
          <MenuButton {...props} button={<Button text="Default " />} />
          <MenuButton
            {...props}
            button={<Button text="Modal popover" tone="primary" />}
            popover={{modal: true, portal: false}}
          />
          <MenuButton
            {...props}
            button={<Button text="Modal popover (portalled)" tone="primary" />}
            popover={{modal: true, portal: true}}
          />
          <Button
            as="a"
            href="https://www.sanity.io"
            iconRight={LaunchIcon}
            mode="ghost"
            target="_blank"
            text="Open sanity.io in a new window"
          />
        </Flex>

        <Card
          as="a"
          border
          href="https://www.sanity.io"
          padding={2}
          radius={3}
          target="_blank"
          tone="default"
        >
          <Flex align="center" gap={2}>
            <Box padding={2}>
              <Text size={1}>Open sanity.io in a new window</Text>
            </Box>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <div
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
              }}
            >
              <MenuButton
                {...props}
                button={<Button icon={EllipsisHorizontalIcon} mode="bleed" />}
                popover={{modal: true}}
              />
            </div>
          </Flex>
        </Card>
      </Stack>
    )
  },
}
