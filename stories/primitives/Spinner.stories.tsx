import {Spinner} from '@sanity/ui'
import type {Meta, StoryObj} from '@storybook/react'

import {FONT_TEXT_SIZE_CONTROLS} from '../controls'

const meta: Meta<typeof Spinner> = {
  argTypes: {
    size: FONT_TEXT_SIZE_CONTROLS,
  },
  component: Spinner,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Spinner>

export const Default: Story = {
  render: (props) => <Spinner {...props} />,
}

export const Muted: Story = {
  args: {
    muted: true,
  },
  render: (props) => <Spinner {...props} />,
}
