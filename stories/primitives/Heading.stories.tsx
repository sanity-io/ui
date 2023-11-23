import {AddCircleIcon} from '@sanity/icons'
import type {Meta, StoryObj} from '@storybook/react'
import {Card, Flex, Heading, Stack, Text} from '../../src/core/primitives'
import {getAlignControls, getFontSizeControls} from '../controls'

const meta: Meta<typeof Heading> = {
  args: {
    children: 'Jackdaws love my big sphinx of quartz',
  },
  argTypes: {
    align: getAlignControls(),
    size: getFontSizeControls('heading'),
    textOverflow: {
      control: 'text',
    },
  },
  component: Heading,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Text>

export const Default: Story = {
  render: (props) => {
    return <Heading {...props} />
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
    return <Heading {...props} />
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
    return <Heading {...props} />
  },
}

export const Sizes: Story = {
  parameters: {
    controls: {
      include: ['muted', 'weight'],
    },
  },
  render: (props) => {
    return (
      <Stack space={4}>
        <Heading size={4} {...props} />
        <Heading size={3} {...props} />
        <Heading size={2} {...props} />
        <Heading size={1} {...props} />
        <Heading size={0} {...props} />
      </Stack>
    )
  },
}

export const Weights: Story = {
  parameters: {
    controls: {
      include: ['muted', 'size'],
    },
  },
  render: (props) => {
    return (
      <Stack space={4}>
        <Heading {...props} />
        <Heading weight="medium" {...props} />
        <Heading weight="semibold" {...props} />
        <Heading weight="bold" {...props} />
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
            <Heading {...props} size={5} />
          </Card>
        </Flex>
        <Flex>
          <Card padding={0}>
            <Heading {...props} size={4} />
          </Card>
        </Flex>
        <Flex>
          <Card padding={0}>
            <Heading {...props} size={3} />
          </Card>
        </Flex>
        <Flex>
          <Card padding={0}>
            <Heading {...props} size={2} />
          </Card>
        </Flex>
        <Flex>
          <Card padding={0}>
            <Heading {...props} size={1} />
          </Card>
        </Flex>
        <Flex>
          <Card padding={0}>
            <Heading {...props} size={0} />
          </Card>
        </Flex>
        <Flex>
          <Card padding={2}>
            <Heading {...props}>
              <AddCircleIcon />
            </Heading>
          </Card>
        </Flex>
      </Stack>
    )
  },
}
