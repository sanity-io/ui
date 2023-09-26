import type {Meta, StoryObj} from '@storybook/react'
import {Avatar, Flex, Stack} from '../../src/primitives'
import {AVATAR_SIZE_CONTROLS} from '../constants'

const meta: Meta<typeof Avatar> = {
  args: {
    initials: 'AB',
  },
  argTypes: {
    size: AVATAR_SIZE_CONTROLS,
  },
  component: Avatar,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  render: (props) => <Avatar {...props} />,
}

export const Colors: Story = {
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

export const Sizes: Story = {
  parameters: {
    controls: {
      include: ['color', 'initials', 'status'],
    },
  },
  render: (props) => (
    <Stack space={3}>
      <Avatar {...props} size={0} />
      <Avatar {...props} size={1} />
      <Avatar {...props} size={2} />
    </Stack>
  ),
}
