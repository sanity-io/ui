import {ExpandIcon} from '@sanity/icons'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {Button} from '../../../../packages/ui/src/components/button/Button'
import {Divider} from '../../../../packages/ui/src/components/divider/Divider'
import {Icon} from '../../../../packages/ui/src/components/icon/Icon'
import {Menu} from '../../../../packages/ui/src/components/menu/Menu'
import {menuProps} from '../../../../packages/ui/src/components/menu/menu.props'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(menuProps)

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  args: {},
  argTypes,
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
          <>
            <Menu.Item density="none">
              <Menu.ButtonItem>Test link</Menu.ButtonItem>
            </Menu.Item>
            <Menu.Item density="none">
              <Menu.ButtonItem>Test link two</Menu.ButtonItem>
            </Menu.Item>
            <Menu.ButtonItem start={<Icon size={1} marginLeft={-1} icon={ExpandIcon} />}>
              Test link three
            </Menu.ButtonItem>

            <Menu.Item density="none">
              <Menu.Submenu
                menu={
                  <>
                    <Menu.Item density="none">
                      <Menu.ButtonItem>Submenu test link one</Menu.ButtonItem>
                    </Menu.Item>
                    <Menu.Item density="none">
                      <Menu.ButtonItem>Submenu test link two</Menu.ButtonItem>
                    </Menu.Item>
                    <Menu.Item density="none">
                      <Menu.ButtonItem>Submenu test link three</Menu.ButtonItem>
                    </Menu.Item>
                    <Menu.Item density="none">
                      <Menu.ButtonItem>Submenu test link four</Menu.ButtonItem>
                    </Menu.Item>
                    <Menu.Item density="none">
                      <Menu.ButtonItem>Submenu test link five</Menu.ButtonItem>
                    </Menu.Item>
                    <Menu.Item density="none">
                      <Menu.ButtonItem>Submenu test link six</Menu.ButtonItem>
                    </Menu.Item>
                    <Menu.Item density="none">
                      <Menu.ButtonItem>Submenu test link seven</Menu.ButtonItem>
                    </Menu.Item>
                    <Menu.Item density="none">
                      <Menu.ButtonItem>Submenu test link eight</Menu.ButtonItem>
                    </Menu.Item>
                    <Menu.Item density="none">
                      <Menu.ButtonItem>Submenu test linke nine</Menu.ButtonItem>
                    </Menu.Item>
                    <Menu.Item density="none">
                      <Menu.ButtonItem>Submenu test link ten</Menu.ButtonItem>
                    </Menu.Item>
                    <Menu.Item density="none">
                      <Menu.ButtonItem>Submenu test linke eleven</Menu.ButtonItem>
                    </Menu.Item>
                    <Menu.Item density="none">
                      <Menu.ButtonItem>Submenu test link twelve</Menu.ButtonItem>
                    </Menu.Item>
                    <Menu.Item density="none">
                      <Menu.ButtonItem>Submenu test linke thirteen</Menu.ButtonItem>
                    </Menu.Item>
                    <Menu.Item density="none">
                      <Menu.ButtonItem>Submenu test link fourteen</Menu.ButtonItem>
                    </Menu.Item>
                    <Menu.Item density="none">
                      <Menu.ButtonItem>Submenu test linke fifteen</Menu.ButtonItem>
                    </Menu.Item>
                    <Menu.Item density="none">
                      <Menu.ButtonItem>Submenu test link sixteen</Menu.ButtonItem>
                    </Menu.Item>
                  </>
                }
              >
                <Menu.ButtonItem>Open submenu</Menu.ButtonItem>
              </Menu.Submenu>
            </Menu.Item>
          </>
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
          <>
            <Menu.Item density="none">
              <Menu.ButtonItem>Test link</Menu.ButtonItem>
            </Menu.Item>

            <Menu.Item density="none">
              <Menu.ButtonItem>Test link two</Menu.ButtonItem>
            </Menu.Item>
            <Menu.Item density="none">
              <Menu.ButtonItem start={<Icon size={1} marginLeft={-1} icon={ExpandIcon} />}>
                Test link three
              </Menu.ButtonItem>
            </Menu.Item>

            <Menu.Item density="none">
              <Menu.Submenu
                menu={
                  <>
                    <Menu.Item density="none">
                      <Menu.ButtonItem>Submenu test linke one</Menu.ButtonItem>
                    </Menu.Item>
                    <Menu.Item density="none">
                      <Menu.ButtonItem>Submenu test link two</Menu.ButtonItem>
                    </Menu.Item>
                  </>
                }
              >
                <Menu.ButtonItem>Open submenu</Menu.ButtonItem>
              </Menu.Submenu>
            </Menu.Item>
          </>
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
