import type {Meta, StoryObj} from '@storybook/react'
import {Card, Container, Text} from '../../src/primitives'
import {OVERFLOW_CONTROLS, WIDTH_CONTROLS} from '../constants'

const meta: Meta<typeof Container> = {
  args: {
    children: <Text>Contained text</Text>,
  },
  argTypes: {
    height: {
      options: ['fill', 'stretch'],
    },
    overflow: OVERFLOW_CONTROLS,
    width: WIDTH_CONTROLS,
  },
  component: Container,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Container>

export const Docs: Story = {
  render: (props) => {
    return (
      <Card padding={4}>
        <Container {...props} />
      </Card>
    )
  },
}

export const Width: Story = {
  parameters: {
    controls: {
      include: ['width'],
    },
  },
  render: (props) => {
    const {children, ...rest} = props

    return (
      <Container {...rest}>
        <Card padding={4} tone="transparent">
          {children}
        </Card>
      </Container>
    )
  },
}
