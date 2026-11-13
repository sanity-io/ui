import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'
import {Inline as InlineV3} from 'ui3'

import {Inline} from '../../../../packages/ui/src/components/inline/Inline'
import {inlineProps} from '../../../../packages/ui/src/components/inline/inline.props'
import {Text} from '../../../../packages/ui/src/components/text/Text'
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
        <Square>
          <Text>Child 1</Text>
        </Square>
        <Square>
          <Text>Child 2</Text>
        </Square>
        <Square>
          <Text>Child 3</Text>
        </Square>
      </Inline>
    )
  },
  play: async ({canvas}) => {
    await expect(
      (await canvas.findByText('Child 1')).parentElement?.closest('[data-ui="Inline"]')?.classList,
    ).toContain('sui-mt-3')
  },
}
