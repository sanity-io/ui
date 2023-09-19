import type {Meta, StoryObj} from '@storybook/react'
import {Text} from '../../src/primitives'
import {ALIGN_CONTROLS, FONT_SIZE_CONTROLS} from '../constants'

const meta: Meta<typeof Text> = {
  args: {
    children: 'Example text',
  },
  argTypes: {
    align: ALIGN_CONTROLS,
    size: FONT_SIZE_CONTROLS,
    textOverflow: {
      control: 'text',
    },
  },
  component: Text,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Text>

export const Docs: Story = {
  render: (props) => {
    return <Text {...props} />
  },
}

export const Muted: Story = {
  args: {
    muted: true,
  },
  parameters: {
    controls: {
      include: ['muted', 'size'],
    },
  },
  render: (props) => {
    return <Text {...props} />
  },
}
