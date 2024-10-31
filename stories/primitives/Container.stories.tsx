import {Card, Container, Stack, Text} from '@sanity/ui'
import type {Meta, StoryObj} from '@storybook/react'

import {CONTAINER_WIDTH_CONTROLS, HEIGHT_CONTROLS, OVERFLOW_CONTROLS} from '../controls'

const meta: Meta<typeof Container> = {
  args: {
    children: <Text>Contained text</Text>,
  },
  argTypes: {
    height: HEIGHT_CONTROLS,
    overflow: OVERFLOW_CONTROLS,
    width: CONTAINER_WIDTH_CONTROLS,
  },
  component: Container,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Container>

export const Default: Story = {
  render: (props) => {
    return <Container {...props} />
  },
}

export const Widths: Story = {
  parameters: {
    controls: {
      include: [],
    },
  },
  render: (props) => {
    return (
      <Stack gap={2}>
        <Container {...props} width="auto">
          <Card padding={4} tone="transparent">
            <Text align="center">Auto</Text>
          </Card>
        </Container>
        <Container {...props} width={5}>
          <Card padding={4} tone="transparent">
            <Text align="center">5</Text>
          </Card>
        </Container>
        <Container {...props} width={4}>
          <Card padding={4} tone="transparent">
            <Text align="center">4</Text>
          </Card>
        </Container>
        <Container {...props} width={3}>
          <Card padding={4} tone="transparent">
            <Text align="center">3</Text>
          </Card>
        </Container>
        <Container {...props} width={2}>
          <Card padding={4} tone="transparent">
            <Text align="center">2</Text>
          </Card>
        </Container>
        <Container {...props} width={1}>
          <Card padding={4} tone="transparent">
            <Text align="center">1</Text>
          </Card>
        </Container>
        <Container {...props} width={0}>
          <Card padding={4} tone="transparent">
            <Text align="center">0</Text>
          </Card>
        </Container>
      </Stack>
    )
  },
}
