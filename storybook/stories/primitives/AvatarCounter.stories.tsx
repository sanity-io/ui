import {AvatarCounter, AvatarStack} from '@sanity/ui'
import type {Meta, StoryFn, StoryObj} from '@storybook/react-vite'

import {AVATAR_SIZE_CONTROLS} from '../controls'

const meta: Meta<typeof AvatarCounter> = {
  args: {
    count: 10,
  },
  argTypes: {
    size: AVATAR_SIZE_CONTROLS,
  },
  component: AvatarCounter,
  decorators: [
    (Story: StoryFn): React.JSX.Element => (
      <AvatarStack>
        {/* @ts-expect-error fix later */}
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
