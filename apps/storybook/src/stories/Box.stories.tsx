import type { Meta, StoryObj} from '@storybook/react-vite'

import {Box} from '../../../../packages/ui/src/components/Box'
import { getArgTypes } from '../utils/getArgTypes'
import { layoutProps } from '../../../../packages/ui/src/props/layout'

const argTypes = getArgTypes(layoutProps)

const meta: Meta<typeof Box> = {
  args: {
    children: 'This is a Box component.',
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
