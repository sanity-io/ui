import {Inline as InlineV3} from '@sanity/ui'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {Inline} from '../../../../packages/ui/src/components/inline/Inline'
import {inlineProps} from '../../../../packages/ui/src/components/inline/inline.props'
import {Square} from '../components/Square'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(inlineProps)

const meta: Meta<typeof Inline> = {
  title: 'Deprecated/Inline',
  args: {
    gap: 3,
  },
  argTypes,
  component: Inline,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="Inline"]',
    },
    performance: {
      component: Inline,
      compareComponent: InlineV3,
    },
  },
}

export default meta
type Story = StoryObj<typeof Inline>

export const Default: Story = {
  render: (props) => {
    return (
      <Inline {...props}>
        <Square>Child 1</Square>
        <Square>Child 2</Square>
        <Square>Child 3</Square>
      </Inline>
    )
  },
  play: async ({canvas}) => {
    await expect(
      (await canvas.findByText('Child 1')).parentElement?.closest('[data-ui="Inline"]')?.classList,
    ).toContain('sui-mt-3')
  },
}
