import {AddCircleIcon} from '@sanity/icons'
import type {Meta, StoryObj} from '@storybook/react'
import {Card, Flex, Stack, Text} from '../../src/primitives'
import {getAlignControls, getFontSizeControls, getTextOverflowControls} from '../controls'

const meta: Meta<typeof Text> = {
  args: {
    children: 'Jackdaws love my big sphinx of quartz',
  },
  argTypes: {
    align: getAlignControls(),
    size: getFontSizeControls('text'),
    textOverflow: getTextOverflowControls(),
  },
  component: Text,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Text>

export const Default: Story = {
  render: (props) => {
    return <Text {...props} />
  },
}

export const Accent: Story = {
  args: {
    accent: true,
  },
  parameters: {
    controls: {
      include: ['accent', 'size'],
    },
  },
  render: (props) => {
    return <Text {...props} />
  },
}

export const Muted: Story = {
  args: {
    muted: true,
  },
  parameters: {
    controls: {
      include: ['muted', 'size'],
    },
  },
  render: (props) => {
    return <Text {...props} />
  },
}

export const Sizes: Story = {
  parameters: {
    controls: {
      include: ['muted'],
    },
  },
  render: (props) => {
    return (
      <Stack space={3}>
        <Text {...props} size={4} />
        <Text {...props} size={3} />
        <Text {...props} size={2} />
        <Text {...props} size={1} />
        <Text {...props} size={0} />
      </Stack>
    )
  },
}

export const Weights: Story = {
  parameters: {
    controls: {
      include: ['muted'],
    },
  },
  render: (props) => {
    return (
      <Stack space={3}>
        <Text {...props} />
        <Text {...props} weight="medium" />
        <Text {...props} weight="semibold" />
        <Text {...props} weight="bold" />
      </Stack>
    )
  },
}

export const OpticalAlignment: Story = {
  parameters: {
    controls: {
      include: ['muted', 'weight'],
    },
  },
  render: (props) => {
    return (
      <Stack space={1}>
        <Flex>
          <Card padding={0}>
            <Text {...props} size={4} />
          </Card>
        </Flex>
        <Flex>
          <Card padding={0}>
            <Text {...props} size={3} />
          </Card>
        </Flex>
        <Flex>
          <Card padding={0}>
            <Text {...props} size={2} />
          </Card>
        </Flex>
        <Flex>
          <Card padding={0}>
            <Text {...props} size={1} />
          </Card>
        </Flex>
        <Flex>
          <Card padding={0}>
            <Text {...props} size={0} />
          </Card>
        </Flex>
        <Flex>
          <Card padding={2}>
            <Text {...props}>
              <AddCircleIcon />
            </Text>
          </Card>
        </Flex>
      </Stack>
    )
  },
}
