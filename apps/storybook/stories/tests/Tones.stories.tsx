import type {Meta, StoryObj} from '@storybook/react-vite'

import {Tones} from './Tones'

/**
 * A page containing cards with all components that are modified when the card tone changes.
 */
const meta: Meta<typeof Tones> = {
  component: Tones,
  parameters: {controls: {include: []}, padding: 0},
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Tones>

export const Default: Story = {
  render: () => <Tones />,
}
