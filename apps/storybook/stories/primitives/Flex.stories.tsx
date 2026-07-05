import {Card, Code, Flex, Text} from '@sanity/ui'
import type {Meta, StoryObj} from '@storybook/react'
import {styled} from 'styled-components'

import {
  getDirectionControls,
  getFlexAlignControls,
  getHeightControls,
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

const DebugCard = styled(Card)`
  outline: 1px solid red;
  &:not([hidden]) {
    display: flex;
  }
  align-items: center;
  justify-content: center;
`

export const ResponsiveFlex: Story = {
  parameters: {controls: {include: ['direction']}},
  render: (props) => (
    <Flex direction={props.direction ?? 'row'} height="fill" style={{width: '100%'}}>
      <DebugCard flex={1}>
        <Code size={1}>1</Code>
      </DebugCard>

      <DebugCard flex={[1, 2, 3]}>
        <Code size={1}>[1,2,3]</Code>
      </DebugCard>

      <DebugCard flex={['none', 'none', 1]}>
        <Code size={1}>['none', 'none', 1]</Code>
      </DebugCard>
    </Flex>
  ),
}

export const Gap: Story = {
  parameters: {controls: {include: []}},
  render: () => (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Flex align="center" gap={[2, 3, 4]} justify="center" wrap="wrap">
        <Card padding={3} scheme="dark">
          <Text size={0}>Card 0</Text>
        </Card>
        <Card padding={3} scheme="dark">
          <Text size={1}>Card 1</Text>
        </Card>
        <Card padding={3} scheme="dark">
          <Text size={2}>Card 2</Text>
        </Card>
        <Card padding={3} scheme="dark">
          <Text size={3}>Card 3</Text>
        </Card>
        <Card padding={3} scheme="dark">
          <Text size={4}>Card 4</Text>
        </Card>
      </Flex>
    </Flex>
  ),
}
