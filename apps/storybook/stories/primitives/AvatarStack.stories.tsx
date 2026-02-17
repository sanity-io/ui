import {Avatar, AvatarCounter, AvatarStack} from '@sanity/ui'
import type {Meta, StoryObj} from '@storybook/react-vite'

import {AVATAR_SRC} from '../constants'
import {AVATAR_SIZE_CONTROLS} from '../controls'

const meta: Meta<typeof AvatarStack> = {
  args: {
    children: [
      <AvatarCounter key="avatar-1" count={2} />,
      <Avatar key="avatar-2" color="magenta" initials="uq" />,
      <Avatar key="avatar-3" color="magenta" initials="uq" />,
      <Avatar key="avatar-4" color="purple" src={AVATAR_SRC} />,
      <Avatar key="avatar-5" color="blue" src={AVATAR_SRC} />,
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
