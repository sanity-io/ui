import type { Meta, StoryObj} from '@storybook/react-vite'
import { expect } from 'storybook/test'

import {Flex} from '../../../../packages/ui/src/components/flex/Flex'
import { getArgTypes } from '../utils/getArgTypes'
import { flexProps } from '../../../../packages/ui/src/components/flex/flex.props'

const argTypes = getArgTypes(flexProps)

const meta: Meta<typeof Flex> = {
  title: 'Layout/Flex',
  args: {
    children: 'This is a Flex component.',
    as: 'div',
    display: 'flex',
  },
  argTypes,
  component: Flex,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '.sui-Flex'
    }
  }
}

export default meta
type Story = StoryObj<typeof Flex>

export const Default: Story = {
  render: (props) => {
    return <Flex {...props} />
  },
  play: async ({ canvas }) => {
    await expect(
      (await canvas.findByText('This is a Flex component.')).classList
    ).toContain('sui-display-flex')
  }
}
