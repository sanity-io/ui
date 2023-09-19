import type {Meta, StoryObj} from '@storybook/react'
import {Card, Heading, Text} from '../../src/primitives'
import {ALIGN_CONTROLS, FONT_SIZE_CONTROLS} from '../constants'

const meta: Meta<typeof Heading> = {
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
  component: Heading,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Text>

export const Docs: Story = {
  render: (props) => {
    return (
      <Card padding={5}>
        <Heading {...props} />
      </Card>
    )
  },
}
