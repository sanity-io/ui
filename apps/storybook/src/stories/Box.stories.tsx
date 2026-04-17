import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {Box} from '../../../../packages/ui/src/components/box/Box'
import {boxProps} from '../../../../packages/ui/src/components/box/box.props'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(boxProps)

const meta: Meta<typeof Box> = {
  title: 'Layout/Box',
  args: {
    children: 'This is a Box component.',
    as: 'div',
    display: 'block',
  },
  argTypes,
  component: Box,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '.sui-Box',
    },
  },
}

export default meta
type Story = StoryObj<typeof Box>

export const Default: Story = {
  render: (props) => {
    return <Box {...props} />
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByText('This is a Box component.')).classList).toContain(
      'sui-display-block',
    )
  },
}
