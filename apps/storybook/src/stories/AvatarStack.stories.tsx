import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {AvatarStack} from '../../../../packages/ui/src/components/avatar-stack/AvatarStack'
import {avatarStackProps} from '../../../../packages/ui/src/components/avatar-stack/avatarStack.props'
import {Avatar} from '../../../../packages/ui/src/components/avatar/Avatar'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(avatarStackProps)

const meta: Meta<typeof AvatarStack> = {
  title: 'Components/AvatarStack',
  args: {},
  argTypes,
  component: AvatarStack,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="AvatarStack"]',
    },
    performance: {
      component: AvatarStack,
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
          color="blue"
          initials="EF"
          src="https://avatars3.githubusercontent.com/u/406933?s=400&u=af898b0a50ef2ef1248be32dfa1410ccb55f6f65&v=4"
        />
      </AvatarStack>
    )
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByLabelText('AB')).parentElement?.dataset.ui).toContain(
      'AvatarStack',
    )
  },
}
