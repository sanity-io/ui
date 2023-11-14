import type {Meta, StoryFn, StoryObj} from '@storybook/react'
import {AvatarCounter, AvatarStack} from '../../src/primitives'
import {getAvatarSizeControls} from '../controls'

const meta: Meta<typeof AvatarCounter> = {
  args: {
    count: 10,
  },
  argTypes: {
    size: getAvatarSizeControls(),
  },
  component: AvatarCounter,
  decorators: [
    (Story: StoryFn): JSX.Element => (
      <AvatarStack>
        <Story />
      </AvatarStack>
    ),
  ],
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AvatarCounter>

export const Default: Story = {
  render: (props) => <AvatarCounter {...props} />,
}
