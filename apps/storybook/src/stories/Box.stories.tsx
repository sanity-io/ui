import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'
import {Box as BoxV3} from 'ui3'

import {Box} from '../../../../packages/ui/src/components/box/Box'
import {boxProps} from '../../../../packages/ui/src/components/box/box.props'
import {Text} from '../../../../packages/ui/src/components/text/Text'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(boxProps)

const meta: Meta<typeof Box> = {
  title: 'Layout/Box',
  args: {
    as: 'div',
    display: 'block',
  },
  argTypes,
  component: Box,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="Box"]',
    },
    performance: {
      component: Box,
      compareComponent: BoxV3,
    },
  },
}

export default meta
type Story = StoryObj<typeof Box>

export const Default: Story = {
  render: (props) => {
    return (
      <Box {...props}>
        <Text as="p">Child 1</Text>
        <Text as="p">Child 2</Text>
        <Text as="p">Child 3</Text>
      </Box>
    )
  },
  play: async ({canvas}) => {
    await expect(
      (await canvas.findByText('Child 1')).parentElement?.closest('[data-ui="Box"]')?.classList,
    ).toContain('sui-display-block')
  },
}
