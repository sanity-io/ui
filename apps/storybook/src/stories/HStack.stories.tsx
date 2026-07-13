import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {Card} from '../../../../packages/ui/src/components/card/Card'
import {HStack} from '../../../../packages/ui/src/components/h-stack/HStack'
import {hStackProps} from '../../../../packages/ui/src/components/h-stack/hStack.props'
import {Square} from '../components/Square'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(hStackProps)

const meta: Meta<typeof HStack> = {
  title: 'Layout/HStack',
  args: {
    gap: 3,
  },
  argTypes,
  component: HStack,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="HStack"]',
    },
  },
}

export default meta
type Story = StoryObj<typeof HStack>

export const Default: Story = {
  render: (props) => {
    return (
      <HStack {...props}>
        <Square>Child 1</Square>
        <Square>Child 2</Square>
        <Square>Child 3</Square>
      </HStack>
    )
  },
  play: async ({canvas}) => {
    await expect(
      (await canvas.findByText('Child 1')).parentElement?.closest('[data-ui="HStack"]')?.classList,
    ).toContain('sui-gap3')
  },
}

export const Inherit: Story = {
  render: (props) => {
    return (
      <Card density="regular">
        <HStack {...props} gap="inherit">
          <Square>Child 1</Square>
          <Square>Child 2</Square>
          <Square>Child 3</Square>
        </HStack>
      </Card>
    )
  },
}
