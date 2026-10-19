import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'
import {Card as CardV3} from 'ui3'

import {Card} from '../../../../packages/ui/src/components/card/Card'
import {cardProps} from '../../../../packages/ui/src/components/card/card.props'
import {HStack} from '../../../../packages/ui/src/components/h-stack/HStack'
import {LAYOUT_TONE} from '../../../../packages/ui/src/types/Tone'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(cardProps)

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  args: {
    children: 'This is a Card component.',
    as: 'div',
  },
  argTypes,
  component: Card,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="Card"]',
    },
    performance: {
      component: Card,
      compareComponent: CardV3,
    },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: (props) => {
    return <Card {...props} />
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByText('This is a Card component.')).dataset.ui).toBe('Card')
  },
}

export const Tones: Story = {
  render: (props) => {
    return (
      <HStack gap={3}>
        {LAYOUT_TONE.map((tone) => (
          <Card {...props} key={tone} tone={tone}>
            {`Card ${tone} tone`}
          </Card>
        ))}
      </HStack>
    )
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByText('Card positive tone')).classList).toContain(
      'sui-tone-positive',
    )
  },
}
