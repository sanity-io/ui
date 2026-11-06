import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'
import {Card as CardV3} from 'ui3'

import {Card} from '../../../../packages/ui/src/components/card/Card'
import {cardProps} from '../../../../packages/ui/src/components/card/card.props'
import {HStack} from '../../../../packages/ui/src/components/h-stack/HStack'
import {Text} from '../../../../packages/ui/src/components/text/Text'
import {TONE_WITH_DEFAULT} from '../../../../packages/ui/src/types/Tone'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(cardProps)

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  args: {
    children: <Text>This is a Card component.</Text>,
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
    await expect(
      (await canvas.findByText('This is a Card component.')).parentElement?.dataset.ui,
    ).toBe('Card')
  },
}

export const Tones: Story = {
  render: (props) => {
    return (
      <HStack gap={3}>
        {TONE_WITH_DEFAULT.map((tone) => (
          <Card {...props} key={tone} tone={tone}>
            <Text>{`Card ${tone} tone`}</Text>
          </Card>
        ))}
      </HStack>
    )
  },
  play: async ({canvas}) => {
    await expect(
      (await canvas.findByText('Card positive tone')).parentElement?.classList,
    ).toContain('sui-tone-positive')
  },
}
