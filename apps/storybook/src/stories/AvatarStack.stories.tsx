import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'
import {AvatarStack as AvatarStackV3} from 'ui3'

import {AvatarStack} from '../../../../packages/ui/src/components/avatar-stack/AvatarStack'
import {avatarStackProps} from '../../../../packages/ui/src/components/avatar-stack/avatarStack.props'
import {Avatar} from '../../../../packages/ui/src/components/avatar/Avatar'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(avatarStackProps)

const meta: Meta<typeof AvatarStack> = {
  title: 'Components/AvatarStack',
  argTypes,
  component: AvatarStack,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="AvatarStack"]',
    },
    performance: {
      component: AvatarStack,
      compareComponent: AvatarStackV3,
    },
  },
}

export default meta
type Story = StoryObj<typeof AvatarStack>

export const Default: Story = {
  render: (props) => {
    return (
      <AvatarStack {...props}>
        <Avatar initials="AB" />
        <Avatar color="green" initials="CD" />
        <Avatar
          color="purple"
          initials="EF"
          src="https://avatars3.githubusercontent.com/u/406933?s=400&u=af898b0a50ef2ef1248be32dfa1410ccb55f6f65&v=4"
        />
      </AvatarStack>
    )
  },
  play: async ({canvas}) => {
    await expect(await canvas.findByLabelText('AB')).toBeInTheDocument()
    await expect(await canvas.findByLabelText('CD')).toBeInTheDocument()
    await expect(await canvas.findByLabelText('EF')).toBeInTheDocument()
  },
}

export const WithMaxLength: Story = {
  render: (props) => {
    return (
      <AvatarStack {...props} maxLength={2}>
        <Avatar initials="AB" />
        <Avatar color="green" initials="CD" />
        <Avatar
          color="purple"
          initials="EF"
          src="https://avatars3.githubusercontent.com/u/406933?s=400&u=af898b0a50ef2ef1248be32dfa1410ccb55f6f65&v=4"
        />
      </AvatarStack>
    )
  },
  play: async ({canvas}) => {
    await expect(await canvas.findByLabelText('+ 1 more user')).toBeInTheDocument()
  },
}

export const WithNoAvatars: Story = {
  render: (props) => {
    return <AvatarStack {...props} />
  },
  play: async ({canvas}) => {
    await expect(await canvas.findByLabelText('No users')).toBeInTheDocument()
  },
}
