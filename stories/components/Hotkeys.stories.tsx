import type {Meta, StoryObj} from '@storybook/react'
import {Hotkeys} from '../../src/components'
import {Flex} from '../../src/primitives'
import {radiusBuilder} from '../helpers/radiusBuilder'

const meta: Meta<typeof Hotkeys> = {
  args: {
    keys: ['Ctrl', 'Shift', 'P'],
  },
  component: Hotkeys,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Hotkeys>

export const Default: Story = {
  render: (props) => {
    return <Hotkeys {...props} />
  },
}

export const Radius: Story = {
  parameters: {
    controls: {
      include: ['fontSize', 'padding', 'tone'],
    },
  },
  render: (props) => (
    <Flex gap={4} wrap="wrap">
      {radiusBuilder({
        renderItem: ({radius}) => (
          <Hotkeys {...props} keys={['Radius', String(radius)]} radius={radius} />
        ),
      })}
    </Flex>
  ),
}
