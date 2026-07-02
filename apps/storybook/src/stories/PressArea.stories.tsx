import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {Card} from '../../../../packages/ui/src/components/card/Card'
import {PressArea} from '../../../../packages/ui/src/components/press-area/PressArea'
import {pressAreaProps} from '../../../../packages/ui/src/components/press-area/pressArea.props'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(pressAreaProps)

const meta: Meta<typeof PressArea> = {
  title: 'Components/PressArea',
  argTypes,
  component: PressArea,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="PressArea"]',
    },
  },
}

export default meta
type Story = StoryObj<typeof PressArea>

export const Default: Story = {
  render: (props) => {
    return (
      <PressArea {...props}>
        <Card tone="neutral">Press Area Content</Card>
      </PressArea>
    )
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByText('Press Area Content')).parentElement?.dataset.ui).toBe(
      'PressArea',
    )
  },
}

export const Anchor: Story = {
  render: (props) => {
    return (
      <PressArea {...props} as="a" href="https://www.sanity.io">
        <Card tone="neutral">Press Area Content</Card>
      </PressArea>
    )
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByText('Press Area Content')).parentElement?.dataset.ui).toBe(
      'PressArea',
    )
  },
}
