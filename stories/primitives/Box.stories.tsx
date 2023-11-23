import type {Meta, StoryObj} from '@storybook/react'
import {Box, Text} from '../../src/core/primitives'
import {getSpaceControls} from '../controls'

const meta: Meta<typeof Box> = {
  args: {
    children: <Text>Box with a custom outline</Text>,
    padding: 4,
    style: {border: '1px solid red'},
  },
  argTypes: {
    padding: getSpaceControls(),
    paddingBottom: getSpaceControls(),
    paddingLeft: getSpaceControls(),
    paddingRight: getSpaceControls(),
    paddingTop: getSpaceControls(),
  },
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
