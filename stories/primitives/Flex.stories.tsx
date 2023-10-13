import type {Meta, StoryObj} from '@storybook/react'
import {Card, Flex, Text} from '../../src/primitives'
import {
  getDirectionControls,
  getFlexAlignControls,
  getHeightControls,
  getJustifyControls,
  getOverflowControls,
  getSpaceControls,
} from '../controls'

const meta: Meta<typeof Flex> = {
  component: Flex,
  args: {
    children: [
      Array.from({length: 5}, (_, index) => (
        <Card key={`card${index}`} padding={3}>
          <Text size={index}>{`Card ${index}`} </Text>
        </Card>
      )),
    ],
  },
  argTypes: {
    align: getFlexAlignControls(),
    direction: getDirectionControls(),
    justify: getJustifyControls(),
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
