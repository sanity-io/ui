import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {Indicator} from '../../../../packages/ui/src/components/indicator/Indicator'
import {IndicatorStack} from '../../../../packages/ui/src/components/indicator-stack/IndicatorStack'
import {indicatorStackProps} from '../../../../packages/ui/src/components/indicator-stack/indicatorStack.props'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(indicatorStackProps)

const meta: Meta<typeof IndicatorStack> = {
  title: 'Components/IndicatorStack',
  args: {},
  argTypes,
  component: IndicatorStack,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '.sui-IndicatorStack',
    },
  },
}

export default meta
type Story = StoryObj<typeof IndicatorStack>

export const Default: Story = {
  render: (props) => {
    return (
      <IndicatorStack {...props}>
        <Indicator tone="critical" label="Critical" />
        <Indicator tone="positive" label="Positive" />
        <Indicator tone="suggest" label="Suggest" />
      </IndicatorStack>
    )
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByLabelText('Positive')).parentElement?.classList).toContain(
      'sui-IndicatorStack',
    )
  },
}
