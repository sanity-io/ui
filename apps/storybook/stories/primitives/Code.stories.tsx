import {AddCircleIcon} from '@sanity/icons'
import {Box, Card, Code, Flex, Stack} from '@sanity/ui'
import type {Meta, StoryObj} from '@storybook/react'

import {getFontSizeControls} from '../controls'

const meta: Meta<typeof Code> = {
  args: {
    children: `console.log('Hello, world')`,
    language: 'javascript',
  },
  argTypes: {
    size: getFontSizeControls('code'),
  },
  component: Code,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Code>

export const Default: Story = {
  render: (props) => {
    return <Code {...props} />
  },
}

export const Sizes: Story = {
  parameters: {
    controls: {
      include: ['weight'],
    },
  },
  render: (props) => {
    return (
      <Stack space={3}>
        <Code {...props} size={4} />
        <Code {...props} size={3} />
        <Code {...props} size={2} />
        <Code {...props} size={1} />
        <Code {...props} size={0} />
      </Stack>
    )
  },
}

export const Weights: Story = {
  parameters: {
    controls: {
      include: ['size'],
    },
  },
  render: (props) => {
    return (
      <Stack space={3}>
        <Code {...props} />
        <Code {...props} weight="medium" />
        <Code {...props} weight="semibold" />
        <Code {...props} weight="bold" />
      </Stack>
    )
  },
}

export const OpticalAlignment: Story = {
  parameters: {controls: {include: []}},
  render: () => (
    <Box padding={[4, 5, 6]}>
      <Stack space={1}>
        {([4, 3, 2, 1, 0] as const).map((size) => (
          <Flex key={size}>
            <Card padding={0} scheme="dark">
              <Code size={size}>Hamburgefonstiv M</Code>
            </Card>
          </Flex>
        ))}

        <Flex>
          <Card padding={2} scheme="dark">
            <Code>
              <AddCircleIcon />
            </Code>
          </Card>
        </Flex>
      </Stack>
    </Box>
  ),
}
