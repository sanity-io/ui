import type {Meta, StoryObj} from '@storybook/react'
import {Card, Flex, Text} from '../../src/primitives'
import {
  getDirectionControls,
  getFlexAlignControls,
  getHeightControls,
  getJustifyControls,
  getOverflowControls,
  getSpaceControls,
  getWrapControls,
} from '../controls'

const meta: Meta<typeof Flex> = {
  component: Flex,
  args: {
    children: [
      <Card key="card0" padding={3}>
        <Text size={0}>Card 0</Text>
      </Card>,
      <Card key="card1" padding={3}>
        <Text size={1}>Card 1</Text>
      </Card>,
      <Card key="card2" padding={3}>
        <Text size={2}>Card 2</Text>
      </Card>,
      <Card key="card3" padding={3}>
        <Text size={3}>Card 3</Text>
      </Card>,
      <Card key="card4" padding={3}>
        <Text size={4}>Card 4</Text>
      </Card>,
    ],
  },
  argTypes: {
    align: getFlexAlignControls(),
    direction: getDirectionControls(),
    justify: getJustifyControls(),
    wrap: getWrapControls(),
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
    gap: getSpaceControls(),
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Flex>

export const Default: Story = {
  render: (props) => <Flex {...props} />,
}
