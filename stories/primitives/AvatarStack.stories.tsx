import {Avatar, AvatarCounter, AvatarStack} from '@sanity/ui'
import type {Meta, StoryObj} from '@storybook/react'

import {AVATAR_SRC} from '../constants'
import {AVATAR_SIZE_CONTROLS} from '../controls'

const meta: Meta<typeof AvatarStack> = {
  args: {
    children: [
      <AvatarCounter count={2} key="avatar-1" />,
      <Avatar color="magenta" initials="uq" key="avatar-2" />,
      <Avatar color="magenta" initials="uq" key="avatar-3" />,
      <Avatar color="purple" key="avatar-4" src={AVATAR_SRC} />,
      <Avatar color="blue" key="avatar-5" src={AVATAR_SRC} />,
    ],
  },
  argTypes: {
    size: AVATAR_SIZE_CONTROLS,
  },
  component: AvatarStack,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AvatarStack>

export const Default: Story = {
  render: (props) => <AvatarStack {...props} />,
}
