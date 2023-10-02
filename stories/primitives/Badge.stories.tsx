import type {Meta, StoryObj} from '@storybook/react'
import {Badge, Flex, Stack} from '../../src/primitives'
import {getFontSizeControls, getRadiusControls, getSpaceControls} from '../controls'
import {radiusBuilder} from '../helpers/radiusBuilder'

const meta: Meta<typeof Badge> = {
  component: Badge,
  args: {
    children: 'Jackdaws love my big sphinx of quartz',
  },
  argTypes: {
    fontSize: getFontSizeControls('label'),
    padding: getSpaceControls(),
    radius: getRadiusControls(),
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  render: (props) => <Badge {...props} />,
}

export const Radius: Story = {
  parameters: {
    controls: {
      include: ['fontSize', 'padding', 'tone'],
    },
  },
  render: (props) => (
    <Flex gap={2} wrap="wrap">
      {radiusBuilder({
        renderItem: ({radius}) => (
          <Badge {...props} radius={radius}>
            {radius}
          </Badge>
        ),
      })}
    </Flex>
  ),
}

export const Modes: Story = {
  parameters: {
    controls: {
      include: ['fontSize', 'padding', 'radius'],
    },
  },
  render: (props) => (
    <Flex gap={3}>
      <Badge {...props}>Default</Badge>
      <Badge {...props} mode="outline">
        Outline
      </Badge>
    </Flex>
  ),
}

export const Tones: Story = {
  parameters: {
    controls: {
      include: ['fontSize', 'mode', 'padding', 'radius'],
    },
  },
  render: (props) => (
    <Flex gap={2}>
      <Badge {...props}>Default</Badge>
      <Badge {...props} tone="primary">
        Primary
      </Badge>
      <Badge {...props} tone="positive">
        Positive
      </Badge>
      <Badge {...props} tone="caution">
        Caution
      </Badge>
      <Badge {...props} tone="critical">
        Critical
      </Badge>
    </Flex>
  ),
}

export const MultipleStyles: Story = {
  parameters: {
    controls: {
      include: ['fontSize', 'padding', 'radius'],
    },
  },
  render: (props) => (
    <Stack space={3}>
      <Flex gap={2}>
        <Badge {...props}>Default</Badge>
        <Badge {...props} tone="primary">
          Primary
        </Badge>
        <Badge {...props} tone="positive">
          Positive
        </Badge>
        <Badge {...props} tone="caution">
          Caution
        </Badge>
        <Badge {...props} tone="critical">
          Critical
        </Badge>
      </Flex>
      <Flex gap={2}>
        <Badge {...props} mode="outline">
          Default
        </Badge>
        <Badge {...props} mode="outline" tone="primary">
          Primary
        </Badge>
        <Badge {...props} mode="outline" tone="positive">
          Positive
        </Badge>
        <Badge {...props} mode="outline" tone="caution">
          Caution
        </Badge>
        <Badge {...props} mode="outline" tone="critical">
          Critical
        </Badge>
      </Flex>
    </Stack>
  ),
}
