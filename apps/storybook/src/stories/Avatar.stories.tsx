import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'
import {Avatar as AvatarV3} from 'ui3'

import {Avatar} from '../../../../packages/ui/src/components/avatar/Avatar'
import {avatarProps} from '../../../../packages/ui/src/components/avatar/avatar.props'
import {HStack} from '../../../../packages/ui/src/components/h-stack/HStack'
import {AVATAR_COLOR, AVATAR_SIZE} from '../../../../packages/ui/src/types/Avatar'
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
      compareComponent: AvatarV3,
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
    await expect((await canvas.findByLabelText('AB')).parentElement?.dataset.ui).toBe('Avatar')
  },
}

export const Sizes: Story = {
  render: (props) => {
    return (
      <HStack gap={3}>
        {AVATAR_SIZE.map((size) => (
          <Avatar {...props} key={size} size={size} aria-label={`Avatar ${size}`} />
        ))}
      </HStack>
    )
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByLabelText('Avatar 2')).parentElement?.classList).toContain(
      'sui-text-eyebrow3',
    )
  },
}

export const Colors: Story = {
  render: (props) => {
    return (
      <HStack gap={3}>
        {AVATAR_COLOR.map((color) => (
          <Avatar {...props} key={color} color={color} aria-label={`Avatar ${color}`} />
        ))}
      </HStack>
    )
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByLabelText('Avatar blue')).parentElement?.classList).toContain(
      'sui-avatar-blue',
    )
  },
}

export const WithSrc: Story = {
  render: (props) => {
    return (
      <Avatar
        {...props}
        src="https://avatars3.githubusercontent.com/u/406933?s=400&u=af898b0a50ef2ef1248be32dfa1410ccb55f6f65&v=4"
      />
    )
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByAltText('AB')).tagName).toBe('IMG')
  },
}
