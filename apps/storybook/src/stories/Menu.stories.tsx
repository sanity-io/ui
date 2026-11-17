import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {Button} from '../../../../packages/ui/src/components/button/Button'
import {Menu} from '../../../../packages/ui/src/components/menu/Menu'

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  args: {},
  component: Menu,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="Menu"]',
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
            {Array.from({length: 5}, (_value, i) => (
              <Menu.Button key={i} text={`Menu Item ${i + 1}`} />
            ))}
          </Menu.Content>
        }
      >
        <Button text="Open Menu" level="tertiary" />
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
            {Array.from({length: 3}, (_value, i) => (
              <Menu.Button key={i} text={`Menu Item ${i + 1}`} />
            ))}
            <Menu.Submenu
              menu={
                <Menu.Content>
                  {Array.from({length: 10}, (_value, i) => (
                    <Menu.Button key={i} text={`Menu Submenu Item ${i + 1}`} />
                  ))}
                </Menu.Content>
              }
            >
              <Menu.Button text="Menu Submenu" />
            </Menu.Submenu>
          </Menu.Content>
        }
      >
        <Button text="Open Menu" level="tertiary" />
      </Menu>
    )
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByText('')).classList).toContain('')
  },
}
