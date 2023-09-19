import type {Meta, StoryObj} from '@storybook/react'
import {Box, Text} from '../../src/primitives'
import {SPACE_CONTROLS} from '../constants'

const meta: Meta<typeof Box> = {
  args: {
    children: <Text>Box with a custom outline</Text>,
    padding: 4,
    style: {border: '1px solid red'},
  },
  argTypes: {
    padding: SPACE_CONTROLS,
    paddingBottom: SPACE_CONTROLS,
    paddingLeft: SPACE_CONTROLS,
    paddingRight: SPACE_CONTROLS,
    paddingTop: SPACE_CONTROLS,
  },
  component: Box,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Box>

export const Docs: Story = {
  render: (props) => {
    return <Box {...props} />
  },
}
