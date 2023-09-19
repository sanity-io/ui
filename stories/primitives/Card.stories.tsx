import type {Meta, StoryObj} from '@storybook/react'
import {Card, Flex, Text} from '../../src/primitives'
import {RADIUS_CONTROLS, SHADOW_CONTROLS, SPACE_CONTROLS} from '../constants'

const meta: Meta<typeof Card> = {
  args: {
    children: <Text>Nested text</Text>,
    padding: 4,
  },
  argTypes: {
    padding: SPACE_CONTROLS,
    paddingBottom: SPACE_CONTROLS,
    paddingLeft: SPACE_CONTROLS,
    paddingRight: SPACE_CONTROLS,
    paddingTop: SPACE_CONTROLS,
    radius: RADIUS_CONTROLS,
    shadow: SHADOW_CONTROLS,
  },
  component: Card,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Card>

export const Docs: Story = {
  render: (props) => {
    return <Card {...props} />
  },
}

export const Tones: Story = {
  args: {
    radius: 1,
    shadow: 1,
  },
  parameters: {
    controls: {
      include: ['fontSize', 'mode', 'padding', 'radius', 'shadow'],
    },
  },
  render: (props) => (
    <Flex gap={2}>
      <Card {...props}>
        <Text>Default</Text>
      </Card>
      <Card {...props} tone="primary">
        <Text>Primary</Text>
      </Card>
      <Card {...props} tone="positive">
        <Text>Positive</Text>
      </Card>
      <Card {...props} tone="caution">
        <Text>Caution</Text>
      </Card>
      <Card {...props} tone="critical">
        <Text>Critical</Text>
      </Card>
    </Flex>
  ),
}
