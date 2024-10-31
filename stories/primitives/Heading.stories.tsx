import {AddCircleIcon} from '@sanity/icons'
import type {Meta, StoryObj} from '@storybook/react'

import {Card, Flex, Heading, HeadingProps, Stack, Text} from '../../src/core/primitives'
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
    return <Heading {...(props as HeadingProps)} />
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
    return <Heading {...(props as HeadingProps)} />
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
    return <Heading {...(props as HeadingProps)} />
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
        <Heading size={4} {...(props as HeadingProps)} />
        <Heading size={3} {...(props as HeadingProps)} />
        <Heading size={2} {...(props as HeadingProps)} />
        <Heading size={1} {...(props as HeadingProps)} />
        <Heading size={0} {...(props as HeadingProps)} />
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
        <Heading {...(props as HeadingProps)} />
        <Heading weight="medium" {...(props as HeadingProps)} />
        <Heading weight="semibold" {...(props as HeadingProps)} />
        <Heading weight="bold" {...(props as HeadingProps)} />
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
            <Heading {...(props as HeadingProps)} size={5} />
          </Card>
        </Flex>
        <Flex>
          <Card padding={0}>
            <Heading {...(props as HeadingProps)} size={4} />
          </Card>
        </Flex>
        <Flex>
          <Card padding={0}>
            <Heading {...(props as HeadingProps)} size={3} />
          </Card>
        </Flex>
        <Flex>
          <Card padding={0}>
            <Heading {...(props as HeadingProps)} size={2} />
          </Card>
        </Flex>
        <Flex>
          <Card padding={0}>
            <Heading {...(props as HeadingProps)} size={1} />
          </Card>
        </Flex>
        <Flex>
          <Card padding={0}>
            <Heading {...(props as HeadingProps)} size={0} />
          </Card>
        </Flex>
        <Flex>
          <Card padding={2}>
            <Heading {...(props as HeadingProps)}>
              <AddCircleIcon />
            </Heading>
          </Card>
        </Flex>
      </Stack>
    )
  },
}
