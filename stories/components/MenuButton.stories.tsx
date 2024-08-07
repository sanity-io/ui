import {ClockIcon, CommentIcon, ExpandIcon, SearchIcon} from '@sanity/icons'
import type {Meta, StoryObj} from '@storybook/react'
import {expect, fn} from '@storybook/test'
import {userEvent, within} from '@storybook/test'
import {Menu, MenuButton, MenuDivider, MenuGroup, MenuItem} from '../../src/core/components'
import {Button, Flex} from '../../src/core/primitives'

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
    expect(menu).toBeNull()
  },
}
