import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {Avatar} from '../../../../packages/ui/src/components/avatar/Avatar'
import {avatarProps} from '../../../../packages/ui/src/components/avatar/avatar.props'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(avatarProps)

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  args: {
    initials: 'AB',
  },
  argTypes,
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '.sui-Avatar',
    },
    performance: {
      component: Avatar,
    },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  render: (props) => {
    return <Avatar {...props} />
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByText('')).classList).toContain('')
  },
}
