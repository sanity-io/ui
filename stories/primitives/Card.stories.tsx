import type {Meta, StoryObj} from '@storybook/react'
import {Button, Card, Flex, Grid, Stack, Text} from '../../src/primitives'
import {getRadiusControls, getShadowControls, getSpaceControls} from '../controls'
import {radiusBuilder} from '../helpers/radiusBuilder'

const meta: Meta<typeof Card> = {
  args: {
    children: <Text>Nested text</Text>,
    padding: 4,
  },
  argTypes: {
    padding: getSpaceControls(),
    paddingBottom: getSpaceControls(),
    paddingLeft: getSpaceControls(),
    paddingRight: getSpaceControls(),
    paddingTop: getSpaceControls(),
    radius: getRadiusControls(),
    shadow: getShadowControls(),
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

export const Radius: Story = {
  args: {
    shadow: 1,
    tone: 'transparent',
  },
  parameters: {
    controls: {
      include: ['fontSize', 'padding', 'shadow', 'tone'],
    },
  },
  render: (props) => (
    <Flex gap={2} wrap="wrap">
      {radiusBuilder({
        renderItem: ({radius}) => (
          <Card {...props} radius={radius}>
            <Text>{radius}</Text>
          </Card>
        ),
      })}
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
  render: (props) => {
    return (
      <Flex gap={2}>
        <Card {...props}>
          <Stack space={2}>
            <Text>Default</Text>
            <Button text="Default" />
            <Button text="Default" mode="bleed" />
            <Button text="Default" mode="ghost" />
          </Stack>
        </Card>
        <Card {...props} tone="primary">
          <Stack space={2}>
            <Text>Primary</Text>
            <Button text="Primary" />
            <Button text="Primary" mode="bleed" />
            <Button text="Primary" mode="ghost" />
          </Stack>
        </Card>
        <Card {...props} tone="positive">
          <Stack space={2}>
            <Text>Positive</Text>
            <Button text="Positive" />
            <Button text="Positive" mode="bleed" />
            <Button text="Positive" mode="ghost" />
          </Stack>
        </Card>
        <Card {...props} tone="caution">
          <Stack space={2}>
            <Text>Caution</Text>
            <Button text="Caution" />
            <Button text="Caution" mode="bleed" />
            <Button text="Caution" mode="ghost" />
          </Stack>
        </Card>
        <Card {...props} tone="critical">
          <Stack space={2}>
            <Text>Critical</Text>
            <Button text="Critical" />
            <Button text="Critical" mode="bleed" />
            <Button text="Critical" mode="ghost" />
          </Stack>
        </Card>
      </Flex>
    )
  },
}
