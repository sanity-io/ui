import type {Meta, StoryObj} from '@storybook/react'

import {Box, Grid, Text} from '../../src/core/primitives'
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

export const AsGridItem: Story = {
  args: {
    gridColumn: 2,
    children: <Text>Cell B</Text>,
  },
  argTypes: {
    gridColumn: {control: {type: 'number', min: 1, max: 12}},
    column: {control: {type: 'number', min: 1, max: 12}},
    gridColumnStart: {control: {type: 'number', min: 1, max: 12}},
    columnStart: {control: {type: 'number', min: 1, max: 12}},
    gridColumnEnd: {control: {type: 'number', min: 1, max: 12}},
    columnEnd: {control: {type: 'number', min: 1, max: 12}},
    gridRow: {control: {type: 'number', min: 1, max: 12}},
    row: {control: {type: 'number', min: 1, max: 12}},
    gridRowStart: {control: {type: 'number', min: 1, max: 12}},
    rowStart: {control: {type: 'number', min: 1, max: 12}},
    gridRowEnd: {control: {type: 'number', min: 1, max: 12}},
    rowEnd: {control: {type: 'number', min: 1, max: 12}},
  },
  render: (props) => {
    return (
      <Grid gap={2} gridTemplateColumns={4}>
        <Box padding={3} style={{border: '1px dashed #999'}}>
          <Text>Cell A</Text>
        </Box>
        <Box {...props} />
        <Box padding={3} style={{border: '1px dashed #999'}}>
          <Text>Cell C</Text>
        </Box>
      </Grid>
    )
  },
}
