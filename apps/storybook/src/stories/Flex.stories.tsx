import {Flex as FlexV3} from '@sanity/ui'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {Flex} from '../../../../packages/ui/src/components/flex/Flex'
import {flexProps} from '../../../../packages/ui/src/components/flex/flex.props'
import {Text} from '../../../../packages/ui/src/components/text/Text'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(flexProps)

const meta: Meta<typeof Flex> = {
  title: 'Layout/Flex',
  args: {
    as: 'div',
    display: 'flex',
  },
  argTypes,
  component: Flex,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="Flex"]',
    },
    performance: {
      component: Flex,
      compareComponent: FlexV3,
    },
  },
}

export default meta
type Story = StoryObj<typeof Flex>

export const Default: Story = {
  render: (props) => {
    return (
      <Flex {...props}>
        <Text as="p">Child 1</Text>
        <Text as="p">Child 2</Text>
        <Text as="p">Child 3</Text>
      </Flex>
    )
  },
  play: async ({canvas}) => {
    await expect(
      (await canvas.findByText('Child 1')).parentElement?.closest('[data-ui="Flex"]')?.classList,
    ).toContain('sui-display-flex')
  },
}
