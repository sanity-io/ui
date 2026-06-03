import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {Card} from '../../../../packages/ui/src/components/card/Card'
import {VStack} from '../../../../packages/ui/src/components/v-stack/VStack'
import {vStackProps} from '../../../../packages/ui/src/components/v-stack/vStack.props'
import {Square} from '../components/Square'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(vStackProps)

const meta: Meta<typeof VStack> = {
  title: 'Layout/VStack',
  args: {
    gap: 3,
  },
  argTypes,
  component: VStack,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '.sui-VStack',
    },
  },
}

export default meta
type Story = StoryObj<typeof VStack>

export const Default: Story = {
  render: (props) => {
    return (
      <VStack {...props}>
        <Square>Child 1</Square>
        <Square>Child 2</Square>
        <Square>Child 3</Square>
      </VStack>
    )
  },
  play: async ({canvas}) => {
    await expect(
      (await canvas.findByText('Child 1')).parentElement?.closest('.sui-VStack')?.classList,
    ).toContain('sui-gap3')
  },
}

export const Inherit: Story = {
  render: (props) => {
    return (
      <Card density="regular">
        <VStack {...props} gap="inherit">
          <Square>Child 1</Square>
          <Square>Child 2</Square>
          <Square>Child 3</Square>
        </VStack>
      </Card>
    )
  },
}
