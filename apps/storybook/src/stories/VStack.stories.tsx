import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'
import {Stack as StackV3} from 'ui3'

import {Card} from '../../../../packages/ui/src/components/card/Card'
import {Text} from '../../../../packages/ui/src/components/text/Text'
import {VStack} from '../../../../packages/ui/src/components/v-stack/VStack'
import {SPACE_INHERIT} from '../../../../packages/ui/src/types/Space'
import {Square} from '../components/Square'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes({
  gap: {
    type: 'union',
    className: 'gap',
    values: SPACE_INHERIT,
  },
})

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
      context: '[data-ui="VStack"]',
    },
    performance: {
      component: VStack,
      compareComponent: StackV3,
    },
  },
}

export default meta
type Story = StoryObj<typeof VStack>

export const Default: Story = {
  render: (props) => {
    return (
      <VStack {...props}>
        <Square>
          <Text>Child 1</Text>
        </Square>
        <Square>
          <Text>Child 2</Text>
        </Square>
        <Square>
          <Text>Child 3</Text>
        </Square>
      </VStack>
    )
  },
  play: async ({canvas}) => {
    await expect(
      (await canvas.findByText('Child 1')).parentElement?.closest('[data-ui="VStack"]')?.classList,
    ).toContain('sui-gap3')
  },
}

export const Inherit: Story = {
  render: (props) => {
    return (
      <Card density="regular">
        <VStack {...props} gap="inherit">
          <Square>
            <Text>Child 1</Text>
          </Square>
          <Square>
            <Text>Child 2</Text>
          </Square>
          <Square>
            <Text>Child 3</Text>
          </Square>
        </VStack>
      </Card>
    )
  },
}
