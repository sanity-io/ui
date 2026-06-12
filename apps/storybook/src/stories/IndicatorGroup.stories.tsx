import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {Indicator} from '../../../../packages/ui/src/components/indicator/Indicator'
import {IndicatorGroup} from '../../../../packages/ui/src/components/indicator-group/IndicatorGroup'
import {indicatorGroupProps} from '../../../../packages/ui/src/components/indicator-group/indicatorGroup.props'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(indicatorGroupProps)

const meta: Meta<typeof IndicatorGroup> = {
  title: 'Components/IndicatorGroup',
  args: {},
  argTypes,
  component: IndicatorGroup,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '.sui-IndicatorGroup',
    },
  },
}

export default meta
type Story = StoryObj<typeof IndicatorGroup>

export const Default: Story = {
  render: (props) => {
    return (
      <IndicatorGroup {...props}>
        <Indicator tone="critical" label="Critical" />
        <Indicator tone="positive" label="Positive" />
        <Indicator tone="suggest" label="Suggest" />
      </IndicatorGroup>
    )
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByLabelText('Positive')).parentElement?.classList).toContain(
      'sui-IndicatorGroup',
    )
  },
}
