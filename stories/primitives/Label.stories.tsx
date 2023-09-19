import type {Meta, StoryObj} from '@storybook/react'
import {Card, Label} from '../../src/primitives'
import {ALIGN_CONTROLS, FONT_SIZE_CONTROLS} from '../constants'

const meta: Meta<typeof Label> = {
  component: Label,
  args: {
    children: 'Label',
  },
  argTypes: {
    align: ALIGN_CONTROLS,
    size: FONT_SIZE_CONTROLS,
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Label>

export const Docs: Story = {
  render: (props) => (
    <Card padding={3}>
      <Label {...props} />
    </Card>
  ),
}
