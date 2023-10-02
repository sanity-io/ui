import {ClockIcon, CommentIcon, ExpandIcon, SearchIcon} from '@sanity/icons'
import type {Meta, StoryObj} from '@storybook/react'
import {Menu, MenuButton, MenuDivider, MenuGroup, MenuItem} from '../../src/components'
import {Button, Flex} from '../../src/primitives'

const meta: Meta<typeof MenuButton> = {
  args: {
    button: <Button tone="primary" text="Open" />,
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
