import type { Meta, StoryObj} from '@storybook/react-vite'

import {Box} from '../../../../packages/ui/src/components/Box'
import { getArgTypes } from '../utils/getArgTypes'
import { boxProps } from '../../../../packages/ui/src/components/box.props'

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
}

export default meta
type Story = StoryObj<typeof Box>

export const Default: Story = {
  render: (props) => {
    return <Box {...props} />
  },
}
