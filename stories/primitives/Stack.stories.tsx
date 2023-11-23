import type {Meta, StoryObj} from '@storybook/react'
import {Card, Stack, Text} from '../../src/core/primitives'
import {getHeightControls, getOverflowControls, getSpaceControls} from '../controls'

const meta: Meta<typeof Stack> = {
  component: Stack,
  args: {
    space: 0,
    children: [
      <Card key="card1" padding={2}>
        <Text align="center">Stack item 1</Text>
      </Card>,
      <Card key="card2" padding={2}>
        <Text align="center">Stack item 2</Text>
      </Card>,
      <Card key="card2" padding={2}>
        <Text align="center">Stack item 3</Text>
      </Card>,
    ],
  },
  argTypes: {
    padding: getSpaceControls(),
    paddingBottom: getSpaceControls(),
    paddingLeft: getSpaceControls(),
    paddingRight: getSpaceControls(),
    paddingTop: getSpaceControls(),
    paddingY: getSpaceControls(),
    paddingX: getSpaceControls(),
    margin: getSpaceControls(),
    marginBottom: getSpaceControls(),
    marginLeft: getSpaceControls(),
    marginRight: getSpaceControls(),
    marginTop: getSpaceControls(),
    marginY: getSpaceControls(),
    marginX: getSpaceControls(),
    height: getHeightControls(),
    overflow: getOverflowControls(),
    space: getSpaceControls(),
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Stack>

export const Default: Story = {
  render: (props) => <Stack {...props} />,
}
