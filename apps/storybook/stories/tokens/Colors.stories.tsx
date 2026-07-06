import type {Meta, StoryObj} from '@storybook/react-vite'

import {ColorPalette} from './ColorPalette'

/**
 * Full `@sanity/color` palette.
 */
const meta: Meta<typeof ColorPalette> = {
  component: ColorPalette,
  parameters: {controls: {include: []}, padding: 0},
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ColorPalette>

export const Default: Story = {
  render: () => <ColorPalette />,
}
