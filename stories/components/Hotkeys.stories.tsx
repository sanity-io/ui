import type {Meta, StoryObj} from '@storybook/react'

import {Hotkeys} from '../../src/core/components'
import {RADII} from '../constants'
import {getSpaceControls} from '../controls'
import {rowBuilder} from '../helpers/rowBuilder'

const meta: Meta<typeof Hotkeys> = {
  args: {
    keys: ['Ctrl', 'Shift', 'P'],
  },
  argTypes: {
    gap: getSpaceControls(),
    space: getSpaceControls(),
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
    <>
      {rowBuilder({
        gap: 4,
        renderItem: ({value}) => (
          <Hotkeys {...props} key={value} keys={['Radius', String(value)]} radius={value} />
        ),
        rows: RADII,
      })}
    </>
  ),
}
