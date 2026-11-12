import {ExpandIcon} from '@sanity/icons/Expand'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {Button} from '../../../../packages/ui/src/components/button/Button'
import {Icon} from '../../../../packages/ui/src/components/icon/Icon'
import {Menu} from '../../../../packages/ui/src/components/menu/Menu'

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  args: {},
  component: Menu,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '.sui-Menu',
    },
    performance: {
      component: Menu,
    },
  },
}

export default meta
type Story = StoryObj<typeof Menu>

export const Default: Story = {
  render: (props) => {
    return (
      <Menu
        {...props}
        menu={
          <Menu.Content>
            <Menu.Button>Test link</Menu.Button>
            <Menu.Button>Test link two</Menu.Button>
            <Menu.Button start={<Icon size={1} marginLeft={-1} icon={ExpandIcon} />}>
              Test link three
            </Menu.Button>

            <Menu.Submenu
              menu={
                <Menu.Content>
                  <Menu.Button>Submenu test link one</Menu.Button>
                  <Menu.Button>Submenu test link two</Menu.Button>
                  <Menu.Button>Submenu test link three</Menu.Button>
                  <Menu.Button>Submenu test link four</Menu.Button>
                  <Menu.Button>Submenu test link five</Menu.Button>
                  <Menu.Button>Submenu test link six</Menu.Button>
                  <Menu.Button>Submenu test link seven</Menu.Button>
                  <Menu.Button>Submenu test link eight</Menu.Button>
                  <Menu.Button>Submenu test linke nine</Menu.Button>
                  <Menu.Button>Submenu test link ten</Menu.Button>
                  <Menu.Button>Submenu test linke eleven</Menu.Button>
                  <Menu.Button>Submenu test link twelve</Menu.Button>
                  <Menu.Button>Submenu test linke thirteen</Menu.Button>
                  <Menu.Button>Submenu test link fourteen</Menu.Button>
                  <Menu.Button>Submenu test linke fifteen</Menu.Button>
                  <Menu.Button>Submenu test link sixteen</Menu.Button>
                </Menu.Content>
              }
            >
              <Menu.Button>Open submenu</Menu.Button>
            </Menu.Submenu>
          </Menu.Content>
        }
      >
        <Button text="Open Menu" />
      </Menu>
    )
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByText('')).classList).toContain('')
  },
}

export const WithSubmenus: Story = {
  render: (props) => {
    return (
      <Menu
        {...props}
        menu={
          <Menu.Content>
            <Menu.Button>Test link</Menu.Button>

            <Menu.Button>Test link two</Menu.Button>
            <Menu.Button start={<Icon size={1} marginLeft={-1} icon={ExpandIcon} />}>
              Test link three
            </Menu.Button>

            <Menu.Submenu
              menu={
                <Menu.Content>
                  <Menu.Button>Submenu test linke one</Menu.Button>
                  <Menu.Button>Submenu test link two</Menu.Button>
                </Menu.Content>
              }
            >
              <Menu.Button>Open submenu</Menu.Button>
            </Menu.Submenu>
          </Menu.Content>
        }
      >
        <Button text="Open Menu" />
      </Menu>
    )
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByText('')).classList).toContain('')
  },
}
