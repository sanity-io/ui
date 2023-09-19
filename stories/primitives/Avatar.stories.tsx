import type {Meta, StoryObj} from '@storybook/react'
import {Avatar, Flex} from '../../src/primitives'

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  argTypes: {
    size: {
      control: {
        type: 'number',
        min: 0,
        max: 2,
      },
      options: [0, 1, 2],
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Docs: Story = {
  render: (props) => <Avatar {...props} />,
}

export const Basic: Story = {
  parameters: {
    controls: {
      include: ['animateArrowFrom', 'arrowPosition', 'color', 'initials', 'size', 'status'],
    },
  },
  render: (props) => <Avatar {...props} />,
}

export const Tones: Story = {
  args: {
    initials: 'AB',
  },
  parameters: {
    controls: {
      include: ['initials', 'size', 'status'],
    },
  },
  render: (props) => (
    <Flex gap={2}>
      <Avatar {...props} />
      <Avatar {...props} color="blue" />
      <Avatar {...props} color="cyan" />
      <Avatar {...props} color="gray" />
      <Avatar {...props} color="green" />
      <Avatar {...props} color="magenta" />
      <Avatar {...props} color="orange" />
      <Avatar {...props} color="purple" />
      <Avatar {...props} color="red" />
      <Avatar {...props} color="yellow" />
    </Flex>
  ),
}
