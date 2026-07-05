import type {Meta, StoryObj} from '@storybook/react-vite'

import {FocusRings} from './FocusRings'

/**
 * A page containing all Sanity UI primitives and components that can receive focus.
 */
const meta: Meta<typeof FocusRings> = {
  component: FocusRings,
  parameters: {controls: {include: []}, padding: 0},
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof FocusRings>

export const Default: Story = {
  render: () => <FocusRings />,
}
