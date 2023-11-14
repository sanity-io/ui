import type {Meta, StoryObj} from '@storybook/react'
import {Avatar, Flex, Stack} from '../../src/primitives'
import {AVATAR_SRC} from '../constants'
import {getAvatarSizeControls} from '../controls'

const meta: Meta<typeof Avatar> = {
  args: {
    initials: 'AB',
    src: AVATAR_SRC,
  },
  argTypes: {
    size: getAvatarSizeControls(),
  },
  component: Avatar,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  render: (props) => <Avatar {...props} />,
}

export const NoSrc: Story = {
  args: {
    src: undefined,
  },
  render: (props) => <Avatar {...props} />,
}

/**
 * Displays focus ring and receives focus events. Unlike `<Card>` components, no hover states are displayed.
 */
export const AsButton: Story = {
  render: (props) => (
    <Flex gap={3}>
      <Avatar {...props} as="button" />
      <Avatar {...props} as="button" />
      <Avatar {...props} as="button" />
    </Flex>
  ),
}

export const Colors: Story = {
  parameters: {
    controls: {
      exclude: ['color'],
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
      exclude: ['size'],
    },
  },
  render: (props) => (
    <Stack space={3}>
      <Avatar {...props} size={0} />
      <Avatar {...props} size={1} />
      <Avatar {...props} size={2} />
      <Avatar {...props} size={0} src={undefined} />
      <Avatar {...props} size={1} src={undefined} />
      <Avatar {...props} size={2} src={undefined} />
    </Stack>
  ),
}
