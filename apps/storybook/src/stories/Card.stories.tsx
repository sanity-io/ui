import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {Card} from '../../../../packages/ui/src/components/card/Card'
import {cardProps} from '../../../../packages/ui/src/components/card/card.props'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(cardProps)

const meta: Meta<typeof Card> = {
  title: 'Layout/Card',
  args: {
    children: 'This is a Card component.',
    as: 'div',
    display: 'block',
  },
  argTypes,
  component: Card,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '.sui-Card',
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
    await expect((await canvas.findByText('This is a Card component.')).classList).toContain(
      'sui-Card',
    )
  },
}
