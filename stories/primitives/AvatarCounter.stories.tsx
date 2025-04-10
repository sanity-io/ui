import type {Meta, StoryFn, StoryObj} from '@storybook/react'

import {AvatarCounter, AvatarStack} from '../../src/ui/primitives'
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
