import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {AvatarCounter} from '../../../../packages/ui/src/components/avatar-counter/AvatarCounter'
import {avatarCounterProps} from '../../../../packages/ui/src/components/avatar-counter/avatarCounter.props'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(avatarCounterProps)

const meta: Meta<typeof AvatarCounter> = {
  title: 'Components/AvatarCounter',
  args: {
    count: 10,
  },
  argTypes,
  component: AvatarCounter,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '.sui-AvatarCounter',
    },
    performance: {
      component: AvatarCounter,
    },
  },
}

export default meta
type Story = StoryObj<typeof AvatarCounter>

export const Default: Story = {
  render: (props) => {
    return <AvatarCounter {...props} />
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByText('')).classList).toContain('')
  },
}
