import type {Meta, StoryObj} from '@storybook/react'
import {Hotkeys} from '../../src/components'
import {RADII} from '../constants'
import {rowBuilder} from '../helpers/rowBuilder'

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
    <>
      {rowBuilder({
        gap: 4,
        renderItem: ({value}) => (
          <Hotkeys {...props} keys={['Radius', String(value)]} radius={value} />
        ),
        rows: RADII,
      })}
    </>
  ),
}
