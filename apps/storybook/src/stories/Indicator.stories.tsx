import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {Flex} from '../../../../packages/ui/src/components/flex/Flex'
import {Indicator} from '../../../../packages/ui/src/components/indicator/Indicator'
import {indicatorProps} from '../../../../packages/ui/src/components/indicator/indicator.props'
import {TONE} from '../../../../packages/ui/src/types/Tone'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(indicatorProps)

const meta: Meta<typeof Indicator> = {
  title: 'Components/Indicator',
  args: {
    label: 'Label',
  },
  argTypes,
  component: Indicator,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="Indicator"]',
    },
  },
}

export default meta
type Story = StoryObj<typeof Indicator>

export const Default: Story = {
  render: (props) => {
    return <Indicator {...props} />
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByLabelText('Label')).dataset.ui).toBe('Indicator')
  },
}

export const Tones: Story = {
  render: (props) => {
    return (
      <Flex alignItems="center" gap={4}>
        {TONE.map((tone) => (
          <Indicator
            key={tone}
            {...props}
            tone={tone}
            label={`Indicator Tone ${tone[0].toUpperCase() + tone.slice(1)}`}
          />
        ))}
      </Flex>
    )
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByLabelText('Indicator Tone Caution')).classList).toContain(
      'sui-tone-caution',
    )
  },
}
