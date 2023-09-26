/* eslint-disable react-hooks/rules-of-hooks */
import type {Meta, StoryObj} from '@storybook/react'
import {Spinner} from '../../src/primitives'
import {FONT_SIZE_CONTROLS} from '../constants'

const meta: Meta<typeof Spinner> = {
  argTypes: {
    size: FONT_SIZE_CONTROLS,
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
