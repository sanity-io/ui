import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {Button} from '../../../../packages/ui/src/components/button/Button'
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
      <Menu {...props} trigger={<Button text="Open Menu" />}>
        <Menu.ButtonItem>Test link</Menu.ButtonItem>

        <Menu.ButtonItem>Test link two</Menu.ButtonItem>

        <Menu.ButtonItem>Test link three</Menu.ButtonItem>
      </Menu>
    )
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByText('')).classList).toContain('')
  },
}
