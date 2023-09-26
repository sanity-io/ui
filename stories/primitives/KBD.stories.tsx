import type {Meta, StoryObj} from '@storybook/react'
import {KBD} from '../../src/primitives'
import {FONT_SIZE_CONTROLS, RADIUS_CONTROLS, SPACE_CONTROLS} from '../constants'

const meta: Meta<typeof KBD> = {
  args: {
    children: 'Ctrl',
  },
  argTypes: {
    fontSize: FONT_SIZE_CONTROLS,
    padding: SPACE_CONTROLS,
    radius: RADIUS_CONTROLS,
  },
  component: KBD,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof KBD>

export const Default: Story = {
  render: (props) => {
    return <KBD {...props} />
  },
}
