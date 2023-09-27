import type {Meta, StoryObj} from '@storybook/react'
import {Card, Flex, Grid, Text} from '../../src/primitives'
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

export const Default: Story = {
  render: (props) => {
    return <Card {...props} />
  },
}

/**
 * Displays focus ring, hover styles and receives focus events. Requires `__unstable_focusRing`.
 */
export const AsButton: Story = {
  args: {
    __unstable_focusRing: true,
    as: 'button',
    children: <Text>Card as a button</Text>,
    tone: 'transparent',
  },
  render: (props) => (
    <Flex gap={2}>
      <Card {...props} />
      <Card {...props} />
      <Card {...props} />
    </Flex>
  ),
}

export const Borders: Story = {
  args: {
    tone: 'transparent',
  },
  parameters: {
    controls: {
      include: ['fontSize', 'padding', 'radius', 'shadow'],
    },
  },
  render: (props) => (
    <Flex gap={2}>
      <Card {...props} borderTop>
        <Text>Top</Text>
      </Card>
      <Card {...props} borderBottom>
        <Text>Bottom</Text>
      </Card>
      <Card {...props} borderLeft>
        <Text>Left</Text>
      </Card>
      <Card {...props} borderRight>
        <Text>Right</Text>
      </Card>
      <Card {...props} border>
        <Text>Full</Text>
      </Card>
    </Flex>
  ),
}

export const Radii: Story = {
  args: {
    tone: 'transparent',
  },
  parameters: {
    controls: {
      include: ['fontSize', 'padding'],
    },
  },
  render: (props) => (
    <Flex gap={2}>
      <Card {...props} radius={0}>
        <Text>0</Text>
      </Card>
      <Card {...props} radius={1}>
        <Text>1</Text>
      </Card>
      <Card {...props} radius={2}>
        <Text>2</Text>
      </Card>
      <Card {...props} radius={3}>
        <Text>3</Text>
      </Card>
      <Card {...props} radius={4}>
        <Text>4</Text>
      </Card>
      <Card {...props} radius={5}>
        <Text>5</Text>
      </Card>
      <Card {...props} radius={6}>
        <Text>6</Text>
      </Card>
    </Flex>
  ),
}

export const Shadows: Story = {
  args: {
    tone: 'transparent',
  },
  parameters: {
    controls: {
      include: ['fontSize', 'padding'],
    },
  },
  render: (props) => (
    <Flex gap={7} padding={5} wrap="wrap">
      <Card {...props} shadow={0}>
        <Text>0</Text>
      </Card>
      <Card {...props} shadow={1}>
        <Text>1</Text>
      </Card>
      <Card {...props} shadow={2}>
        <Text>2</Text>
      </Card>
      <Card {...props} shadow={3}>
        <Text>3</Text>
      </Card>
      <Card {...props} shadow={4}>
        <Text>4</Text>
      </Card>
      <Card {...props} shadow={5}>
        <Text>5</Text>
      </Card>
    </Flex>
  ),
}

export const Schemes: Story = {
  args: {
    scheme: 'light',
    tone: 'transparent',
  },
  parameters: {
    controls: {
      include: ['fontSize', 'padding', 'radius', 'shadow'],
    },
  },
  render: (props) => (
    <Grid columns={5} gapX={2} gapY={3}>
      <Card {...props}>
        <Text>Light (Default)</Text>
      </Card>
      <Card {...props} tone="primary">
        <Text>Light (Primary)</Text>
      </Card>
      <Card {...props} tone="positive">
        <Text>Light (Positive)</Text>
      </Card>
      <Card {...props} tone="caution">
        <Text>Light (Caution)</Text>
      </Card>
      <Card {...props} tone="critical">
        <Text>Light (Critical)</Text>
      </Card>
      <Card {...props} scheme="dark">
        <Text>Dark (Default)</Text>
      </Card>
      <Card {...props} scheme="dark" tone="primary">
        <Text>Dark (Primary)</Text>
      </Card>
      <Card {...props} scheme="dark" tone="positive">
        <Text>Dark (Positive)</Text>
      </Card>
      <Card {...props} scheme="dark" tone="caution">
        <Text>Dark (Caution)</Text>
      </Card>
      <Card {...props} scheme="dark" tone="critical">
        <Text>Dark (Critical)</Text>
      </Card>
    </Grid>
  ),
}

export const Tones: Story = {
  args: {
    radius: 1,
    shadow: 1,
  },
  parameters: {
    controls: {
      include: ['fontSize', 'padding', 'radius', 'shadow'],
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
