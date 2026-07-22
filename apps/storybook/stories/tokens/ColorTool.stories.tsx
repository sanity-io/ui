import {COLOR_HUES} from '@sanity/color'
import type {Meta, StoryObj} from '@storybook/react-vite'

import {ColorTool} from './color-tool/ColorTool'

/**
 * Interactive editor for designing the `@sanity/color` palette, ported from the
 * `@sanity/ui-workshop` tool in the standalone sanity-io/color repo.
 *
 * Click a hue strip to expand its tint sliders, then drag the H (red), S
 * (green) and L (blue) handles — or type a hex value — to adjust each tint.
 * Enable `showCode` to get a `packages/color/src/config.ts` snippet of the
 * edited palette, ready to paste into the package (regenerate `src/color.ts`
 * with `pnpm --filter @sanity/color generate` afterwards).
 */
const meta: Meta<typeof ColorTool> = {
  argTypes: {
    visibleHues: {control: 'check', options: [...COLOR_HUES]},
  },
  component: ColorTool,
  parameters: {
    controls: {include: ['visibleHues', 'showAABadges', 'showContrast', 'showCode']},
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ColorTool>

export const Default: Story = {
  args: {
    showAABadges: false,
    showCode: false,
    showContrast: false,
    visibleHues: [...COLOR_HUES],
  },
  render: (args) => <ColorTool {...args} />,
}
